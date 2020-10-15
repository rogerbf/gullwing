import { mergeWith } from "call-tree"

const callback = (parameters, fn) => fn(parameters)

export const call = (messages, parameters) =>
  mergeWith(callback, parameters, messages)
