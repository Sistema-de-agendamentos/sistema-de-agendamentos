import { useRef } from "react";
import { Button as ButtonMaterialUI, CircularProgress } from "@mui/material";

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  disabled = false,
  isLoading = false,
  size = "large",
  variant = "contained",
  color = "primary",
  ...props
}) => {
  const buttonRef = useRef();
  const originalWidth = buttonRef.current?.getBoundingClientRect().width + "px";

  return (
    <ButtonMaterialUI
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      size={size}
      variant={variant}
      color={color}
      style={{ minWidth: originalWidth }}
      {...props}
    >
      {isLoading ? <CircularProgress size={24.5} /> : children}
    </ButtonMaterialUI>
  );
};

export default Button;
