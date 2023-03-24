"use client";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default ({ error, rest }) => {
  return (
    <div
      className={`flex  w-full items-center justify-center gap-4 bg-transparent p-4 text-red`}
    >
      <ExclamationCircleIcon width={24} height={24} />
      <span> somthing went wrong</span>
    </div>
  );
};
