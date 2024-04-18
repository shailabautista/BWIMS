import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import headerRoutes from '../routes/HeaderRoutes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ServiceNavbar from '../components/ServiceNavbar';

const ServiceLayout = () => {
  const location = useLocation();

  const currentHeaderRoute = headerRoutes.find((route) => route.path === location.pathname);
  const headerText = currentHeaderRoute ? currentHeaderRoute.name : '';

  return (
    <div>
      <Header/>
      <ServiceNavbar/>
      <Container className='w-100 d-flex   flex-row'>
        <Sidebar/>
        <main className='min-vh-100 max-vh-100 w-100 overflow-hidden'>
          <div 
            className='w-100 d-flex justify-content-center py-3 mb-3 text-center'
            style={{
              boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}>
            <h1 className='text-success fs-3 fw-bold'>{headerText}</h1>
          </div>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default ServiceLayout;
