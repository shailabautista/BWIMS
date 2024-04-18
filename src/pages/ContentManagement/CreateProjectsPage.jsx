import { useState, useEffect } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import axios from "axios";

const CreateProjectsPage = () => {
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

      const imageRef = ref(storage, `barangay/projects/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const response = await axios.post(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/projects/`,
            {
              img: url,
              title: title,
              description: description,
              userId: userId,
            }
          );
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
            {
              projects: [
                ...(barangayData?.projects || []),
                response.data.data._id,
              ],
            }
          );
          toast.success("You have created a project!");
          setTitle("");
          setDescription("");
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating project!", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `barangay/projects/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/projects/${id}`,
            {
              backgroundImg: url || barangayData.projects.backgroundImg,
              title: title || barangayData.project.title,
              description: description || barangayData.project.description,
              userId: userId,
            }
          );
          toast.success("You have updated a project!");
          setTitle("");
          setDescription("");
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error updating project!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this project?"))
        return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/projects/${id}`
      );
      setBarangayData(null);
      toast.success("project deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting project!", error);
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
          Create a Project
        </Button>
      </Form>
      <section className="mt-2 bg-white p-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-success fw-bold text-center">
          OUR FEATURED PROJECTS
        </h2>
        <p className="text-center">
          Our barangay maintains security, peace, and order for all inhabitants, pursue the ideals of a free and progressive community, implement basic health projects, protect the rights of children, train and educate the youth, respect the rights and equal protection of the law for the men and women, take care of our elders, from the grass-roots to the highest level of our community.
        </p>
        <div style={{ overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none", "&::-webkit-scrollbar": { width: 0 } }}>
          <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
              {barangayData &&
                barangayData.projects &&
                barangayData.projects.map((project, index) => (
                  <Col key={index}>
                    <Card className="mt-2 h-100">
                      <Card.Img
                        variant="top"
                        src={project.img}
                        alt={`Projects ${index + 1}`}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="text-secondary fw-bold">
                          {truncate(project.title, 20)}
                        </Card.Title>
                        <hr />
                        <Card.Text>{truncate(project.description, 70)}</Card.Text>
                        <Button
                          variant="success"
                          onClick={() => handleUpdate(project._id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          className="m-2"
                          onClick={() => handleDelete(project._id)}
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

export default CreateProjectsPage;
