function generateQueryString(values) {
  const generatedQueryString = Object.entries(values).reduce(
    (acc, [key, value], index) => {
      if (!value) return acc;

      let queryString;
      let newValue = value;

      if (typeof value === "boolean") newValue = value ? 1 : 0;

      if (index) queryString = `${acc}&${key}=${newValue}`;
      else queryString = `?${key}=${newValue}`;

      return queryString;
    },
    ""
  );

  return generatedQueryString === "?" ? "" : generatedQueryString;
}

export default generateQueryString;
