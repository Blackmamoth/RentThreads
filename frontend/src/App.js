import React, { useState } from "react";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import SharedLayout from "./Pages/SharedLayout";
import SellerDashboard from "./Pages/SellerDashboard";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import Error from "./Pages/Error";
import About from "./Pages/About";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from "./Pages/Signin";

export const ProductContext = React.createContext();

function App() {


  const [cart, setCart] = useState([]);
  const [sellerProduct, setSellerProduct] = useState([]);

  function rentProduct(product) {
    setCart([...cart, product]);
    notify()
    console.log(cart)
  }

  function addProduct(product) {
    setSellerProduct([...sellerProduct, product]);
    
  }

  function removeProduct(img) {
    setCart(cart.filter((item) => item.img !== img));
    removeToast()

  }

  const notify = () => toast.success('Added to cart', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    const removeToast = () => toast.error('Removed', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  return (
    <ProductContext.Provider value={{cart, rentProduct, sellerProduct, addProduct, removeProduct}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

    <Route path="/user/signin" element={<Signin/>} ></Route>

      <Route path="/tl/clothes/get-clothes" element={<SellerDashboard/>}></Route>
      <Route path="/tl/clothes/add-cloth" element={<AddProduct/>}></Route>
      <Route path="/tl/clothes/update-clothes/:title" element={<EditProduct/>}></Route>
      <Route path="*" element={<Error/>} ></Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer
position="top-center"
autoClose={1500}
limit={3}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </ProductContext.Provider>
  );
}

export default App;
