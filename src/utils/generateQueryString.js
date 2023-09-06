function generateQueryString(values) {
  return Object.entries(values)
    .reduce((acc, [key, value]) => {
      if (!value) return acc;

      let newValue = value;
      if (typeof value === "boolean") newValue = value ? 1 : 0;

      return `${acc}&${key}=${newValue}`;
    }, "")
    .replace(/&/, "?");
}

export default generateQueryString;
