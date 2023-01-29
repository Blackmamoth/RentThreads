import React from 'react'
import { Link } from 'react-router-dom'

const SignOption = () => {
  return (
    <div>
        <section class="bg-white">
  <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="text-4xl font-bold text-gray-900 sm:text-4xl">
        Welcome to StyleLease
      </h1>

      <p class="mt-4 text-gray-500 sm:text-xl">
        
      </p>
    </div>

    <div class="mt-8 sm:mt-12 ">
      <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link to="/user/signin" >
        <div
          class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center hover:shadow-md hover:cursor-pointer"
          >
          <dt class="order-last text-lg font-medium text-gray-500">
            Rent the clothes
          </dt>

          <dd class="text-4xl font-extrabold text-gray-900 md:text-5xl">
           Renter
          </dd>
        </div>
        </Link>
        <Link to="/seller/signin" >
        <div
          class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center hover:shadow-md hover:cursor-pointer"
        >
          <dt class="order-last text-lg font-medium text-gray-500">
           Make your clothes available for rent
          </dt>

          <dd class="text-4xl font-extrabold text-gray-900 md:text-5xl">Seller</dd>
        </div>
        </Link>
        
      </dl>
    </div>
  </div>
</section>

    </div>
  )
}

export default SignOption