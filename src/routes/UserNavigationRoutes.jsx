import { FaHome, FaBell, FaUser, FaKey, FaEnvelopeOpenText, FaFileUpload, } from 'react-icons/fa';
import Cookies from 'js-cookie';
const barangay = Cookies.get("barangay")

const userNavigationRoutes = [
  { name: 'Home', path: barangay != "defaiult" ? '/about' : "/", icon: FaHome },
  { name: 'Announcements', path: '/e-services/announcements', icon: FaBell },
  { name: 'My Profile', path: '/e-services/profile', icon: FaUser },
  { name: 'Edit Password', path: '/e-services/edit-password', icon: FaKey },
  { name: 'My Requests', path: '/e-services/my-requests', icon: FaEnvelopeOpenText },
];

export default userNavigationRoutes