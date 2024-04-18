import { useState, useEffect } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import axios from "axios";

const CreateNewsPage = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`
        );
        setBarangayData(response.data);
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };

    fetchData();
  }, [barangay, token, barangayData]);

  const handleCreate = async () => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `barangay/news/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const response = await axios.post(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/news/`,
            {
              img: url,
              title: title,
              description: description,
              userId: userId,
            }
          );
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
            { news: [...(barangayData?.news || []), response.data.data._id] }
          );
          toast.success("You have created a news!");
          setTitle("");
          setDescription("");
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating news!", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `barangay/news/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/news/${id}`,
            {
              backgroundImg: url || barangayData.newss.backgroundImg,
              title: title || barangayData.news.title,
              description: description || barangayData.news.description,
              userId: userId,
            }
          );
          toast.success("You have updated a news!");
          setTitle("");
          setDescription("");
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error updating news!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this news?")) return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/news/${id}`
      );
      setBarangayData(null);
      toast.success("news deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting news!", error);
    }
  };

  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength - 1) + "..." : str;
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(event) => setImageUpload(event.target.files[0])}
          />
        </Form.Group>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreate}>
          Create a News
        </Button>
      </Form>
      <section className="mt-2  p-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-success fw-bold text-center">News and Events</h2>
        <p className="text-center">
          Get our latest, news and announcement! #DAGUPAN
        </p>
        <div style={{ overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none", "&::-webkit-scrollbar": { width: 0 } }}>
          <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
              {barangayData &&
                barangayData.news &&
                barangayData.news.map((news, index) => (
                  <Col key={index}>
                    <Card className="mt-2 h-100">
                      <Card.Img
                        variant="top"
                        src={news.img}
                        alt={`Announcement ${index + 1}`}
                        style={{
                          height: "100%",
                          maxHeight: 220,
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="text-secondary fw-bold">
                          {truncate(news.title, 20)}
                        </Card.Title>
                        <hr />
                        <Card.Text>{truncate(news.description, 70)}</Card.Text>
                        <Button
                          variant="success"
                          onClick={() => handleUpdate(news._id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          className="m-2"
                          onClick={() => handleDelete(news._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      </section>
    </Container>
  );
};

export default CreateNewsPage;
