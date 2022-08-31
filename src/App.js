import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import AddProduct from "./components/Admin/AddProduct";
import AddCategory from "./components/Admin/AddCategory";
import DeleteCategory from "./components/Admin/DeleteCategory";
import DeleteProduct from "./components/Admin/DeleteProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Logout from "./components/Logout";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/addaproduct" element={<AddProduct />} exact />
        <Route path="/addacategory" element={<AddCategory />} exact />
        <Route path="/deleteacategory" element={<DeleteCategory />} exact />
        <Route path="/deleteaproduct" element={<DeleteProduct />} exact />
        <Route path="/updateaproduct" element={<UpdateProduct />} exact />
        <Route path="/logout" element={<Logout />} exact />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
