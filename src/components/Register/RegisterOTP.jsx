import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterOTP(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const phone = location.state.phone;
  console.log("phone", phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/auth/signup/verify", {
        otp,
        phone,
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("token", res.data.token);
        // res.redirect("/dashboard");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-royal-black text-gray-white flex flex-col justify-center h-100vh">
      <div className="relative -top-6">
        <h2 class="font-medium leading-tight text-4xl pt-4 mb-2 text-primary">
          OTP Verification
        </h2>
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form action="" method="POST">
              <div class="mb-5">
                <label
                  for="phone"
                  class="mb-3 block text-lg text-start font-medium text-gray-white"
                >
                  Enter the OTP
                </label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="number"
                  name="phone"
                  id="email"
                  placeholder="Enter the OTP"
                  class="w-full rounded-md border border-primary py-3 px-6 text-base bg-transparent font-medium outline-none focus:border-secondary focus:shadow-md"
                />
              </div>
              <div>
                <button
                  onClick={(e) => handleSubmit(e)}
                  class="hover:shadow-form rounded-md bg-primary hover:bg-secondary py-3 px-8 text-base font-semibold text-gray-white outline-none"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
