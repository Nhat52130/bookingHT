import { useSelector } from "react-redux";
import Category from "../../components/category/Category";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Place from "../../components/place/Place";
import PropertyList from "../../components/propertyList/PropertyList";
import List from "../list/List";
import "./home.css";
import Leave from "../../components/leave/Leave";
import ReservationItem from "../../components/reservationItem/ReservationItem";
import { useEffect, useState } from "react";
import Map from "../../components/map/Map";
import Login from "../login/Login";

const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  // const [showMaps, setShowMaps] = useState(false);

  // const handleButtonClick = () => {
  //   setShowMaps(!showMaps);
  // };
  return ( 
    <div>
      {user?.user_type === "leave" ? (
        <div className="container mt-10">
          <Leave user={user} />
          <ReservationItem user={user} />
        </div>
      ) : (
        <div>
          <Header />
          <div className="homeContainer">
            <Category />
            <MailList />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
