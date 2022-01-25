import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage, { LoadParams } from "react-native-storage";

const storage = new Storage({
  size: 1000, // max capacity,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7, //expired date,
  enableCache: true,
  sync: {},
});

const load = (params: LoadParams) => {
  return storage.load(params);
};

export { load };
export default storage;
