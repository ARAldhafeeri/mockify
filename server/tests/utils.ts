export const makeRandomString = (length: number) => {
  return Math.random().toString(36).substring(length);
};

export const generateDataBasedOnType = (type : string) => {
  switch(type) {
    case "string":
      return "a";
    case "number":
      return 1;
    case "boolean":
      return true;
    case "date":
      return new Date();
    case "array":
      return ["a"];
    case "object":
      return {a: "a"};
    default:
      return "a";
  }
}