import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';



function AddProduct() {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const navigate = useNavigate();
       
  const userId = JSON.parse(localStorage.getItem('user'))._id;

const onSubmit = async (data) => {
  const requestData = {
    ...data,
    userId: userId
  };
  try {
    const response = await axios.post('https://sore-erin-mackerel-sock.cyclic.app/add-product', requestData);
    console.log(response);
    Swal.fire({
      icon: 'success',
      title: 'Product added successfully!',
      showConfirmButton: false,
      timer: 1500
    });
    if (response.status === 200) {
      reset();
      navigate('/');
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error adding product',
      text: error.message
    });
  }
};

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h4>Add Product</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group  controlId='formBasicName'>
              <Form.Label style={{float:"left"}}>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                {...register('name', { required: true })}
              />
              {errors.name &&  <p style={{float:"left"}} className='text-danger'>Name is required</p>}
            </Form.Group>

            <Form.Group className='mt-5' controlId='formBasicPrice'>
              <Form.Label style={{float:"left"}}>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                {...register('price', { required: true, min: 0 })}
              />
              {errors.price?.type === 'required' && (
                <p style={{float:"left"}} className='text-danger'>Price is required</p>
              )}
              {errors.price?.type === 'min' && (
                <p className='text-danger'>Price must be greater than or equal to 0</p>
              )}
            </Form.Group>

            <Form.Group className='mt-5' controlId='formBasicCategory'>
              <Form.Label style={{float:"left"}}>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                {...register('category', { required: true })}
              />
              {errors.category && <p style={{float:"left"}} className='text-danger'>Category is required</p>}
            </Form.Group>

            <Form.Group className='mt-5' controlId='formBasicCompany'>
              <Form.Label style={{float:"left"}}>Company</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter company'
                {...register('company', { required: true })}
              />
              {errors.company && <p style={{float:"left"}} className='text-danger'>Company is required</p>}
            </Form.Group>

            <Button className='mt-3' style={{float:"left"}} variant='primary' type='submit'>
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
