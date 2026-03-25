import { useEffect, useCallback } from "react";

interface ShortcutOptions {
  /** Also fires when Ctrl is held (for cross-platform Cmd/Ctrl combos) */
  meta?: boolean;
  ctrl?: boolean;
  /** Skip the shortcut when the user is typing inside an input/textarea */
  ignoreInputs?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: ShortcutOptions = { ignoreInputs: true }
): void {
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      if (options.meta && !event.metaKey && !event.ctrlKey) return;
      if (options.ctrl && !event.ctrlKey) return;
      if (event.key !== key) return;

      if (options.ignoreInputs !== false) {
        const target = event.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
      }

      event.preventDefault();
      stableCallback();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, stableCallback, options.meta, options.ctrl, options.ignoreInputs]);
}
