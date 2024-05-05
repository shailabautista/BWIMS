import BarangayClearance from "../../assets/card/barangay-clearance.png";
import BusinessPermit from "../../assets/card/business-permit.png";
import CertificateOfIndigency from "../../assets/card/certificate-of-indigency.jpg";
import CertificateOfResidency from "../../assets/card/certificate-of-recidency.png";
import Blotter from "../../assets/card/blotter.jpg";

import Cookies from "js-cookie";
import CardsContainerLayout from "../../layouts/CardsContainerLayout";

const ServicesPage = () => {
  const userId = Cookies.get('userId');

  const requestData = [
    { id: 1, title: 'Barangay Clearance', image: BarangayClearance, path: `/e-services/barangay-clearance/form/${userId}`},
    { id: 2, title: 'Business Permit', image: BusinessPermit, path: `/e-services/business-permit/form/${userId}`},
    { id: 3, title: 'Certificate of Indigency', image: CertificateOfIndigency, path: `/e-services/certificate-of-indigency/form/${userId}`},
    { id: 4, title: 'Certificate of Residency', image: CertificateOfResidency, path: `/e-services/certificate-of-residency/form/${userId}`},
  ];

  return (
    <div className="d-flex justify-content-center">
      <CardsContainerLayout data={requestData} buttonText="Request"/>
    </div>
  );
}

export default ServicesPage;
