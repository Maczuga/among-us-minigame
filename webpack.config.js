const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = (env, argv) => {
  const devMode = argv.mode === "development";

  const devEntries = devMode ? [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
  ] : [];

  return {
    entry: {
      "app": [
        ...devEntries,
        "./src/index.js"
      ]
    },
    target: "web",
    resolve: {
      extensions: [".js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },

    devServer: {
      // publicPath: "/dist/",
      // contentBase: path.join(__dirname),
      disableHostCheck: true,
      hot: true
    },

    module: {
      rules: [
        // {
        //   test: /\.(ts|js)x?$/,
        //   use: ["babel-loader"],
        //   exclude: /node_modules/,
        // },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Creates `style` nodes from JS strings
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Auto-prefixing and more
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    "autoprefixer",
                  ]
                }
              }
            },
            "sass-loader",
          ],
        },

      ]
    },

    plugins: [
      new HtmlWebpackPlugin(),
      new WebpackNotifierPlugin(),
      devMode && new webpack.HotModuleReplacementPlugin(),
      !devMode && new MiniCssExtractPlugin({
        filename: "[name]/build.css",
      }),
    ].filter(Boolean)
  };
};
