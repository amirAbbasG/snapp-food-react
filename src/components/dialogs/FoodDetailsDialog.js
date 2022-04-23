import React, { useContext } from "react";
import { Grid, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import {
  MyDialog,
  CommentBox,
  RateBox,
  FoodPriceBox,
  FoodOrderButtons,
} from "../";
import { calculateRate } from "../../utils/rateCalculator";
import { globalContext } from "../../Contexts";

const FoodDetailsDialog = ({ foodId, open, handleClose }) => {
  const shopDetails = useSelector((state) => state.shopDetails);
  const food = shopDetails.foods.find((f) => f._id === foodId);
  const rate = calculateRate(food.comments);
  const { isXs } = useContext(globalContext);

  const { img, detailBox } = useStyles();

  return (
    <MyDialog width={isXs ? "90%" : "70%"} onClose={handleClose} open={open}>
      <Grid container p={1}>
        <Grid item xs={12} lg={5}>
          <img
            alt="food"
            className={img}
            src={`http://localhost:4000/${food.foodImage}`}
          />
        </Grid>
        <Grid item xs={12} lg={7} className={detailBox}>
          <Container sx={{ width: "100%", justifyContent: "space-between" }}>
            <Typography variant="h6" fontSize={{ xs: "12px", sm: "17px" }}>
              {food.name}
            </Typography>
            <RateBox rate={rate === 0 ? "جدید" : rate} />
          </Container>
          <Typography my={3} color="GrayText">
            {" "}
            {food.description}
          </Typography>
          <Container
            sx={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <FoodPriceBox price={food.price} discount={food.discount} />
            <FoodOrderButtons foodId={foodId} />
          </Container>
        </Grid>
      </Grid>
      <CommentBox comments={food.comments} id={foodId} />
    </MyDialog>
  );
};

export default FoodDetailsDialog;

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    height: "15rem",
    borderRadius: 10,
    boxShadow: theme.shadows[2],
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "10rem",
      height: "10rem",
    },
  },
  detailBox: {
    display: "flex",
    flexDirection: "column",
    padding: 14,
  },
}));
