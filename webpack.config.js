const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = (env, argv) => {
  const devMode = argv.mode === "development";

  return {
    entry: {
      "app": [
        "@ungap/custom-elements",
        "proxy-polyfill/proxy.min.js",
        "./src/index.js"
      ]
    },
    devtool: devMode ? "source-map" : undefined,
    target: "es5",
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
        {
          test: /\.(ts|js)x?$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },

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
      new HtmlWebpackPlugin({
        title: "Not Among Us",
        // Load a custom template (lodash by default)
        template: "./src/index.html",
        favicon: "./src/favicon.ico",
      }),
      new WebpackNotifierPlugin(),
      !devMode && new MiniCssExtractPlugin({
        filename: "build.css",
      }),
    ].filter(Boolean)
  };
};
