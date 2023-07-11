import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Drawer, styled } from "@mui/material";

import Button from "../Button";
import Icon from "../Icon";

import Logo from "../../assets/images/logo.png";

const ContainerStyled = styled(Box)({
  display: "flex",
});

const DrawerStyled = styled(Drawer)(({ open }) => ({
  "& .MuiDrawer-paper": {
    display: "flex",
    position: "static",
    width: open ? "14rem" : "3rem",
    transition: ".3s",
    boxShadow: "0 1px 5px 0 rgba(0, 0, 0, .3)",
    height: "100vh",
    overflowX: "hidden",
  },
}));

const MenuStyled = styled(Box)((props) => ({
  flex: 1,
  transition: ".3s",
  ...(!props["data-open"] && { transform: "translateY(-9.75rem)" }),
}));

const ButtonOpenDrawerStyled = styled(Button)((props) => ({
  marginBottom: "0 !important",
  padding: ".75rem !important",
  justifyContent: "flex-end",
  transition: ".3s",
  ...(!props["data-open"] && {
    minWidth: "3rem !important",
    "& > svg": {
      transform: "rotate(180deg)",
      transition: ".3s",
    },
  }),
}));

const ContentStyled = styled(Box)({
  margin: "2rem 2.5rem",
});

const generateImgStyle = (open) => ({
  width: "7.5rem",
  transition: "0.3s",
  margin: "2rem auto",
  ...(!open && { transform: "translateX(-10rem)" }),
});

const stylesOpenMenu = {
  marginLeft: "1rem",
  borderTopLeftRadius: "1rem",
  borderBottomLeftRadius: "1rem",
};

const stylesCloseMenu = {
  marginLeft: "-0.625rem",
};

function Layout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openDrawer, setOpenDrawer] = useState(true);

  const defaultProps = (active) => ({
    ...(!active && { color: "inherit" }),
    fullWidth: true,
    styles: {
      textTransform: "capitalize",
      display: "flex",
      justifyContent: "flex-start",
      gap: "1rem",
      margin: ".5rem 0",
      textDecoration: "none",
      ...(openDrawer ? stylesOpenMenu : stylesCloseMenu),
    },
  });

  const menus = [
    { path: "/agendamentos", icon: "CalendarMonth", text: "Agendamentos" },
    { path: "/atendimentos", icon: "Assignment", text: "Atendimentos" },
    { path: "/clientes", icon: "SwitchAccount", text: "Clientes" },
    { path: "/usuarios", icon: "Badge", text: "Usuários" },
    { path: "/organizacoes", icon: "Business", text: "Organizações" },
    { path: "/configuracoes", icon: "Settings", text: "Configurações" },
    { path: "/configuradores", icon: "WatchLater", text: "Configuradores" },
  ];

  return (
    <ContainerStyled>
      <DrawerStyled variant="permanent" open={openDrawer}>
        <img
          src={Logo}
          alt="Logo"
          className="logo"
          style={generateImgStyle(openDrawer)}
        />

        <MenuStyled data-open={openDrawer}>
          {menus.map(({ icon, text, path }) => {
            const active = path === pathname;

            return (
              <Button
                key={path}
                onClick={() => navigate(path)}
                variant={active ? "contained" : "inherit"}
                {...defaultProps(active)}
              >
                <Icon name={icon} />
                <span>{text}</span>
              </Button>
            );
          })}
        </MenuStyled>

        <ButtonOpenDrawerStyled
          onClick={() => setOpenDrawer(!openDrawer)}
          fullWidth
          variant="inherit"
          data-open={openDrawer}
        >
          <Icon name="NavigateBefore" />
        </ButtonOpenDrawerStyled>
      </DrawerStyled>

      <ContentStyled>{children}</ContentStyled>
    </ContainerStyled>
  );
}

export default Layout;
