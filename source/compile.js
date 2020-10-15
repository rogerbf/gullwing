import { call } from "./call.js"
import { message } from "./message.js"

const _compile = (source = {}, transformers) => {
  const { _message, _m } = source

  return _message || _m
    ? message(_message || _m, transformers, source._variables || source._v)
    : typeof source === "object"
    ? Object.entries(source).reduce(
        (acc, [key, value]) =>
          Object.assign(acc, {
            [key]: _compile(value, transformers),
          }),
        {}
      )
    : () => source
}

export const compile = (
  { _configuration, ...source } = {},
  transformers = {}
) => {
  return _compile(source, call(transformers, _configuration))
}
