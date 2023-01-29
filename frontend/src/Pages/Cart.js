import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartCard from '../Components/CartCard'
import { ProductContext } from '../App'

const Cart = () => {

  const { cart } = useContext(ProductContext)

  const total = cart.reduce((acc, item) => { return acc + item.price * item.day }, 0)
  console.log(total)

  

  return (
    <div>

<section>
  <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 mt-14 ">
    <div className="max-w-3xl mx-auto">
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
      </header>

      <div className="mt-8">
        <ul className="space-y-4">
     
     {
      cart.map((item, index)=>{
        const {name, img, price, day} = item
        return <CartCard key={index} name={name} img={img} price={price} day={day}  />
      })
     }

        </ul>

        <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
             

              <div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>₹{total}</dd>
              </div>
            </dl>

          
            <div className="flex justify-end">
              <Link
                to="/checkout"
                className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Cart