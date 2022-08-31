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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllCategoriesDropdown from "./AllCategoriesDropdown";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([]);
  const toast = useToast();
  const fetchCategories = async () => {
    const temp = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };
    axios
      .get("http://localhost:5000/api/category", config)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          temp.push(res.data[i].name);
        }
        setCategoriesList(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    fetchCategories();
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //eslint-disable-next-line
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: "",
    categoryName: "",
  });
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "dvbjetffn");
      fetch("https://api.cloudinary.com/v1_1/dvbjetffn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
          toast({
            title: "Image Uploaded Successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setProduct({ ...product, image: data.url.toString() });
        })
        .catch((err) => {
          toast({
            title: "Error Uploading Image!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (
      !product.id ||
      !product.name ||
      !product.price ||
      !product.description ||
      !product.image ||
      !product.categoryName
    ) {
      toast({
        title: "Please Fill All Fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (product.categoryName === "Select a Category") {
      toast({
        title: "Please Select a valid Category!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
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
      .post("http://localhost:5000/api/product/updateProduct", product, config)
      .then((res) => {
        toast({
          title: "Product Updated Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        setProduct({
          id: "",
          name: "",
          price: "",
          description: "",
          image: "",
          categoryName: "",
        });
      })
      .catch((err) => {
        toast({
          title: err.response.data.err,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
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
              Update a Product in the Database
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
            <FormControl id="Id" isRequired>
              <FormLabel>ID of the product</FormLabel>
              <Input
                type="text"
                placeholder="Enter Product ID to update"
                value={product.id}
                onChange={(e) => setProduct({ ...product, id: e.target.value })}
              />
            </FormControl>
            <FormControl id="Name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Updated Product Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Updated Product Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Updated Product Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="pic" isRequired>
              <FormLabel>Upload Updated Product Picture</FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => {
                  postDetails(e.target.files[0]);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Updated Category</FormLabel>
              <AllCategoriesDropdown
                categoriesList={categoriesList}
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, categoryName: e.target.value })
                }
              />
            </FormControl>
            <Stack spacing={12}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
                isLoading={picLoading}
              >
                Update Product
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UpdateProduct;
