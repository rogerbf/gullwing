![gullwing logo](gullwing.svg?sanitize=true)

## usage

```javascript
import { compile } from "gullwing"

const source = {
  _metadata: {
    locale: `en`,
  },
  things: {
    _message: `Things: {{ total }}`,
  },
}

const messages = compile(source)

console.log(messages.things({ total: 3 }))
// Things: 3
```

### using transformers

```javascript
import { compile } from "gullwing"

const source = {
  _configuration: {
    join: `, `,
  },
  fruits: {
    _message: `{{ types | property(prop) }} types of fruit: {{ types | join }}.`,
    _variables: {
      prop: `length`,
    },
  },
}

const property = () => propertyName => value => value[propertyName]

const join = defaultSeparator => (separator = defaultSeparator) => list =>
  list.join(separator)

const messages = compile(source, { join, property })

console.log(messages.fruits({ types: [`Apple`, `Pear`, `Mango`] }))
// 3 types of fruit: Apple, Pear, Mango.
```

## api

### `compile(source[, transformers])`

- `source` \<Object\>
- `transformers` \<Object\>

### `call(messages, parameters)`

- `messages` \<Object\>
- `parameters` \<Object\>

## transformer

`([ configuration ]) => ([, variables ]) => ([ value ]) => {}`
