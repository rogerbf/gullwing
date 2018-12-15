import message from "../../../source/message/message"

describe(`message`, () => {
  it(`is a function`, () => {
    expect(message).toEqual(expect.any(Function))
  })

  it(`returns a function`, () => {
    expect(message()).toEqual(expect.any(Function))
  })

  it(`returns a function which returns a string`, () => {
    expect(message(`Testing`)()).toEqual(`Testing`)
  })

  it(`returns the expected output`, () => {
    expect(message(`Testing {{ num }}`)({ num: 1 })).toEqual(`Testing 1`)
  })

  it(`calls transformer with variables`, () => {
    const transformer = jest.fn()
    const transformers = { transformer }
    const _message = `{{ param | transformer(a,b) }}`
    const _variables = { a: `first`, b: `second` }

    message(_message, transformers, _variables)

    expect(transformer).toHaveBeenCalledWith(_variables.a, _variables.b)
  })

  it(`calls transformer with parameter value`, () => {
    const transformer = jest.fn()
    const transformers = { transformer: () => transformer }
    const _message = `{{ param | transformer }}`

    message(_message, transformers)({ param: `testing` })

    expect(transformer).toHaveBeenCalledWith(`testing`)
  })

  it(`returns empty string`, () => {
    const _message = `{{ param }}`

    expect(message(_message)()).toEqual(``)
  })
})
