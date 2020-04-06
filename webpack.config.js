const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackDeployPlugin = require("html-webpack-deploy-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");

require("dotenv").config();

const external = require("./external");
const manifest = require("./public/manifest.json");

if (!process.env.NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified.",
  );
}

let config = {
  mode: process.env.NODE_ENV,
  entry: "./src/popup.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: "eslint-loader",
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!.gitkeep"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin({}),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "defer",
    }),
    new HtmlWebpackDeployPlugin({
      packages: external,
      addPackagesPath: (packagePath) => path.join("external", packagePath),
    }),
    new CopyPlugin([{ from: "public", to: "" }]),
    new FriendlyErrorsWebpackPlugin({}),
    new ZipPlugin({
      filename: `${manifest.name}-v${manifest.version}.zip`,
    }),
  ],
  optimization: {
    runtimeChunk: "single",
  },
};

if (process.env.NODE_ENV !== "production") {
  config = {
    ...config,
    devtool: "cheap-source-map",
    devServer: {
      host: "0.0.0.0",
      port: 3000,
      // Ref: https://github.com/geowarin/friendly-errors-webpack-plugin#turn-off-errors
      quiet: true,
    },
  };
}

module.exports = config;
