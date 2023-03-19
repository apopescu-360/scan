const path = require("path")
const fs = require("fs")

const manifestDeclaration = {
  name: "scan",
  background_color: "#90A4AE",
  description: "Scan with camera",
  theme_color: "#263238",
  msTileColor: "#603cba",
  display: "standalone",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "default"
}

module.exports = {
  publicPath: "/scan2/",
  chainWebpack: config => {
    const svgRule = config.module.rule("svg")
    svgRule.uses.clear()
    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      importWorkboxFrom: "local",
      exclude: [/\.map$/, /web.config/]
    },
    manifestOptions: manifestDeclaration,
    ...manifestDeclaration
  },
  devServer: process.env.NODE_ENV === "development" ? {
    host: "localhost",
    port: 80
  } : undefined
}
