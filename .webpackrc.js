const path = require('path');

module.exports = {
  "entry": "src/index.js",
  "env" : {
      "development":{
          "extraBabelPlugins":[
              "dva-hmr"
          ]
      },
      "production": {
          "extraBabelPlugins": [

          ]
      }
  },
  alias: {
    '@':path.resolve('src')
  },
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": "css" }, "antd-mobile-import"]
  ]


}
