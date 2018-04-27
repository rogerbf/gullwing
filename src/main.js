import { createDynamicTemplate } from "./create-dynamic-template"

const ingest = ({ template = {}, transformers = {} } = {}) => {
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
          : ingest({ template: value, transformers }),
    }),
    {}
  )
}

export { createDynamicTemplate }

export default ingest
