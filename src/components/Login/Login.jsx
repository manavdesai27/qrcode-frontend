import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/auth/signin`, { phone })
      .then((res) => {
        console.log(res);
        navigate("/auth/login/verify", {
          state: {
            phone: phone,
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="bg-royal-black flex flex-col justify-center text-gray-white h-100vh">
      <div className="relative -top-6">
        <h2 class="font-medium leading-tight text-4xl pt-4 mb-2 text-primary">
          Login Here
        </h2>
        <div class="flex items-center justify-center p-8">
          <div class="mx-auto w-full max-w-[550px]">
            <form action="" method="POST">
              <div class="mb-5">
                <label
                  for="phone"
                  class="mb-3 block text-lg text-start font-medium text-gray-white"
                >
                  Enter your Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  name="phone"
                  id="email"
                  placeholder="+91"
                  class="w-full rounded-md border border-primary py-3 px-6 text-base bg-transparent font-medium outline-none focus:border-secondary focus:shadow-md"
                />
              </div>
              <div>
                <button
                  onClick={(e) => handleSubmit(e)}
                  class="hover:shadow-form rounded-md bg-primary hover:bg-secondary py-3 px-8 text-base font-semibold text-gray-white outline-none"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
