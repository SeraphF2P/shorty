import { useState } from "react"
import copy from "copy-to-clipboard"

export default () => {
  const [value, setValue] = useState()
  const [success, setSuccess] = useState()

  const copyToClipboard = (text, options = undefined) => {
    const isCopied = copy(text, options)
    if (isCopied) setValue(text)
    setSuccess(isCopied)
  }

  return { copyToClipboard, value, success }
}
