import Hero from '../components/hero/Hero';
import ServicesCatalog from '../components/services-catalog/ServicesCatalog';
import Team from '../components/team/Team';

const Home = () => (
  <>
    <Hero />
    <ServicesCatalog initialLevel="Рейнджер" limit={6} showViewAllBtn={true} />
    <Team />
  </>
);

export default Home;