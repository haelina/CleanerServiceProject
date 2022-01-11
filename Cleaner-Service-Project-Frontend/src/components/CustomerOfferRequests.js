import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import BackendConnection from "./BackendConnection";
import "./styles/TextPage.css";
import CompOffReqBox from "./CompOffReqBox";
import { PurpleButton } from "./CustomButtons";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 10,
    marginBottom: 30,
  },
}));

const CustomerOfferRequests = () => {
  const styles = useStyles();
  const params = useParams();
  const [offerRequests, setOfferRequests] = useState([]);

  const loadOfferRequests = async () => {
    console.log("loading offer request now once");
    let offerReqs = await BackendConnection.getOfferRequestsBySupplier("");
    if (offerReqs.length > 0) {
      let results = offerReqs.filter(
        (req) => req.email === params.customerEmail
      );
      // Reverse result array because we want to show newest offer requests first
      results = results.reverse();
      if (results.length > 0) {
        setOfferRequests(results);
      }
    }
  };

  useEffect(() => {
    loadOfferRequests();
  }, []);

  const showOfferList = () => {
    return offerRequests.map((req) => {
      return (
        <CompOffReqBox key={req.request_id} offerReq={req} isCompany={false} />
      );
    });
  };

  if (offerRequests.length === 0) {
    return (
      <div>
        <h3>Ei tarjouspyyntöjä vielä.</h3>
        <PurpleButton
          className={styles.button}
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => (window.location.href = "/mypage/customer")}
        >
          Takaisin
        </PurpleButton>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Tässä lähetetyt tarjouspyynnöt:</h1>
        {showOfferList()}
        <PurpleButton
          className={styles.button}
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => (window.location.href = "/mypage/customer")}
        >
          Takaisin
        </PurpleButton>
      </div>
    );
  }
};

export default CustomerOfferRequests;
