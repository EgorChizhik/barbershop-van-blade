import { useServices } from '../hooks/useServices';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const { data: services, isLoading, error } = useServices();

  if (isLoading) return <div className="loading">Loading services...</div>;
  if (error) return <div className="error">Error loading: {error.message}</div>;

  return (
    <section className="services-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services?.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
