import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");
    const [image, setImage] = useState("");

    const [stock, setStock] = useState("");
    
    const showSuccessToast = (message) => toast.success(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  
    const showErrorToast = (message) => toast.error(message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })

    const {addProduct} = useContext(ProductContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addItem();
        setTitle("");
        setRentPerDay("");
        setImage("");
        setStock("");
      }
      
      const addItem = async () => {
        await axios.post("http://localhost:5000/tl/clothes/add-cloth", {title, rentPerDay, image, stock}).then(response => { 
          console.log(response)
          if(!response.data.error) {
            showSuccessToast(response.data.data.message);
            addProduct({title, rentPerDay, image, stock});
          navigate("/tl/dashboard")
          }
        }).then(err => showErrorToast(err.response.data.data.message))
    }

  return (
    <div>
         <div className="px-10 py-10">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              {/* NAVIGATION */}
              <nav aria-label="Breadcrumb" className="mb-8 ">
                <ol
                  role="list"
                  className=" mr-10 flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <li>
                    <div className="flex items-center">
                      <Link
                        to="/tl/dashboard"
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        Dashboard
                      </Link>
                      <svg
                        width="16"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>

                  <li className="text-sm">
                    <span
                      to="/"
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      Add
                    </span>
                  </li>
                </ol>
              </nav>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
             Add Product
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit} method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                       Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          required
                          type="text"
                          name="title"
                          id="title"
                          className="block w-full flex-1 rounded-md p-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          placeholder="Example: Nike Air Force 1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rentPerDay"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price-Per-Day (in INR)
                    </label>
                    <div className="mt-1">
                      <input
                      min="1"
                        type="number"
                        onChange={(e) => setRentPerDay(e.target.value)}
                        value={rentPerDay}
                        required
                        id="rentPerDay"
                        name="rentPerDay"
                        rows="3"
                        className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                      ></input>
                    </div>
                    
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {/* Upload Image */}
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="image-link"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image Link
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                        required
                          onChange={(e) => setImage(e.target.value)}
                          value={image}
                          type="text"
                          name="image-link"
                          id="image-link"
                          className="block w-full flex-1 rounded-md p-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          placeholder="https://images.unsplash.com/photo-1517962847327-e8032e806fcc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGNvdXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                        />
                      </div>
                    </div>
                    {/* Stock */}
                

                    <div className="col-span-3 sm:col-span-2">
                    <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-700"
                      >
                       Stock
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                        required
                        value={stock}
                        onChange={e=>{
                          setStock(e.target.value)
                        }}
                          type="number"
                          min="1"
                          id="stock"
                          className="block w-full flex-1 rounded-md p-2 border-gray-300 focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          
                        />
                      </div>
                    </div>

           

                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddProduct