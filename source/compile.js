import applyParameters from "./apply-parameters"
import message from "./message/message"

const compile = (transformers, source) =>
  Object.entries(source).reduce(
    (acc, [ key, { _message, _variables, ...rest } ]) =>
      Object.assign(acc, {
        [key]: Object.assign(
          _message ? message(_message, transformers, _variables) : {},
          compile(transformers, rest)
        ),
      }),
    {}
  )

export default (
  { _metadata, _configuration, ...source } = {},
  transformers = {}
) => {
  return compile(applyParameters(transformers, _configuration), source)
}
