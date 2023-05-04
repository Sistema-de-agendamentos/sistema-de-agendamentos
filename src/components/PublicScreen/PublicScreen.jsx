import Logo from "../../assets/images/logo.png";
import PageTitle from "../PageTitle";

import {
  StyledContainer,
  StyledContentLeft,
  StyledContentRight,
} from "./styledComponents";

function PublicScreen({ children, title }) {
  return (
    <StyledContainer>
      <StyledContentLeft>
        <img src={Logo} alt="Logo" />
      </StyledContentLeft>

      <StyledContentRight>
        <PageTitle title={title} removeLine />
        {children}
      </StyledContentRight>
    </StyledContainer>
  );
}

export default PublicScreen;
