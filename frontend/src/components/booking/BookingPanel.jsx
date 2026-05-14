import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../../context/BookingContext";
import { IoClose } from "react-icons/io5";
import BookingStep1 from "./steps/BookingStep1";
import BookingStep2 from "./steps/BookingStep2";
import BookingStep3 from "./steps/BookingStep3";
import BookingStep4 from "./steps/BookingStep4";
import "./BookingPanel.scss";

const STEP_COMPONENTS = {
  1: BookingStep1,
  2: BookingStep2,
  3: BookingStep3,
  4: BookingStep4,
};

const panelTransition = { type: "spring", damping: 25, stiffness: 200 };

const BookingPanel = () => {
  const { isOpen, closeBooking, currentStep } = useBooking();

  useEffect(() => {
    if (!isOpen) return;

    const prev = {
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prev.bodyOverflow;
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const CurrentStep = STEP_COMPONENTS[currentStep] ?? null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Оверлей  */}
          <motion.div
            className="booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
          />

          {/* Сама панель */}
          <motion.div
            className="booking-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={panelTransition}
          >
            {/* Кнопка закрытия */}
            <button className="booking-panel__close" onClick={closeBooking}>
              <IoClose size={24} />
            </button>

            {/* Контентная область со скроллом */}
            <div className="booking-panel__body">
              {CurrentStep && <CurrentStep />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingPanel;