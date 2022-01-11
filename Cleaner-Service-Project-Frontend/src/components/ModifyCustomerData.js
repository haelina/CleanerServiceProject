import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import BackendConnection from "./BackendConnection.js";
import "./styles/TextPage.css";
import { PurpleButton } from "./CustomButtons";
import { CustomTextField } from "./CustomTextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const ModifyCustomerData = ({ customerId }) => {
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
    // Load all customers from database and search with given props customerId
    const loadCompanyData = async () => {
      const temp = await BackendConnection.getAllCustomers();
      if (temp.length > 0) {
        const value = temp.filter((cust) => cust.customer_id === customerId);
        if (value.length > 0) {
          setCustomer(value[0]);
          fillValues(value[0]);
        }
      }
    };
    loadCompanyData();
  }, [customerId]);

  const handleClick = async () => {
    if (checkValues()) {
      //console.log("post modification and go to customerfront");
      await BackendConnection.modifyCustomer(
        customerId,
        firstName,
        lastName,
        address,
        city,
        postcode,
        phone,
        email
      );
      window.location.href = "/mypage/customer";
    } else {
      alert("Jokin kenttä on jätetty tyhjäksi, tarkista tiedot.");
    }
  };

  // Checking that values have content
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
  if (customer === null) {
    return (
      <div>
        <h2>Loading data</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Muokkaa asiakastietoja:</h1>
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
              value={firstName}
              variant="outlined"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <CustomTextField
              className={styles.formControl}
              required
              id="modify-lastname"
              label="Sukunimi"
              value={lastName}
              variant="outlined"
              onChange={(event) => setLastName(event.target.value)}
            />
            <CustomTextField
              className={styles.formControl}
              required
              id="modify-phone"
              label="Puhelinnumero"
              value={phone}
              variant="outlined"
              onChange={(event) => setPhone(event.target.value)}
            />
            <CustomTextField
              className={styles.formControl}
              required
              id="modify-address"
              label="Osoite"
              value={address}
              variant="outlined"
              onChange={(event) => setAddress(event.target.value)}
            />
            <CustomTextField
              className={styles.formControl}
              required
              id="modify-postcode"
              label="Postinumero"
              value={postcode}
              variant="outlined"
              onChange={(event) => setPostcode(event.target.value)}
            />
            <CustomTextField
              className={styles.formControl}
              required
              id="modify-city"
              label="Postitoimipaikka"
              value={city}
              variant="outlined"
              onChange={(event) => setCity(event.target.value)}
            />
            <CustomTextField
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
                onClick={() => (window.location.href = "/mypage/customer")}
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
                Tallenna muutokset
              </PurpleButton>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

export default ModifyCustomerData;
