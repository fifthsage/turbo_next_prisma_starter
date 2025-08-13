function findByValue(value, database) {
    return database.find((item) => item.value === value);
}
export { findByValue };
