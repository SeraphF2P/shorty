"use client";

import { SetStateAction, useState } from "react";
import copy from "copy-to-clipboard";

export default () => {
  const [value, setValue] = useState<string>();
  const [success, setSuccess] = useState<boolean | undefined>();

  const copyToClipboard = (text: string, options = undefined) => {
    const isCopied = copy(text, options);
    if (isCopied) setValue(text);
    setSuccess(isCopied);
  };
  return { copyToClipboard, value, success };
};
