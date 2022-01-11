import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import BackendConnection from "./BackendConnection.js";
import "./styles/TextPage.css";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ModifyCompanyData = ({ companyId }) => {
  // const exampledata = {
  //   id: 1,
  //   name: "Siivouspojat Ab",
  //   contactPerson: "Jussi Mäkinen",
  //   phone: "040 5544671",
  //   street_address: "Mäkitie 3",
  //   postcode: "36100",
  //   city: "Tampere",
  //   email: "asiakaspalvelu@siivouspojat.fi",
  //   supplier_description: "Tehdään loistavaa jälkeä",
  // };

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
  };

  useEffect(() => {
    // Load all companies from database and search with given props companyId
    const loadCompanyData = async () => {
      const temp = await BackendConnection.getAllCompanies();
      if (temp.length > 0) {
        const value = temp.filter((comp) => comp.supplier_id === companyId);
        if (value.length > 0) {
          setCompany(value[0]);
          fillValues(value[0]);
        }
      }
    };
    loadCompanyData();
  }, [companyId]);

  const handleClick = async () => {
    //TODO: send modified data to db

    if (checkValues()) {
      console.log("post modification and go to companyfront");
      /*BackendConnection.postSpecialOffer({
        product_name: title,
        product_description: description,
        product_price: 100,
      });
      
      
      add description*/
      await BackendConnection.modifySupplier(
        companyId,
        name,
        description,
        address,
        city,
        postcode,
        phone,
        email
      );
      window.location.href = "/mypage/company";
    } else {
      alert("Jokin kenttä on jätetty tyhjäksi, tarkista tiedot.");
    }
  };

  // Checking that title and description have content
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
  if (company === null) {
    return (
      <div>
        <h2>Loading data</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Muokkaa yrityksen tietoja:</h1>
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
              placeholder="Yrityksen kuvaus"
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
                onClick={() => (window.location.href = "/mypage/company")}
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

export default ModifyCompanyData;
