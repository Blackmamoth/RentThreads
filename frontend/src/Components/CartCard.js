import React, {useState, useContext, useEffect} from 'react'
import {ProductContext} from '../App'

const CartCard = ({name, img, price, day}) => {

  const {removeProduct, cart} = useContext(ProductContext);
  const [days, setDays] = useState(day)

  useEffect(()=>{
    cart.map((item)=>{
      if(item.img === img){
        item.day = days
        
      }
    })
  }, [days])

  return (
    <div>
          <li className="flex items-center">
            <img
              src={img}
              alt=""
              className="object-cover w-16 h-16 rounded"
            />

            <div className="ml-4">
              <h3 className="text-sm text-gray-900">{name}</h3>

              <dl className="mt-0.5 space-y-px text-[13px] text-gray-600">
                <div>
                  <dt className="inline">Price:</dt>
                  <dd className="inline"> ₹{price}/day</dd>
                </div>

                
              </dl>
            </div>

            <div className="flex items-center justify-end flex-1 gap-2">
              <form>
                <label htmlFor="Line3Qty" className="sr-only"> Day </label>
                  <small>Day: </small>
                <input
                  type="number"
                  min="1"
                  onChange={(e) => setDays(e.target.value)}
                  value={days}
                  id="Line3Qty"
                  className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                />
              </form>

              <button onClick={()=> removeProduct(img)} className="text-gray-600 transition hover:text-red-600">
                <span className="sr-only">Remove item</span>

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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
    </div>
  )
}

export default CartCard