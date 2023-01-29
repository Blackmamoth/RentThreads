import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SellerSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showSuccessToast = (message) => toast.success(message);

  const showErrorToast = (message) => toast.error(message);

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }
    await axios
      .post("http://localhost:5000/tl/auth/login", { email, password })
      .then((response) => {
        if (!response.data.error) {
          showSuccessToast(response.data.data.message);
          localStorage.setItem("token", response.data.data.access_token);
          setTimeout(() => {
            navigate("/tl/dashboard");
          }, 3000);
        }
      })
      .catch((err) => {
        showErrorToast(err.response.data.data.message);
      });
  };

  return (
    <div>
      <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <form
            action="POST"
            className="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4"
          >
            <p className="text-lg font-semibold text-center">Login</p>

            <div>
              <div className="relative mt-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Email"
                  autoComplete="off"
                />
              </div>
              <div className="relative mt-1">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Password"
                  autoComplete="off"
                />
              </div>
            </div>

            <button
              onClick={login}
              type="submit"
              className="block w-full px-5 py-3 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Don't have an account?{" "}
              <Link to="/seller/signup" className="text-gray-700 underline">
                Sign up
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSignin;
