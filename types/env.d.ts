declare module "react-native-dotenv" {
  export const API_URL: string;
}

declare module "dva-model-extend" {
  import { Model } from "dva-core-ts";
  export default function modelExtend(...model: Model[]): Model;
}
