"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
} from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (val: any) => void;
  onToggle?: string;
  isToggled?: boolean;
  status?: string;
  hasStatus?: boolean;
  toggleDependencies?: unknown;
  shape?: string;
  children?: any;
}
export default forwardRef<
  Ref<MutableRefObject<undefined>> | undefined,
  BtnProps
>(
  (
    {
      onClick,
      onToggle,
      isToggled = undefined,
      status,
      hasStatus,
      toggleDependencies,
      shape,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const ele = useRef(null);
    ref = ele;
    useEffect(() => {
      if (onToggle == undefined || ele.current == undefined) return;
      const btnElement = ele.current as unknown as HTMLButtonElement;
      const classes = onToggle.split(" ").filter((item) => {
        return item != "";
      });
      const classToggler = () => {
        classes.map((str) => {
          btnElement.classList.toggle(str);
        });
      };
      classes.map((str) => {
        btnElement.classList.toggle(str, isToggled);
      });

      btnElement.addEventListener("click", classToggler);

      return () => {
        if (btnElement) {
          btnElement.removeEventListener("click", classToggler);
        }
      };
    }, [isToggled, onToggle, toggleDependencies]);

    return (
      <button
        ref={ele}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof onClick == "function") {
            onClick({ isToggled });
          }
        }}
        className={`
       ${
         shape == "filled"
           ? " shadow-inherit rounded-full bg-cyan shadow-sm hover:bg-cyan/80 active:bg-cyan/90 active:shadow-inner disabled:bg-gray disabled:text-grayish"
           : shape == "outlined"
           ? " shadow-inherit disabled:ring-neutral-LightGray ring-solid disabled:ring-solid rounded-full   shadow-sm ring-4 ring-currentColor  active:bg-cyan/90  active:shadow-inner disabled:text-gray  disabled:ring-4"
           : ""
       }
      ${className}
      ${hasStatus ? status : ""}
               duration-400     text-white transition-transform  hover:scale-105 focus:scale-105  active:scale-100 disabled:hover:scale-100 ui-active:outline-cyan
                    `}
        {...props}
      >
        {typeof children == "function"
          ? children({ isToggled, hasStatus })
          : children}
      </button>
    );
  }
);
