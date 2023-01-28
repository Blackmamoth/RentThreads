import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navName = ['Home', 'Cart', 'Checkout', 'About', 'Logout'];

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10">
      <div className="md:flex bg-white py-4 items-center justify-evenly ">
        <div className="font-bold text-2xl cursor-pointer flex items-center md:-mx-[10rem] mx-7">
          <Link to="/" className="mr-1 pt-2  ">
            <span >
            StyleLease
            </span>
          </Link>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <ul
          className={`md:flex md:items-center lg:mr-7  sm:-mr-[9rem] md:pb-0 pb-12 absolute md:static bg-white left-0 w-full md:w-auto md:z-0  font-semibold md:pl-0 pl-9 transition-all duration-300 ease-in ${
            open ? "top-[4.5rem]" : "top-[-490px]"
          } `}
        >

          {
            navName.map((element, index)=>{

              if(element == 'Home'){
                return <li className="md:ml-8 text-md md:my-0 my-7 " key={index}>
            
                <NavLink
                to="/"
                  className="text-gray-800 hover:text-indigo-600 duration-150"
                  onClick={() => setOpen(!open)}
                  
                >
                  {element}
                </NavLink>{" "}
              </li>
              }

              if(element == 'Logout'){
                return <li className="md:ml-8 text-md md:my-0 my-7 " key={index}>
            
                <NavLink
                to="/"
                  className="text-gray-800 hover:text-red-600 duration-150"
                  
                >
                  {element}
                </NavLink>{" "}
              </li>

              }

            return  <li className="md:ml-8 text-md md:my-0 my-7 " key={index}>
            
            <NavLink
            to={`/${element.toLowerCase()}`}
            onClick={() => setOpen(!open)}
              className={({ isActive }) =>{
                return  isActive ?  ' text-indigo-600 duration-150'  : 'text-gray-800 hover:text-indigo-600 duration-150' 
              }}
            
            >
              {element}
            </NavLink>{" "}
          </li>
            })
          }
        
        </ul>
      </div>
    </div>
  );
};

export default Navbar;