import React from "react";
import { Box, Grid } from "@material-ui/core";
import "./styles/SpecialOffer.css";
import { makeStyles } from "@material-ui/core/styles";
import { OrderButton } from "./CustomButtons";
import bgImage from "./img/offerbg2.png";

const useStyles = makeStyles((theme) => ({
  container: {
    //backgroundColor: "#fffcf4",
    backgroundImage: "linear-gradient(45deg, rgb(253, 236, 198), #fffcf4)",
    //padding: 10,
    borderRadius: 5,
  },
  leftColumn: {
    //backgroundColor: "rgb(253, 236, 198)",
    borderRadius: 5,
    textAlign: "left",
    color: "black",
  },
  rightColumn: {
    textAlign: "right",
  },
  title: {
    color: "#A6038D",
    //color: "white",
  },
  price: {
    [theme.breakpoints.down("sm")]: { paddingRight: 20 },
    [theme.breakpoints.up("sm")]: { paddingTop: 0, paddingRight: 30 },
    color: "white",
  },
  button: {
    [theme.breakpoints.down("sm")]: { paddingRight: 10 },
    [theme.breakpoints.up("sm")]: { paddingRight: 40 },
    paddingTop: 10,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "100%",
  },
}));

const SpecialOffer = ({
  id,
  title,
  companyName,
  duration,
  price,
  description,
}) => {
  const styles = useStyles();
  return (
    <Box className="SpecialOffer" border={1} mb={2} p={1}>
      <Grid container spacing={1} className={styles.container}>
        {/* <Grid item xs={1} sm={2} /> */}
        <Grid item xs={6} sm={6} className={styles.leftColumn}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p>Kesto: {duration}h</p>
            <p>Hinta: {price}€</p>
            <p>Yritys: {companyName}</p>
          </div>
        </Grid>
        <Grid item xs={6} sm={6} className={styles.rightColumn}>
          <div className={styles.button}>
            <h2 className={styles.price}>{price} €</h2>
            <OrderButton
              color="#ff0000"
              size="large"
              variant="contained"
              onClick={() => (window.location.href = `/orderform/${id}`)}
            >
              Osta diili!
              {/* <Link to={`/orderform/${id}`}>Osta diili! </Link> */}
            </OrderButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} className={styles.leftColumn}>
          <p>{description}</p>
        </Grid>

        {/* <Grid item xs={1} sm={2} /> */}
      </Grid>

      {/* <div className="OfferContainer">
        <div className="FlexIt1">
          <h2>{title}</h2>
          <p>Kesto: {duration}h</p>
          <p>Hinta: {price}€</p>
          <p>Yritys: {companyName}</p>
        </div>
        <div className="FlexIt2">
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => (window.location.href = `/orderform/${id}`)}
          >
            Osta diili!
          </Button>
        </div>
        <div className="FlexIt3">
          <p>{description}</p>
        </div>
      </div> */}
    </Box>
  );
};

export default SpecialOffer;
