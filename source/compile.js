import applyParameters from "./apply-parameters"
import message from "./message/message"

const compile = (transformers, source) =>
  Object.entries(source).reduce((acc, [key, value]) => {
    if (typeof value === "object") {
      const { _message, _m, _variables, _v, ...rest } = value

      return Object.assign(acc, {
        [key]: Object.assign(
          _message || _m
            ? message(_message || _m, transformers, _variables || _v)
            : {},
          compile(transformers, rest),
        ),
      })
    } else {
      return Object.assign(acc, { [key]: () => value })
    }
  }, {})

export default (
  { _metadata, _configuration, ...source } = {}, // eslint-disable-line
  transformers = {},
) => {
  return compile(applyParameters(transformers, _configuration), source)
}
