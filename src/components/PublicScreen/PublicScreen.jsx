import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Logo from "../../assets/images/logo.png";
import PageTitle from "../PageTitle";

import {
  StyledContainer,
  StyledContentLeft,
  StyledContentRight,
} from "./styledComponents";

function PublicScreen({ children, title }) {
  const { breakpoints } = useTheme();
  const smBreakpoint = useMediaQuery(breakpoints.down("md"));

  return (
    <StyledContainer>
      {!smBreakpoint && (
        <StyledContentLeft>
          <img src={Logo} alt="Logo" className="logo" />
        </StyledContentLeft>
      )}

      <StyledContentRight>
        {smBreakpoint && (<img src={Logo} alt="Logo" className="logo" style={{ width: '12.5rem', margin: '-4rem 0 4rem'}} />)}

        <PageTitle title={title} removeLine />
        {children}
      </StyledContentRight>
    </StyledContainer>
  );
}

export default PublicScreen;
