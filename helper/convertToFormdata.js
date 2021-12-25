const convertToFormdata = (obj) => {
  const formdata = new FormData();
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      formdata.append(key, element);
    }
  }
  return formdata;
};
export default convertToFormdata;
