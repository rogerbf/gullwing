module.exports = (defaultSeparators = [` `]) => (
  separators = defaultSeparators,
) => value => {
  const [first, second] = separators

  switch (separators.length) {
    case 1:
      return value.join(first)
    case 2:
      return value.length > 1
        ? value
            .slice(0, -1)
            .join(first)
            .concat(second + value[value.length - 1])
        : value.join()
    default:
      return value.join(` `)
  }
}
