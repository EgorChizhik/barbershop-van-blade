import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import ServicesFilterBar from '../services/ServicesFilterBar';
import ServiceCategoryGroup from '../services/ServiceCategoryGroup';
import './ServicesCatalog.scss';

const ServicesCatalog = ({ initialLevel = 'ranger', limit = Infinity, showViewAllBtn = false }) => {
  const [activeLevel, setActiveLevel] = useState(initialLevel);
  const { data: services = [], isLoading, error } = useServices();

  if (error) {
    return (
      <div className="services-error">
        <h2>Ошибка при загрузке услуг</h2>
        <p>Пожалуйста, обновите страницу</p>
      </div>
    );
  }

  const filteredServices = services.filter(s => s.barber_level === activeLevel);

  const groupedByCategory = filteredServices.reduce((acc, service) => {
    const catName = service.category_name || 'Другие услуги';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(service);
    return acc;
  }, {});

  const categoryNames = Object.keys(groupedByCategory);
  let displayedGroups = [];
  let totalCards = 0;

  categoryNames.forEach(catName => {
    if (totalCards >= limit) return;
    const availableSlots = limit - totalCards;
    const groupServices = groupedByCategory[catName].slice(0, availableSlots);
    displayedGroups.push({ name: catName, services: groupServices });
    totalCards += groupServices.length;
  });

  const hasMore = filteredServices.length > limit;

  return (
    <section className="services-catalog">
      <div className="services-catalog__header">
        <h1 className="services-catalog__title">Наши услуги</h1>
      </div>
      <ServicesFilterBar activeLevel={activeLevel} onLevelChange={setActiveLevel} />
      <div className="services-catalog__content">
        {isLoading ? (
          <div className="services-loading">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : displayedGroups.length > 0 ? (
          displayedGroups.map(group => (
            <ServiceCategoryGroup key={group.name} category={group.name} services={group.services} />
          ))
        ) : (
          <div className="services-empty">
            <p>В этой категории пока нет доступных услуг</p>
          </div>
        )}
      </div>
      {hasMore && showViewAllBtn && (
        <div className="services-catalog__footer">
          <Link to="/services" className="services-catalog__view-all">Посмотреть все</Link>
        </div>
      )}
    </section>
  );
};

export default ServicesCatalog;