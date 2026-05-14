import "./ServicesFilterBar.scss";

const LEVELS = [
  {
    id: "Матрос",
    title: "Матрос",
    desc: "Классические решения с вниманием к каждой детали.",
  },
  {
    id: "Шкипер",
    title: "Шкипер",
    desc: "Опытный мастер для сложных форм и точной работы.",
  },
  {
    id: "Капитан",
    title: "Капитан",
    desc: "Индивидуальный подход для тех, кто ценит безупречный результат.",
  },
];

const ServicesFilterBar = ({ activeLevel, onLevelChange }) => {
  const activeIndex = LEVELS.findIndex((level) => level.id === activeLevel);
  const lineStyle = {
    width: `${100 / LEVELS.length}%`,
    transform: `translateX(${activeIndex * 100}%)`,
    transition: "transform 0.3s ease",
  };
  return (
    <div className="services-filter">
      <div className="services-filter__container">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className={`filter-item ${activeLevel === level.id ? "active" : ""}`}
            onClick={() => onLevelChange(level.id)}
          >
            <h3 className="filter-item__title">{level.title}</h3>
            <p className="filter-item__desc">{level.desc}</p>
          </div>
        ))}
        <div className="filter-line" style={lineStyle} />
      </div>
    </div>
  );
};

export default ServicesFilterBar;
