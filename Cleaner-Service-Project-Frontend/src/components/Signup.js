import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import BackendConnection from "./BackendConnection.js";
import "./styles/TextPage.css";
import { PurpleButton } from "./CustomButtons";
import { CustomTextField } from "./CustomTextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const Signup = () => {
  const styles = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (checkValues()) {
      console.log("post new customer and go to front page");
      BackendConnection.postNewCustomer({
        first_name: firstName,
        last_name: lastName,
        street_address: address,
        postcode: postcode,
        city: city,
        phone: phone,
        email: email,
        password: password,
      });
      window.location.href = "/";
    } else {
      alert("Jokin kenttä on jätetty tyhjäksi, tarkista tiedot.");
    }
  };

  // Checking that title and description have content and price is positive
  const checkValues = () => {
    return (
      firstName !== "" &&
      lastName !== "" &&
      phone !== "" &&
      postcode !== "" &&
      address !== "" &&
      city !== "" &&
      email !== "" &&
      password !== ""
    );
  };

  return (
    <div>
      <h1>Luo uusi käyttäjätili:</h1>
      <div className="TextContainer">
        <form
          style={{ textAlign: "left", marginBottom: 30 }}
          autoComplete="false"
        >
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-firstname"
            label="Etunimi"
            //value={firstName}
            variant="outlined"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-lastname"
            label="Sukunimi"
            //value={lastName}
            variant="outlined"
            onChange={(event) => setLastName(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-phone"
            label="Puhelinnumero"
            //value={phone}
            variant="outlined"
            onChange={(event) => setPhone(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-address"
            label="Osoite"
            //value={address}
            variant="outlined"
            onChange={(event) => setAddress(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-postcode"
            label="Postinumero"
            //value={postcode}
            variant="outlined"
            onChange={(event) => setPostcode(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-city"
            label="Postitoimipaikka"
            //value={city}
            variant="outlined"
            onChange={(event) => setCity(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-email"
            label="Sähköpostiosoite"
            //value={email}
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="modify-password"
            type="password"
            label="Salasana"
            //value={password}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <Grid className={styles.info} container spacing={1} p={2} m={2}>
          <Grid item xs={6} ml={2}>
            <PurpleButton
              variant="outlined"
              size="large"
              color="primary"
              fullWidth
              onClick={() => (window.location.href = "/")}
            >
              Takaisin
            </PurpleButton>
          </Grid>
          <Grid item xs={6}>
            <PurpleButton
              variant="outlined"
              size="large"
              color="primary"
              fullWidth
              onClick={handleClick}
            >
              Luo käyttäjätili
            </PurpleButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Signup;
