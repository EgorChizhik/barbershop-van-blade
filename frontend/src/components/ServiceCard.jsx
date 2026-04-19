import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => (
  <article className="service-card">
    <div className="service-card__image">
      {/* Placeholder image */}
      <div className="placeholder-image">✂️</div>
    </div>
    <div className="service-card__content">
      <h3 className="service-card__title">{service.name}</h3>
      <p className="service-card__description">{service.description}</p>
      <div className="service-card__meta">
        <span className="duration">{service.duration_minutes} мин</span>
        <span className="price">{service.price} ₽</span>
      </div>
      <Link to={`/services/${service.slug}`} className="btn btn--primary">
        Подробнее
      </Link>
    </div>
  </article>
);

export default ServiceCard;
