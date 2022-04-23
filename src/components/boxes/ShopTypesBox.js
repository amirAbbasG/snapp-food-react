import React, { memo } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShopTypesBox = () => {
  const { root, icon, itemBox, iconButton } = useStyles();
  const shopTypes = useSelector((state) => state.shopTypes);

  return (
    <Grid wrap="nowrap" container columns={10} className={root}>
      {shopTypes &&
        shopTypes.map((item) => (
          <Grid xs={4} md={2} lg={1} key={item._id} item className={itemBox}>
            <Link to={`/shops/${item.type}`} state={{ data: false }}>
              <IconButton className={iconButton}>
                <img
                  className={icon}
                  alt={item.type}
                  src={`/images/${item.imageName.replace("jpg", "png")}`}
                />
              </IconButton>
            </Link>
            <Typography fontSize={11} color="gray">
              {item.type}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(ShopTypesBox);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      overflowX: "scroll",
    },
    alignItems: "center",
  },
  itemBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minWidth: "60px",
  },
  icon: {
    width: "3rem",
    height: "3rem",
  },
  iconButton: {
    transition: "transform 0.24s ease-in-out",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));
