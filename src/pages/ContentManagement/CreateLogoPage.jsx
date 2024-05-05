import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import axios from "axios";

const CreateLogoPage = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const token = Cookies.get("token");
  const barangay = Cookies.get("barangay");

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

  const handleUpdate = async () => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `barangay/logo/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
            {
              logo: url || barangayData.logo,
            }
          );
        });
      });

      toast.success("You have updated a logo!");
      setImageUpload("");
    } catch (error) {
      console.log(error);
      toast.error("Error updating logo!", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this logo?")) return;
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
        { logo: null }
      );
      setBarangayData(null);
      toast.success("Logo deleted successfully!");
    } catch (error) {
      toast.error("Error deleting logo!", error);
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

        <Button
          variant="success"
          onClick={() => handleUpdate()}
        >
          Update
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default CreateLogoPage;
