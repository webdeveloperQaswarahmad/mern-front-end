import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

function Header() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <>
            <Image
              className='rounded-circle'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNcvQG4MU1s1zn66vnY1H8mHvP1UjRKz9x7Pl9O0&s"
              alt=""
              rounded
              width="40px"
              height="40px"
            />
            <Navbar.Brand style={{ marginLeft: "-140px" }} href="/">Products</Navbar.Brand>
            {auth ? (
              <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <Nav.Link href="/add" activeClassName="active-link">Add Product</Nav.Link>
                    <Nav.Link href="/update/:id" activeClassName="active-link">Update Product</Nav.Link>
                    <Nav.Link href="/profile" activeClassName="active-link">Profile</Nav.Link>
                    <Nav.Link
                      className='text-primary ms-4'
                      onClick={logout}
                      href="/signup"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '11px',
                        alignItems: 'center',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        textAlign: 'center',
                        backgroundColor: '#ccc',
                        color: '#fff',
                      }}
                    >
                      Logout {JSON.parse(auth).name.slice(0, 6)}
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </div>
            ) : (
              <div className='d-flex text-light ms-2'>
                <Nav.Link href="/signup">SignUp</Nav.Link>
                <Nav.Link className='text-light ms-4' href="/login">Login</Nav.Link>
              </div>
            )}
          </>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
