/**
 * 一个枚举类型的构造器，允许从已知的枚举对象创建一个只允许从枚举范围中取值的对象。
 * @class 枚举类型
 */
export default class Enumeration {
  /**
   * 构造器
   * @param {Array|Enum|Object} enumValues 枚举范围，支持数组, 对象和TS的 enum 类型
   * @param {Any} defaultVaule
   */
  constructor(enumValues, defaultVaule) {
    if (typeof enumValues !== 'object')
      throw new TypeError(
        '类构造器不接受非对象类型作为第一参数！The class constructor does not accept a non-object type as the first argument！'
      )

    const innerEnumValues = Object.freeze(Object.values(enumValues)),
          innerDefaultVaule = defaultVaule ?? innerEnumValues[0],
          innerEnum = Object.freeze({ ...enumValues }),
          config = {},
          typeError = new TypeError('不能写入枚举范围之外的值！Cannot write values outside the enum range!')

    if (!innerEnumValues.length) throw new RangeError('枚举范围不可为空集！Enumeration ranges cannot be empty sets！')

    if (!innerEnumValues.includes(innerDefaultVaule)) throw typeError

    for (const key in enumValues) {
      config[key] = {
        value: enumValues[key],
        writable: false,
        enumerable: false,
        configurable: false
      }
    }

    Object.defineProperties(this, {
      ...config,
      value: {
        get() {
          return this.__value__
        },
        set(val) {
          if (this.__values__.includes(val)) this.__value__ = val
          else throw typeError
        },
        enumerable: true,
        configurable: false
      },
      __values__: {
        value: innerEnumValues,
        writable: false,
        enumerable: false,
        configurable: false
      },
      __value__: {
        value: innerDefaultVaule,
        writable: true,
        enumerable: false,
        configurable: false
      },
      __enum__: {
        value: innerEnum,
        writable: false,
        enumerable: false,
        configurable: false
      }
    })

    Object.seal(this)
  }
}
