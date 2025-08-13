export function add<T = string>(target: T[], value: T) {
  return [...target, value];
}

export function remove<T = string>(
  target: T[],
  value: T,
  propertyName?: keyof T,
) {
  return target.filter((item) => {
    if (propertyName) {
      return item[propertyName] !== value;
    }

    return item !== value;
  });
}
