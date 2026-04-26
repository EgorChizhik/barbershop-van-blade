import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';
import './ServiceCard.scss';

const ServiceCard = ({ service }) => {
  const imageUrl = service.image 
    ? (service.image.startsWith('http') ? service.image : `${BASE_URL}/media/${service.image}`)
    : null;

  const variant = service.defaultVariant || service.variants?.[0];

  return (
    <article className="service-card">
      <div className="service-card__image-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={service.name} />
        ) : (
          <div className="service-card__placeholder">✂️</div>
        )}
      </div>
      
      <div className="service-card__content">
        <h3 className="service-card__title">{service.name}</h3>
        {service.subtitle && (
          <p className="service-card__subtitle">{service.subtitle}</p>
        )}
        
        <div className="service-card__meta">
          {variant && (
            <>
              <span className="service-card__price">{Math.floor(variant.price)} ₽</span>
              <span className="service-card__duration">{variant.duration_minutes} мин</span>
            </>
          )}
        </div>
        
        <Link to={`/services/${service.slug}`} className="service-card__btn">
          Записаться
        </Link>
      </div>
    </article>
  );
};
export default ServiceCard;