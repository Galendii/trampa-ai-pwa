"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// A debounce function to prevent firing too many API calls while the user is typing
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const useUrlStateSync = <T extends Record<string, any>>(
  initialState: T
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  // Initialize state from URL or with initial values
  const [state, setState] = useState<T>(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialStateFromUrl: Record<string, any> = {};
    for (const key in initialState) {
      const paramValue = params.get(key);
      if (paramValue) {
        // For arrays (like status), we split by comma
        if (Array.isArray(initialState[key])) {
          initialStateFromUrl[key] = paramValue.split(",");
        } else {
          initialStateFromUrl[key] = paramValue;
        }
      }
    }
    return { ...initialState, ...initialStateFromUrl };
  });

  // Debounced function to update URL
  const updateUrl = useCallback(
    debounce((newState: T) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const key in newState) {
        const value = newState[key];
        if (value && String(value).length > 0) {
          // For arrays, join with a comma
          params.set(
            key,
            Array.isArray(value) ? value.join(",") : String(value)
          );
        } else {
          params.delete(key);
        }
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 300),
    [pathname, router, searchParams]
  );

  // Update state and trigger URL update
  const setSyncedState = (newState: Partial<T>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    updateUrl(updatedState);
  };

  return [state, setSyncedState] as const;
};
