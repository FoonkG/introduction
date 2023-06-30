// next.config.js

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|jp2|webp)$/,
      loader: "file-loader",
      options: {
        name: "images/[name].[ext]",
      },
    });

    return config;
  },
};
