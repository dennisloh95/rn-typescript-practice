module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
          path: ".env",
        },
      ],
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
