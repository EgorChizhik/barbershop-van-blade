import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showContacts, setShowContacts] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const openBooking = (initialData = null) => {
    if (initialData && initialData.service) {
      const fastService = {
        ...initialData.service,
        id: initialData.service.id,
        selectedVariant: initialData.variant,
        price: initialData.variant.price,
      };

      setSelectedServices([fastService]);
      setCurrentStep(2);
    } else {
      setSelectedServices([]);
      setCurrentStep(1);
    }
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const toggleService = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking,
        closeBooking,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        selectedServices,
        setSelectedServices,
        toggleService,
        selectedBarber,
        setSelectedBarber,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        showContacts,
        setShowContacts,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);