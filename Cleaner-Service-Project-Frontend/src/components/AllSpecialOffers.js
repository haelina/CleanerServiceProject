import React, { useState, useEffect } from "react";
import "./styles/TextPage.css";
import SpecialOffer from "./SpecialOffer.js";
import BackendConnection from "./BackendConnection.js";

const AllSpecialOffers = () => {
  const [specialOffers, setSpecialOffers] = useState([]);

  useEffect(() => {
    const getAllOffers = async () => {
      try {
        const offersListed = await BackendConnection.getAllSpecialOffers();
        if (offersListed.length === 0) {
          console.log(
            "Got empty list from backend, using example data instead"
          );
        } else {
          setSpecialOffers(offersListed);
        }
      } catch (err) {
        alert("Problem with loading specialoffer data from database");
      }
    };
    getAllOffers();
  }, []);

  const specialOfferList = specialOffers.map((offer) => {
    return (
      <SpecialOffer
        key={offer.product_id}
        id={offer.product_id}
        title={offer.product_name}
        //TODO: get real duration from db
        duration={4}
        companyName={offer.name}
        price={offer.product_price}
        description={offer.product_description}
      />
    );
  });

  return <div>{specialOfferList}</div>;
};

export default AllSpecialOffers;
