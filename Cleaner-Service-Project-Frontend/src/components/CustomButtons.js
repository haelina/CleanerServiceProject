import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const HeaderButton = withStyles({
  root: {
    backgroundColor: "#A6038D",
    "&:hover": {
      backgroundColor: "#7D076C",
    },
    // "&:active": {
    //   boxShadow: "none",
    //   backgroundColor: "#0062cc",
    //   borderColor: "#005cbf",
    // },
    // "&:focus": {
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    // },
  },
})(Button);

export const PurpleButton = withStyles({
  root: {
    borderWidth: 2,
    borderColor: "#A6038D",
    color: "#A6038D",
    "&:hover": {
      backgroundColor: "#A6038D",
      borderColor: "rgb(100, 3, 82)",
      borderWidth: 2,
      color: "white",
    },
    // "&:active": {
    //   boxShadow: "none",
    //   backgroundColor: "#0062cc",
    //   borderColor: "#005cbf",
    // },
    // "&:focus": {
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    // },
  },
})(Button);

export const OrderButton = withStyles({
  root: {
    borderWidth: 2,
    borderColor: "white",
    color: "#A6038D",
    backgroundColor: "#DCDCD9",
    "&:hover": {
      backgroundColor: "#FB7EEC",
      borderColor: "white",
      borderWidth: 2,
      color: "black",
    },
    // "&:active": {
    //   boxShadow: "none",
    //   backgroundColor: "#0062cc",
    //   borderColor: "#005cbf",
    // },
    // "&:focus": {
    //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    // },
  },
})(Button);
