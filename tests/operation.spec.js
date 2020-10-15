const test = require("ava")
const { operation } = require("../source/operation.js")

test("it is a function", (t) => {
  t.is(typeof operation, "function")
})

test("transformer without variables", (t) => {
  t.deepEqual(operation("transformer"), {
    name: "transformer",
    args: [],
  })
})

test("transformer with single argument", (t) => {
  t.deepEqual(operation("transformer(a)"), {
    name: "transformer",
    args: ["a"],
  })
})

test("transformer with multiple arguments", (t) => {
  t.deepEqual(operation("transformer(a, b, c)"), {
    name: "transformer",
    args: ["a", "b", "c"],
  })
})

test("transformer with multiple arguments (no spaces)", (t) => {
  t.deepEqual(operation("transformer(a,b,c)"), {
    name: "transformer",
    args: ["a", "b", "c"],
  })
})
