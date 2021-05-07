const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const deps = require("../package.json").dependencies;
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
 
module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "core_ui",
      library: { type: "var", name: "core_ui" },
      remotes: {
        app1: "app1",
        app2: "app2"
      },
      shared: {
        ...deps,
        react: {
          eager: true,
        },
        "react-dom": {
          eager: true,
          import: "react-dom", // the "react" package will be used a provided and fallback module
          shareKey: "react-dom", // under this name the shared module will be placed in the share scope
          shareScope: "legacy", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Hello Webpack bundled JavaScript Project',
      template: path.resolve(__dirname, '..', './src/index.html'),
      app1RemoteEntry: getRemoteEntryUrl(3001),
      app2RemoteEntry: getRemoteEntryUrl(3002),
    })
  ],
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, '..', './dist'),
    hot: true,
  },
};

function getRemoteEntryUrl(port) {
  const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env;

  // Check if the example is running on codesandbox
  // https://codesandbox.io/docs/environment
  if (!CODESANDBOX_SSE) {
    return `//localhost:${port}/remoteEntry.js`;
  }

  const parts = HOSTNAME.split('-')
  const codesandboxId = parts[parts.length - 1]

  return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}