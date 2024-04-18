import { FaHome, FaBell, FaUser, FaUsers, FaKey, FaFileAlt, FaHospitalUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
const barangay = Cookies.get("barangay")

const superAdminNavigationRoutes = [
  { name: 'Home', path: barangay != "defaiult" ? '/about' : "/", icon: FaHome },
  { name: 'Announcements', path: '/e-services/announcements', icon: FaBell },
  { name: 'Registered Accounts', path: '/e-services/registered-accounts', icon: FaUsers },
  { name: 'Residents Data', path: '/e-services/residents-data', icon:  FaHospitalUser },
  { name: 'My Profile', path: '/e-services/profile', icon: FaUser },
  { name: 'Edit Password', path: '/e-services/edit-password', icon: FaKey },
  { name: 'Content Management', path: '/e-services/content-management', icon: FaFileAlt },
];

export default superAdminNavigationRoutes