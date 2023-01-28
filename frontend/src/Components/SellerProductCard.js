import React from 'react'
import { Link } from 'react-router-dom'

const SellerProductCard = ({title, img, price}) => {
  return (
    <div>
       <div className="overflow-hidden rounded-lg bg-gray-50">
      <div className="flex items-center h-[180px] overflow-hidden">
        <img src={img} alt={title} />
      </div>

      <div className="p-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div>
            <p className="text-gray-400"></p>
            <h2 className="mt-2 text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <Link to={`/tl/clothes/update-clothes/${title}`} className="hover:cursor-pointer mt-2 inline-block rounded-full text-sm font-semibold hover:text-white hover:bg-green-600 px-2 py-1 text-green-600"> Update </Link>
        </div>

        <hr className="mt-4 mb-4" />

        <div className="flex flex-wrap justify-between">
          <p className="inline-flex items-center">
          ₹{price}/day
          </p>

        
        </div>
      </div>
    </div>
      </div>
  )
}

export default SellerProductCard