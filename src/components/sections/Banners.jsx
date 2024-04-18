import { useState, useEffect } from "react";

const Banners = ({ title, subtitle, imgUrl }) => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const sequences = ["Hello there!", `Welcome to ${title}`];
  const animationDuration = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => (prevIndex + 1) % sequences.length);
    }, animationDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "85vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <div
        className="container d-flex align-items-end p-5"
        style={{ height: "85vh" }}
      >
        <div className="text-white">
          <span
            style={{
              fontSize: `clamp(2rem, -1.3125rem + 10vw, 5rem)`,
              fontWeight: "bold",
              opacity: animationIndex === 0 ? 1 : 0,
              transition: `opacity 2s ease-in-out`,
            }}
          >
            {sequences[animationIndex]}
          </span>
          <p className="fs-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Banners;
