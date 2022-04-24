import React, { useContext, memo } from "react";
import { Button, ButtonGroup, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { priceRanges } from "../../utils/values";
import { shopsContext } from "../../Contexts";

const PriceRangeButtonGroup = () => {
  const { root, buttonGroup } = useStyles();
  const { priceRange, setPriceRange } = useContext(shopsContext);

  return (
    <Grid item className={root} p={2}>
      <Paper sx={{ padding: 2 }}>
        <Typography color="GrayText">کلاس قیمتی</Typography>
        <ButtonGroup
          className={buttonGroup}
          color="secondary"
          variant="contained"
        >
          {priceRanges.map((item, index) => (
            <Button
              sx={(theme) => ({
                width: "auto",
                borderRadius: 2,
                color: priceRange === item ? "#00B862" : "black",
                backgroundColor: priceRange === item ? "white" : "#EBEDF0",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "9px",
                },
              })}
              onClick={() => {
                setPriceRange(item);
                console.log(item);
              }}
              key={index}
            >
              {item.title}
            </Button>
          ))}
        </ButtonGroup>
      </Paper>
    </Grid>
  );
};

export default memo(PriceRangeButtonGroup);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  buttonGroup: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    borderRadius: 10,
    marginTop: 17,
    backgroundColor: theme.palette.secondary.dark,
    alignItems: "center",
    justifyItems: "center",
  },
}));
