import { callable, defaultsTo } from '../src/index.js'

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'

const WIN = 'win'
const LOSE = 'lose'
const DRAW = 'draw'

const rpsChoicesToOutcomeNative = {
  [ROCK]: {
    [ROCK]: DRAW,
    [PAPER]: LOSE,
    [SCISSORS]: WIN,
  },
  [PAPER]: {
    [ROCK]: WIN,
    [PAPER]: DRAW,
    [SCISSORS]: LOSE,
  },
  [SCISSORS]: {
    [ROCK]: LOSE,
    [PAPER]: WIN,
    [SCISSORS]: DRAW,
  },
}

const rpsChoicesToOutcomeCallable = callable(rpsChoicesToOutcomeNative)

describe('Make an object callable', () => {
  test('stringify should still be the same', () => {
    expect(JSON.stringify(rpsChoicesToOutcomeNative)).toEqual(
      JSON.stringify(rpsChoicesToOutcomeCallable)
    )
  })

  test('toString should still be the same', () => {
    expect(rpsChoicesToOutcomeNative.toString()).toEqual(
      rpsChoicesToOutcomeCallable.toString()
    )
  })

  test('Object.values should still be the same', () => {
    expect(Object.values(rpsChoicesToOutcomeNative)).toEqual(
      Object.values(rpsChoicesToOutcomeCallable)
    )
  })

  test('Object.keys should still be the same', () => {
    expect(Object.keys(rpsChoicesToOutcomeNative)).toEqual(
      Object.keys(rpsChoicesToOutcomeCallable)
    )
  })

  test('calling is the same as get', () => {
    expect(rpsChoicesToOutcomeNative[ROCK]).toEqual(
      rpsChoicesToOutcomeCallable(ROCK)
    )
  })

  test('callable Object can still be accessed through []', () => {
    expect(rpsChoicesToOutcomeNative[ROCK]).toEqual(
      rpsChoicesToOutcomeCallable[ROCK]
    )
  })

  test('calling with multiple args traverses the obj further', () => {
    expect(rpsChoicesToOutcomeNative[ROCK][PAPER]).toEqual(
      rpsChoicesToOutcomeCallable([ROCK, PAPER])
    )
  })

  test('calling with zero args returns obj', () => {
    expect(rpsChoicesToOutcomeNative).toEqual(rpsChoicesToOutcomeCallable())
  })
})

const questionToAnswer = callable({ foo: 'bar', [defaultsTo]: 42 })
const questionToAnswerFalsyDefault = callable({ foo: 'bar', [defaultsTo]: '' })
const questionToMaybeAnswer = callable({ foo: 'bar' })

describe('A callable object can have a default value', () => {
  test('default value does not influence existing values', () => {
    expect(questionToAnswer('foo')).toEqual('bar')
  })

  test('default value is returned, when property does not exist', () => {
    expect(questionToAnswer('something')).toEqual(42)
  })

  test('default value is returned, when default value is falsy', () => {
    expect(questionToAnswerFalsyDefault('something')).toEqual('')
  })

  test('no default value is returned when none is defined', () => {
    expect(questionToMaybeAnswer('something')).toEqual(undefined)
  })
})
