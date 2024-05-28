import React, { useEffect, useState } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import FormBookingRoomDetail from "./FormBookingRoomDetail";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getUsersById } from "../../redux/API/apiAuth";
function RoomImg({ data }) {
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUsersById(data.userId);
      setDataUser(res);
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto mt-10">
      <div className="text-3xl font-bold mb-2">{data.name}</div>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-1 h-full rounded-lg overflow-hidden ">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${data.photos[0]}`}
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4 h-1/2 pb-2">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${data.photos[1]}`}
              alt="Image 2"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${data.photos[2]}`}
              alt="Image 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 h-1/2">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${data.photos[3]}`}
              alt="Image 4"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${data.photos[4]}`}
              alt="Image 5"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-[5rem]">
        <div className="col-span-1 w-[50rem] relative">
          <h2 className="text-black font-bold text-3xl">{data.title}</h2>
          <p className="text-sm text-gray-500">
            2 guests · 1 bedroom · 1 bed · 1 bath
          </p>

          {/* reviews */}
          <div class="flex justify-between border-2 p-2 rounded-md p-3">
            <div class="w-[10rem] p-3">
              <h3 class="font-bold">Được khách yêu thích</h3>
            </div>
            <div class="w-[13rem]">
              <p class="font-medium">
                Khách đánh giá đây là một trong những ngôi nhà được yêu thích
                nhất trên Airbnb
              </p>
            </div>
            <div class="block items-center mb-4 ">
              <p class="font-bold ml-2">4,86</p>
              <div class="flex items-center">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
            <div class="w-[13rem] p-3">
              <p class="font-bold">
                110 <span class="block">Đánh Giá</span>
              </p>
            </div>
          </div>

          {/* dâu gạch hang */}
          <div className="bg-black w-[50rem] h-[2px] rounded-md opacity-5 mt-1">
            ,
          </div>

          <div className="flex justify-start pt-3">
            <img
              src={dataUser?.img}
              alt="Image 4"
              className=" w-[5rem] h-[5rem] object-cover rounded-full"
            />
            <div className="p-2">
              <p>
                Chủ nhà/ Người tổ chức :{" "}
                <span className="font-bold">{dataUser?.username}</span>
              </p>
              <p>5 năm kinh nghiệm đón tiếp khách</p>
            </div>
          </div>
          <div className="bg-black w-[50rem] h-[2px] rounded-md opacity-5 mt-1">
            ,
          </div>

          {/* benifit */}
          <div className="flex justify-start mb-3">
            <i className="p-2">
              <FontAwesomeIcon icon={faUmbrellaBeach} />
            </i>
            <div className="block">
              <h3 className="font-bold">Lặn ngụp</h3>
              <p>Đây là một trong số ít chỗ ở có bể bơi tại khu vực này.</p>
            </div>
          </div>
          <div className="flex justify-start mb-3">
            <i className="p-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </i>
            <div className="block">
              <h3 className="font-bold">Địa điểm</h3>
              <p>100% khách gần đây đã xếp hạng 5 sao cho vị trí này.</p>
            </div>
          </div>
          <div className="flex justify-start mb-3">
            <i className="p-2">
              <FontAwesomeIcon icon={faUmbrellaBeach} />
            </i>
            <div className="block">
              <h3 className="font-bold">Tự nhận phòng</h3>
              <p>Tự nhận phòng với hộp khóa an toàn.</p>
            </div>
          </div>
          {/* end benifit */}
          <div className="bg-black w-[50rem] h-[2px] rounded-md opacity-5 mt-1">
            ,
          </div>
          <div className="">
            <p className="text-gray-600 mt-6">{data.desc}</p>
          </div>
          <div className="bg-black w-[50rem] h-[2px] rounded-md opacity-5 mt-1">
            ,
          </div>
          {/*All benifit */}
          <h1 className="font-bold text-xl mt-6">
            Nơi này có những gì cho bạn
          </h1>
          <div className="flex flex-wrap mb-3">
            <div className="basis-1/2 flex ">
              <i className="p-2">
                <FontAwesomeIcon icon={faUmbrellaBeach} />
              </i>
              <div className="mt-2.5">
                <h3>Hướng nhìn ra kênh</h3>
              </div>
            </div>
            <div className="basis-1/2 flex">
              <i className="p-2">
                <FontAwesomeIcon icon={faUmbrellaBeach} />
              </i>
              <div className="mt-2.5">
                <h3>Hướng nhìn ra sông</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-3">
            <div className="basis-1/2 flex ">
              <i className="p-2">
                <FontAwesomeIcon icon={faUmbrellaBeach} />
              </i>
              <div className="mt-2.5">
                <h3>Bếp</h3>
              </div>
            </div>
            <div className="basis-1/2 flex">
              <i className="p-2">
                <FontAwesomeIcon icon={faUmbrellaBeach} />
              </i>
              <div className="mt-2.5">
                <h3>Wi-fi</h3>
              </div>
            </div>
          </div>

          {/* end  All benifit */}
        </div>

        <FormBookingRoomDetail data={data} />
      </div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md flex space-x-6">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              src={dataUser?.img}
              alt="Host"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{dataUser?.username}</h2>
            <p className="text-gray-600">Bắt đầu đón tiếp khách từ năm 2023</p>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800">
            Thông tin Chủ nhà
          </h3>
          <p className="mt-2 text-gray-700">Tỉ lệ phản hồi: 100%</p>
          <p className="mt-1 text-gray-700">Phản hồi trong vòng 1 giờ</p>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Nhắn tin cho Chủ nhà
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc
            liên lạc bên ngoài trang web hoặc ứng dụng Airbnb.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoomImg;
