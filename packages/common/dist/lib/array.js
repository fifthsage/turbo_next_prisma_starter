export function add(target, value) {
    return [...target, value];
}
export function remove(target, value, propertyName) {
    return target.filter((item) => {
        if (propertyName) {
            return item[propertyName] !== value;
        }
        return item !== value;
    });
}
