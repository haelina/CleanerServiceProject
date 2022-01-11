import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  InputAdornment,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BackendConnection from "./BackendConnection";
import "./styles/TextPage.css";
import { PurpleButton } from "./CustomButtons";
import { CustomTextField } from "./CustomTextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const OfferRequest = () => {
  const styles = useStyles();

  const [companyData, setCompanyData] = useState([]);

  const [apartmentType, setApartmentType] = useState("");
  const [apartmentArea, setApartmentArea] = useState("");
  const [frequency, setFrequency] = useState("");
  const [suppliers, setSuppliers] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Load all companies from database
  const loadCompanyData = async () => {
    const temp = await BackendConnection.getAllCompanies();
    if (temp.length > 0) {
      const tempArr = [];
      temp.forEach((comp) => {
        tempArr.push({ name: comp.name, isChecked: false });
      });
      setCompanyData(tempArr);
    }
  };

  // Load companies from db only once
  useEffect(() => {
    loadCompanyData();
  }, []);

  // Check that all fields have value and email includes substring '@'
  // Additional info can be empty
  const checkValues = () => {
    if (
      suppliers !== "" &&
      apartmentType !== "" &&
      apartmentArea !== "" &&
      frequency !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      phone !== "" &&
      address !== "" &&
      postcode !== "" &&
      city !== "" &&
      email !== "" &&
      email.indexOf("@") > 0
    ) {
      return true;
    }
    return false;
  };

  const sendOfferRequest = () => {
    if (checkValues()) {
      /*console.log(`Posting values:
      ${apartmentType}
      ${apartmentArea}
      ${frequency}
      ${suppliers}
      ${firstName}
      ${lastName}
      ${phone}
      ${additionalInfo}
      ${address}
      ${postcode}
      ${city}
      ${email}`);
      */
      BackendConnection.postNewOfferRequest({
        apartment_type: apartmentType,
        apartment_area: apartmentArea,
        cleaning_frequency: frequency,
        request_suppliers: suppliers,
        optional_information: additionalInfo,
        first_name: firstName,
        last_name: lastName,
        street_address: address,
        city: city,
        postcode: postcode,
        phone: phone,
        email: email,
      });
      window.location.href = "/";
    } else {
      alert("Tarkista että kaikki kentät on täytetty oikein.");
    }
  };

  // Get string value of all suppliers that are checked by customer
  const getRequestedSuppliers = () => {
    var tempStr = "";
    companyData.forEach((comp) => {
      if (comp.isChecked === true) {
        //console.log("adding company to supplierlist");
        tempStr += comp.name + " ";
      }
    });
    //console.log(`String is now: ${tempStr}`);
    setSuppliers(tempStr);
    return tempStr;
  };

  // Update suppliers hook when companyData changes
  useEffect(() => {
    getRequestedSuppliers();
  }, [companyData]);

  // TODO: show error when none of the companies are checked
  const error = [companyData].filter((v) => v.isChecked === true).length > 0;

  const showCompaniesList = () => {
    const ui = companyData.map((comp) => {
      //console.log(comp);
      return (
        <FormControlLabel
          key={comp.name}
          control={
            <Checkbox
              checked={comp.isChecked}
              onChange={(event) => {
                //console.log(event.target.name);
                //console.log(event.target.checked);
                const temp = companyData.map((comp) => {
                  if (comp.name === event.target.name) {
                    comp = {
                      name: comp.name,
                      isChecked: !comp.isChecked,
                    };
                    return comp;
                  } else {
                    return comp;
                  }
                });
                setCompanyData(temp);
              }}
              name={comp.name}
            />
          }
          label={comp.name}
        />
      );
    });
    return ui;
  };

  return (
    <div>
      <div>
        <h1>Pyydä tarjous:</h1>
        <div className="TextContainer">
          <form
            style={{ textAlign: "left", marginBottom: 30 }}
            autoComplete="false"
          >
            <h3>Siivottavan kohteen tiedot</h3>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Asuntotyyppi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={apartmentType}
                onChange={(event) => setApartmentType(event.target.value)}
                label="Asuntotyyppi"
              >
                <MenuItem value="" disabled>
                  Valitse asuntotyyppi
                </MenuItem>
                <MenuItem value={"kerrostalo"}>Kerrostalo</MenuItem>
                <MenuItem value={"omakotitalo"}>Omakotitalo</MenuItem>
                <MenuItem value={"rivitalo"}>Rivitalo</MenuItem>
                <MenuItem value={"muu asunto"}>Muu asuntotyyppi</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Asuinpinta-ala
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={apartmentArea}
                onChange={(event) => setApartmentArea(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">m2</InputAdornment>
                }
                label="Asuinpinta-ala"
              />
            </FormControl>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Siivoustiheys
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={frequency}
                onChange={(event) => setFrequency(event.target.value)}
                label="Siivoustiheys"
              >
                <MenuItem value="" disabled>
                  Valitse siivoustiheys
                </MenuItem>
                <MenuItem value={"kerran"}>Kertasiivous</MenuItem>
                <MenuItem value={"1 / vko"}>1 kerran viikossa</MenuItem>
                <MenuItem value={"2 / kk"}>2 kertaa kuukaudessa</MenuItem>
                <MenuItem value={"1 /kk"}>1 kerran kuukaudessa</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              required
              error={error}
              component="fieldset"
              className={styles.formControl}
            >
              <FormLabel component="legend">
                Valitse palveluntarjoajat, joilta tahdot tarjouksen
              </FormLabel>
              <FormGroup>{showCompaniesList()}</FormGroup>
              {/* <FormHelperText display={error}>
                Valitse vähintään yksi palveluntarjoaja
              </FormHelperText> */}
            </FormControl>
            <CustomTextField
              className={styles.formControl}
              id="standard-required"
              label="Lisätietoa"
              fullWidth
              multiline
              rows={4}
              rowsMax={7}
              placeholder="Tähän voit antaa lisätietoa, esimerkiksi onko asunnossa lemmikkejä."
              variant="outlined"
              onChange={(event) => setAdditionalInfo(event.target.value)}
            />
          </form>
          <form style={{ textAlign: "left" }}>
            <h3>Asiakkaan tiedot:</h3>
            <div>
              <CustomTextField
                className={styles.formControl}
                required
                id="standard-required"
                label="Etunimi"
                placeholder="Etunimi"
                variant="outlined"
                onChange={(event) => setFirstName(event.target.value)}
              />
              <CustomTextField
                className={styles.formControl}
                required
                id="standard-required"
                label="Sukunimi"
                placeholder="Sukunimi"
                variant="outlined"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div>
              <CustomTextField
                className={styles.formControl}
                required
                id="standard-required"
                label="Osoite"
                placeholder="Osoite"
                variant="outlined"
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div>
              <CustomTextField
                className={styles.formControl}
                required
                id="standard-required"
                label="Postinumero"
                placeholder="Postinumero"
                variant="outlined"
                onChange={(event) => setCity(event.target.value)}
              />
              <CustomTextField
                className={styles.formControl}
                required
                id="standard-required"
                label="Postitoimipaikka"
                placeholder="Postitoimipaikka"
                variant="outlined"
                onChange={(event) => setPostcode(event.target.value)}
              />
            </div>
            <div>
              <CustomTextField
                className={styles.formControl}
                id="standard-required"
                label="Puhelinnumero"
                placeholder="Puhelinnumero"
                variant="outlined"
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div>
              <CustomTextField
                className={styles.formControl}
                required
                id="standard-required"
                label="Sähköpostiosoite"
                placeholder="Sähköpostiosoite"
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="bottomButtons">
        <PurpleButton
          className={styles.button}
          variant="outlined"
          size="large"
          color="primary"
          onClick={sendOfferRequest}
        >
          Lähetä
        </PurpleButton>
      </div>
    </div>
  );
};

export default OfferRequest;
