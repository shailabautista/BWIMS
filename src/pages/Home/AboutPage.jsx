import Loading from "../../components/Loading";
import Banners from "../../components/sections/Banners";
import Projects from "../../components/sections/Projects";
import News from "../../components/sections/News";
import PunongBarangay from "../../components/sections/PunongBarangay";
import useBarangayData from "../../hooks/useBarangayData";

const AboutPage = () => {
  const { filteredBarangayData, loading } = useBarangayData();

  if (loading) return <Loading />;

  if (!filteredBarangayData || filteredBarangayData.length === 0) {
    return null; 
  }

  return (
    <div className="d-flex flex-column text-secondary">
      <Banners
        title={filteredBarangayData[0].banners.title}
        subtitle={filteredBarangayData[0].banners.subtitle}
        imgUrl={filteredBarangayData[0].banners.backgroundImg}
      />
      <Projects projects={filteredBarangayData[0].projects} />
      <News news={filteredBarangayData[0].news} />
      <PunongBarangay punongBarangay={filteredBarangayData[0].punongBarangay} />
    </div>
  );
};

export default AboutPage;
