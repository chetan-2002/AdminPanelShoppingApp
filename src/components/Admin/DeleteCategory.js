import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeleteCategory = () => {
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const [categoryId, setCategoryId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (categoryId.length === 0) {
      toast({
        title: "Please enter a valid category id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    axios
      .post(
        "http://localhost:5000/api/category/deleteCategory",
        { id: categoryId },
        config
      )
      .then((res) => {
        toast({
          title: "Category deleted Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: err.response.data.err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Box fontSize={"4xl"} display={"flex"}>
            <Text
              textAlign={"center"}
              fontSize={"4xl"}
              fontWeight={"extrabold"}
            >
              Delete a Category from the Database
            </Text>
          </Box>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="Name" isRequired>
              <FormLabel>Enter Category Id</FormLabel>
              <Input
                type="text"
                placeholder="Enter Category Id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </FormControl>
            <Stack spacing={12}>
              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Delete Category
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default DeleteCategory;
