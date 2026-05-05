import ServicesCatalog from "../components/services-catalog/ServicesCatalog";
import PageTitle from "../components/PageTitle/PageTitle";
const Services = () => (
  <>
    <PageTitle title="Наши услуги" />
    <ServicesCatalog
      initialLevel="Рейнджер"
      limit={Infinity}
      showViewAllBtn={false}
    />
  </>
);

export default Services;
