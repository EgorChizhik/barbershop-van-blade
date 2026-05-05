import Hero from "../components/hero/Hero";
import ServicesCatalog from "../components/services-catalog/ServicesCatalog";
import WorksPreview from '../components/works-preview/WorksPreview';
import Team from "../components/team/Team";


const Home = () => (
  <>
    <Hero />
    <ServicesCatalog initialLevel="Рейнджер" limit={6} showViewAllBtn={true} />
    <WorksPreview />
    <Team />
  </>
);

export default Home;
