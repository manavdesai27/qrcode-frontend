import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/api/auth/signup`, {
        name,
        phone,
        restaurant,
        address,
      })
      .then((res) => {
        console.log(res);
        // props.navigate.push({
        //   pathname: "/signup/verify",
        //   state: { phone: phone },
        // });
        navigate("/auth/register/verify", {
          state: {
            phone: phone,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-royal-black text-gray-white h-100vh">
      <h2 class="font-medium leading-tight text-4xl pt-4 mb-2 text-primary">
        Register Here
      </h2>
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px]">
          <form action="" method="POST">
            <div class="mb-5">
              <label
                for="name"
                class="mb-3 block text-lg text-start font-medium text-gray-white"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                class="w-full rounded-md border border-primary bg-transparent py-3 px-6 text-base font-medium outline-none focus:border-secondary focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="phone"
                class="mb-3 block text-lg text-start font-medium text-gray-white"
              >
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                name="phone"
                id="email"
                placeholder="Enter Mobile Number"
                class="w-full rounded-md border border-primary py-3 px-6 text-base bg-transparent font-medium outline-none focus:border-secondary focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="subject"
                class="mb-3 block text-lg text-start font-medium text-gray-white"
              >
                Restaurant Name
              </label>
              <input
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter your Restaurant Name"
                class="w-full rounded-md border border-primary py-3 px-6 bg-transparent font-medium outline-none focus:border-secondary focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="address"
                class="mb-3 block text-lg text-start font-medium text-gray-white"
              >
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                name="address"
                id="address"
                placeholder="Type your address"
                class="w-full resize-none rounded-md border border-primary py-3 px-6 bg-transparent text-base font-medium outline-none focus:border-secondary focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button
                onClick={(e) => handleSubmit(e)}
                class="hover:shadow-form rounded-md bg-primary hover:bg-secondary py-3 px-8 text-base font-semibold text-gray-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
