import React from "react";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const SnappFoodLogo = ({ className }) => {
  return (
    <Link to="/">
      <Box
        sx={{
          marginLeft: "1rem",
          transition: "transform 0.24s ease-in-out",
          "&:hover": {
            transform: "scale(1.14)",
          },
        }}
      >
        <img
          style={{
            width: "4.4rem",
            height: "4.4rem",
          }}
          className={className}
          src="/images/logo-name.png"
          alt="snapp food logo"
        />
      </Box>
    </Link>
  );
};

export default SnappFoodLogo;
