import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Drawer, styled } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthStore } from "stores";
import { useQuery } from "hooks";

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
  maxWidth: "14rem",
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
  width: `calc(100% - ${(props["data-open"] ? 14 : 3) + 5.5}rem)`,
  margin: "2.5rem 3.5rem 2rem",
  marginLeft: `${(props["data-open"] ? 14 : 3) + 3}rem`,
  transition: ".3s",
  [props.theme.breakpoints.down("sm")]: {
    margin: "5rem 2rem 2rem",
    width: "100%",
  },
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
  const { breakpoints } = useTheme();
  const smBreakpoint = useMediaQuery(breakpoints.down("sm"));

  const {
    user: { login },
    setAuthentication,
    setUser,
  } = useAuthStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openDrawer, setOpenDrawer] = useState(true);

  const defaultProps = (active, mobile = false) => ({
    ...(!active && { color: "inherit" }),
    fullWidth: true,
    styles: {
      textTransform: "capitalize",
      display: "flex",
      justifyContent: "flex-start",
      gap: "1rem",
      margin: ".5rem 0",
      textDecoration: "none",
      ...(openDrawer || mobile ? stylesOpenMenu : stylesCloseMenu),
    },
  });

  const menus = [
    { path: "/agendamentos", icon: "CalendarMonth", text: "Agendamentos" },
    { path: "/atendimentos", icon: "Assignment", text: "Atendimentos" },
    { path: "/clientes", icon: "SwitchAccount", text: "Clientes" },
  ];

  const { refetch: mutateLogout, isFetching: isLoadingLogout } = useQuery({
    endpoint: "/auth/logout",
    method: "POST",
    queryOptions: {
      onSuccess: () => {
        toast.success("Sessão encerrada com sucesso");
        localStorage.removeItem("user");

        navigate("/");
        setAuthentication(false);
        setUser({});
      },
    },
  });

  return (
    <ContainerStyled>
      {smBreakpoint ? (
        <AppBar
          position="fixed"
          style={{
            background: "#FFF",
            height: openDrawer ? "3.5rem" : "14rem",
            overflow: "hidden",
            transition: ".3s",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              transition: ".3s",
            }}
          >
            <Button
              onClick={mutateLogout}
              isLoading={isLoadingLogout}
              variant="inherit"
              style={{
                margin: 0,
                gap: "0.75rem",
              }}
            >
              <Icon name="Logout" />
            </Button>

            <img
              src={Logo}
              alt="Logo"
              className="logo"
              style={{ height: "3rem" }}
            />

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              style={{
                color: "#333",
                transition: ".3s",
                transform: openDrawer ? "none" : "rotate(90deg)",
              }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          <MenuStyled
            data-open
            style={{ alignSelf: "flex-end", margin: ".5rem 0" }}
          >
            {menus.map(({ icon, text, path }) => {
              const active = path === pathname;

              return (
                <Button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    setOpenDrawer(true);
                  }}
                  variant={active ? "contained" : "inherit"}
                  {...defaultProps(active, true)}
                >
                  <Icon name={icon} />
                  <span>{text}</span>
                </Button>
              );
            })}
          </MenuStyled>
        </AppBar>
      ) : (
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
      )}

      <ContentStyled data-open={openDrawer}>{children}</ContentStyled>

      {!smBreakpoint && (
        <LogoutButtonStyled
          onClick={mutateLogout}
          isLoading={isLoadingLogout}
          margin="none"
          color="secondary"
        >
          <span>{login}</span>
          <Icon name="Logout" />
        </LogoutButtonStyled>
      )}
    </ContainerStyled>
  );
}

export default Layout;
