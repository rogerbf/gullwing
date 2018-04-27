import { createDynamicTemplate } from "./create-dynamic-template"

const gullwing = ({ template = {}, transformers = {} } = {}) => {
  return Object.entries(template).reduce(
    (accumulator, [ key, value ]) => ({
      ...accumulator,
      [key]: !(value instanceof Object)
        ? value
        : value.hasOwnProperty(`template`)
          ? createDynamicTemplate({
              ...value,
              transformers,
            })
          : gullwing({ template: value, transformers }),
    }),
    {}
  )
}

export default Object.assign(gullwing, { createDynamicTemplate })
