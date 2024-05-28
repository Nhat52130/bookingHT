import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsersById } from "../../redux/API/apiAuth";

function InforPlance({ name, cheapestPrice, userId, slug }) {
  const [isDateUser, setIsDateUser] = useState("");
    console.log(isDateUser);
  useEffect(() => {
    getUsersById(userId).then((data) => {
      setIsDateUser(data);
    });
  }, []);
  return (
    <div>
      <h3 className="text-lg font-semibold mt-2 ">
        <Link to={`/room/${slug}`}>{name}</Link>
      </h3>
      <p className="font-serif">Chủ nhà: <span className="font-light">{isDateUser?.username}</span></p>
      <p className="text-sm text-gray-500">
        <span>${cheapestPrice}</span> / đêm
      </p>
    </div>
  );
}

export default InforPlance;
