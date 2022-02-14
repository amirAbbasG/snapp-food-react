import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paymentButton: {
    width: "100%",
    padding: 10,
  },
  rightBox: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  foodBox: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid",
    borderTop: "1px solid",
    borderTopColor: theme.palette.secondary.dark,
    borderBottomColor: theme.palette.secondary.dark,
    margin: 14,
  },
  foodItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roundedBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid",
    borderColor: theme.palette.success.light,
    borderRadius: 10,
    padding: 10,
  },
}));

export default useStyles;
