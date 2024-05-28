import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import queryString from "query-string";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkin: "",
    checkout: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/search?city=${searchParams.destination}&checkin=${searchParams.checkin}&checkout=${searchParams.checkout}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log("data", data);
  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    setSearchParams({
      destination: queryParams.city,
      checkin: queryParams.checkin,
      checkout: queryParams.checkout,
    });
  }, []);
  const handleSearch = ({ destination, dates, options }) => {
    setSearchParams({
      destination,
      checkin: dates[0].startDate,
      checkout: dates[0].endDate,
    });
  };
  return (
    <div>
      <Header type="container mx-auto px-4 " onSearch={handleSearch}/>
      <div className="container grid gap-x-8 gap-y-4 grid-cols-4 pt-10 ">
        {loading ? (
          "Loading..."
        ) : (
          data.map((item) => (
            <SearchItem item={item} key={item._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default List;