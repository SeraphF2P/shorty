"use client";
import { useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
function createNewStyleSheets(stylesheetID: string) {
  if (typeof window === "undefined") return;
  if (document.getElementById(stylesheetID) == null) {
    const head = document.querySelector("head");
    const styleSheet = document.createElement("style");
    styleSheet.setAttribute("rel", "stylesheet");
    styleSheet.setAttribute("id", stylesheetID);
    head?.appendChild(styleSheet);
    return document.styleSheets.item(document.styleSheets.length - 1);
  } else {
    return document.styleSheets.item(document.styleSheets.length - 1);
  }
}
export default function useCssRulesInserter(
  className: string,
  cssProperty: any,
  stylesheetID = "MyStylesheet"
) {
  const id = nanoid(5);
  const styleSheet = useMemo(() => {
    return createNewStyleSheets(stylesheetID);
  }, [])!;
  const index: number = useMemo(() => {
    return styleSheet.cssRules.length;
  }, [styleSheet?.cssRules?.length]);

  const newClass = useMemo(() => {
    return className + "-" + id;
  }, []);
  useEffect(() => {
    styleSheet?.insertRule(`.${newClass}{${cssProperty};}`, index);
    return () => {
      styleSheet?.deleteRule(index);
    };
  }, []);
  return newClass;
}
