module.exports = {
  future: {
    webpack5: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/preprosql" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/preprosql/" : "/",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "video",
          },
        },
      ],
    });
    return config;
  },
};
