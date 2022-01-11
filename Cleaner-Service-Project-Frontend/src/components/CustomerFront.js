import { makeStyles } from "@material-ui/core/styles";
import Connection from "./BackendConnection";
import { Grid, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./styles/TextPage.css";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  info: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  leftColumn: {
    textAlign: "right",
  },
  rightColumn: {
    textAlign: "left",
  },
}));

const CustomerFront = ({ customerId }) => {
  const styles = useStyles();

  // const exampleData = {
  //   customer_id: 1,
  //   first_name: "Pasi",
  //   last_name: "Virtanen",
  //   street_address: "Kotikatu 3 A",
  //   city: "Tampere",
  //   postcode: "33310",
  //   phone: "+42312231",
  //   email: "email@email.com",
  // };

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Load all companies from database and search with given props companyId
    const loadCustomerData = async () => {
      const temp = await Connection.getAllCustomers();
      if (temp.length > 0) {
        //console.log(customerId);
        const index = temp.findIndex((cust) => cust.customer_id === customerId);
        setCustomer(temp[index]);
      }
    };
    loadCustomerData();
  }, [customerId]);

  if (customer === null || customer === undefined) {
    return (
      <div>
        <h2>Loading data</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Tervetuloa omille sivuille {customer.first_name}!</h1>
        <Box m={1} p={2}>
          <Grid className={styles.info} container spacing={1} p={2} mb={2}>
            <Grid item xs={12} sm={6}>
              {/* TODO in the future: Add details of orders */}
              <PurpleButton
                variant="outlined"
                size="large"
                color="primary"
                disabled
                fullWidth
                //onClick={() => (window.location.href = "/")}
              >
                Ostohistoria
              </PurpleButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PurpleButton
                variant="outlined"
                size="large"
                color="primary"
                fullWidth
                onClick={() =>
                  (window.location.href = `/mypage/customer/myofferrequests/${customer.email}`)
                }
              >
                Katso tarjouspyynnöt
              </PurpleButton>
            </Grid>
          </Grid>
        </Box>
        <h3>Tässä on asiakkaan yhteystiedot.</h3>
        <Box border={1} m={2} p={1}>
          <Grid className={styles.info} container spacing={1} p={2} mb={2}>
            <Grid className={styles.leftColumn} item xs={4} sm={5}>
              Nimi:
            </Grid>
            <Grid item xs={1} />
            <Grid className={styles.rightColumn} item xs={7} sm={6}>
              {customer.first_name} {customer.last_name}
            </Grid>
            <Grid className={styles.leftColumn} item xs={4} sm={5}>
              Puhelinnumero:
            </Grid>
            <Grid item xs={1} />
            <Grid className={styles.rightColumn} item xs={7} sm={6}>
              {customer.phone}
            </Grid>
            <Grid className={styles.leftColumn} item xs={4} sm={5}>
              Osoite:
            </Grid>
            <Grid item xs={1} />
            <Grid className={styles.rightColumn} item xs={7} sm={6}>
              {customer.street_address}
            </Grid>
            <Grid className={styles.leftColumn} item xs={4} sm={5}>
              Postinumero:
            </Grid>
            <Grid item xs={1} />
            <Grid className={styles.rightColumn} item xs={7} sm={6}>
              {customer.postcode}
            </Grid>
            <Grid className={styles.leftColumn} item xs={4} sm={5}>
              Postitoimipaikka:
            </Grid>
            <Grid item xs={1} />
            <Grid className={styles.rightColumn} item xs={7} sm={6}>
              {customer.city}
            </Grid>
            <Grid className={styles.leftColumn} item xs={4} sm={5}>
              Sähköpostiosoite:
            </Grid>
            <Grid item xs={1} />
            <Grid className={styles.rightColumn} item xs={7} sm={6}>
              {customer.email}
            </Grid>
          </Grid>
          <div className={styles.info}>
            <PurpleButton
              variant="outlined"
              size="large"
              color="primary"
              onClick={() =>
                (window.location.href = "/mypage/customer/modifydata")
              }
            >
              Muokkaa tietoja
            </PurpleButton>
          </div>
        </Box>
      </div>
    );
  }
};

export default CustomerFront;
