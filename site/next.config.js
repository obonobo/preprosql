module.exports = {
  future: {
    webpack5: true,
  },
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
