import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'; // import the CSS file

function AppFooter() {
  return (
    <footer className="text-white bg-dark footerdesign">
      <Container>
        <Row>
          <Col md={12} className=" p-1 text-center text-md-left">
            <h5 className='fs-5'>E-Commerce Dashboard</h5>
            
          </Col>
         
        </Row>
      </Container>
    </footer>
  );
}

export default AppFooter;
