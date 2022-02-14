import React, { useContext, memo } from "react";
import { Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { shopsContext } from "../../Contexts";
import { FilterItem } from "../";

const FilterShopBox = () => {
  const { root, img, titleBox, categoryItem } = useStyles();

  const { setIsFreeExpress, isFreeExpress, haveCoupon, setHaveCoupon } =
    useContext(shopsContext);

  return (
    <Grid item className={root} p={2}>
      <Paper sx={{ padding: 2 }}>
        <FilterItem
          title="دارای کوپن"
          value={haveCoupon}
          onToggle={() => setHaveCoupon(!haveCoupon)}
        />
        <FilterItem
          title="ارسال رایگان"
          value={isFreeExpress}
          onToggle={() => setIsFreeExpress(!isFreeExpress)}
        />
      </Paper>
    </Grid>
  );
};

export default memo(FilterShopBox);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  img: {
    marginLeft: 14,
    width: 34,
    height: 34,
    boxShadow: theme.shadows[2],
  },
  titleBox: {
    borderRadius: 10,
    backgroundColor: theme.palette.secondary.dark,
    padding: "1rem !important",
    fontSize: 17,
    marginBottom: 17,
    fontWeight: "bold",
  },

  categoryItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
}));
