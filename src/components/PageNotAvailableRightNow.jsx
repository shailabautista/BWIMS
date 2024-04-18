import { Alert } from 'react-bootstrap';

const PageNotAvailableRightNow = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Alert variant="danger">
        Page Not Available Right Now. Please try again later
      </Alert>
    </div>
  );
}

export default PageNotAvailableRightNow;
