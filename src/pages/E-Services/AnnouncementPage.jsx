import { Card, Container } from "react-bootstrap";
import useBarangayData from "../../hooks/useBarangayData";
import Loading from "../../components/Loading";
import Cookies from "js-cookie";

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

const AnnouncementPage = () => {
  const barangay = Cookies.get("barangay");
  const { barangayData, loading } = useBarangayData();

  if (loading) return <Loading />;

  const filteredBarangayData =
    barangayData &&
    barangayData.filter((barangays) => barangays.name === barangay);

  if (filteredBarangayData[0].announcements.length === 0) {
    return (
      <Container>
        <h1 className="text-center fs-4">There&apos;s no announcement yet</h1>
      </Container>
    )
  }
  return (
    <div>
      <Container>
        {filteredBarangayData[0] &&
          filteredBarangayData[0].announcements &&
          filteredBarangayData[0].announcements.map((announcement, index) => (
            <Card className="m-2 p-2 w-100" key={index}>
              <Card.Title className="d-flex justify-content-center fs-4 fw-bold">
                Announcements in {barangay}
              </Card.Title>
              <Card.Body>
                <p>{formatDateTime(announcement.date)}</p>
                <p>Dear Fellow Dagupenos,</p>

                <p>{announcement.message}</p>

                <p>Sincerely,</p>

                <div>
                  {announcement.user.name} <br />
                  {announcement.user.position} <br />
                  {announcement.user.institution} <br />
                  {announcement.user.location}
                </div>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </div>
  );
};

export default AnnouncementPage;
