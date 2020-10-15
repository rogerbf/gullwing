const { compile } = require("../../")

const source = {
  _configuration: {
    join: ", ",
  },
  fruits: {
    _message:
      "{{ types | property(prop) }} types of fruit: {{ types | join }}.",
    _variables: {
      prop: "length",
    },
  },
}

const property = () => (propertyName) => (value) => value[propertyName]

const join = (defaultSeparator) => (separator = defaultSeparator) => (list) =>
  list.join(separator)

const messages = compile(source, { join, property })

console.log(messages.fruits({ types: ["Apple", "Pear", "Mango"] }))
// 3 types of fruit: Apple, Pear, Mango.
