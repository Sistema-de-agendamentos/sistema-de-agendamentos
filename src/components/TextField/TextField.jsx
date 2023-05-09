import { useCallback, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField as TextFieldMaterialUI } from "@mui/material";

function TextField({ name, label, type = "text", ...props }) {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const errorMessage = useMemo(() => errors[name]?.message, [errors, name]);

  const clearError = useCallback(() => clearErrors(name), [clearErrors, name]);

  const style = useMemo(() => {
    return { marginBottom: errorMessage ? "-0.5rem" : "0.9375rem" };
  }, [errorMessage]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextFieldMaterialUI
          label={label}
          type={type}
          error={!!errorMessage}
          helperText={errorMessage}
          onFocus={clearError}
          margin="normal"
          variant="outlined"
          fullWidth
          style={style}
          {...field}
          {...props}
        />
      )}
    />
  );
}

export default TextField;
