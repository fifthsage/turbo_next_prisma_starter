import { JsonDatabaseItem } from "../../types";

function findByValue<T = string>(
  value: string,
  database: JsonDatabaseItem<T>[],
) {
  return database.find((item) => item.value === value);
}

export { findByValue };
