import { identifyTags } from "./identify-tags"

const createDynamicTemplate = (
  { template = ``, options = {}, transforms = {} } = {},
  { tags } = identifyTags({ template })
) => (parameters = {}) =>
  tags.reduce(
    (interpolation, { tag, transforms: selectedTransforms, parameter }) => {
      return interpolation.replace(
        tag,
        selectedTransforms.reduce(
          (value, transform) =>
            transform in transforms
              ? transforms[transform]({
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
