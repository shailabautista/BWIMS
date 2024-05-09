import BarangayClearance from "../../assets/card/barangay-clearance.png";
import BusinessPermit from "../../assets/card/business-permit.png";
import CertificateOfIndigency from "../../assets/card/certificate-of-indigency.jpg";
import CertificateOfResidency from "../../assets/card/certificate-of-recidency.png";
import Blotter from "../../assets/card/blotter.jpg";
import CardsContainerLayout from "../../layouts/CardsContainerLayout";
import Cookies from "js-cookie";
const requestData = [
  {
    id: 1,
    title: "Barangay Clearance",
    image: BarangayClearance,
    path: "/e-services/my-barangay-clearance",
  },
  {
    id: 2,
    title: "Business Permit",
    image: BusinessPermit,
    path: "/e-services/my-business-permit",
  },
  {
    id: 3,
    title: "Certificate of Indigency",
    image: CertificateOfIndigency,
    path: "/e-services/my-certificate-of-indigency",
  },
  {
    id: 4,
    title: "Certificate of Residency",
    image: CertificateOfResidency,
    path: "/e-services/my-certificate-of-residency",
  },
];

const MyRequestPage = () => {
  const role = Cookies.get("role");



  return (
    <div className="d-flex justify-content-center">
      <CardsContainerLayout data={requestData} />
    </div>
  );
};

export default MyRequestPage;