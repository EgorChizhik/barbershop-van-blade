import Hero from '../components/hero/Hero';
import ServicesCatalog from '../components/services-catalog/ServicesCatalog';

const Home = () => (
  <>
    <Hero />
    <ServicesCatalog initialLevel="ranger" limit={6} showViewAllBtn={true} />
  </>
);

export default Home;