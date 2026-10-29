import { useRef } from "react";

export function useScroller() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const element = scroller.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth * 0.9, behavior: "smooth" });
  };

  return { scroller, scroll };
}
