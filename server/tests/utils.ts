export const makeRandomString = (length: number) => {
  return Math.random().toString(36).substring(length);
};