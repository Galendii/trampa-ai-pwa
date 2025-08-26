import { useCallback, useEffect, useRef } from "react";

type TimeoutFn = () => void;

const useTimeoutFn = (
  fn: TimeoutFn,
  ms = 0
): [() => boolean, () => void, () => void] => {
  const ready = useRef<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const callback = useRef<TimeoutFn>(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = false;
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  // Update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // Set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms, set, clear]);

  return [isReady, clear, set];
};

export default useTimeoutFn;
