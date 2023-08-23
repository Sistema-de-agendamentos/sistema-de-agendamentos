function phone(value) {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, "($1) $2 $3-$4");
}

function date(value) {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/(\d{4})(\d{2})(\d{2})/g, "$3/$2/$1");
}

export { date, phone };
