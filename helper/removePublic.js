const removePublic = (path) => {
  path = path.replace("public", "");
  return path;
};
export default removePublic;
