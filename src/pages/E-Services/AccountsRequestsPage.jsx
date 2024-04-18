import BarangayClearance from "../../assets/card/barangay-clearance.png";
import BusinessPermit from "../../assets/card/business-permit.png";
import CertificateOfIndigency from "../../assets/card/certificate-of-indigency.jpg";
import CertificateOfResidency from "../../assets/card/certificate-of-recidency.png";
import Blotter from "../../assets/card/blotter.jpg";
import CardsContainerLayout from "../../layouts/CardsContainerLayout";

const requestData = [
  {
    id: 1,
    title: "Barangay Clearance",
    image: BarangayClearance,
    path: `/e-services/barangay-clearance`,
  },
  {
    id: 2,
    title: "Business Permit",
    image: BusinessPermit,
    path: `/e-services/business-permit`,
  },
  {
    id: 3,
    title: "Certificate of Indigency",
    image: CertificateOfIndigency,
    path: `/e-services/certificate-of-indigency`,
  },
  {
    id: 4,
    title: "Certificate of Residency",
    image: CertificateOfResidency,
    path: `/e-services/certificate-of-residency`,
  },
  {
    id: 5,
    title: "Blotter",
    image: Blotter,
    path: `/e-services/blotter`,
  },
];

const AccountsRequestsPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <CardsContainerLayout data={requestData} />
    </div>
  );
};

export default AccountsRequestsPage;
