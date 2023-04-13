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
  constructor(enumValues, defaultVaule, { extensible } = { extensible: false }) {
    if (typeof enumValues !== 'object')
      throw new TypeError(
        '类构造器不接受非对象类型作为第一参数！The class constructor does not accept a non-object type as the first argument！'
      )

    const that = this,
          values = Object.values(enumValues),
          innerEnumValues = extensible ? values : Object.freeze(values),
          innerDefaultVaule = defaultVaule ?? innerEnumValues[0],
          enumProxyConfig = {
            set(target, prop, value) {
              target[prop] = value
              that.__values__ = Object.values(target)

              return true
            }
          },
          innerEnum = extensible ? new Proxy({ ...enumValues }, enumProxyConfig) : Object.freeze({ ...enumValues }),
          config = {},
          typeError = new TypeError('不能写入枚举范围之外的值！Cannot write values outside the enum range!')

    if (!innerEnumValues.length) throw new RangeError('枚举范围不可为空集！Enumeration ranges cannot be empty sets！')

    if (!innerEnumValues.includes(innerDefaultVaule)) throw typeError

    for (const key in enumValues) {
      if (extensible)
        config[key] = {
          get() {
            return that.__enum__[key]
          },
          set(val) {
            that.__enum__[key] = val
            that.__values__ = Object.values(that.__enum__)
          },
          enumerable: false,
          configurable: extensible
        }
      else
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
        configurable: extensible
      },
      __values__: {
        value: innerEnumValues,
        writable: extensible,
        enumerable: false,
        configurable: extensible
      },
      __value__: {
        value: innerDefaultVaule,
        writable: true,
        enumerable: false,
        configurable: extensible
      },
      __enum__: {
        value: innerEnum,
        writable: extensible,
        enumerable: false,
        configurable: extensible
      }
    })

    extensible || Object.seal(this)
  }
}
