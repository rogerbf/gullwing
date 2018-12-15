const applyParameters = (tree = {}, parameters = {}) =>
  Object.entries(tree).reduce(
    (result, [ key, value ]) =>
      Object.assign(result, {
        [key]:
          typeof value === `function`
            ? value(parameters[key])
            : applyParameters(tree[key], parameters[key]),
      }),
    {}
  )

export default applyParameters
