"use client";

import Image from "next/image";
import Btn from "./Btn";

type Props = {};

export const BoostYourLink = (props: Props) => {
  return (
    <section className=" relative flex h-52 w-full flex-col items-center justify-center gap-2  text-white">
      <Image
        className="-z-10 bg-dark-violet "
        fill
        src={
          typeof window !== "undefined" && window.innerWidth > 768
            ? "/images/bg-boost-desktop.svg"
            : "/images/bg-boost-mobile.svg"
        }
        alt="background"
      />
      <h2>Boost your links today </h2>
      <Btn shape="filled" className=" px-4 py-2">
        Get Started
      </Btn>
    </section>
  );
};
