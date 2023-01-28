import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import data from '../DummyData'

const Home = () => {


  return (

    <div className='mt-16' >
        <section className=" ">
            
<header aria-label="Page Header" className="bg-gray-50 mt-20">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex items-center justify-end gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <label className="sr-only" htmlFor="search"> Search </label>

          <input
            className="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
            id="search"
            type="search"
            placeholder="Search Clothes"
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

        <a
          href="#"
          className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
        >
          <span className="sr-only">Notifications</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </a>
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

    <div className="mt-8">
    <div className="mt-8 sm:flex sm:justify-around sm:items-center ">
     

      <div className=" sm:flex sm:gap-4">
        <div className="relative">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Availability </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div
              className="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2"
            >
              <div className="bg-white border border-gray-200 rounded w-96">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700"> 0 Selected </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Reset
                  </button>
                </header>

                <ul className="p-4 space-y-1 border-t border-gray-200">
                  <li>
                    <label
                      htmlFor="FilterInStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterInStock"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        In Stock (5+)
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterPreOrder"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterPreOrder"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Pre Order (3+)
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterOutOfStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterOutOfStock"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Out of Stock (10+)
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        <div className="relative">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Price </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div
              className="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2"
            >
              <div className="bg-white border border-gray-200 rounded w-96">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">
                    The highest price is $600
                  </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Reset
                  </button>
                </header>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>

                      <input
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="From"
                        className="w-full border-gray-200 rounded-md shadow-sm sm:text-sm"
                      />
                    </label>

                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>

                      <input
                        type="number"
                        id="FilterPriceTo"
                        placeholder="To"
                        className="w-full border-gray-200 rounded-md shadow-sm sm:text-sm"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        <div className="relative ">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Colors </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div
              className="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2"
            >
              <div className="bg-white border border-gray-200 rounded w-96">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700"> 0 Selected </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Reset
                  </button>
                </header>

                <ul className="p-4 space-y-1 border-t border-gray-200">
                  <li>
                    <label
                      htmlFor="FilterRed"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterRed"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Red
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterBlue"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterBlue"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Blue
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterGreen"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterGreen"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Green
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterOrange"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterOrange"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Orange
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterPurple"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterPurple"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Purple
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterTeal"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterTeal"
                        className="w-5 h-5 border-gray-300 rounded"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Teal
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className=" sm:block">
        <label htmlFor="SortBy" className="sr-only">SortBy</label>

        <select id="SortBy" className="h-10 text-sm border-gray-300 rounded">
          <option>Sort By</option>
          <option value="Title, DESC">Title, DESC</option>
          <option value="Title, ASC">Title, ASC</option>
          <option value="Price, DESC">Price, DESC</option>
          <option value="Price, ASC">Price, ASC</option>
        </select>
      </div>
    </div>
    </div>
  </div>
</header>

  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold sm:text-4xl capitalize">Pick your outfits</h2>

      <p className="mt-4 text-blue-600">
       
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
   

   
    {
      data.map((product, index) => {
        const { name, status, price, img } = product
        return <ProductCard name={name} status={status} price={price} img={img} key={index} />
      })
    }
   
   
    </div>
  </div>
</section>

{/* NEW HOME */}


    </div>
  )
}

export default Home