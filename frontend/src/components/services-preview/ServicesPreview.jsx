import { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import ServiceCard from '../services/ServiceCard';
import './ServicesPreview.scss';

const ServicesPreview = () => {
  const [activeLevel, setActiveLevel] = useState('Рейнджер');
  const {  services, isLoading } = useServices();

  const levels = [
    { id: 'Рейнджер', title: 'Рейнджер', desc: 'Первый на абордаж. Базовые стрижки без промаха.' },
    { id: 'Шкипер', title: 'Шкипер', desc: 'Уверенно ведёт к идеальному фейду.' },
    { id: 'Капитан', title: 'Капитан', desc: 'Опасное лезвие в надёжных руках.' },
  ];

  const processedServices = services?.map(service => {
    const variant = service.variants?.find(v => v.barber_level === activeLevel) || service.defaultVariant;
    return { ...service, defaultVariant: variant };
  }) || [];

  const filteredServices = processedServices.filter(s => s.defaultVariant?.barber_level === activeLevel);

  return (
    <section className="services-preview">
      <div className="services-preview__container">
        <h2 className="services-preview__title">Услуги</h2>
        
        <div className="services-preview__levels">
          {levels.map(level => (
            <div 
              key={level.id}
              className={`level-item ${activeLevel === level.id ? 'active' : ''}`}
              onClick={() => setActiveLevel(level.id)}
            >
              <h3 className="level-item__title">{level.title}</h3>
              <p className="level-item__desc">{level.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="services-preview__line">
          <div 
            className="services-preview__line-active"
            style={{ 
              left: activeLevel === 'Рейнджер' ? '0%' : activeLevel === 'Шкипер' ? '33.33%' : '66.66%',
              width: '33.33%'
            }}
          />
        </div>
        
        <div className="services-preview__grid">
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            filteredServices.slice(0, 3).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;