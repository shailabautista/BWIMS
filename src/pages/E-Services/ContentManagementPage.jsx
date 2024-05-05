import React from "react";
import Cookies from "js-cookie";
import CardsContainerLayout from "../../layouts/CardsContainerLayout";

const ContentManagementPage = () => {
  const role = Cookies.get("role");

  const contentData = [
    { id: 0, title: "Logo", path: "/e-services/create-logo" },
    { id: 1, title: "Hero Banners", path: "/e-services/create-hero-banners" },
    { id: 2, title: "Featured Projects", path: "/e-services/create-projects" },
    { id: 3, title: "News and Events", path: "/e-services/create-news" },
    {
      id: 4,
      title: "Punong Barangay",
      path: "/e-services/create-punong-barangay",
    },
    ...(role === "chairman" || role === "secretary"
      ? [
          {
            id: 5,
            title: "Contact Information",
            path: "/e-services/receive-contacts",
          },
        ]
      : []),
    {
      id: 6,
      title: "Officials",
      path: "/e-services/create-barangay-officials",
    },
    { id: 7, title: "Announcements", path: "/e-services/create-announcements" },
  ];

  return (
    <div className="d-flex justify-content-center">
      <CardsContainerLayout data={contentData} buttonText="Manage" />
    </div>
  );
};

export default ContentManagementPage;
