module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@/utils": "./src/utils",
            "@/pages": "./src/pages",
            "@/navigator": "./src/navigator",
            "@/models": "./src/models",
            "@/config": "./src/config",
            "@/components": "./src/components",
            "@/assets": "./src/assets",
          },
        },
      ],
    ],
  };
};
