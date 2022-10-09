import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const userId = jwt_decode(token).id;
  console.log(userId);

  const [restaurant, setRestaurant] = useState("");
  const [products, setProducts] = useState([]);
  const [food, setFood] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND}/api/menu/${userId}`,
          {},
          {
            headers: {
              "user-auth-token": token,
            },
          }
        )
        .then((res) => {
          setRestaurant(res.data.restaurant);
          // setProducts(res.data.products);
          setFood(
            res.data.products.filter((product) => product.category == "Food")
          );
          setBeverages(
            res.data.products.filter(
              (product) => product.category == "Beverages"
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(products);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/user/delete/${id}`, {
        headers: {
          "user-auth-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex">
      <Sidebar user={userId} />
      <div className="bg-gray-50 w-full p-4">
        <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-royal-black">
          {restaurant}
        </h1>
        <div className="w-full flex gap-2">
          <div className="w-1/2">
            <div className="text-xl font-semibold">Food</div>
            {food.map((f) => (
              <div className="flex justify-between border border-gray-100 bg-blue-600 text-white p-2 rounded-lg">
                <div className="text-lg">{f.name}</div>
                <div className="text-lg">₹ {f.price}</div>
                <button
                  onClick={() => handleDelete(`${f._id}`)}
                  type="button"
                  class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-2.5 text-center inline-flex items-center"
                >
                  <i class="fa-solid fa-xmark my-0"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="w-1/2">
            <div className="text-xl font-semibold">Beverages</div>
            {beverages.map((f) => (
              <div className="flex justify-between border border-gray-100 bg-blue-600 text-white p-2 rounded-lg">
                <div className="text-lg">{f.name}</div>
                <div className="text-lg">₹ {f.price}</div>
                <button
                  onClick={() => handleDelete(`${f._id}`)}
                  type="button"
                  class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-2.5 text-center inline-flex items-center"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
