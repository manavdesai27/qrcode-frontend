import React from 'react'

export default function Navbar() {
    return (
      <nav className="border-gray-200 px-4 bg-royal-black">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              QR Menu
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <a
                  href="/auth/register"
                  className="block p-2 border border-primary text-gray-white rounded bg-primary hover:bg-royal-black w-24"
                  aria-current="page"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/auth/login"
                  className="block p-2 border border-primary text-gray-white rounded bg-primary hover:bg-royal-black w-24"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
