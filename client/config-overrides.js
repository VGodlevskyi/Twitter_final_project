const { override, addLessLoader } = require("customize-cra")

module.exports = (config, env) => {
  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "@svgr/webpack",
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  })

  return override(

  )(config, env)
}
