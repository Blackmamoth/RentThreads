import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { ProductContext } from "../App";

const Home = () => {
  const { data, search } = useContext(ProductContext);

  const [inputText, setInputText] = useState("");

  return (
    <div className="mt-16">
      <section className=" ">
        <header aria-label="Page Header" className="bg-gray-50 mt-20">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <label className="sr-only" htmlFor="search">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      search(e.target.value);
                    }}
                    className="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                    id="search"
                    type="search"
                    placeholder="Search Clothes, prices, etc"
                  />

                  <button
                    type="button"
                    className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  >
                    <span className="sr-only">Submit Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="block h-6 w-px rounded-full bg-gray-200"
              ></span>

              <Link to="/cart" className="block shrink-0 text-xl">
                <span className="sr-only text-lg">Cart</span>
                <ion-icon className="text-3xl" name="cart"></ion-icon>
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl capitalize">
              Pick your outfits
            </h2>

            <p className="mt-4 text-blue-600"></p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((product, index) => {
              const { title, stock, rentPerDay, image, _id } = product;
              const status = stock > 0 ? "Available" : "Unavailable";
              return (
                <ProductCard
                  name={title}
                  status={status}
                  price={rentPerDay}
                  img={image}
                  _id={_id}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW HOME */}
    </div>
  );
};

export default Home;
