import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { PurpleButton } from "./CustomButtons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { CustomTextField } from "./CustomTextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
  container: {
    marginTop: 30,
  },
  button: {
    marginTop: 10,
  },
}));

const CompanyLogin = () => {
  const styles = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCompanyLogin = async () => {
    if (email && password) {
      const login = await axios.post(
        //`http://localhost:8080/api/auth/supplier`,
        `https://clean-buddy.herokuapp.com/api/auth/supplier`,
        {
          email: email,
          password: password,
        }
      );
      if (login.status === 204 || login.status === 206) {
        alert("Väärä sähköposti/salasana");
      } else if (login.status === 200) {
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("company", login.data.supplierId);
        //setSupplierLoggedIn(true);
        window.location.href = "/mypage/company";
      }
    } else {
      alert("Anna sähköposti ja salasana");
    }
  };
  return (
    <div>
      <Grid container spacing={2} className={styles.container}>
        <Grid item xs={1} sm={2}></Grid>
        <Grid item xs={10} sm={8}>
          <h3>Kirjaudu yrityksen omille omille sivuille</h3>

          <CustomTextField
            required
            variant="outlined"
            margin="normal"
            id="email"
            label="Sähköpostiosoite"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <CustomTextField
            required
            variant="outlined"
            margin="normal"
            id="password"
            label="Salasana"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <PurpleButton
            className={styles.button}
            variant="outlined"
            size="large"
            color="primary"
            onClick={handleCompanyLogin}
          >
            Kirjaudu sisään
          </PurpleButton>
        </Grid>
        <Grid item xs={1} sm={2}></Grid>
      </Grid>
    </div>
  );
};

export default CompanyLogin;
