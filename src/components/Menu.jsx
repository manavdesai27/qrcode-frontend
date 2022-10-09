import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Menu = (props) => {
  //   const token = sessionStorage.getItem("token");
  //   const userId = props.match.params.id
  const { id } = useParams();
  console.log(id);

  const [restaurant, setRestaurant] = useState("");
  const [products, setProducts] = useState([]);
  const [food, setFood] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND}/api/menu/${id}`)
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

  return (
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
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <div className="text-xl font-semibold">Beverages</div>
          {beverages.map((f) => (
            <div className="flex justify-between border border-gray-100 bg-blue-600 text-white p-2 rounded-lg">
              <div className="text-lg">{f.name}</div>
              <div className="text-lg">₹ {f.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
