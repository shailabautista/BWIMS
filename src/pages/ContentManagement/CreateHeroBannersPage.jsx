import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import axios from "axios";
import Banners from "../../components/sections/Banners";

const CreateHeroBannersPage = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
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

      const imageRef = ref(storage, `barangay/banners/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const response = await axios.post(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/banners/`,
            {
              backgroundImg: url,
              title: title,
              subtitle: subtitle,
              userId: userId,
            }
          );
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
            { banners: response.data.data._id }
          );
          toast.success("You have created a banner!");
          setTitle("");
          setSubtitle("");
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating banner!", error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `barangay/banners/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await axios.put(
            `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/banners/${id}`,
            {
              backgroundImg: url || barangayData.banners.backgroundImg,
              title: title || barangayData.banner.title,
              subtitle: subtitle || barangayData.banner.subtitle,
              userId: userId,
            }
          );
        });
      });
      toast.success("You have updated a banner!");
      setTitle("");
      setSubtitle("");
    } catch (error) {
      console.log(error);
      toast.error("Error updating banner!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this banner?"))
        return;
      await axios.delete(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/banners/${id}`
      );
      await axios.put(
        `${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`,
        { banners: null }
      );
      setBarangayData(null);
      toast.success("Banner deleted successfully!");
    } catch (error) {
      toast.error("Error deleting banner!", error);
    }
  };

  return (
    <Container>
      {barangayData && !barangayData.banners ? (
        <>
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
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreate}>
              Create a Banner
            </Button>
          </Form>
        </>
      ) : (
        <>
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
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={() => handleUpdate(barangayData.banners._id)}
            >
              Update
            </Button>
            <Button
              variant="danger"
              className="m-2"
              onClick={() => handleDelete(barangayData.banners._id)}
            >
              Delete
            </Button>
          </Form>
          {barangayData && barangayData.banners && (
            <Banners
              title={barangayData.banners.title}
              subtitle={barangayData.banners.subtitle}
              imgUrl={barangayData.banners.backgroundImg}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default CreateHeroBannersPage;
