import MUIIcon from "@mui/material/Icon";
import * as Icons from "@mui/icons-material";

function Icon({ name }) {
  return <MUIIcon component={Icons[name]} />;
}

export default Icon;
