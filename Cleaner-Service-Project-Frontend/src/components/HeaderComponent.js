import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./img/cleanbuddy_logo.png";
import { HeaderButton, PurpleButton } from "./CustomButtons";
import { CustomTextField } from "./CustomTextField";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E66CC4",
    textAlign: "center",
  },
  logoBlock: {
    display: "block",
    [theme.breakpoints.down("sm")]: { marginTop: 10 },
    [theme.breakpoints.up("sm")]: { marginTop: 30, marginBottom: 30 },
  },
  logoImage: {
    height: "100%",
    maxHeight: 250,
  },
  button: {
    [theme.breakpoints.down("sm")]: { marginBottom: 10 },
    [theme.breakpoints.up("sm")]: { marginTop: 10 },
  },
  login: {},
  frontLink: {
    textDecoration: "none",
    color: "white",
  },
}));

const HeaderComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [adminRights, setAdminRights] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerLoggedIn, setCustomerLoggedIn] = useState(false);
  const [supplierLoggedIn, setSupplierLoggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (nav) => {
    setAnchorEl(null);
    window.location.href = nav;
  };
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleCustomerLogin = async () => {
    if (email && password) {
      const login = await axios.post(
        //`http://localhost:8080/api/auth/signin`,
        `https://clean-buddy.herokuapp.com/api/auth/signin`,
        {
          email: email,
          password: password,
        }
      );
      if (login.status === 204 || login.status === 206) {
        alert("Väärä sähköposti/salasana");
      } else if (login.status === 200 && login.data.admin === true) {
        localStorage.setItem("admin", true);
        window.location.href = "/admin";
        handleModalClose();
      } else if (login.status === 200 && login.data.admin === false) {
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("user", login.data.userId);
        window.location.href = "/mypage/customer";
        handleModalClose();
      }
    } else {
      alert("Anna sähköposti ja salasana");
    }
  };

  const clickedLogin = () => {
    handleModalOpen();
  };

  const clickedLogout = () => {
    setLoggedIn(false);
    setAdminRights(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // if user is admin, dropdown menu will have an Admin button
  const checkIfAdmin = () => {
    //TODO
    //check from backend if current user has admin rights
    const getAdmin = localStorage.getItem("admin");
    if (getAdmin) {
      setAdminRights(true);
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    checkIfAdmin();
  }, []);

  // Checks local storage for tokens
  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (loggedIn) {
      setLoggedIn(true);
    }
    const customerLoggedIn = localStorage.getItem("user");
    if (customerLoggedIn) {
      setCustomerLoggedIn(true);
    }
    const companyLoggedIn = localStorage.getItem("company");
    if (companyLoggedIn) {
      setSupplierLoggedIn(true);
    }
  }, []);

  const classes = useStyles();

  const loginOrLogoutButton = () => {
    if (loggedIn === false) {
      return (
        <Grid item>
          <HeaderButton
            className={classes.button}
            size="large"
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={clickedLogin}
          >
            Login
          </HeaderButton>
          <Dialog
            open={open}
            maxWidth="sm"
            onClose={handleModalClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Kirjaudu omille sivuille:
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                Kirjaudu omille sivuillesi kirjoittamalla sähköpostiosoite ja
                salasana.
              </DialogContentText> */}
              <CustomTextField
                required
                autoFocus
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                variant="outlined"
                margin="normal"
                id="email"
                label="Sähköpostiosoite"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
              />
              <CustomTextField
                required
                autoFocus
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                variant="outlined"
                margin="normal"
                id="password"
                label="Salasana"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
              />
              <div>
                <Link
                  to="/signup"
                  style={{ color: "#black" }}
                  onClick={handleModalClose}
                >
                  Luo uusi käyttäjätili
                </Link>
              </div>
            </DialogContent>
            <DialogActions>
              <PurpleButton
                variant="outlined"
                onClick={handleModalClose}
                color="primary"
              >
                Peruuta
              </PurpleButton>
              <PurpleButton
                variant="outlined"
                onClick={handleCustomerLogin}
                color="primary"
              >
                Kirjaudu sisään
              </PurpleButton>
            </DialogActions>
          </Dialog>
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <HeaderButton
            className={classes.button}
            size="large"
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={clickedLogout}
          >
            Logout
          </HeaderButton>
        </Grid>
      );
    }
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Link className={classes.frontLink} to="/">
              <div className={classes.logoBlock}>
                <img
                  src={logo}
                  alt="CleanBuddy logo"
                  className={classes.logoImage}
                />
                <Typography variant="h6">
                  Siivouspalvelut helposti netistä
                </Typography>
              </div>
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            {loginOrLogoutButton()}
          </Grid>
          <Grid item xs={6} sm={3}>
            <HeaderButton
              className={classes.button}
              size="large"
              variant="outlined"
              color="inherit"
              startIcon={<MenuIcon />}
              onClick={handleClick}
              fullWidth
            >
              Menu
            </HeaderButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              //this line caused an error
              //anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

              transformOrigin={{ vertical: -50, horizontal: 0 }}
            >
              <MenuItem onClick={() => handleClose("/info")}>
                Tietoa palvelusta
              </MenuItem>
              <MenuItem onClick={() => handleClose("/")}>
                Pikatarjoukset
              </MenuItem>
              <MenuItem onClick={() => handleClose("/companies")}>
                Palveluntarjoajat
              </MenuItem>
              <MenuItem onClick={() => handleClose("/offerRequest")}>
                Pyydä tarjous
              </MenuItem>
              <MenuItem onClick={() => handleClose("/privacy")}>
                Tietosuojaseloste
              </MenuItem>

              {adminRights ? (
                <MenuItem onClick={() => handleClose("/admin")}>Admin</MenuItem>
              ) : null}
              {customerLoggedIn ? (
                <MenuItem onClick={() => handleClose("/mypage/customer/")}>
                  Asiakkaan omat sivut
                </MenuItem>
              ) : null}
              {supplierLoggedIn ? (
                <MenuItem onClick={() => handleClose("/mypage/company/")}>
                  Yrityksen omat sivut
                </MenuItem>
              ) : null}
              {!adminRights && !customerLoggedIn && !supplierLoggedIn ? (
                <MenuItem onClick={() => handleClose("/company/login")}>
                  Yrityskirjautuminen
                </MenuItem>
              ) : null}
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
