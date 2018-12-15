import applyParameters from "../../source/apply-parameters"

describe(`applyParameters`, () => {
  it(`is a function`, () => {
    expect(applyParameters).toEqual(expect.any(Function))
  })

  test(`applyParameters()`, () => {
    expect(applyParameters()).toEqual({})
  })

  test(`simple`, () => {
    const tree = {
      a: jest.fn(),
    }

    expect(applyParameters(tree)).toEqual({ a: undefined })
    expect(tree.a).toHaveBeenCalledTimes(1)
  })

  test(`nested`, () => {
    const tree = {
      a: {
        b: jest.fn(),
        c: jest.fn(),
        d: {
          e: jest.fn(),
          f: jest.fn(),
        },
      },
    }

    expect(applyParameters(tree)).toEqual({
      a: {
        b: undefined,
        c: undefined,
        d: {
          e: undefined,
          f: undefined,
        },
      },
    })
    expect(tree.a.b).toHaveBeenCalled()
    expect(tree.a.c).toHaveBeenCalled()
    expect(tree.a.d.e).toHaveBeenCalled()
    expect(tree.a.d.f).toHaveBeenCalled()
  })

  test(`nested (parameter values)`, () => {
    const tree = {
      a: {
        b: jest.fn(),
        c: jest.fn(),
        d: {
          e: jest.fn(),
          f: jest.fn(),
        },
      },
    }

    const parameters = {
      a: {
        b: `b`,
        d: {
          f: `f`,
        },
      },
    }

    expect(applyParameters(tree, parameters)).toEqual({
      a: {
        b: undefined,
        c: undefined,
        d: {
          e: undefined,
          f: undefined,
        },
      },
    })
    expect(tree.a.b).toHaveBeenCalledWith(`b`)
    expect(tree.a.c).toHaveBeenCalledWith(undefined)
    expect(tree.a.d.e).toHaveBeenCalledWith(undefined)
    expect(tree.a.d.f).toHaveBeenCalledWith(`f`)
  })
})
