const isMissingSomething = (object, exclude = []) => {
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (!exclude.includes(key) && (element === "" || element === null)) {
        console.log(key);
        alert("برجاء ملئ جميع البيانات");
        return true;
      }
    }
  }
  return false;
};
export default isMissingSomething;
