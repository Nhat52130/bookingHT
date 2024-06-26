import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postVnpay } from "../../redux/API/apiVnpay";
import { useSelector } from "react-redux";

import "./vnpay.css";

function Vnpay({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const { name, phone, rooms } = data;

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("User is not authenticated.");
      }

      const roomSubtotal = rooms.reduce((total, room) => total + room.price, 0);
      const roomData = rooms.map((room) => ({
        roomId: room.roomId,
        roomNumbers: room.roomNumbers.map((roomNumber) => ({
          number: roomNumber.number,
          unavailableDates: roomNumber.unavailableDates.map((dateString) => dateString.substring(0, 10)),
        })),
      }));

      const NewData = {
        userId: user._id,
        name: name,
        phone: phone,
        subtotal: roomSubtotal,
        rooms: roomData,
        paymentMethod: bankCode,
        orderType: "billpayment",
        language: "vn",
        bankCode: bankCode,
        amount: 20000,
      };

      const response = await postVnpay(NewData);
      window.location.replace(response.data.data);
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <label>Chọn Phương thức thanh toán:</label>
      <div>
        <label>
          <input
            type="radio"
            name="bankCode"
            value="VNBANK"
            checked={bankCode === "VNBANK"}
            onChange={() => setBankCode("VNBANK")}
          />
          Thanh toán qua ATM-Tài khoản ngân hàng nội địa
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="bankCode"
            value="INTCARD"
            checked={bankCode === "INTCARD"}
            onChange={() => setBankCode("INTCARD")}
          />
          Thanh toán qua thẻ quốc tế
        </label>
      </div>
      <button className="purchase-btn" onClick={handlePurchase} disabled={isLoading}>
        {isLoading ? "Đang xử lý..." : "Thanh toán"}
      </button>
    </div>
  );
}

export default Vnpay;
