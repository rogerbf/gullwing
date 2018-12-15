module.exports = defaultProperty => (property = defaultProperty) => value =>
  value[property]
