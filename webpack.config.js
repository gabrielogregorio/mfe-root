const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");

const pluginMovePublicFolderToDist = () => {
  return new CopyPlugin({
    patterns: [{ from: "public", to: "./" }],
  });
};

const ruleProcessTailwindStyles = {
  test: /\.css$/i,
  use: [
    require.resolve("style-loader", {
      paths: [require.resolve("webpack-config-single-spa")],
    }),
    require.resolve("css-loader", {
      paths: [require.resolve("webpack-config-single-spa")],
    }),
    "postcss-loader",
  ],
};

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "mfe";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    output: {
      publicPath:
        process.env.NODE_ENV === "production" ? packageJson.homepage : "/",
    },
    plugins: [
      pluginMovePublicFolderToDist(),

      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          APP_ENV: process.env.NODE_ENV,
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],

    module: {
      rules: [ruleProcessTailwindStyles],
    },
  });
};
