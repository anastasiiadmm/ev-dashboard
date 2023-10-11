module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ],
  "assumptions": {
    "setPublicClassFields": false
  }
};
