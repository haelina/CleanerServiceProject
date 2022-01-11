import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import BackendConnection from "./BackendConnection";
import "./styles/TextPage.css";
import CompOffReqBox from "./CompOffReqBox";
import { PurpleButton } from "./CustomButtons";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backButton: {
    textAlign: "center",
    marginBottom: 30,
  },
}));

const CompanyOfferRequests = () => {
  const styles = useStyles();
  const params = useParams();
  const [offerRequests, setOfferRequests] = useState([]);

  const loadOfferRequests = async () => {
    //console.log("loading offer request now once");
    let offerReqs = await BackendConnection.getOfferRequestsBySupplier(
      params.companyName
    );
    if (offerReqs.length > 0) {
      // Reverse result array because we want to show newest offer requests first
      offerReqs = offerReqs.reverse();
      setOfferRequests(offerReqs);
    }
  };

  useEffect(() => {
    loadOfferRequests();
  }, []);

  const showOfferList = () => {
    return offerRequests.map((req) => {
      return (
        <CompOffReqBox key={req.request_id} offerReq={req} isCompany={true} />
      );
    });
  };

  if (offerRequests.length === 0) {
    return (
      <div>
        <h2>Sinulle ei ole vielä saapunut tarjouspyyntöjä.</h2>
        <PurpleButton
          className={styles.backButton}
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
        <h1>Tässä saapuneet tarjouspyynnöt:</h1>
        {showOfferList()}
        <PurpleButton
          className={styles.backButton}
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

export default CompanyOfferRequests;
