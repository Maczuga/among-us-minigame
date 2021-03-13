export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const strToBool = (str) => {
  if (str === true)
    return true;

  if (str === false)
    return false;

  return str === "true";
};
