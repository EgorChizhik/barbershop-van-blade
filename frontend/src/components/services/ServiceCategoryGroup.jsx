import ServiceCard from './ServiceCard';
import './ServiceCategoryGroup.scss';

const ServiceCategoryGroup = ({ category, services }) => {
  if (!services || services.length === 0) return null;

  return (
    <div className="service-category-group">
      <div className="service-category-group__title-container">
        <h3 className="service-category-group__title">{category}</h3>
      </div>
      
      <div className="service-category-group__grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoryGroup;