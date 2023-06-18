# Make your data callable with _callable-data_

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

## Why?

Maps (objects) can be viewed as a pure function, in the sense, that specific values produce specific outcomes.

Wouldn't it be nice, if one could use this datastructure to model logical relations in a given domain? And wouldn't it then be nice, if we would not need to distinguish on the caller-side between a 'dynamic' function and a 'function' which is defined through a 'callable' object?

`callable-data` provides the function `callable`, which turns an object into something that can be called. Under the hood this happens by utilising proxy-magic (check the source-code it's only about **60 LOC**)

## Usage

```js
import { callable, defaultsTo } from 'callable-data'

const beats = callable({
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock',
})

// use object as function
const choicesToGameOutcome = ([a, b]) => {
  if (a === b) return 'draw'

  return beats(a) === b ? 'win' : 'lose'
}

// use conveniently with map function
const choices = ['rock', 'rock', 'paper']
const losesToThoseChoices = choices.map(beats)
// callable objects can still be used with []
const mapWithNativeSyntax = choices.map(choice => beats[choice])

// save on foo[bar] ?? 'defaultValue'
const questionToAnswer = callable({ foo: 'bar', [defaultsTo]: 42 })
questionToAnswer('foo') // -> 'bar'
questionToAnswer('buuz') // -> 42
questionToAnswer['bibuba'] // -> 42

// use to traverse nested objects
const user = callable({
  address: {
    street: 'someStreet',
  },
})
user(['address', 'street']) // -> 'someStreet'
```

## Prerequisites

Proxies are used for the magic. Be sure that your environment understands them.

## Caveats

console.log uses an object representation, which cannot be hooked into.

```js
const questionToAnswer = callable({ foo: 'bar', [defaultsTo]: 42 })
console.log(questionToAnswer)
// logs: [Function: anonymous] ProxyFunction

// fix: just call the callable object
console.log(questionToAnswer())
// logs: { foo: 'bar', [Symbol(default)]: 42 }
```

`typeof` changes from `object` to `function`

```js
typeof {} // object
typeof callable({}) // function
```

## Install

```sh
npm i callable-data
```

## Run tests

```sh
npm test
```

## Author

👤 **Tim Kutscha**

- Github: [@tiku91](https://github.com/tiku91)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Tim Kutscha](https://github.com/tiku91).

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
