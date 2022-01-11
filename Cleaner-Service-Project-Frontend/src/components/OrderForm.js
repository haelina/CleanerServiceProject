import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/TextPage.css";
import SpecialOfferDataBox from "./SpecialOfferDataBox";
import BackendConnection from "./BackendConnection";
import { CustomTextField } from "./CustomTextField";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const OrderForm = () => {
  let params = useParams();
  const styles = useStyles();
  const [specialOffer, setSpecialOffer] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    // Load all companies from database and search with given props companyId
    const loadSpecialOfferData = async () => {
      const temp = await BackendConnection.getAllSpecialOffers();
      if (temp.length > 0) {
        const value = temp.filter(
          (offer) => offer.product_id === parseInt(params.id)
        );
        setSpecialOffer(value[0]);
      }
    };
    loadSpecialOfferData();
  }, [params.id]);

  const getButton = () => {
    if (acceptTerms) {
      return (
        <PurpleButton
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => (window.location.href = "/")}
        >
          Vahvista tilaus
        </PurpleButton>
      );
    } else {
      return (
        <PurpleButton variant="outlined" size="large" color="primary" disabled>
          Vahvista tilaus
        </PurpleButton>
      );
    }
  };

  if (specialOffer === null) {
    return (
      <div>
        <h1>Loading special offer data.</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>Tilauksen tiedot:</h1>
          <div className="TextContainer">
            <form
              style={{ textAlign: "left", marginBottom: 30 }}
              autoComplete="false"
            >
              <h3>Siivoustarjouksen tiedot:</h3>
              <SpecialOfferDataBox specialOffer={specialOffer} />
            </form>
            <form style={{ textAlign: "left" }}>
              <h3>Asiakkaan tiedot:</h3>
              <div>
                <CustomTextField
                  className={styles.formControl}
                  required
                  id="orderform_firstname"
                  label="Etunimi"
                  placeholder="Etunimi"
                  variant="outlined"
                />
                <CustomTextField
                  className={styles.formControl}
                  required
                  id="orderform_lastname"
                  label="Sukunimi"
                  placeholder="Sukunimi"
                  variant="outlined"
                />
              </div>
              <div>
                <CustomTextField
                  className={styles.formControl}
                  required
                  id="orderfrom_address"
                  label="Osoite"
                  placeholder="Osoite"
                  variant="outlined"
                />
              </div>
              <div>
                <CustomTextField
                  className={styles.formControl}
                  required
                  id="orderform_postcode"
                  label="Postinumero"
                  placeholder="Postinumero"
                  variant="outlined"
                />
                <CustomTextField
                  className={styles.formControl}
                  required
                  id="orderform_city"
                  label="Postitoimipaikka"
                  placeholder="Postitoimipaikka"
                  variant="outlined"
                />
              </div>
              <div>
                <CustomTextField
                  className={styles.formControl}
                  id="orderform_phone"
                  label="Puhelinnumero"
                  placeholder="Puhelinnumero"
                  variant="outlined"
                />
              </div>
              <div>
                <CustomTextField
                  className={styles.formControl}
                  required
                  id="orderform_email"
                  type="email"
                  label="Sähköpostiosoite"
                  placeholder="Sähköpostiosoite"
                  variant="outlined"
                />
              </div>
              <CustomTextField
                className={styles.formControl}
                id="orderform_optionalinfo"
                label="Lisätietoa"
                fullWidth
                multiline
                rows={4}
                rowsMax={7}
                placeholder="Tähän voit antaa lisätietoa, esimerkiksi onko asunnossa lemmikkejä."
                variant="outlined"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    name="accept_terms"
                  />
                }
                label="Hyväksyn tilausehdot ja tietosuojakäytännöt."
              />
              <Link to="/privacy">Tietosuojaseloste</Link>
            </form>
          </div>
        </div>
        <div className="bottomButtons">{getButton()}</div>
      </div>
    );
  }
};

export default OrderForm;
