# ![gullwing logo](gullwing.svg?sanitize=true)

## `message(string, [transformers], [variables])`

The core of the library is the `message` function:

```javascript
import { message } from "gullwing"

const template =
  "A message: {{ value | invokeStringMethod(method) | addExclamations(exclamationCount) }}"

const transformers = {
  invokeStringMethod: (method) => (value) =>
    String.prototype[method].call(value),
  addExclamations: (count) => (value) =>
    value.concat(Array(count).fill("!").join("")),
}

const variables = { method: "toUpperCase", exclamationCount: 3 }

const getMessage = message(template, transformers, variables)

console.log(getMessage({ value: "loud voices" }))
// "A message: LOUD VOICES!!!"
```

### Using transformers with `message`

`([, variables ]) => ([ value ]) => {}`

## `compile(source, [transformers])`

```javascript
import { compile } from "gullwing"

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

console.log(messages.fruits({ types: ["Apple", "Pear", "Mango"] }))
// 3 types of fruit: Apple, Pear, Mango.
```

### Using transformers with `compile`

`([ configuration ]) => ([, variables ]) => ([ value ]) => {}`

## `call(messages, [parameters])`

```javascript
import { call, compile } from "gullwing"

const source = {
  captain: { _m: "At the helm: {{ name }}" },
  game: {
    score: {
      _m: "Current score is {{ count }}",
    },
    referee: {
      _m: "Referee is {{ name }}",
    },
  },
}

const messages = compile(source)

console.log(
  call(messages, {
    captain: { name: "Kathryn" },
    game: { score: { count: 5 }, referee: { name: "Tuvok" } },
  })
)
// {
//   captain: 'At the helm: Kathryn',
//   game: { score: 'Current score is 5', referee: 'Referee is Tuvok' }
// }
```
