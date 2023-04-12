module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        corejs: '3.24.1',
        spec: true,
        targets: {
          esmodules: true
        },
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true, version: '2018-09' }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    // '@babel/plugin-proposal-class-static-block',
    // ['@babel/plugin-proposal-class-properties', { 'setPublicClassFields': true }],
    '@babel/plugin-proposal-private-methods',
    ['transform-remove-console', { include: [''], exclude: ['*', 'info', 'log', 'dir', 'warn', 'error'] }]
  ]
}
