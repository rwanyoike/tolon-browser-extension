const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const HtmlWebpackDeployPlugin = require("html-webpack-deploy-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const external = require("./external");

if (!process.env.NODE_ENV) {
  // eslint-disable-next-line no-console
  console.error("NODE_ENV environment variable has not been set.");
  process.exit(1);
}

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    popup: "./src/popup.jsx",
  },
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
      filename: "static/css/[name]-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HtmlWebpackDeployPlugin({
      packages: external,
    }),
    new HtmlBeautifyPlugin({
      config: {
        indent_size: 2,
        html: {
          indent_inner_html: false,
        },
      },
    }),
    new CopyPlugin([{ from: "public", to: "" }]),
    new FriendlyErrorsWebpackPlugin({}),
  ],
  optimization: {
    runtimeChunk: "single",
  },
};

module.exports = config;

if (process.env.NODE_ENV === "development") {
  module.exports = {
    ...config,
    devtool: "cheap-source-map",
    // Ref: https://github.com/geowarin/friendly-errors-webpack-plugin#turn-off-errors
    devServer: {
      quiet: true,
    },
  };
}
