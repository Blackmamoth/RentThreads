import React, {useContext} from 'react'
import { ProductContext } from '../App'

const ProductCard = ({name, price, status, img}) => {

  const {rentProduct} = useContext(ProductContext)

  

  return (
    <div>
        <span href="#" className="group relative block bg-black">
  <img
    alt="Developer"
    src={img}
    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
  />

  <div className="relative p-8">
  <span className="tracking-wider text-white"> ₹{price}/day  </span>
  <span
  className={(status==="Available")?"inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700": "inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700"}
>

  <p className="whitespace-nowrap text-sm">{status}</p>
</span>

    <p className="text-2xl tracking-wider font-bold text-white">{name}</p>

    <div className="mt-64">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
        <button
  className="inline-flex items-center rounded border  px-8 py-3 text-white focus:outline-none"
  onClick={() => rentProduct({name, img, price, status, day:1})}
>
  <span className="text-sm font-medium"> Add to cart </span>


</button>
        </p>
      </div>
    </div>
  </div>
</span>

    </div>
  )
}

export default ProductCard