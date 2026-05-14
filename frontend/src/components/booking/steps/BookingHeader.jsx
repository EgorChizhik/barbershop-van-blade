import React from "react";
import { useBooking } from "../../../context/BookingContext";
import {
  IoChevronDown,
  IoChevronUp,
  IoLocationOutline,
  IoCallOutline,
  IoTimeOutline,
  IoArrowBack,
} from "react-icons/io5";
import logo from "../../../assets/images/logo.png";
import cover from "../../../assets/images/booking/booking-header-bg.jpg";

const BookingHeader = ({ showBack = false }) => {
  const { showContacts, setShowContacts, prevStep } = useBooking();

  return (
    <>
      <div className="step-services__header">
        <div
          className="header-cover"
          style={{ backgroundImage: `url(${cover})` }}
        >
          {showBack && (
            <button className="header-back-btn" onClick={prevStep}>
              <IoArrowBack size={20} />
            </button>
          )}
          <img src={logo} alt="Van Blade" className="header-logo" />
        </div>
      </div>

      <div className="header-contacts">
        <button
          className="contacts-trigger"
          onClick={() => setShowContacts(!showContacts)}
        >
          Информация {showContacts ? <IoChevronUp /> : <IoChevronDown />}
        </button>

        {showContacts && (
          <div className="contacts-content">
            <div className="contact-item">
              <IoLocationOutline />
              <span>г. Ульяновск, Рябикова, 61/37</span>
            </div>
            <div className="contact-item">
              <IoCallOutline />
              <span>(8422) 41-22-14</span>
            </div>
            <div className="contact-item">
              <IoTimeOutline />
              <span>10:00 — 21:00 (Ежедневно)</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingHeader;
