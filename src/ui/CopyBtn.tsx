"use client";

import useCopyToClipboard from "../hooks/useCopyToClipboard";
import Btn from "./Btn";

export default ({ shortLink }: { shortLink: string }) => {
  const { copyToClipboard, success } = useCopyToClipboard();
  return (
    <Btn
      onClick={() => {
        copyToClipboard(location.host + "/" + shortLink);
      }}
      status=" !bg-dark-violet"
      hasStatus={success}
      shape="filled"
      className="rounded-sm  px-8 py-2"
    >
      {({ hasStatus }: { hasStatus: boolean }) => {
        return hasStatus ? "copied" : "copy";
      }}
    </Btn>
  );
};
