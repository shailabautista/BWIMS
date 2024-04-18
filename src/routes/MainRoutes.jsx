import ProtectedRoutes from "../components/ProtectedRoutes";
import ProtectedAdminRoutes from "../components/ProtectedAdminRoutes";
//Layout
import HomeLayout from "../layouts/HomeLayout";
import ServiceLayout from "../layouts/ServiceLayout";
//Home
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/Home/AboutPage";
import BarangayOfficialsPage from "../pages/Home/BarangayOfficialsPage";
import ContactPage from "../pages/Home/ContactPage";
import RegisterPage from "../pages/Home/RegisterPage";
//E-Services
import AccountsRequestsPage from "../pages/E-Services/AccountsRequestsPage";
import AnnouncementPage from "../pages/E-Services/AnnouncementPage";
import ContentManagementPage from "../pages/E-Services/ContentManagementPage";
import EditPasswordPage from  "../pages/E-Services/EditPasswordPage";
import MyRequestPage from "../pages/E-Services/MyRequestPage";
import ProfilePage from "../pages/E-Services/ProfilePage";
import RegisteredAccountsPage from "../pages/E-Services/RegisteredAccountsPage";
import ResidentsDataPage from "../pages/E-Services/ResidentsDataPage";
import ServicesPage from "../pages/E-Services/ServicesPage";
import UserDetailsPage from "../pages/E-Services/UserDetailsPage";
//Account Request
import BarangayClearancePage from "../pages/AccountRequest/BarangayClearancePage";
import BusinessPermitPage from "../pages/AccountRequest/BusinessPermitPage";
import CertificateOfIndigencyPage from "../pages/AccountRequest/CertificateOfIndigencyPage";
import CertificateOfResidencyPage from "../pages/AccountRequest/CertificateOfResidencyPage";
//Residents Data
import BarangayResidentsPage from "../pages/ResidentsData/BarangayResidentsPage";
import FemaleResidentsPage from "../pages/ResidentsData/FemaleResidentsPage";
import HeadOfFamilyPage from "../pages/ResidentsData/HeadOfFamilyPage";
import LowClassResidentsPage from "../pages/ResidentsData/LowClassResidentsPage";
import MaleResidentsPage  from "../pages/ResidentsData/MaleResidentsPage";
import MidClassResidentsPage from "../pages/ResidentsData/MidClassResidentsPage";
import RegisteredVotersPage from "../pages/ResidentsData/RegisteredVotersPage";
import UpperClassResidentsPage from "../pages/ResidentsData/UpperClassResidentsPage";
//Forms
import BarangayClearanceForm from "../components/forms/BarangayClearanceForm";
import BusinessPermitForm from "../components/forms/BusinessPermitForm";
import CertificateOfIndigencyForm from "../components/forms/CertificateOIndigencyForm";
import CertificateOfResidencyForm from "../components/forms/CertificateOfResidencyForm";
//My Request
import MyBarangayClearancePage from "../pages/MyRequest/MyBarangayClearancePage";
import MyBusinessPermitPage from "../pages/MyRequest/MyBusinessPermitPage";
import MyCertificateOfIndigencyPage from "../pages/MyRequest/MyCertificateOfIndigencyPage";
import MyCertificateOfResidencyPage from "../pages/MyRequest/MyCertificateOfResidencyPage";
//Content Management
import CreateAnnouncementsPage from "../pages/ContentManagement/CreateAnnouncementsPage";
import CreateBarangayOfficialsPage from "../pages/ContentManagement/CreateBarangayOfficialsPage";
import CreateHeroBannersPage from "../pages/ContentManagement/CreateHeroBannersPage";
import CreateNewsPage from "../pages/ContentManagement/CreateNewsPage";
import CreateProjectsPage from "../pages/ContentManagement/CreateProjectsPage";
import CreatePunongBarangayPage from "../pages/ContentManagement/CreatePunongBarangayPage";
import ReceiveContactsPage from "../pages/ContentManagement/ReceiveContactsPage";
//View Page
import ViewBarangayClearancePage from "../pages/ViewPage/ViewBarangayClearancePage";
import ViewBusinessPermitPage from "../pages/ViewPage/ViewBusinessPermitPage";
import ViewCertificateOfIndigencyPage from "../pages/ViewPage/ViewCerificateOfIndigencyPage";
import ViewCertificateOfResidencyPage from "../pages/ViewPage/ViewCertificateOfResidencyPage";
import ViewProjectPage from "../pages/ViewPage/ViewProjectPage";
import ViewNewsPage from "../pages/ViewPage/ViewNewsPage";
import ViewUserPage from "../pages/ViewPage/ViewUserPage";

import BlotterForm from "../components/forms/BlotterForm";
import BlotterPage from "../pages/AccountRequest/BlotterPage";
import ViewBlotterPage from "../pages/ViewPage/ViewBlotterPage";
import MyBlotterPage from "../pages/MyRequest/MyBlotterPage";
import ResetPasswordPage from "../pages/Home/ResetPasswordPage";

