export const isDate = (value: unknown) => {
  return isObject(value) && (value instanceof Date || Object.prototype.toString.call(value) === "[object Date]");
}

export const isObject = (value: unknown) => {
  return typeof value == "object" && value !== null;
}
