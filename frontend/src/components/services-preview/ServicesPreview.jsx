import { useState } from 'react';

import { useServices } from '../../hooks/useServices';
import ServiceCard from '../services/ServiceCard';
import './ServicesPreview.scss';

const ServicesPreview = () => {
  const [activeLevel, setActiveLevel] = useState('ranger');
  const { data: services, isLoading } = useServices();

  const levels = [
    { id: 'ranger', title: 'Рейнджер', desc: 'Первый на абордаж. Базовые стрижки без промаха.' },
    { id: 'skipper', title: 'Шкипер', desc: 'Уверенно ведёт к идеальному фейду.' },
    { id: 'captain', title: 'Капитан', desc: 'Опасное лезвие в надёжных руках.' },
  ];

  const filteredServices = services?.filter(s => s.barber_level === activeLevel) || [];

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
              left: activeLevel === 'ranger' ? '0%' : activeLevel === 'skipper' ? '33.33%' : '66.66%',
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
