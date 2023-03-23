"use client";
import Btn from "./components/Btn";
import useCopyToClipboard from "./hooks/useCopyToClipboard";

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
