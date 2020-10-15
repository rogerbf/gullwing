const test = require("ava")
const { compile } = require("../source/compile.js")

test("compile()", (t) => {
  const expected = {}
  const actual = compile()

  t.deepEqual(actual, expected)
})

test("example: things", (t) => {
  const source = {
    things: {
      _message: "Things: {{ total }}",
    },
    stuff: {
      _message: "Stuff",
    },
  }

  const messages = compile(source)

  t.is(messages.things({ total: 3 }), "Things: 3")
  t.is(messages.things(), "Things: ")
  t.is(messages.stuff(), "Stuff")
})

test("example: fruits", (t) => {
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

  t.is(
    messages.fruits({ types: ["Apple", "Pear", "Mango"] }),
    "3 types of fruit: Apple, Pear, Mango."
  )
})

test("example: fruits (compact syntax)", (t) => {
  const source = {
    _configuration: {
      join: ", ",
    },
    fruits: {
      _m: "{{ types | property(prop) }} types of fruit: {{ types | join }}.",
      _v: {
        prop: "length",
      },
    },
  }

  const property = () => (propertyName) => (value) => value[propertyName]

  const join = (defaultSeparator) => (separator = defaultSeparator) => (list) =>
    list.join(separator)

  const messages = compile(source, { join, property })

  t.is(
    messages.fruits({ types: ["Apple", "Pear", "Mango"] }),
    "3 types of fruit: Apple, Pear, Mango."
  )
})

test("string values", (t) => {
  const source = {
    a: "a",
  }

  const messages = compile(source)

  t.is(messages.a(), "a")
})
