import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import SellerProductCard from '../Components/SellerProductCard'
import { ProductContext } from '../App'

const SellerDashboard = () => {

    const {sellerProduct} = useContext(ProductContext);
    const localProd = JSON.parse(localStorage.getItem('sellerProduct'));
    return (
        <div>


            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                    <header>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            Product Collection
                        </h2>

                        <p className="max-w-md mt-4 text-gray-500">
                            Rent out your products to earn money by day.
                        </p>
                    </header>

                    <div className="block mt-8 lg:hidden">
                        <button
                            className="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600"
                        >

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
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
                        <div className="hidden space-y-4 lg:block">


                            <div>

                                <div className="mt-1 space-y-2">
                                    <details
                                        className="overflow-hidden rounded  [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer"
                                        >

                                            <Link
                                                className="inline-block rounded border border-gray-900 px-12 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring "
                                               to="/tl/clothes/add-cloth"
                                            >
                                                Add Product
                                            </Link>


                                        </summary>


                                    </details>



                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              { sellerProduct.map((product, index) => {
                                        const {title, img, price} = product
                                        return <SellerProductCard key={index} title={title} img={img} price={price} />
                                    }) 
                                    
                                    
                              }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default SellerDashboard