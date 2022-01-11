import React, { useState, useEffect } from "react";
import BackendConnection from "./BackendConnection";
import CompanySpecialOffer from "./CompanySpecialOffer";
import { PurpleButton } from "./CustomButtons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginBottom: 30,
  },
}));

const MySpecialOffers = ({ companyId }) => {
  const styles = useStyles();
  const [specialOffers, setSpecialOffers] = useState([]);

  const loadSpecialOffers = async () => {
    //console.log("loading all special offers now once");
    let specOffers = await BackendConnection.getAllSpecialOffers();
    if (specOffers.length > 0) {
      let temp = specOffers.filter((spec) => spec.supplier_id === companyId);
      if (temp.length > 0) {
        temp = temp.reverse();
        setSpecialOffers(temp);
      }
    }
  };

  useEffect(() => {
    loadSpecialOffers();
  }, [companyId]);

  const showSpecialOfferList = () => {
    return specialOffers.map((spec) => {
      return <CompanySpecialOffer key={spec.product_id} specialOffer={spec} />;
    });
  };

  if (specialOffers.length === 0) {
    return (
      <div>
        <h3>Et ole luonut vielä pikatarjouksia.</h3>
        <PurpleButton
          className={styles.button}
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => (window.location.href = "/mypage/company")}
        >
          Takaisin
        </PurpleButton>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Omat pikatarjoukset:</h3>
        {showSpecialOfferList()}
        <PurpleButton
          className={styles.button}
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => (window.location.href = "/mypage/company")}
        >
          Takaisin
        </PurpleButton>
      </div>
    );
  }
};

export default MySpecialOffers;
