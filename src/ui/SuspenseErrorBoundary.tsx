"use client";
import React, { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RotatingLines } from "react-loader-spinner";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import useIsMounted from "../hooks/useIsMounted";
type Props = {
  children: ReactNode;
};
export default ({ children }: Props) => {
  const { isMounted } = useIsMounted();
  if (!isMounted) return null;
  return (
    <ErrorBoundary
      fallback={
        <div
          className={`flex  w-full items-center justify-center gap-4 bg-transparent p-4 text-red`}
        >
          <ExclamationCircleIcon width={24} height={24} />
          <span> Could not fetch the data</span>
        </div>
      }
    >
      {typeof window !== "undefined" && (
        <Suspense
          fallback={
            <div className={` grid h-40 w-screen  bg-transparent`}>
              <div className=" m-auto">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      )}
    </ErrorBoundary>
  );
};
