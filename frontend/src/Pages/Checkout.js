import React, {useContext} from 'react'
import CartCard from '../Components/CartCard'
import { ProductContext } from '../App'

const Checkout = () => {

  const { cart } = useContext(ProductContext)
  const total = cart.reduce((acc, item) => { return acc + item.price }, 0)


  return (
    <div className='mt-20'>

<section>
  <h1 className="sr-only">Checkout</h1>

  <div className="grid grid-cols-1 mx-auto max-w-screen-2xl md:grid-cols-2">
    <div className="py-12 bg-gray-50 md:py-52">
      <div className="max-w-lg px-4 mx-auto space-y-8 lg:px-8">
        <div className="flex items-center">

          <h2 className="ml-4 font-medium text-gray-900">USERNAME</h2>
        </div>

        <div>
          <p className="text-2xl font-medium tracking-tight text-gray-900">
            ₹{total}
          </p>

          <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
        </div>

        <div>
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-100">
             
            {
      cart.map((item, index)=>{
        const {name, img, price} = item
        return <CartCard key={index} name={name} img={img} price={price}  />
      })
     }
             
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="py-12 bg-white md:py-52">
      <div className="max-w-lg px-4 mx-auto lg:px-8">
        <form className="grid grid-cols-6 gap-4">
         

          <div className="col-span-6">
            <button
              className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
            >
              RENT
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Checkout