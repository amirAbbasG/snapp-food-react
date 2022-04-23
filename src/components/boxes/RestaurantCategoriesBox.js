import React, { memo, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { CategoryCard } from "../";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash/lang";
const RestaurantCategoriesBox = () => {
  const { root, item } = useStyles();
  const shopTypes = useSelector((state) => state.shopTypes);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isEmpty(shopTypes)) {
      const { categories } = shopTypes.find((s) => s.type === "رستوران");
      setCategories(categories);
    }
  }, [shopTypes]);

  return (
    <>
      <Typography mb={3} mr={"2%"} variant="h6">
        دسته بندی ها
      </Typography>
      <Grid container rowSpacing={4} className={root}>
        {categories.map((category, index) => (
          <Grid
            className={item}
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
          >
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default memo(RestaurantCategoriesBox);

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "4rem",
    alignContent: "center",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
