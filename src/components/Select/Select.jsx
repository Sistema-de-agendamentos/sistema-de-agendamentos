import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select as SelectMaterialUI,
  FormControl,
  InputLabel,
} from "@mui/material";

function Select({
  name,
  label,
  fullWidth = true,
  children,
  margin = "normal",
  size = "medium",
  ...props
}) {
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
        <FormControl fullWidth={fullWidth} margin={margin} size={size}>
          <InputLabel
            style={{
              position: "absolute",
              top: margin !== "none" && "1rem",
              left: "-.25rem",
              padding: "0 0.25rem",
            }}
          >
            {label}
          </InputLabel>

          <SelectMaterialUI
            label={label}
            error={!!errorMessage}
            helperText={errorMessage}
            onFocus={clearError}
            margin={margin}
            size={size}
            variant="outlined"
            style={{ margin: margin !== "none" && "1rem 0 0.5rem 0" }}
            {...field}
            {...props}
          >
            {children}
          </SelectMaterialUI>
        </FormControl>
      )}
    />
  );
}

export default Select;
