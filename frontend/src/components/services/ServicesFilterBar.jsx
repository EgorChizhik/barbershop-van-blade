import './ServicesFilterBar.scss';

const LEVELS = [
  { id: 'Рейнджер', title: 'Рейнджер', desc: 'Первый на абордаж. Базовые стрижки без промаха.' },
  { id: 'Шкипер', title: 'Шкипер', desc: 'Уверенно ведёт к идеальному фейду.' },
  { id: 'Капитан', title: 'Капитан', desc: 'Опасное лезвие в надёжных руках.' },
];

const ServicesFilterBar = ({ activeLevel, onLevelChange }) => {
  const activeIndex = LEVELS.findIndex(level => level.id === activeLevel);

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
            left: `${activeIndex * 33.33}%`,
            transition: 'left 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default ServicesFilterBar;