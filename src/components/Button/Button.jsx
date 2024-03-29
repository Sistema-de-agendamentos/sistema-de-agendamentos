import { useRef } from "react";
import { Button as ButtonMaterialUI, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const restStyles = {
  margin: "1rem 0 0.5rem",
  fontWeight: "bold",
};

function Button({
  children,
  type = "button",
  onClick = () => {},
  disabled = false,
  isLoading = false,
  size = "large",
  fullWidth = false,
  variant = "contained",
  color = "primary",
  styles,
  ...props
}) {
  const buttonRef = useRef();
  const originalWidth = `${buttonRef.current?.getBoundingClientRect().width}px`;

  const { breakpoints } = useTheme();
  const smBreakpoint = useMediaQuery(breakpoints.down("md"));

  return (
    <ButtonMaterialUI
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      size={smBreakpoint ? "small" : size}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      style={{ minWidth: originalWidth, ...restStyles, ...styles }}
      {...props}
    >
      {isLoading ? <CircularProgress size={22} /> : children}
    </ButtonMaterialUI>
  );
}

export default Button;
