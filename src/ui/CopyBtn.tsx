"use client";

import { useState } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { cn } from "../lib/cva";
import Btn from "./Btn";

export default ({ shortLink }: { shortLink: string }) => {
  const { copyToClipboard, success } = useCopyToClipboard();
  return (
    <Btn
      onClick={() => {
        copyToClipboard(location.host + "/" + shortLink);
      }}
      className={cn("rounded-sm  px-8 py-2", {
        "bg-dark-violet": success,
      })}
    >
      {success ? "copied" : "copy"}
    </Btn>
  );
};
