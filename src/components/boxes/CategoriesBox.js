import React, { memo } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Container,
  ButtonBase,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterShopByShopType } from "../../redux/action/shopsActions";

const CategoriesBox = ({ shopType }) => {
  const shopTypes = useSelector((state) => state.shopTypes);
  const categories = shopTypes.find((s) => s.type === shopType).categories;
  const dispatch = useDispatch();

  const handlePressCategory = (category) => {
    dispatch(filterShopByShopType(category));
  };

  const handlePressAllCategory = () => {
    dispatch(filterShopByShopType(shopType));
  };

  const { root, img, titleBox, categoryItem } = useStyles();
  return (
    <Grid item className={root} p={2}>
      <Paper sx={{ padding: 2 }}>
        <ButtonBase sx={{ width: "100%" }} onClick={handlePressAllCategory}>
          <Container className={titleBox}>همه دسته بندی ها</Container>
        </ButtonBase>
        {categories.map((category, index) => (
          <ButtonBase
            key={index}
            className={categoryItem}
            onClick={() => handlePressCategory(category)}
          >
            <Avatar
              className={img}
              src={`http://192.168.43.209:4000/${category}.jpg`}
            />
            <Typography color="GrayText">{category}</Typography>
          </ButtonBase>
        ))}
      </Paper>
    </Grid>
  );
};

export default memo(CategoriesBox);

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
