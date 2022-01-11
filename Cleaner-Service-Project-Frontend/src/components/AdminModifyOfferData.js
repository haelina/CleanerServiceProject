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

/*
created_at: "2021-04-29T10:16:16.000Z"

ends_at: "0000-00-00"

product_description: "Siivoon"

product_id: 16

product_is_available: 0

product_name: "Mä tuun siivoon"

product_price: 2.5

supplier_id: null

work_hours: 0
*/

const AdminModifyOfferData = ({ oData, update, oDelete, company }) => {
  const [offer, setOffer] = useState(null);
  const styles = useStyles();

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(100);

  const fillValues = (comp) => {
    setTitle(comp.product_name);
    setDescription(comp.product_description);
    setPrice(comp.product_price);
    setCompanyName(company.name);
    setDuration(comp.work_hours);
  };

  useEffect(() => {
    const loadCompanyData = async () => {
      setOffer(oData);
      fillValues(oData);
    };
    loadCompanyData();
  }, []);

  // Checking that title and description have content and price is positive
  const checkValues = () => {
    return title !== "" && description !== "" && price >= 0;
  };

  const modify = async () => {
    // console.log("modify");
    if (checkValues()) {
      await BackendConnection.modifyOffer(
        oData.product_id,
        title,
        description,
        price,
        oData.ends_at,
        duration,
        oData.product_is_available
      );
      update();
    } else {
      alert("Please fill all values");
    }
  };

  if (offer === null) {
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
            <h3>{companyName}</h3>
            <TextField
              className={styles.formControl}
              required
              id="special-offer-title"
              label="Otsikko"
              placeholder="Otsikko"
              value={title}
              variant="outlined"
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="special-offer-price"
              label="Hinta"
              placeholder="Hinta"
              value={price}
              variant="outlined"
              onChange={(event) => setPrice(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="description"
              label="Kuvaus"
              fullWidth
              multiline
              rows={4}
              rowsMax={7}
              placeholder="Anna tarkempi kuvaus siivouksen yksityiskohdista."
              value={description}
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              className={styles.formControl}
              required
              id="special-offer-title"
              label="Kesto / h"
              placeholder="Palvelun kesto tunneissa"
              value={duration}
              variant="outlined"
              onChange={(event) => setDuration(event.target.value)}
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
                onClick={() => oDelete()}
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

export default AdminModifyOfferData;
