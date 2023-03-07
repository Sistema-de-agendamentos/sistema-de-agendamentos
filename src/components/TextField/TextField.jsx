import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField as TextFieldMaterialUI } from "@mui/material";

const TextField = ({ name, label, type = "text", ...props }) => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  const clearError = useCallback(() => clearErrors(name), [clearErrors, name]);

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
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default TextField;
