
import { useRef, useEffect, MutableRefObject } from "react";
import { debounce, throttle } from "../utility_function/performance";
import useCssRulesInserter from "./useCssRulesInserter";
type useDefaultValuesTypes = {
  inReverse?: any;
  forward?: any;
  onHold?: any;
  condition?: never[];
  startAt?: number;
  selector?: string;
  holdFor?: number;
  throttleDelay?: number;
  scrollOnX?: string;
};

function useDefaultValues({
  inReverse,
  forward,
  onHold,
  condition = [],
  startAt = 0,
  selector = "",
}: useDefaultValuesTypes) {
  const elementRef = useRef<HTMLElement>(null);
  const scrollVal = useRef(startAt);
  const scrollForwards = inReverse
    ? useCssRulesInserter("scrollForwards", inReverse)
    : "";
  const scrollInRevers = forward
    ? useCssRulesInserter("scrollInRevers", forward)
    : "";
  const scrollOnHold = onHold
    ? useCssRulesInserter("scrollOnHold", onHold)
    : "";
  const condetionsClasses = condition
    ? condition.map((con, ind) => {
        return useCssRulesInserter(`scrollCondition-${ind}`, con);
      })
    : [];
  const scrollContainer: MutableRefObject<
    Element | (Window & typeof globalThis) | null
  > = useRef(null);
  useEffect(() => {
    scrollContainer.current = selector
      ? document.querySelector(selector)
      : window;
  }, []);
  return {
    elementRef,
    scrollVal,
    scrollForwards,
    scrollInRevers,
    scrollOnHold,
    condetionsClasses,
    scrollContainer,
  };
}

export default function useScrollSensore(
  options: {
    forward?: any;
    inReverse?: any;
    onHold: any;
    holdFor?: any;
    throttleDelay?: any;
    scrollOnX?: any;
    selector?: any;
    condition?: any;
    startAt?: any;
  },
  ...conditionly: (() => boolean | boolean)[]
) {
  const {
    onHold,
    holdFor = 1000,
    throttleDelay = 100,
    scrollOnX = false,
    selector = "",
  } = { ...options };

  const {
    elementRef,
    scrollVal,
    scrollForwards,
    scrollInRevers,
    scrollOnHold,
    condetionsClasses,
    scrollContainer,
  } = useDefaultValues(options);

  let scrollMode;
  let scrollHandler = () => {
    if (elementRef.current == undefined) return;

    scrollOnHold ? elementRef.current.classList.remove(scrollOnHold) : "";

    if (selector != "") {
      scrollMode = document.querySelector(selector).scrollTop;
    } else {
      scrollMode = scrollOnX ? scrollX : scrollY;
    }

    if (scrollVal.current < scrollMode) {
      scrollVal.current = scrollMode;
      elementRef.current.classList.add(scrollForwards);
      elementRef.current.classList.remove(scrollInRevers);
    } else if (scrollVal.current > scrollMode) {
      scrollVal.current = scrollMode;
      elementRef.current.classList.add(scrollInRevers);
      elementRef.current.classList.remove(scrollForwards);
    }
    if (condetionsClasses == null) return;
    conditionly.map((cb, ind) => {
      if (typeof cb == "function") {
        elementRef.current?.classList.toggle(condetionsClasses[ind], cb());
      } else if (typeof cb == "boolean") {
        elementRef.current?.classList.toggle(condetionsClasses[ind], cb);
      }
    });
  };
  function scrollStop() {
    if (elementRef.current == undefined) return;
    if (elementRef.current.classList.contains(scrollOnHold) == false) {
      elementRef.current.classList.remove(scrollForwards);
      elementRef.current.classList.remove(scrollInRevers);
      elementRef.current.classList.add(scrollOnHold);
    }
  }
  useEffect(() => {
    scrollContainer.current?.addEventListener(
      "scroll",
      throttle(scrollHandler, throttleDelay)
    );
    onHold
      ? scrollContainer.current?.addEventListener(
          "scroll",
          debounce(scrollStop, holdFor)
        )
      : "";
    return () => {
      scrollContainer.current?.removeEventListener(
        "scroll",
        throttle(scrollHandler, throttleDelay)
      );
      onHold
        ? scrollContainer.current?.removeEventListener(
            "scroll",
            debounce(scrollStop, holdFor)
          )
        : "";
    };
  }, [...conditionly]);

  return elementRef;
}