export const mainRoutes = [

    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "register",
          element: <RegisterPage/>,
        },
        {
          path: "reset/:id",
          element: <ResetPasswordPage/>,
        }, 
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "barangayOfficials",
          element: <BarangayOfficialsPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "view-project/:id",
          element: <ViewProjectPage/>,
        }, 
        {
          path: "view-news/:id",
          element: <ViewNewsPage/>,
        }, 
        
      ],
    },
    {
      path: "/e-services",
      element: <ProtectedRoutes><ServiceLayout/></ProtectedRoutes>,
      children: [
        {
          path: "announcements",
          element: <AnnouncementPage/>,
        },
        {
          path: "profile",
          element: <ProfilePage/>,
        },
        {
          path: "edit-password",
          element: <EditPasswordPage/>,
        },
        {
          path: "services",
          element: <ServicesPage/>,
        },
        {
          path: "my-requests",
          element: <MyRequestPage/>,
        },
        {
          path: "registered-accounts",
          element: <RegisteredAccountsPage/>,
        },
        {
          path: "accounts-requests",
          element: <ProtectedAdminRoutes><AccountsRequestsPage/></ProtectedAdminRoutes>,
        },
        {
          path: "residents-data",
          element: <ResidentsDataPage/>,
        },
        {
          path: "content-management",
          element: <ContentManagementPage/>,
        },
        {
          path: "user-details/:id",
          element: <UserDetailsPage/>,
        },
        {
          path: "barangay-clearance",
          element: <ProtectedAdminRoutes><BarangayClearancePage/></ProtectedAdminRoutes>,
        },
        {
          path: "my-barangay-clearance",
          element: <MyBarangayClearancePage/>,
        },
        {
          path: "barangay-clearance/:id",
          element: <ViewBarangayClearancePage/>,
        },
        {
          path: "barangay-clearance/form/:id",
          element: <BarangayClearanceForm/>,
        },
        {
          path: "business-permit",
          element: <ProtectedAdminRoutes><BusinessPermitPage/></ProtectedAdminRoutes>,
        },
        {
          path: "my-business-permit",
          element: <MyBusinessPermitPage/>,
        },
        {
          path: "business-permit/:id",
          element: <ViewBusinessPermitPage/>,
        },
        {
          path: "business-permit/form/:id",
          element: <BusinessPermitForm/>,
        },
        {
          path: "certificate-of-indigency",
          element: <ProtectedAdminRoutes><CertificateOfIndigencyPage/></ProtectedAdminRoutes>,
        },
        {
          path: "my-certificate-of-indigency",
          element: <MyCertificateOfIndigencyPage/>,
        },
        {
          path: "certificate-of-indigency/:id",
          element: <ViewCertificateOfIndigencyPage/>,
        },
        {
          path: "certificate-of-indigency/form/:id",
          element: <CertificateOfIndigencyForm/>,
        },
        {
          path: "certificate-of-residency",
          element: <ProtectedAdminRoutes><CertificateOfResidencyPage/></ProtectedAdminRoutes>,
        },
        {
          path: "my-certificate-of-residency",
          element: <MyCertificateOfResidencyPage/>,
        },
        {
          path: "certificate-of-residency/:id",
          element: <ViewCertificateOfResidencyPage/>,
        },
        {
          path: "certificate-of-residency/form/:id",
          element: <CertificateOfResidencyForm/>,
        },
        {
          path: "barangay-residents",
          element: <BarangayResidentsPage/>,
        },
        {
          path: "head-family",
          element: <HeadOfFamilyPage/>,
        },
        {
          path: "registered-voters",
          element: <RegisteredVotersPage/>,
        },
        {
          path: "male-residents",
          element: <MaleResidentsPage/>,
        },
        {
          path: "female-residents",
          element: <FemaleResidentsPage/>,
        },
        {
          path: "lowclass-residents",
          element: <LowClassResidentsPage/>,
        },
        {
          path: "midclass-residents",
          element: <MidClassResidentsPage/>,
        },
        {
          path: "upperclass-residents",
          element: <UpperClassResidentsPage/>,
        },
        {
          path: "create-hero-banners",
          element: <CreateHeroBannersPage/>,
        },
        {
          path: "create-projects",
          element: <CreateProjectsPage/>,
        },
        {
          path: "create-news",
          element: <CreateNewsPage/>,
        },  
        {
          path: "create-punong-barangay",
          element: <CreatePunongBarangayPage/>,
        }, 
        {
          path: "receive-contacts",
          element: <ReceiveContactsPage/>,
        },  
        {
          path: "create-barangay-officials",
          element: <CreateBarangayOfficialsPage/>,
        },  
        {
          path: "create-announcements",
          element: <CreateAnnouncementsPage/>,
        },
        {
          path: "user/:id",
          element: <ViewUserPage/>,
        },
        {
          path: "blotter/form/:id",
          element: <BlotterForm/>,
        },
        {
          path: "blotter",
          element: <BlotterPage/>,
        },
        {
          path: "blotter/:id",
          element: <ViewBlotterPage/>,
        },
        {
          path: "my-blotter",
          element: <MyBlotterPage/>,
        },
      ],
    },
  ]