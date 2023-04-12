export default {
  cacheDirectory: './temp/jestCache',
  reporters: [['default', { silent: false }]],
  testRegex: ['(/(__)?tests?(__)?/.*|(\\.|/)(test|spec))\\.[jt]sx?$'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  }
}
