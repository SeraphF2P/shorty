"use client";

import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import Btn from "./Btn";

type Props = {};

export const BoostYourLink = (props: Props) => {
  const { width: vWidth } = useViewportSize();

  return (
    <section className=" relative flex h-52 w-full flex-col items-center justify-center gap-2  text-white">
      {vWidth > 768 ? (
        <Image
          className="-z-10 bg-dark-violet "
          src={"/images/bg-boost-desktop.svg"}
          sizes="600px 100px"
          fill
          alt="background"
        />
      ) : (
        <Image
          className="-z-10 bg-dark-violet "
          src={"/images/bg-shorten-mobile.svg"}
          fill
          sizes="300px 250px"
          alt="background"
        />
      )}
      <h2>Boost your links today </h2>
      <Btn className=" px-4 py-2">Get Started</Btn>
    </section>
  );
};
