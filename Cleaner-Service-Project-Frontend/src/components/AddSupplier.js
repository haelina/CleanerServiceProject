import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import BackendConnection from "./BackendConnection.js";
import "./styles/TextPage.css";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const AddSupplier = () => {
  const styles = useStyles();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    if (checkValues()) {
      /*console.log("post values and go to adminpage");
      console.log(`Sending this data with axios post
        ${name},
        ${description},
        ${address},
        ${city},
        ${postcode},
        ${phone},
        ${email},
        ${password}`);
      */
      BackendConnection.postNewSupplier({
        name: name,
        supplier_description: description,
        street_address: address,
        city: city,
        postcode: postcode,
        phone: phone,
        email: email,
        password: password,
      });
      window.location.href = "/admin";
    } else {
      alert("Jokin kenttä on jätetty tyhjäksi, tarkista tiedot.");
    }
  };

  // Checking that title and description have content and price is positive
  const checkValues = () => {
    return (
      name !== "" &&
      description !== "" &&
      phone !== "" &&
      postcode !== "" &&
      address !== "" &&
      city !== "" &&
      email !== "" &&
      description !== ""
    );
  };

  return (
    <div>
      <h1>Täytä uuden yrityskäyttäjän tiedot:</h1>
      <div className="TextContainer">
        <form
          style={{ textAlign: "left", marginBottom: 30 }}
          autoComplete="false"
        >
          <TextField
            className={styles.formControl}
            required
            id="modify-name"
            label="Yrityksen nimi"
            //placeholder="Yrityksen nimi"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            id="modify-phone"
            label="Puhelinnumero"
            //placeholder="Puhelinnumero"
            variant="outlined"
            onChange={(event) => setPhone(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            id="modify-address"
            label="Osoite"
            //placeholder="Osoite"
            variant="outlined"
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            id="modify-postcode"
            label="Postinumero"
            //placeholder="Postinumero"
            variant="outlined"
            onChange={(event) => setPostcode(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            id="modify-city"
            label="Postitoimipaikka"
            //placeholder="Postitoimipaikka"
            variant="outlined"
            onChange={(event) => setCity(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            id="modify-email"
            label="Sähköpostiosoite"
            //placeholder="Sähköpostiosoite"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            type="password"
            id="add-password"
            label="Salasana"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            className={styles.formControl}
            required
            id="modify-description"
            label="Yrityksen kuvaus"
            fullWidth
            multiline
            rows={4}
            rowsMax={7}
            //placeholder="Yrityksen kuvaus"
            variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
          />
        </form>
        <Grid className={styles.info} container spacing={1} p={2} m={2}>
          <Grid item xs={6} ml={2}>
            <PurpleButton
              variant="outlined"
              size="large"
              color="primary"
              fullWidth
              onClick={() => (window.location.href = "/admin")}
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
              Lisää yritys
            </PurpleButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddSupplier;
