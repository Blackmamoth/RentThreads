import React, { useState, useEffect } from "react";
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
import SignUp from "./Pages/SignUp";
import SignOption from "./Pages/SignOption";
import SellerSignUp from "./Pages/SellerSignUp";
import SellerSignin from "./Pages/SellerSignin";
import axios from "axios";


export const ProductContext = React.createContext();

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    localStorage.removeItem('token');
    return Promise.reject(error)
  }
)

function App() {

  useEffect(() => {
    getClothes()
   }, [])

  const [data, setData] = useState([]);

  const getClothes = async () => {
     await axios.post('http://localhost:5000/renter/clothes/get-clothes')
  .then(res => {
    console.log(res.data.data.clothDetails)
    setData(res.data.data.clothDetails)

  })
  .catch(err => console.log(err))
}

  const [cart, setCart] = useState([]);
  const [sellerProduct, setSellerProduct] = useState([]);

  function rentProduct(product) {
    setData(data.filter((item) => item.img != product.img));
    setCart([...cart, product]);
    console.log(product)
    console.log(data)
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

  function search(name){
    if(name === ""){
      getClothes()
      return
    }else{

      const propertyName = name.toLowerCase();
      const filteredData = data.filter(item=>{
        return Object.keys(item).some(key=>{
          return item[key].toString().includes(propertyName)
        })
      })
      setData(filteredData)
    }
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
    <ProductContext.Provider value={{cart, rentProduct, sellerProduct, addProduct, removeProduct, data, search}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

    <Route path="/user/signin" element={<Signin/>} ></Route>
    <Route path="/user/signup" element={<SignUp/>} ></Route>

    <Route path="/seller/signin" element={<SellerSignin/>} ></Route>
    <Route path="/seller/signup" element={<SellerSignUp/>} ></Route>
    <Route path="/signOption" element={<SignOption/>} ></Route>

      <Route path="/tl/dashboard" element={<SellerDashboard/>}></Route>
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
