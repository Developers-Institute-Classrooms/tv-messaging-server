module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // fixes regenerator polyfill requirement
          // https://github.com/babel/babel/issues/9849#issuecomment-592668815
          esmodules: true, 
        },
      },
    ],
  ],
}
