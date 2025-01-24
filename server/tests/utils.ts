export const makeRandomString = (
  length: number = 8,
  min: number = 5,
  max: number = 12
) => {
  const clampedLength = Math.max(min, Math.min(length, max)); // Ensure length is between min and max
  return Math.random()
    .toString(36)
    .substring(2, 2 + clampedLength);
};

export const generateDataBasedOnType = (type: string) => {
  switch (type) {
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
      return { a: "a" };
    default:
      return "a";
  }
};
