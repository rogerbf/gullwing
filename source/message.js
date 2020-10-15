import { operation } from "./operation.js"
import { tags } from "./tags.js"

export const message = (source, transformers, variables) => {
  const interpolations = tags(source).map(({ tag, operations, parameter }) => {
    const interpolate = Array.prototype.reduce.bind(
      operations
        .map(operation)
        .map(({ name, args }) =>
          transformers[name](...args.map((name) => variables[name]))
        ),
      (value, next) => next(value) || ""
    )

    return (interpolation, parameters) =>
      interpolation.replace(tag, interpolate(parameters[parameter] || ""))
  })

  return interpolations.length
    ? (parameters = {}) =>
        interpolations.reduce(
          (interpolation, interpolate) =>
            interpolate(interpolation, parameters),
          source
        )
    : () => source
}
