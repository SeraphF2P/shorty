
import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const variants = cva(
  ` relative flex  px-4 py-2 text-base   transition-[transform_background-color] duration-300 duration-300  justify-center items-center tracking-wider 
    `,
  {
    variants: {
      variant: {
        fill: " bg-cyan  hover:bg-cyan/80  hover:scale-105 text-white capitalize active:scale-95  ",
        alert: " bg-red  hover:bg-red/80  hover:scale-105 text-white capitalize active:scale-95  ",
        outline:
          " ring-solid  duration-700  ring-2 ring-variant hover:bg-variant active:bg-variant     ",
        ghost:
          "  hover:bg-cyan/80   active:bg-cyan text-gray hover:text-white    ",
      },
      shape: {
        pill: "rounded-full",
        circle: "rounded-full aspect-square",
        rect: "rounded-sm",
      },
      deActivated: {
        default:
          " disabled:text-gray-700  disabled:bg-gray-500 disabled:ring-gray-500 ",
        skelaton:
          "disabled:text-gray-400 disabled:ring-4 disabled:bg-gray-400 disabled:active:bg-transparent",
        link: "text-gray-400 ring-gray-400 active:bg-transparent hover:scale-100 cursor-auto",
      },
    },

    defaultVariants: {
      variant: "fill",
      shape: "pill",
      deActivated: "default",


    },
  }
);
export type variantsType = VariantProps<typeof variants>;
