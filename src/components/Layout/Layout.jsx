import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Drawer, styled } from "@mui/material";
import { toast } from "react-toastify";

import { useAuthStore } from "stores";

import Button from "../Button";
import Icon from "../Icon";

import Logo from "../../assets/images/logo.png";

const ContainerStyled = styled(Box)({
  display: "flex",
});

const DrawerStyled = styled(Drawer)(({ open }) => ({
  "& .MuiDrawer-paper": {
    display: "flex",
    position: "fixed",
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

const OpenDrawerButtonStyled = styled(Button)((props) => ({
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

const LogoutButtonStyled = styled(Button)({
  position: "fixed",
  right: "3.5rem",
  textTransform: "capitalize !important",
  textDecoration: "none !important",
  margin: "0 !important",
  gap: "0.75rem",
  padding: "0.5rem 1rem 0.5rem 1.25rem !important",
  borderRadius: "0 0 0.75rem 0.75rem",
});

const ContentStyled = styled(Box)((props) => ({
  width: "100%",
  margin: "2.5rem 3.5rem 2rem",
  marginLeft: `${(props["data-open"] ? 14 : 3) + 3.5}rem`,
  transition: ".3s",
}));

const generateImgStyle = (open) => ({
  width: "7.5rem",
  transition: ".3s",
  margin: "2rem auto",
  ...(!open && { transform: "translateX(-10rem)" }),
});

const stylesOpenMenu = {
  marginLeft: "1rem",
  borderTopLeftRadius: "1rem",
  borderBottomLeftRadius: "1rem",
};

const stylesCloseMenu = {
  marginLeft: "-.25rem",
};

function Layout({ children }) {
  const {
    user: { login },
    setAuthentication,
    setUser,
  } = useAuthStore();

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
    // { path: "/usuarios", icon: "Badge", text: "Usuários" },
    // { path: "/organizacoes", icon: "Business", text: "Organizações" },
    // { path: "/configuracoes", icon: "Settings", text: "Configurações" },
    // { path: "/configuradores", icon: "WatchLater", text: "Configuradores" },
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

        <OpenDrawerButtonStyled
          onClick={() => setOpenDrawer(!openDrawer)}
          fullWidth
          variant="inherit"
          data-open={openDrawer}
        >
          <Icon name="NavigateBefore" />
        </OpenDrawerButtonStyled>
      </DrawerStyled>

      <ContentStyled data-open={openDrawer}>{children}</ContentStyled>

      <LogoutButtonStyled
        onClick={() => {
          toast.success("Sessão encerrada com sucesso");
          localStorage.removeItem("user");

          navigate("/");
          setAuthentication(false);
          setUser({});
        }}
        margin="none"
        color="secondary"
      >
        <span>{login}</span>
        <Icon name="Logout" />
      </LogoutButtonStyled>
    </ContainerStyled>
  );
}

export default Layout;
