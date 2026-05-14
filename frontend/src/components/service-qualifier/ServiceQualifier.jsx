import React from 'react';

const ServiceQualifier = ({ variants, activeLevel, onLevelChange }) => {
  const qualifiers = {
    sailor: {
      title: 'Матрос',
      slogan: 'Первый на абордаж. Базовые стрижки без промаха.'
    },
    skipper: {
      title: 'Шкипер',
      slogan: 'Мастерство в каждой пряди. Сложные стрижки и укладки.'
    },
    captain: {
      title: 'Капитан',
      slogan: 'Легенда в мире барберинга. Эксклюзивные услуги и индивидуальный подход.'
    }
  };

  return (
    <div className="service-qualifier">
      <div className="service-qualifier__list">
        {Object.entries(qualifiers).map(([level, qualifier]) => (
          <div
            key={level}
            className={`service-qualifier__card ${activeLevel === level ? 'is-active' : ''}`}
            onClick={() => onLevelChange(level)}
          >
            <h3 className="service-qualifier__title">{qualifier.title}</h3>
            <p className="service-qualifier__slogan">{qualifier.slogan}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceQualifier;