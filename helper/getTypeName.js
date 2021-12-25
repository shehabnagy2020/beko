import { CATEGORIES_TYPES } from "./CONST";

const getTypeName = (type) => {
  let [t] = CATEGORIES_TYPES.filter((i) => i.value == type);
  return t ? t.name : "";
};
export default getTypeName;
