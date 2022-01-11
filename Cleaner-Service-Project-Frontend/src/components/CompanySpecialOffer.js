import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  backButton: {
    textAlign: "center",
    marginTop: 15,
  },
  leftColumn: {
    textAlign: "right",
  },
  rightColumn: {
    textAlign: "left",
  },
}));

const CompanySpecialOffer = ({ specialOffer }) => {
  const styles = useStyles();

  if (specialOffer !== null) {
    return (
      <Box border={1} m={1} p={2}>
        <Grid className={styles.info} container spacing={1} p={2} mb={2}>
          <Grid className={styles.leftColumn} item xs={5}>
            ID:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.product_id}
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Otsikko:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.product_name}
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Kuvaus:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.product_description}
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Siivoustunnit:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.work_hours} tuntia
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Kokonaishinta:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.product_price} euroa
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Luotu:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.created_at}
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Päättyy:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.ends_at}
          </Grid>
          <Grid className={styles.leftColumn} item xs={5}>
            Tarjous voimassa:
          </Grid>
          <Grid className={styles.rightColumn} item xs={7}>
            {specialOffer.product_is_available}
          </Grid>
        </Grid>
        <div className={styles.backButton}>
          {/*TODO in the future: add possibility to modify specialoffer data */}
          <PurpleButton
            variant="outlined"
            size="large"
            disabled
            color="primary"
            //   onClick={() =>
            //     (window.location.href = "/mypage/company/myspecialoffers")
            //   }
          >
            Muokkaa
          </PurpleButton>
        </div>
      </Box>
    );
  }
};

export default CompanySpecialOffer;
