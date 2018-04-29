# gullwing

```javascript
import gullwing from "gullwing"
import cardinal from "gullwing-transform-cardinals"

gullwing({
  template: `You have {{ additional | cardinal }} (total: {{ total | cardinal }}).`,
  options: {
    cardinal: {
      additional: {
        one: `one new message`,
        other: `{{ additional }} new messages`,
      },
      total: {
        one: `{{ total }} message`,
        other: `{{ total }} messages`,
      },
      rules: {
        "pluralRule-count-one": `i = 1 and v = 0 @integer 1`,
        "pluralRule-count-other":
          ` @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, … @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …`,
      },
    },
  },
  transformers: { cardinal },
})({
  total: 41,
  additional: 1,
})

// You have one new message (total: 41 messages).
```