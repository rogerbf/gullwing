import gullwing from "../src/main"

describe(`gullwing`, () => {
  it(`is defined`, () => expect(gullwing).toBeDefined())

  it(`is a function`, () => expect(typeof gullwing).toBe(`function`))
})
