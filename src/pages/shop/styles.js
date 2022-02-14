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
    marginLeft: 10,
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
    padding: "0 30px",
  },
}));

export default useStyles;
