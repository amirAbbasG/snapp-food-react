import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  foodItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  shopLogo: {
    width: "5rem",
    height: "5rem",
    borderRadius: 10,
    boxShadow: theme.shadows[3],
    maxHeight: "70px",
    maxWidth: "70px",
    minWidth: "50px",
    marginLeft: "10px",
  },
  informationBtn: {
    borderRadius: 20,
    boxShadow: theme.shadows[3],
    color: theme.palette.text.secondary,
    margin: "30px 8px",
  },
  sideBox: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
  },
}));

export default useStyles;
