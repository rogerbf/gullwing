const test = require("ava")
const { tags } = require("../source/tags.js")

test("it is a function", (t) => {
  t.is(typeof tags, "function")
})

test("calling without any arguments", (t) => {
  t.deepEqual(tags(), [])
})

test("empty tag", (t) => {
  t.deepEqual(tags("{{}}"), [{ tag: "{{}}", parameter: "", operations: [] }])
})

test("multiple empty tags", (t) => {
  t.deepEqual(tags("{{}}{{}}"), [
    { tag: "{{}}", parameter: "", operations: [] },
    { tag: "{{}}", parameter: "", operations: [] },
  ])
})

test("multiple tags with parameters", (t) => {
  t.deepEqual(tags("{{ first }}{{ second }}"), [
    {
      tag: "{{ first }}",
      parameter: "first",
      operations: [],
    },
    {
      tag: "{{ second }}",
      parameter: "second",
      operations: [],
    },
  ])
})

test("multiple transforms", (t) => {
  t.deepEqual(tags("{{ value | first | second }}"), [
    {
      tag: "{{ value | first | second }}",
      parameter: "value",
      operations: ["first", "second"],
    },
  ])
})
