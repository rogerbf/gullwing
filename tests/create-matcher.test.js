import { createMatcher } from "../src/create-matcher"

describe(`createMatcher`, () => {
  it(`is a function`, () => expect(typeof createMatcher).toBe(`function`))

  it(`returns a regular expression`, () =>
    expect(createMatcher().constructor.name).toBe(`RegExp`))

  it(`behaves as expected`, () => {
    const template = `{{ count }} is a cardinal number.`
    const regex = createMatcher()
    const match = regex.exec(template)

    expect(match[0]).toEqual(`{{ count }}`)
    expect(match.index).toBe(0)
    expect(regex.exec(template)).toBe(null)
  })
})
