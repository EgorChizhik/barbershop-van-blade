import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import ServicesFilterBar from "../services/ServicesFilterBar";
import ServiceCategoryGroup from "../services/ServiceCategoryGroup";

import "./ServicesCatalog.scss";


const ServicesCatalog = ({ 
  initialLevel = "Матрос", 
  limit = Infinity, 
  showViewAllBtn = false, 
  showHeader = false 
}) => {
  const [activeLevel, setActiveLevel] = useState(initialLevel);

  const { data, isLoading, isError, error, isSuccess, isFetching } =
    useServices(null);

  const servicesData = data || [];

  useEffect(() => {
    console.log("=== ServicesCatalog Debug ===");
    console.log("Query states:", { isLoading, isFetching, isSuccess, isError });
    console.log("Services count:", servicesData.length);
    console.log("=============================");
  }, [servicesData, isLoading, isFetching, isSuccess, isError]);

  if (isError) {
    return (
      <div className="services-error">
        <h2>Ошибка: {error?.message || "Failed to load services"}</h2>
      </div>
    );
  }

  if (isLoading && servicesData.length === 0) {
    return (
      <div className="services-loading">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    );
  }

  const filteredServices = servicesData.filter((s) => {
    if (!s.variants || s.variants.length === 0) return false;
    return s.variants.some((v) => v.barber_level === activeLevel);
  });

  const groupedByCategory = filteredServices.reduce((acc, service) => {
    const catName = service.category_name || "Другие услуги";
    if (!acc[catName]) acc[catName] = [];

    const variantForLevel = service.variants.find(
      (v) => v.barber_level === activeLevel,
    );
    acc[catName].push({
      ...service,
      defaultVariant: variantForLevel || service.variants[0],
    });
    return acc;
  }, {});

  const categoryNames = Object.keys(groupedByCategory);
  let displayedGroups = [];
  let totalCards = 0;

  categoryNames.forEach((catName) => {
    if (totalCards >= limit) return;
    const groupServices = groupedByCategory[catName].slice(
      0,
      limit - totalCards,
    );
    displayedGroups.push({ name: catName, services: groupServices });
    totalCards += groupServices.length;
  });

  const hasMore = filteredServices.length > limit;

  return (
    <section className="services-catalog">
      
      {showHeader && (
        <div className="services-catalog__header">
          <h2 className="services-catalog__title">НАШИ УСЛУГИ</h2>
          <p className="services-catalog__subtitle">
            Каждая услуга — это не просто стрижка, а продуманный ритуал,
            отражающий уровень мастерства барбера.
          </p>
        </div>
      )}

      <ServicesFilterBar
        activeLevel={activeLevel}
        onLevelChange={setActiveLevel}
      />

      <div className="services-catalog__content">
        {displayedGroups.length > 0 ? (
          displayedGroups.map((group) => (
            <ServiceCategoryGroup
              key={group.name}
              category={group.name}
              services={group.services}
            />
          ))
        ) : (
          <div className="services-empty">
            <p>В этой категории пока нет доступных услуг</p>
          </div>
        )}
      </div>

      {hasMore && showViewAllBtn && (
        <div className="services-catalog__footer">
          <Link to="/services" className="services-catalog__view-all">
            Посмотреть все услуги
          </Link>
        </div>
      )}
    </section>
  );
};

export default ServicesCatalog;