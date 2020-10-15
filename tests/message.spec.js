const test = require("ava")
const { message } = require("../source/message.js")

test("it is a function", (t) => {
  t.is(typeof message, "function")
})

test("it returns a function", (t) => {
  t.is(typeof message(), "function")
})

test("given a string it returns a function which returns the same string", (t) => {
  t.is(message("test")(), "test")
})

test("substitutes tag with value", (t) => {
  t.is(message("{{ value }}")({ value: 1 }), "1")
})

test("removes tag from output", (t) => {
  t.is(message("before{{ value }} after")(), "before after")
})

test("substitutes tag with value and applies transformer", (t) => {
  const source = "{{ one | transformer(two, three) }}"

  const transformers = {
    transformer: (two, three) => (one) => `${one} ${two} ${three}`,
  }

  const variables = { two: "two", three: "three" }

  const expected = "one two three"
  const actual = message(source, transformers, variables)({ one: "one" })

  t.is(actual, expected)
})

test("it returns empty string", (t) => {
  const source = "{{ param }}"

  t.is(message(source)(), "")
})

test("it returns a empty string", (t) => {
  const source = "{{ | transformer }}"

  t.is(message(source, { transformer: () => () => void 0 })(), "")
})
