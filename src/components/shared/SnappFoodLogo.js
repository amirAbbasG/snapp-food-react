import React from "react";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const SnappFoodLogo = ({ className }) => {
  return (
    <Link to="/">
      <Box
        sx={{
          transition: "transform 0.24s ease-in-out",
          "&:hover": {
            transform: "scale(1.14)",
          },
        }}
      >
        <img
          style={{
            minWidth: "40px",
            minHeight: "40px",
            width: "4.4vw",
            height: "4.4vw",
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
