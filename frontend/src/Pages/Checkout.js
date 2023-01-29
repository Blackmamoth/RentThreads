import React, { useContext } from "react";
import CartCard from "../Components/CartCard";
import { ProductContext } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useContext(ProductContext);
  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tomorrow = new Date().setDate(new Date().getDate() + 1);
    const clothDetails = cart.map((cloth) => {
      return {
        clothId: cloth._id,
        rentPeriod: tomorrow,
        rentCharge: cloth.price,
      };
    });
    if (clothDetails.length < 1) {
      toast.info("Your cant is empty");
      return;
    }
    await rentCloth(clothDetails);
  };

  const rentCloth = async (clothDetails) => {
    await axios
      .post("http://localhost:5000/renter/clothes/rent", { clothDetails })
      .then((res) => {
        if (!res.data.error) {
          console.log(res);
          toast.success(
            "You successfully rented these clothes, please check your email for further information"
          );
          navigate("/");
        }
      })
      .catch((err) => toast.error(err.response.data.data.message));
  };

  return (
    <div className="mt-20">
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

                <p className="mt-1 text-sm text-gray-600">
                  For the purchase of
                </p>
              </div>

              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-100">
                    {cart.map((item, index) => {
                      const { name, img, price } = item;
                      return (
                        <CartCard
                          key={index}
                          name={name}
                          img={img}
                          price={price}
                        />
                      );
                    })}
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
                    type="button"
                    onClick={handleSubmit}
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
  );
};

export default Checkout;
