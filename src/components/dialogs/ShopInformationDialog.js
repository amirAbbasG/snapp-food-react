import React from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  LinearProgress,
  Grid,
  linearProgressClasses,
} from "@mui/material";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import Mapir from "mapir-react-component";
import { LocationOn, Star } from "@mui/icons-material";
import { range } from "lodash";
import { MyDialog, RateBox } from "../";
import { calculateRate } from "../../utils/rateCalculator";
import { CommentBox } from "../";
import { Map } from "../../utils/map";

const ShopInformationDialog = ({ open, handleClose }) => {
  const { informationBox, shopLogo, scoreRow, starBox, mapBox, rateBox } =
    useStyles();

  const shopDetails = useSelector((state) => state.shopDetails);
  const comments = shopDetails.comments;
  const { city, exactAddress, longitude, latitude } = shopDetails.address;
  const commentsCount = comments.length;
  const nonZeroScoreCommentsCount = [...comments].filter(
    (c) => c.score !== 0
  ).length;
  const theme = useTheme();
  const scoreRanges = [
    { color: theme.palette.success.dark, value: 5 },
    { color: theme.palette.success.main, value: 4 },
    { color: theme.palette.success.light, value: 3 },
    { color: theme.palette.warning.light, value: 2 },
    { color: theme.palette.error.light, value: 1 },
  ];

  const getPersentageOfScore = (score) => {
    const scoreCount = [...comments].filter(
      (c) => Math.floor(c.score) === score
    ).length;
    const scorePercentage = (scoreCount * 100) / nonZeroScoreCommentsCount;
    return Math.floor(scorePercentage);
  };

  return (
    <MyDialog width="100%" onClose={handleClose} open={open}>
      <Box className={informationBox}>
        <Stack direction="row" justifyContent="space-between">
          <img
            alt="shop logo"
            className={shopLogo}
            src={`http://localhost:4000/${shopDetails.shopLogo}`}
          />
          <Stack pr={1}>
            <Typography
              fontSize={{ xs: 13, sm: 17 }}
              fontWeight="bold"
              mt={2}
            >{`${shopDetails.shopName} (${city})`}</Typography>
            <Typography color="gray" fontSize={{ xs: 11, sm: 14 }} mt={1}>
              {shopDetails.shopType} ، {shopDetails.category}
            </Typography>
            <Container>
              <LocationOn style={{ color: "gray" }} />
              <Typography mr={0.3}>
                {exactAddress && exactAddress.slice(0, 34)}....
              </Typography>
            </Container>
          </Stack>
          <Stack className={mapBox}>
            <Mapir center={[51.42047, 35.729054]} Map={Map}>
              <Mapir.Marker
                coordinates={[longitude, latitude]}
                anchor="bottom"
              />
            </Mapir>
          </Stack>
        </Stack>
      </Box>
      <Box className={scoreRow} sx={{ marginTop: 5 }}>
        <Stack className={rateBox}>
          <RateBox fontSize={14}>{calculateRate(comments)}</RateBox>
          <Typography
            fontSize={{ xs: "11px", sm: "14px" }}
            mt={1}
          >{`از مجموع ${nonZeroScoreCommentsCount} امتیاز و ${commentsCount} نظر`}</Typography>
        </Stack>
        <Stack sx={{ flex: 1, width: "100%" }}>
          {scoreRanges.map(({ color, value }) => (
            <Grid container alignItems="center" spacing={1} key={value}>
              <Grid item xs={6} sm={3} className={starBox}>
                {range(0, value).map((val) => (
                  <Star
                    key={val}
                    sx={{ margin: 0.4, color: "#EBEDF0", fontSize: 14 }}
                  />
                ))}
              </Grid>
              <Grid item xs={6} sm={9}>
                <LinearProgress
                  sx={{
                    height: "1.7px",
                    width: "100%",
                    backgroundColor: "#EBEDF0",
                    [`& .${linearProgressClasses.bar1Determinate}`]: {
                      backgroundColor: color,
                    },
                  }}
                  variant="determinate"
                  value={getPersentageOfScore(value)}
                />
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Box>
      <CommentBox comments={comments} id={shopDetails._id} />
    </MyDialog>
  );
};

export default ShopInformationDialog;

const useStyles = makeStyles((theme) => ({
  informationBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "7px",
  },
  shopLogo: {
    width: "6rem",
    height: "6rem",
    borderRadius: 10,
    boxShadow: theme.shadows[3],
    marginLeft: 10,
  },
  scoreRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  starBox: {
    direction: "ltr",
    display: "flex",
    flexDirection: "row",
  },
  mapBox: {
    width: "200px",
    height: "120px",
    overflow: "hidden",
    borderRadius: 10,
    position: "absolute",
    left: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rateBox: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      mb: "8px",
    },
  },
}));
