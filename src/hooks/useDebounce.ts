import { useEffect } from "react";

import useTimeoutFn from "./useTimeout";

type DebounceHookFn = (...args: any[]) => void;

const useDebounce = <T extends DebounceHookFn>(
  fn: T,
  ms = 0,
  deps: React.DependencyList = []
): [boolean, () => void] => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [isReady(), cancel];
};

export default useDebounce;
