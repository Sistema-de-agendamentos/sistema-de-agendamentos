function phone(value) {
  if (typeof value !== "string") return "";
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, "($1) $2 $3-$4");
}

function cpf(value) {
  if (typeof value !== "string") return "";
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
}

function date(value) {
  if (typeof value !== "string") return "";
  const cleanValue = value.replace(/\D/g, "").slice(0, 8);
  return cleanValue.replace(/(\d{4})(\d{2})(\d{2})/g, "$3/$2/$1");
}

export { cpf, date, phone };
