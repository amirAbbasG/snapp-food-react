import React, { useState, useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import {
  ShopCard,
  SortShopsSelect,
  CategoriesBox,
  PriceRangeButtonGroup,
  FilterShopBox,
} from "../../components";
import useStyles from "./styles";
import { shopsContext } from "../../Contexts";
import { useDispatch } from "react-redux";
import {
  filterShopByData,
  filterShopByShopType,
} from "../../redux/action/shopsActions";

const Shops = () => {
  const classes = useStyles();
  const [categoryTitle, setCategoryTitle] = useState("همه دسته ها");
  const { filterShops } = useContext(shopsContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state;
  const { filter } = useParams();

  useEffect(() => {
    if (data) {
      dispatch(filterShopByData(data));
    } else {
      dispatch(filterShopByShopType(filter));
    }
  }, [filter, data]);

  return (
    <Grid container direction="column">
      <Grid container item justifyContent="flex-end">
        <Grid item p={1}>
          <SortShopsSelect />
        </Grid>
      </Grid>
      <Grid container item direction={{ sm: "column", md: "row" }}>
        <Grid item container direction="column" md={3} sm={12}>
          <CategoriesBox shopType={filter ? filter : "رستوران"} />
          <PriceRangeButtonGroup />
          <FilterShopBox />
        </Grid>
        <Grid item container md={9} sm={12}>
          {filterShops.map((shop) => (
            <Grid item key={shop._id} sm={12} md={6} lg={4} p={2}>
              <ShopCard shop={shop} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Shops;
