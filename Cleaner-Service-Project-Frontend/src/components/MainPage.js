import React from "react";
import AllSpecialOffers from "./AllSpecialOffers";

const MainPage = () => {
  return (
    <div>
      <h1>Tervetuloa CleanBuddyn etusivulle!</h1>
      <h3>Tässä voimassaolevat pikatarjoukset, nappaa heti omasi.</h3>
      <AllSpecialOffers />
    </div>
  );
};

export default MainPage;
