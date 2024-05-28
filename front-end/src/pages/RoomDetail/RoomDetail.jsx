import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import List from "../list/List";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import RoomImg from "../../components/roomDetail/RoomImg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
function RoomDetail() {
  const { slug } = useParams();
  console.log(slug);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [room, setRoom] = useState(null);
  const handleClick = () => {
    // Handle the search button click here
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/hotels/${slug}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [slug]); // Added slug as a dependency so the effect runs again if slug changes

  if (!room) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <RoomImg data={room} />
     
      <Footer />
    </div>
  );
}

export default RoomDetail;
