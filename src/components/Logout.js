import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }, [navigate]);
  return (
    <Box
      mt={5}
      display={"flex"}
      justifyContent={"center"}
      fontSize={"3xl"}
      fontWeight={"bold"}
    >
      Logged Out Successfully
    </Box>
  );
};

export default Logout;
