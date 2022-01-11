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

const CreateSpecialOffer = ({ companyId }) => {
  const styles = useStyles();
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Load all companies from database and get companyName
    const loadCompanyData = async () => {
      const temp = await BackendConnection.getAllCompanies();
      if (temp.length > 0) {
        const value = temp.filter((comp) => comp.supplier_id === companyId);
        if (value.length > 0) {
          setCompanyName(value[0].name);
          console.log(companyName);
        }
      }
    };
    loadCompanyData();
  }, [companyId]);

  const handleClick = () => {
    if (checkValues()) {
      console.log("create new special offer and go to companyfront");
      BackendConnection.postSpecialOffer({
        supplier_name: companyName,
        product_name: title,
        product_description: description,
        product_price: price,
        ends_at: null,
        work_hours: duration,
        is_available: true,
        // supplier_name: "Siivouspojat Oy",
        // product_name: "Testitarjous",
        // product_description: "Astetta parempi imurointi",
        // product_price: 100,
        // ends_at: null,
        // work_hours: 5.5,
        // is_available: true,
      });
      window.location.href = "/mypage/company";
    } else {
      alert("Tarkista pikatarjouksen tiedot");
    }
  };

  // Checking that title and description have content and price is positive
  const checkValues = () => {
    return title !== "" && description !== "" && price >= 0 && duration >= 0;
  };

  return (
    <div>
      <h1>Luo uusi pikatarjous:</h1>
      <div className="TextContainer">
        <form
          style={{ textAlign: "left", marginBottom: 30 }}
          autoComplete="false"
        >
          <CustomTextField
            className={styles.formControl}
            required
            id="special-offer-title"
            label="Otsikko"
            placeholder="Otsikko"
            variant="outlined"
            onChange={(event) => setTitle(event.target.value)}
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="special-offer-time"
            label="Kesto"
            placeholder="Kesto"
            variant="outlined"
            onChange={(event) =>
              setDuration(parseFloat(event.target.value).toFixed(2))
            }
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="special-offer-price"
            label="Hinta"
            placeholder="Hinta"
            variant="outlined"
            onChange={(event) =>
              setPrice(parseFloat(event.target.value).toFixed(2))
            }
          />
          <CustomTextField
            className={styles.formControl}
            required
            id="description"
            label="Kuvaus"
            fullWidth
            multiline
            rows={4}
            rowsMax={7}
            placeholder="Anna tarkempi kuvaus siivouksen yksityiskohdista."
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
              Luo pikatarjous
            </PurpleButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreateSpecialOffer;
