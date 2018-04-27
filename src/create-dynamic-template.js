import { identifyTags } from "./identify-tags"

const createDynamicTemplate = (
  { template = ``, options = {}, transformers = {} } = {},
  { tags } = identifyTags({ template })
) => (parameters = {}) =>
  tags.reduce(
    (interpolation, { tag, transformers: selectedTransformers, parameter }) => {
      return interpolation.replace(
        tag,
        selectedTransformers.reduce(
          (value, transform) =>
            transform in transformers
              ? transformers[transform]({
                  options: options[transform],
                  parameters,
                  parameter,
                  value,
                })
              : value,
          parameters[parameter]
        )
      )
    },
    template
  )

export { createDynamicTemplate }
