import { useState, useEffect } from 'react';
import { useServices } from '../../hooks/useServices';
import ServicesFilterBar from '../services/ServicesFilterBar';
import ServiceCategoryGroup from '../services/ServiceCategoryGroup';
import './ServicesCatalog.scss';

const ServicesCatalog = ({ initialLevel = 'Рейнджер', limit = Infinity }) => {
  const [activeLevel, setActiveLevel] = useState(initialLevel);
  
  // Используем только useServices для получения всего списка
  const { data, isLoading, isError, error, isSuccess, isFetching } = useServices(null);
  
  // Безопасное получение массива данных
  const servicesData = data || [];

  useEffect(() => {
    console.log('=== ServicesCatalog Debug ===');
    console.log('Query states:', { isLoading, isFetching, isSuccess, isError });
    console.log('Services count:', servicesData.length);
    console.log('=============================');
  }, [servicesData, isLoading, isFetching, isSuccess, isError]);

  if (isError) {
    return (
      <div className="services-error">
        <h2>Ошибка: {error?.message || 'Failed to load services'}</h2>
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

  // Фильтрация по уровню барбера (если структура API предполагает наличие вариантов)
  const filteredServices = servicesData.filter(s => {
    if (!s.variants || s.variants.length === 0) return false;
    return s.variants.some(v => v.barber_level === activeLevel);
  });

  // Группировка по категориям
  const groupedByCategory = filteredServices.reduce((acc, service) => {
    const catName = service.category_name || 'Другие услуги';
    if (!acc[catName]) acc[catName] = [];
    
    const variantForLevel = service.variants.find(v => v.barber_level === activeLevel);
    acc[catName].push({ 
      ...service, 
      defaultVariant: variantForLevel || service.variants[0] 
    });
    return acc;
  }, {});

  const categoryNames = Object.keys(groupedByCategory);
  let displayedGroups = [];
  let totalCards = 0;

  categoryNames.forEach(catName => {
    if (totalCards >= limit) return;
    const groupServices = groupedByCategory[catName].slice(0, limit - totalCards);
    displayedGroups.push({ name: catName, services: groupServices });
    totalCards += groupServices.length;
  });

  return (
    <section className="services-catalog">
      <div className="services-catalog__header">
        <h1 className="services-catalog__title">Наши услуги</h1>
      </div>
      
      <ServicesFilterBar activeLevel={activeLevel} onLevelChange={setActiveLevel} />
      
      <div className="services-catalog__content">
        {displayedGroups.length > 0 ? (
          displayedGroups.map(group => (
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
    </section>
  );
};

export default ServicesCatalog;