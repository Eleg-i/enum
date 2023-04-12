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
  const myEnum2 = new Enum({ a: 1, b: 2, c: 'a', value: 0 }, 'a')

  test('myEnum2 的 value 属性 应为 a', () => {
    expect(myEnum2.value).toBe('a')
  })

  test('myEnum2 的 value 应为 1', () => {
    myEnum2.value = 1

    expect(myEnum2.value).toBe(1)
  })

  test('myEnum2 的 value 不能为 b', () => {
    expect(() => {
      myEnum2.value = 'b'
    }).toThrow(TypeError)
  })

  test('myEnum2 的 c 属性 应为 a', () => {
    expect(myEnum2.c).toBe('a')
  })

  test('myEnum2 的 原始 value 属性 应为 0', () => {
    expect(myEnum2.__enum__.value).toBe(0)
  })
}
