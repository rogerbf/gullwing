const { message } = require("../")

const template =
  "A message: {{ value | invokeStringMethod(method) | addExclamations(exclamationCount) }}"

const transformers = {
  invokeStringMethod: (method) => (value) =>
    String.prototype[method].call(value),
  addExclamations: (count) => (value) =>
    value.concat(Array(count).fill("!").join("")),
}

const variables = { method: "toUpperCase", exclamationCount: 3 }

const getMessage = message(template, transformers, variables)

console.log(getMessage({ value: "loud voices" }))
// "A message: LOUD VOICES!!!"
