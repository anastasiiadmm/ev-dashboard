module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties'],
    ['@babel/plugin-proposal-class-properties'],
  ],
  assumptions: {
    setPublicClassFields: true,
    privateFieldsAsSymbols: true,
  },
};
