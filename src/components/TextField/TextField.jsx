import { useCallback, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField as TextFieldMaterialUI } from "@mui/material";

function TextField({ name, label, type = "text", disabled, mask, ...props }) {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;

  const clearError = useCallback(() => clearErrors(name), [clearErrors, name]);

  const style = useMemo(() => {
    return { marginBottom: errorMessage ? "-0.5rem" : "0.9375rem" };
  }, [errorMessage]);

  const maxLength = { cpf: 14, cell: 16, phone: 14 };
  const maxLengthWithoutMask = { cpf: 11, cell: 11, phone: 10 };

  const format = (value) => {
    const cleanValue = value.replace(/\D/g, "");

    const formattedValue = {
      cpf: cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      cell: cleanValue.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        "($1) $2 $3-$4"
      ),
      phone: cleanValue.replace(
        /(\d{2})(\d{4})(\d{4})/,
        "($1) $2-$3"
      ),
    };

    return value.length < maxLengthWithoutMask[mask] ? cleanValue : formattedValue[mask] || value;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextFieldMaterialUI
          label={label}
          type={type}
          disabled={disabled}
          error={!!errorMessage}
          helperText={errorMessage}
          onFocus={clearError}
          inputProps={{ maxLength: maxLength[mask] || 255 }}
          margin="normal"
          variant="outlined"
          fullWidth
          style={style}
          {...field}
          {...props}
          value={format(field.value)}
        />
      )}
    />
  );
}

export default TextField;
