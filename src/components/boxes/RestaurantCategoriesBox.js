import React, { memo, useEffect, useState } from "react";
import { Grid, Typography, Stack } from "@mui/material";
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
    <Stack px={"1%"}>
      <Typography mb={3} mr={"3%"} variant="h6">
        دسته بندی ها
      </Typography>
      <Grid container rowSpacing={4} columns={10} className={root}>
        {categories.map((category, index) => (
          <Grid className={item} item key={index} lg={2} md={3} sm={5} xs={5}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default memo(RestaurantCategoriesBox);

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "4rem",
  },
  item: {
    display: "flex",
    justifyContent: "center",
  },
});
