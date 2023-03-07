import { useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select as SelectMaterialUI,
  FormControl,
  InputLabel,
} from "@mui/material";

const Select = ({
  name,
  label,
  fullWidth = true,
  children,
  margin = "normal",
  ...props
}) => {
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
        <FormControl fullWidth={fullWidth}>
          <InputLabel
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "#fff",
              display: "block",
              zIndex: 1300,
              padding: "0 0.5rem",
            }}
          >
            {label}
          </InputLabel>

          <SelectMaterialUI
            error={!!errorMessage}
            helperText={errorMessage}
            onFocus={clearError}
            margin="normal"
            variant="outlined"
            style={{ margin: "1rem 0 0.5rem 0" }}
            {...field}
            {...props}
          >
            {children}
          </SelectMaterialUI>
        </FormControl>
      )}
    />
  );
};

export default Select;
