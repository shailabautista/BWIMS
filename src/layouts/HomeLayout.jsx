import { Navbar, Nav, Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const HomeLayout= () => {
  const location = useLocation();
  const barangay = Cookies.get('barangay');

  useEffect(() => {
   
  }, [barangay]);

    return (
    <div className='d-flex flex-column' style={{backgroundColor: '#E6E6E3', overflow: 'hidden'}} >
      <Header/>

      <Navbar bg='success' variant='dark' expand='lg' className='justify-content-center'>
        <Container>
          <Navbar.Toggle aria-controls='navbar-nav' />
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='mx-auto gap-4'>
              {barangay === 'default' && <Nav.Link className={`fs-5 ${location.pathname === '/' ? 'active fw-semibold' : ''}`} href='/'>Home</Nav.Link>}
              {barangay !== 'default' && <Nav.Link className={`fs-5 ${location.pathname === '/about' ? 'active fw-semibold' : ''}`} href='/about'>About us</Nav.Link>}
              <Nav.Link className={`fs-5 ${location.pathname === '/barangayOfficials' ? 'active fw-semibold' : ''}`} href='/barangayOfficials'>{barangay !== "default" ? "Barangay" : "City"} Officials</Nav.Link>
              <Nav.Link className={`fs-5 ${location.pathname === '/contact' ? 'active fw-semibold' : ''}`} href='/contact'>Contact us</Nav.Link>
              <Nav.Link className={`fs-5 ${location.pathname === '/e-services/announcements' ? 'active fw-semibold' : ''}`} href='/e-services/announcements'>E-Services</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default HomeLayout;
