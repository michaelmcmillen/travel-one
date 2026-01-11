// Common config to use across frontend JS

// Capitalise the first letter of each word in the string provided
export const capitalise = (str) => {
  const strArr = str.split(" ");
  const capitalisedArr = strArr.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalisedArr.join(" ");
};

export const createElement = (elType, className, id = "") => {
  return Object.assign(document.createElement(elType), {
    className: className,
    id: id,
  });
};
