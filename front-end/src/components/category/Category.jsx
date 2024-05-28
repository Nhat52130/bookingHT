import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../redux/API/apiCategories";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHotelsByIdCategory } from "../../redux/API/apiHotel";
import Place from "../place/Place";
import Map from "../map/Map";

function Category() {
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(null);
  const [showMaps, setShowMaps] = useState(false);

  const handleButtonClick = () => {
    setShowMaps(!showMaps);
  };

  useEffect(() => {
    fetchCategories();

    const fetchCategoriesById = async () => {
      try {
        const response = await getAllCategories();

        if (response.length > 0) {
          handleShowCategory(response[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesById();
  }, []);

  const fetchCategories = () => {
    getAllCategories().then((data) => setCategories(data));
  };

  const handleShowCategory = async (id) => {
    const data = await getAllHotelsByIdCategory(id);
    setShowCategory(data);
    if (showMaps) {
      // If the map is being shown, ensure it gets the updated data
      setShowMaps(false);  // This will trigger re-render
      setTimeout(() => setShowMaps(true), 0);  // Immediately show map again
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 12,
    slidesToScroll: 12,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-10 mb-10">
      <Slider {...settings}>
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-2 h-[4rem] w-[7rem] text-center"
          >
            <img
              src={category.icons}
              alt={category.name}
              className="object-contain h-10 w-10 mx-auto"
            />
            <button onClick={() => handleShowCategory(category._id)}>
              <span className="font-sans mt-2 text-sm">{category.name}</span>
            </button>
          </div>
        ))}
      </Slider>

      <div className="flex flex-col items-center">
        {!showMaps && <Place data={showCategory} />}
        <button
          className="bg-black text-white rounded-xl h-[3rem] w-[8rem] my-5"
          onClick={handleButtonClick}
        >
          Hiện bản đồ
        </button>
        {showMaps && <Map close={handleButtonClick} data={showCategory} />}
      </div>
    </div>
  );
}

export default Category;
