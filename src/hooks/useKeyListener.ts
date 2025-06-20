export const useKeyListener = (key: string, handler: () => void) => {
  document.addEventListener(
    "keydown",
    (v: KeyboardEvent) => {
      if (v.key === key) {
        handler();
      }
    },
    { once: true }
  );
};
