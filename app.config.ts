import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "hello-world",
  slug: "hello-world",
  extra: {
    apiUrl: process.env.API_URL,
    mode: process.env.MODE,
  },
});
