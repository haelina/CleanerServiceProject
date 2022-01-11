import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import "./styles/TextPage.css";
import BackendConnection from "./BackendConnection.js";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AdminModifyCompanyData = ({ cData, update, cDelete }) => {
  const [company, setCompany] = useState(null);

  const styles = useStyles();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const fillValues = (comp) => {
    setName(comp.name);
    setPhone(comp.phone);
    setAddress(comp.street_address);
    setPostcode(comp.postcode);
    setCity(comp.city);
    setEmail(comp.email);
    setDescription(comp.supplier_description);
    //console.log(comp.supplier_description);
  };

  useEffect(() => {
    const loadCompanyData = async () => {
      setCompany(cData);
      fillValues(cData);
    };
    loadCompanyData();
  }, []);

  // Checking that title and description have content and price is positive
  const checkValues = () => {
    return (
      name !== "" &&
      description !== "" &&
      phone !== "" &&
      postcode !== "" &&
      address !== "" &&
      city !== "" &&
      email !== ""
    );
  };

  const modify = async () => {
    // console.log("modify");
    if (checkValues()) {
      await BackendConnection.modifySupplier(
        cData.supplier_id,
        name,
        description,
        address,
        city,
        postcode,
        phone,
        email
      );
      update();
    } else {
      alert("Please fill all values");
    }
  };

  if (company === null) {
    return (
      <div>
        <h2>Loading data</h2>
      </div>
    );
  } else {
    return (
      <div>
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
              value={name}
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />

            <TextField
              className={styles.formControl}
              required
              id="modify-phone"
              label="Puhelinnumero"
              //placeholder="Puhelinnumero"
              value={phone}
              variant="outlined"
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-address"
              label="Osoite"
              //placeholder="Osoite"
              value={address}
              variant="outlined"
              onChange={(event) => setAddress(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-postcode"
              label="Postinumero"
              //placeholder="Postinumero"
              value={postcode}
              variant="outlined"
              onChange={(event) => setPostcode(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-city"
              label="Postitoimipaikka"
              //placeholder="Postitoimipaikka"
              value={city}
              variant="outlined"
              onChange={(event) => setCity(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-email"
              label="Sähköpostiosoite"
              //placeholder="Sähköpostiosoite"
              value={email}
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-description"
              label="Kuvaus"
              fullWidth
              multiline
              rows={4}
              rowsMax={7}
              //placeholder="Yrityksen kuvaus"
              variant="outlined"
              value={description}
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
                onClick={() => modify()}
              >
                Tallenna
              </PurpleButton>
            </Grid>
            <Grid item xs={6}>
              <PurpleButton
                variant="outlined"
                size="large"
                color="primary"
                fullWidth
                onClick={() => cDelete()}
              >
                Poista
              </PurpleButton>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

export default AdminModifyCompanyData;
