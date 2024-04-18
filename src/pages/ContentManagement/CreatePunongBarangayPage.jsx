import { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreatePunongBarangayPage = () => {
  const [barangayData, setBarangayData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const token = Cookies.get('token');
  const barangay = Cookies.get('barangay');
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`);
        setBarangayData(response.data);

      } catch (error) {
        toast.error('Error fetching data!');
      }
    };

    fetchData();
  }, [barangay, token, barangayData]);

  const handleCreate = async () => {
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `barangay/punongBarangay/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const response = await axios.post(`${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/punongBarangay/`, {
            img: url,
            name: name,
            message: message,
            userId: userId
          });
          await axios.put(`${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`, { punongBarangay: response.data.data._id });
          toast.success("You have created a Punong Barangay!");  
          setName('');
          setMessage('');
        })
      })
      
    } catch (error) {
      console.log(error)
      toast.error('Error creating Punong Barangay!', error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      if (imageUpload === null) return;
  
      const imageRef = ref(storage, `barangay/punongBarangay${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await axios.put(`${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/punongBarangay/${id}`, {
            img: url || barangayData.punongBarangays.img,
            name: name || barangayData.punongBarangay.name,
            message: message || barangayData.punongBarangay.message,
            userId: userId
          });
  
        })
      })
      toast.success("You have updated a Punong Barangay!");  
      setName('');
      setMessage('');
    } catch (error) {
      console.log(error)
      toast.error('Error updating punongBarangay!', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
    if (!window.confirm("Are you sure you want to delete this punongBarangay?") ) return;
      await axios.delete(`${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/punongBarangay/${id}`);
      await axios.put(`${import.meta.env.VITE_BWIMS_API_KEY}/api/barangay/${barangay}`, { punongBarangay: null });
      setBarangayData(null);
      toast.success("Punong Barangay deleted successfully!");  
    } catch (error) {
      toast.error('Error deleting Punong Barangay!', error);
    }
  };

  return (
    <Container>
      {barangayData && !barangayData.punongBarangay ? (
        <>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="formname" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleCreate}>Create a Punong Barangay</Button>
          </Form>
        </>
      ) : (
        <>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="formname" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="success" onClick={() => handleUpdate(barangayData.punongBarangay._id)}>Update</Button>
            <Button variant="danger" className='m-2' onClick={() => handleDelete(barangayData.punongBarangay._id)}>Delete</Button>
          </Form>
          <h1>Preview:</h1>
          <section className='mt-2 bg-white d-flex flex-column justify-content-center align-items-center'>
            {
              barangayData && barangayData.punongBarangay && 
              <Container>
                <Row>
                  <Col className='d-flex flex-column justify-content-center align-items-center'>
                    <img src={barangayData && barangayData.punongBarangay && barangayData.punongBarangay.img} width={400} />
                  </Col>
                  <Col className='d-flex flex-column justify-content-center align-items-center text-center p-2'>
                    <Container>
                      <h4 className='text-uppercase'>MESSAGE FROM THE PUNONG BARANGAY {barangayData && barangayData.name}</h4>
                      <p>{barangayData && barangayData.punongBarangay && barangayData.punongBarangay.message}</p>
                      <br />
                      <h4 className='text-uppercase'>{barangayData && barangayData.punongBarangay && barangayData.punongBarangay.name}</h4>
                      <h6>PUNONG BARANGAY, {new Date().getFullYear()} </h6>
                    </Container>
                  </Col>
                </Row>
              </Container>
            }
            <div className='w-100 py-3 bg-success text-white d-flex justify-content-center text-center p-2'>
              <h1 className='container'>Get in touch with us. We’d love to hear from you.</h1>
            </div>
          </section>
        </>
      )}
    </Container>
  );
};

export default CreatePunongBarangayPage;
