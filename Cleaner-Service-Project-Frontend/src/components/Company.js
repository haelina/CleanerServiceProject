import React from "react";
import Box from "@material-ui/core/Box";
import "./styles/Company.css";
import { Link } from "react-router-dom";

const Company = ({
  id,
  name,
  contactPerson,
  phonenumber,
  address,
  postnumber,
  city,
  email,
  description,
}) => {
  return (
    <Box className="Company" border={1} mb={2} p={1}>
      <div className="FlexContainer">
        <div className="FlexItem1">
          <h2>{name}</h2>
          <p>{address}</p>
          <p>
            {postnumber} {city}
          </p>
          <p>{phonenumber}</p>
          <p>{email}</p>
        </div>
        <div className="FlexItem2">
          <div className="offerLink">
            <Link to="/offerRequest">Pyydä tarjous</Link>
          </div>
          <p className="descField">{description}</p>
        </div>
      </div>
    </Box>
  );
};

export default Company;
