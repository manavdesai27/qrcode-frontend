import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function AddItem({ userId, setShowModal }) {
  const token = sessionStorage.getItem("token");
  const [showDropdown, setshowDropdown] = useState(false);
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/user/add", {
        headers: {
          "user-auth-token": token,
        },
        pName: Name,
        pPrice: Price,
        category: Category,
        userId,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(203, 203, 203, 0.3)",
      }}
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div class="relative p-4 m-auto w-full max-w-2xl h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <div class="flex justify-between items-start p-4 rounded-t border-b">
            <h3 class="text-xl font-semibold text-gray-900">Add an Item</h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="defaultModal"
              onClick={() => setShowModal(false)}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-2 space-y-6">
            <div class="flex items-center justify-center p-6">
              <div class="mx-auto w-full max-w-[550px]">
                <form action="" method="POST">
                  <div class="mb-5">
                    <label
                      for="name"
                      class="mb-3 block text-lg text-start font-medium text-black"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name={Name}
                      id="name"
                      placeholder="Name of the Item"
                      class="w-full rounded-md border border-primary bg-transparent py-3 px-6 text-base font-medium outline-none focus:border-secondary focus:shadow-md"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div class="mb-5">
                    <label
                      for="phone"
                      class="mb-3 block text-lg text-start font-medium text-black"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name={Price}
                      id="email"
                      placeholder="Price of the Item"
                      class="w-full rounded-md border border-primary py-3 px-6 text-base bg-transparent font-medium outline-none focus:border-secondary focus:shadow-md"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div class="w-full mx-auto">
                    <label
                      for="select"
                      class="text-start font-semibold block py-2"
                    >
                      Category:
                    </label>
                    <div class="relative">
                      <div class="h-10 bg-white flex border border-gray-200 rounded items-center">
                        <input
                          value={Category}
                          name="select"
                          id="select"
                          class="w-full rounded-md py-3 px-6 text-base bg-transparent font-medium outline-none"
                        />
                        <label
                          for="show_more"
                          class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
                          onClick={() => setshowDropdown(!showDropdown)}
                        >
                          <svg
                            class="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </label>
                      </div>

                      {showDropdown && (
                        <input
                          type="checkbox"
                          name="show_more"
                          id="show_more"
                          class="hidden peer"
                          checked
                        />
                      )}
                      <div class="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
                        <div
                          class="cursor-pointer group"
                          onClick={(e) => {
                            setCategory("Food");
                            setshowDropdown(!showDropdown);
                          }}
                        >
                          <a class="block p-2 border-transparent border-l-4 group-hover:bg-gray-100">
                            Food
                          </a>
                        </div>
                        <div
                          class="cursor-pointer group border-t"
                          onClick={(e) => {
                            setCategory("Beverages");
                            setshowDropdown(!showDropdown);
                          }}
                        >
                          <a class="block p-2 border-transparent border-l-4 border-blue-600 group-hover:bg-gray-100">
                            Beverages
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center py-6 space-x-2 rounded-b border-t border-gray-200">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      data-modal-toggle="defaultModal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Submit
                    </button>
                    <button
                      data-modal-toggle="defaultModal"
                      type="button"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                      onClick={() => setShowModal(false)}
                    >
                      Decline
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
