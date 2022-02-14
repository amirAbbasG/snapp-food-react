import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { getMeal } from "../../utils/mealCalculator";
import { RestaurantCategoriesBox, ShopsShowCasesBox } from "../../components";
import { calculateRate, getFoodWithDiscount } from "../../utils/rateCalculator";

const Main = () => {
  const shops = useSelector((state) => state.shops);
  return (
    <Grid>
      <RestaurantCategoriesBox />
      <ShopsShowCasesBox
        data={[...shops].filter((s) => s.shopType === "رستوران")}
        title={` ${getMeal()} در اسنپ فود`}
      />
      <ShopsShowCasesBox
        data={[...shops].filter((s) => getFoodWithDiscount(s.foods).length > 0)}
        title="دارای تخفیف"
      />
      <ShopsShowCasesBox
        data={[...shops].filter((s) => s.coupons.length > 0)}
        title="دارای کوپن"
      />
      <ShopsShowCasesBox
        data={[...shops].sort(
          (a, b) => calculateRate(b.comments) - calculateRate(a.comments)
        )}
        title="بهترین ها در اسنپ فود"
      />
    </Grid>
  );
};

export default Main;
