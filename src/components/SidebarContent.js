import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { AiFillDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FcAddDatabase, FcDeleteDatabase } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";

const LinkItems = [
  {
    name: "Add a product",
    icon: IoAddCircleSharp,
  },
  {
    name: "Delete a product",
    icon: AiFillDelete,
  },
  {
    name: "Update a product",
    icon: MdUpdate,
  },
  {
    name: "Add a category",
    icon: FcAddDatabase,
  },
  {
    name: "Delete a category",
    icon: FcDeleteDatabase,
  },
];

export const SidebarContent = () => {
  return (
    <Box display={"flex"}>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "100%", md: "20%" }}
        pos="fixed"
        h="full"
        mt={4}
      >
        {
          <NavItem key={"Logout"} icon={AiOutlineLogout}>
            {"Logout"}
          </NavItem>
        }
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box
        ml={"25%"}
        height={"100%"}
        width={"auto"}
        mt={"16%"}
        display={{ base: "none", md: "block" }}
      >
        <Text textAlign={"center"} fontSize={"6xl"} fontWeight={"extrabold"}>
          Welcome to Admin Dashboard
        </Text>
      </Box>
    </Box>
  );
};
