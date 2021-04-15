module.exports = {
  future: {
    webpack5: true,
  },
  // basePath: "/preprosql",
  // assetPrefix: "/preprosql/",
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
