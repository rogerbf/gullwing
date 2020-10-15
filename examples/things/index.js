const { compile } = require("../../")

const source = {
  things: {
    _message: "Things: {{ total }}",
  },
  stuff: {
    _message: "Stuff",
  },
}

const messages = compile(source)

console.log(messages.things({ total: 3 }))
// Things: 3
console.log(messages.stuff())
// Stuff
