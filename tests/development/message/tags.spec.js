import tags from "../../../source/message/tags"

describe(`tags`, () => {
  it(`is a function`, () => {
    expect(tags).toEqual(expect.any(Function))
  })

  test(`tags()`, () => {
    expect(tags()).toEqual([])
  })

  test(`tags('{{}}')`, () => {
    expect(tags(`{{}}`)).toEqual([
      { tag: `{{}}`, parameter: ``, operations: [] },
    ])
  })

  test(`tags('{{}}{{}}')`, () => {
    expect(tags(`{{}}{{}}`)).toEqual([
      { tag: `{{}}`, parameter: ``, operations: [] },
      { tag: `{{}}`, parameter: ``, operations: [] },
    ])
  })

  test(`tags('{{ first }}{{ second }}')`, () => {
    expect(tags(`{{ first }}{{ second }}`)).toEqual([
      {
        tag: `{{ first }}`,
        parameter: `first`,
        operations: [],
      },
      {
        tag: `{{ second }}`,
        parameter: `second`,
        operations: [],
      },
    ])
  })

  test(`tags('{{ value | first | second }}')`, () => {
    expect(tags(`{{ value | first | second }}`)).toEqual([
      {
        tag: `{{ value | first | second }}`,
        parameter: `value`,
        operations: [`first`, `second`],
      },
    ])
  })
})
