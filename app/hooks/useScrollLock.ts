
import { MutableRefObject, useEffect, useRef } from "react";
import useCssRulesInserter from "./useCssRulesInserter";

export default function useScrollLock(
  locked: boolean,
  selector = "",
  scrollX = false
) {
  const ele: MutableRefObject<Element | null> = useRef(null);
  const customClass = useCssRulesInserter(
    `scrollLock-${scrollX ? "x" : "y"}`,
    `${scrollX ? "overflow-x" : "overflow-y"}:hidden;`
  );

  useEffect(() => {
    ele.current = selector ? document.querySelector(selector) : document.body;
    ele.current?.classList.toggle(customClass, locked);
    return () => {
      if (ele.current?.classList.contains(customClass)) {
        ele.current.classList.remove(customClass);
      }
    };
  }, [locked]);
}
