import { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

const formatDateTime = (datetimeString) => {
  const date = new Date(datetimeString);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

const ViewNewsPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/news/${id}`,
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <Container className="p-2">
      <h1 className="fs-3 fw-bold text-secondary">
        {formatDateTime(formData.createdAt)}
      </h1>
      <h1
        className="display-4 fw-bold text-success"
        style={{ wordWrap: "break-word" }}
      >
        {formData.title}
      </h1>
      <Image
        rounded
        src={formData.img}
        className="w-100"
        alt={formData.title}
        height={500}
        style={{
          objectFit: "cover",
        }}
      />
      <hr />
      <p className="fs-2" style={{ wordWrap: "break-word" }}>
        {formData.description}
      </p>
    </Container>
  );
};

export default ViewNewsPage;
