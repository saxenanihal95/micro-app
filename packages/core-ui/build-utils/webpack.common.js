const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const deps = require("../package.json").dependencies;
 
module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "core_ui",
      library: { type: "var", name: "core_ui" },
      remotes: {
        pcs_admin: "pcs_admin",
        pcs_user: "pcs_user"
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
      pcsUserRemoteEntry: getRemoteEntryUrl(3001),
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