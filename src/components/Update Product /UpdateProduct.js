import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const { id } = useParams();
  const navigate = useNavigate()

  

  const getProductDetails = async () => {
    try {
      const result = await axios.get(`https://sore-erin-mackerel-sock.cyclic.app/product/${id}`);
      setName(result.data.name);
      setPrice(result.data.price);
      setCategory(result.data.category);
      setCompany(result.data.company);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  });


  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(name, price, category, company);
    try {
      const result = await axios.put(`https://sore-erin-mackerel-sock.cyclic.app/product/${id}`, {
        name,
        price,
        category,
        company,
      });
      console.log(result);
      Swal.fire({
        title: 'Product updated successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col className='mt-4' md={{ span: 6, offset: 3 }}>
          <h4>Update Product</h4>
          <Form onSubmit={(e) => { onSubmit(e) }}>
            <Form.Group controlId='formBasicName'>
              <Form.Label style={{ float: 'left' }}>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mt-1' controlId='formBasicPrice'>
              <Form.Label style={{ float: 'left' }}>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mt-1' controlId='formBasicCategory'>
              <Form.Label style={{ float: 'left' }}>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mt-1' controlId='formBasicCompany'>
              <Form.Label style={{ float: 'left' }}>Company</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter company'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Button className='mt-3' style={{ float: 'left' }} variant='primary' type='submit'>
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateProduct;
