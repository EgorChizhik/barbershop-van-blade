import { useState } from 'react';
import { useServices } from '../hooks/useServices';
import ServicesFilterBar from '../components/services/ServicesFilterBar';
import ServiceCard from '../components/services/ServiceCard';
import './Services.scss';

const Services = () => {
  const [activeLevel, setActiveLevel] = useState('ranger');
  const { data: services, isLoading, error } = useServices();

  if (error) {
    return (
      <div className="services-error">
        <h2>Ошибка при загрузке служб</h2>
        <p>Пожалуйста, обновите страницу</p>
      </div>
    );
  }

  const filteredServices = services?.filter(s => s.barber_level === activeLevel) || [];

  return (
    <section className="services-page">
      <div className="services-page__header">
        <h1 className="services-page__title">Наши услуги</h1>
      </div>
      
      <ServicesFilterBar 
        activeLevel={activeLevel}
        onLevelChange={setActiveLevel}
      />
      
      <div className="services-page__container">
        {isLoading ? (
          <div className="services-loading">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="services-empty">
            <p>В этой категории пока нет доступных услуг</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;