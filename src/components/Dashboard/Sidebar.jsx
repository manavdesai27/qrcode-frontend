import { useState } from "react";
import AddItem from "./AddItem";
import jwt_decode from "jwt-decode";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const userId = jwt_decode(token).id;

  const handleLogout = e => {
    sessionStorage.removeItem('token');
    navigate("/");
  }

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div class="flex flex-no-wrap h-100vh">
        <div class="w-64 absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between hidden sm:flex">
          <div class="px-8">
            <div class="h-16 w-full flex items-center text-xl text-gray-white">
              QR Menu
            </div>
            <ul class="mt-12">
              <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <div
                  class="flex items-center focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                  onClick={() => setShowModal(!showModal)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-compass"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                  <span class="text-sm ml-2">Add Item</span>
                </div>
              </li>
              <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <a
                  href="javascript:void(0)"
                  class="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-code"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <polyline points="7 8 3 12 7 16"></polyline>
                    <polyline points="17 8 21 12 17 16"></polyline>
                    <line x1="14" y1="4" x2="10" y2="20"></line>
                  </svg>
                  <span class="text-sm ml-2">Generate New Menu</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <QRCode class="my-4 self-center" size={256} value={`http://lcoalhost:3000/menu/${userId}`} />
            <button onClick={e => handleLogout(e)} class="px-8 py-4 border-t border-gray-700">
              <div className="text-gray-white text-base text-center">
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
      {showModal && <AddItem userId={userId} setShowModal={setShowModal} />}
    </>
  );
}
