import React, { useEffect } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { SidebarContent } from "./SidebarContent";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        display={{ base: "none", md: "block" }}
        showMenuItems={true}
      />
    </Box>
  );
}
