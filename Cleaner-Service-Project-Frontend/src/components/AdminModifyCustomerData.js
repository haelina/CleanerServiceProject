import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import BackendConnection from "./BackendConnection.js";
import "./styles/TextPage.css";
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

const AdminModifyCustomerData = ({ cData, update, cDelete }) => {
  const [customer, setCustomer] = useState(null);
  const styles = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  const fillValues = (cust) => {
    setFirstName(cust.first_name);
    setLastName(cust.last_name);
    setPhone(cust.phone);
    setAddress(cust.street_address);
    setPostcode(cust.postcode);
    setCity(cust.city);
    setEmail(cust.email);
  };

  useEffect(() => {
    const loadCustomerData = async () => {
      setCustomer(cData);
      fillValues(cData);
    };
    loadCustomerData();
  }, []);

  const checkValues = () => {
    return (
      firstName !== "" &&
      lastName !== "" &&
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
      await BackendConnection.modifyCustomer(
        cData.customer_id,
        firstName,
        lastName,
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

  if (customer === null) {
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
              id="modify-firstname"
              label="Etunimi"
              value={firstName}
              variant="outlined"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-lastname"
              label="Sukunimi"
              value={lastName}
              variant="outlined"
              onChange={(event) => setLastName(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-phone"
              label="Puhelinnumero"
              value={phone}
              variant="outlined"
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-address"
              label="Osoite"
              value={address}
              variant="outlined"
              onChange={(event) => setAddress(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-postcode"
              label="Postinumero"
              value={postcode}
              variant="outlined"
              onChange={(event) => setPostcode(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-city"
              label="Postitoimipaikka"
              value={city}
              variant="outlined"
              onChange={(event) => setCity(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="modify-email"
              label="Sähköpostiosoite"
              value={email}
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
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

export default AdminModifyCustomerData;
