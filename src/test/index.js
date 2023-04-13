import Enum from '../index.js'

{
  const myEnum = new Enum([1, 2, 3, '1', 'a', 'b'], 3)

  test('myEnum 的 value 应为 3', () => {
    expect(myEnum.value).toBe(3)
  })

  test('myEnum 的 value 应为 b', () => {
    myEnum.value = 'b'
    expect(myEnum.value).toBe('b')
  })

  test('myEnum 的 value 不能为 4', () => {
    expect(() => {
      myEnum.value = 4
    }).toThrow(TypeError)
  })

  test('myEnum 的 0 属性 应为 1', () => {
    expect(myEnum[0]).toBe(1)
  })

  test('myEnum 的 2 属性 应为 存在', () => {
    expect(myEnum.hasOwnProperty(2)).toBe(true)
  })

  test('myEnum 的 value 属性 应为 存在', () => {
    expect(myEnum.hasOwnProperty('value')).toBe(true)
  })
}

{
  const myEnum = new Enum({ a: 1, b: 2, c: 'a', value: 0 }, 'a')

  test('myEnum 的 value 属性 应为 a', () => {
    expect(myEnum.value).toBe('a')
  })

  test('myEnum 的 value 应为 1', () => {
    myEnum.value = 1

    expect(myEnum.value).toBe(1)
  })

  test('myEnum 的 value 不能为 b', () => {
    expect(() => {
      myEnum.value = 'b'
    }).toThrow(TypeError)
  })

  test('myEnum 的 c 属性 应为 a', () => {
    expect(myEnum.c).toBe('a')
  })

  test('myEnum 的 原始 value 属性 应为 0', () => {
    expect(myEnum.__enum__.value).toBe(0)
  })
}

{
  const myEnum = new Enum([1, 2, 3])

  test('myEnum 的 value 属性 应为 1', () => {
    expect(myEnum.value).toBe(1)
  })
}

{
  const myEnum = new Enum({ a: 'a', b: 2, c: 3 })

  test('myEnum 的 value 属性 应为 a', () => {
    expect(myEnum.value).toBe('a')
  })
}

test('myEnum 的 枚举范围不能为空集', () => {
  expect(() => {
    new Enum({})
  }).toThrow(RangeError)
  expect(() => {
    new Enum([])
  }).toThrow(RangeError)
})

test('myEnum 的 枚举范围参数不能为非对象类型', () => {
  expect(() => {
    new Enum(1)
  }).toThrow(TypeError)
  expect(() => {
    new Enum('[]')
  }).toThrow(TypeError)
})

test('myEnum 默认为不可拓展', () => {
  const myEnum = new Enum({ a: 'a', b: 2, c: 3 })

  expect(() => {
    myEnum.d = 'd'
  }).toThrow(TypeError)
  expect(() => {
    myEnum.__enum__.a = '1'
  }).toThrow(TypeError)
})

test('myEnum 可以设置为可拓展', () => {
  const myEnum = new Enum({ a: 'a', b: 2, c: 3 }, undefined, { extensible: true })

  expect(Object.isExtensible(myEnum)).toBe(true)
  expect(myEnum.value).toBe('a')
  myEnum.d = 'd'
  expect(myEnum.d).toBe('d')
  myEnum.__enum__.a = '1'
  expect(myEnum.a).toBe('1')
  myEnum.value = myEnum.a
  expect(myEnum.value).toBe('1')
  myEnum.b = 'b'
  expect(myEnum.b).toBe('b')
  myEnum.value = myEnum.b
  expect(myEnum.value).toBe('b')
})
