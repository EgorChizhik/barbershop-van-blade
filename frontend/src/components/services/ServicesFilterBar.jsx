import './ServicesFilterBar.scss';

const LEVELS = [
  { id: 'ranger', title: 'Рейнджер', desc: 'Первый на абордаж. Базовые стрижки без промаха.' },
  { id: 'skipper', title: 'Шкипер', desc: 'Уверенно ведёт к идеальному фейду.' },
  { id: 'captain', title: 'Капитан', desc: 'Опасное лезвие в надёжных руках.' },
];

const ServicesFilterBar = ({ activeLevel, onLevelChange }) => {
  return (
    <div className="services-filter">
      <div className="services-filter__container">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className={`filter-item ${activeLevel === level.id ? 'active' : ''}`}
            onClick={() => onLevelChange(level.id)}
          >
            <h3 className="filter-item__title">{level.title}</h3>
            <p className="filter-item__desc">{level.desc}</p>
          </div>
        ))}
        <div 
          className="filter-line"
          style={{
            left: activeLevel === 'ranger' ? '0%' : activeLevel === 'skipper' ? '33.33%' : '66.66%',
          }}
        />
      </div>
    </div>
  );
};

export default ServicesFilterBar;
