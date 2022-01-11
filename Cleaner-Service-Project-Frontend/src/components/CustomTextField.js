import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const CustomTextField = withStyles({
  root: {
    // This changes the label colour
    "& label.Mui-focused": {
      //color: "#A6038D",
      color: "black",
    },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "green",
    // },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "gray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
  },
})(TextField);
