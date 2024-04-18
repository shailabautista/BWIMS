import { useState, useEffect } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import axios from "axios";

const CreateBarangayOfficialsPage = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");
  const userId = Cookies.get("userId");

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

  useEffect(() => {
    fetchData();
  }, [barangay, token]);

  const handleCreate = async () => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(
        storage,
        `barangay/barangayOfficials/${imageUpload.name}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const response = await axios.post(
            `${
              import.meta.env.VITE_BWIMS_API_KEY
            }/api/barangay/barangayOfficials/`,
            {
              img: url,
              name: name,
              position: position,
              userId: userId,
            }
          );
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
            {
              barangayOfficials: [
                ...(barangayData?.barangayOfficials || []),
                response.data.data._id,
              ],
            }
          );
          toast.success("You have created a Barangay Officials!");
          setName("");
          setPosition("");
          fetchData();
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating BarangayOfficials!", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(
        storage,
        `barangay/barangayOfficials/${imageUpload.name}`
      );
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await axios.put(
            `${
              import.meta.env.VITE_BWIMS_API_KEY
            }/api/barangay/barangayOfficials/${id}`,
            {
              img: url || barangayData.barangayOfficials.img,
              name: name || barangayData.barangayOfficials.name,
              position: position || barangayData.BarangayOfficials.position,
              userId: userId,
            }
          );
          toast.success("You have updated a BarangayOfficials!");
          setName("");
          setPosition("");
          fetchData();
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error updating BarangayOfficials!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (
        !window.confirm(
          "Are you sure you want to delete this Barangay Official?"
        )
      )
        return;
      await axios.delete(
        `${
          import.meta.env.VITE_BWIMS_API_KEY
        }/api/barangay/barangayOfficials/${id}`
      );
      fetchData();
      toast.success("Barangay Officials deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Barangay Officials!", error);
    }
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
        <Form.Group controlId="formname" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formposition" className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Form.Group>
        <Button variant="success mb-2" onClick={handleCreate}>
          Create a Barangay Officials
        </Button>
      </Form>
      <Row xs={1} md={2} lg={3} className="g-4">
        {barangayData && barangayData.barangayOfficials && barangayData.barangayOfficials.map((official, index) => (
            <Col key={index}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={official.img || "https://i.stack.imgur.com/l60Hf.png"}
                  alt={official.name}
                  style={{
                    height: "100%",
                    maxHeight: 500,
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Title>{official.name}</Card.Title>
                  <Card.Text>{official.position}</Card.Text>
                  <Button variant="success" onClick={() => handleUpdate(official._id)}>Update</Button>
                  <Button variant="danger" className='m-2' onClick={() => handleDelete(official._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default CreateBarangayOfficialsPage;
