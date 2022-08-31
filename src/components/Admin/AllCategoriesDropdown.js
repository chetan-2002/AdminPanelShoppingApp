import { Select } from "@chakra-ui/react";
import React from "react";

const AllCategoriesDropdown = ({ categoriesList, onChange }) => {
  // console.log("value", value);
  return (
    <Select placeholder="Select a Category" onChange={onChange}>
      {categoriesList.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};

export default AllCategoriesDropdown;
