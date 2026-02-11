import { useEffect } from "react";

type Params<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  enabled: boolean;
  onOutside: () => void;
};

export function useOutsideClick<T extends HTMLElement>({
  ref,
  enabled,
  onOutside,
}: Params<T>) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      if (!el.contains(e.target as Node)) {
        onOutside();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [enabled, ref, onOutside]);
}
