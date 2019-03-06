const path = require("path");

const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
    plugins: [
        new WasmPackPlugin({
          crateDirectory: path.resolve(__dirname, "crate"),
          // WasmPackPlugin defaults to compiling in "dev" profile. To change that, use forceMode: 'release':
          // forceMode: 'release'
        }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".wasm"]
      },
  };