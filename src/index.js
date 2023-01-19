export const defaultsTo = Symbol('default')

export const callable = input => {
  class ProxyFunction extends Function {
    toString() {
      return input.toString()
    }
    toJSON() {
      return input
    }
  }
  const fn = new ProxyFunction()
  let outputProxy = undefined

  const fnHandler = {
    apply: (target, thisArg, argumentsList) => {
      if (argumentsList.length === 0) {
        return input
      }
      const [argument] = argumentsList

      if (typeof argument.reduce == 'function') {
        return argument.reduce(
          (obj, prop) => Reflect.get(obj, prop, input),
          outputProxy
        )
      } else {
        return Reflect.get(outputProxy, argument, input)
      }
    },
    construct: (target, args) => Reflect.construct(input, args),
    defineProperty: (target, key, descriptor) =>
      Reflect.defineProperty(input, key, descriptor),
    get: (target, prop, receiver) => {
      const protoProps = ['toString', 'toJSON']

      if (protoProps.includes(prop)) {
        return Reflect.get(target, prop, receiver)
      }

      if (!input[prop] && input[defaultsTo]) {
        return input[defaultsTo]
      }

      return Reflect.get(input, prop, input)
    },
    getOwnPropertyDescriptor: (target, prop) =>
      Reflect.getOwnPropertyDescriptor(input, prop) ??
      Reflect.getOwnPropertyDescriptor(target, prop),
    getPrototypeOf: () => Reflect.getPrototypeOf(input),
    has: (target, key) => Reflect.has(input, key),
    isExtensible: () => Reflect.isExtensible(input),
    ownKeys: target => [...Reflect.ownKeys(target), ...Reflect.ownKeys(input)],
    preventExtensions: () => Reflect.preventExtensions(input),
    set: (obj, prop, value) => Reflect.set(input, prop, value),
    setPrototypeOf: (target, proto) => Reflect.setPrototypeOf(input, proto),
  }

  outputProxy = new Proxy(fn, fnHandler)
  return outputProxy
}
