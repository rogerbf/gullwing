const test = require("ava")
const sinon = require("sinon")
const { compile } = require("../source/compile.js")

test("it is a function", (t) => {
  t.is(typeof compile, "function")
})

test("calling compile with no parameters returns an empty object", (t) => {
  t.deepEqual(compile(), {})
})

test("compiles string values", (t) => {
  const messages = compile({ a: "a" })

  t.is(typeof messages.a, "function")
  t.is(messages.a(), "a")
})

test("compiles source, returns a function", (t) => {
  const message = compile({
    _message: "a",
  })

  t.is(message(), "a")
})

test("compiles source with single key, produces the expected function", (t) => {
  const messages = compile({
    a: {
      _message: "a",
    },
  })

  t.is(messages.a(), "a")
})

test("compiles with nested keys", (t) => {
  const messages = compile({
    a: {
      b: {
        c: {
          _message: "c",
        },
      },
    },
  })

  t.is(messages.a.b.c(), "c")
})

test("compilation with alternate dynamic message syntax (_m)", (t) => {
  const messages = compile({ a: { _m: "a" } })

  t.is(messages.a(), "a")
})

test("transformer is called with configuration", (t) => {
  const transformer = sinon.fake.returns(() => () => {})

  compile({ _configuration: { transformer: "value" } }, { transformer })

  t.true(transformer.calledWith("value"))
})

test("transformer is not called with any configuration", (t) => {
  const transformer = sinon.fake.returns(() => () => {})

  compile({ _configuration: { notTransformer: "value" } }, { transformer })

  t.true(transformer.calledWith(undefined))
})

test("calls transformer with dynamic message variables", (t) => {
  const variableConsumer = sinon.fake.returns(() => {})
  const transformer = () => variableConsumer
  const source = {
    _message: "{{ a | transformer(arg) }}",
    _variables: { arg: "a" },
  }

  compile(source, { transformer })

  t.deepEqual(variableConsumer.getCall(0).args, [source._variables.arg])
})

test("calls transformer with dynamic message variables (nested)", (t) => {
  const variableConsumer = sinon.fake.returns(() => {})
  const transformer = () => variableConsumer
  const source = {
    a: { _message: "{{ a | transformer(arg) }}", _variables: { arg: "a" } },
  }

  compile(source, { transformer })

  t.deepEqual(variableConsumer.getCall(0).args, [source.a._variables.arg])
})

test("calls transformer with dynamic message variables (compact syntax)", (t) => {
  const variableConsumer = sinon.fake.returns(() => {})
  const transformer = () => variableConsumer
  const source = { _m: "{{ a | transformer(arg) }}", _v: { arg: "a" } }

  compile(source, { transformer })

  t.deepEqual(variableConsumer.getCall(0).args, [source._v.arg])
})

test("calls transformer with dynamic message variables (compact syntax, nested)", (t) => {
  const variableConsumer = sinon.fake.returns(() => {})
  const transformer = () => variableConsumer
  const source = { a: { _m: "{{ a | transformer(arg) }}", _v: { arg: "a" } } }

  compile(source, { transformer })

  t.deepEqual(variableConsumer.getCall(0).args, [source.a._v.arg])
})

test("calls transformer with multiple variables", (t) => {
  const variableConsumer = sinon.fake()
  const transformer = () => variableConsumer

  const source = {
    _message: "{{ test | transformer(var1, var2) }}",
    _variables: { var1: 1, var2: 2 },
  }

  compile(source, { transformer })

  t.deepEqual(variableConsumer.getCall(0).args, [
    source._variables.var1,
    source._variables.var2,
  ])
})

test("calls transformer with multiple variables (compact syntax)", (t) => {
  const variableConsumer = sinon.fake()
  const transformer = () => variableConsumer

  const source = {
    _m: "{{ test | transformer(var1, var2) }}",
    _v: { var1: 1, var2: 2 },
  }

  compile(source, { transformer })

  t.deepEqual(variableConsumer.getCall(0).args, [
    source._v.var1,
    source._v.var2,
  ])
})

test("calls transformer with the message argument", (t) => {
  const argumentConsumer = sinon.fake()
  const transformer = () => () => argumentConsumer

  const source = {
    _message: "{{ argument | transformer }}",
  }

  compile(source, { transformer })({ argument: "a" })

  t.deepEqual(argumentConsumer.getCall(0).args, ["a"])
})

test("calls transformer with the message argument (nested)", (t) => {
  const argumentConsumer = sinon.fake()
  const transformer = () => () => argumentConsumer

  const source = {
    a: { _message: "{{ argument | transformer }}" },
  }

  compile(source, { transformer }).a({ argument: "a" })

  t.deepEqual(argumentConsumer.getCall(0).args, ["a"])
})

test("it passes object based argument to transformer", (t) => {
  const argumentConsumer = sinon.fake()
  const transformer = () => () => argumentConsumer

  const source = {
    a: { _message: "{{ argument | transformer }}" },
  }

  compile(source, { transformer }).a({ argument: { a: "a", b: "b" } })

  t.deepEqual(argumentConsumer.getCall(0).args, [{ a: "a", b: "b" }])
})
