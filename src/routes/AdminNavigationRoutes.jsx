import { FaHome, FaBell, FaUser, FaUsers, FaKey, FaEnvelopeOpenText, FaFileAlt, FaFileUpload, FaHospitalUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
const barangay = Cookies.get("barangay");

const adminNavigationRoutes = [
  { name: 'Home', path: barangay != "defaiult" ? '/about' : "/", icon: FaHome },
  { name: 'Announcements', path: '/e-services/announcements', icon: FaBell },
  { name: 'Account Requests', path: '/e-services/accounts-requests', icon: FaUsers },
  { name: 'Residents Data', path: '/e-services/residents-data', icon:  FaHospitalUser },
  { name: 'My Profile', path: '/e-services/profile', icon: FaUser },
  { name: 'Edit Password', path: '/e-services/edit-password', icon: FaKey },
  { name: 'E-Services', path: '/e-services/services', icon: FaFileUpload },
  { name: 'My Requests', path: '/e-services/my-requests', icon: FaEnvelopeOpenText },
  { name: 'Content Management', path: '/e-services/content-management', icon: FaFileAlt },
];

export default adminNavigationRoutes