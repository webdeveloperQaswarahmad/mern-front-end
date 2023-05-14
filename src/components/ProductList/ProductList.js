import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import { Nav,Form } from 'react-bootstrap';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        getProducts();
    }, []);
    const deleteProduct = async (id) => {
        try {
          const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          });
    
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:5000/product/${id}`);
            setProducts(products.filter(product => product._id !== id));
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The product has been deleted.',
              timer: 1500
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error deleting product',
            text: error.message
          });
        }
      }

      const searchHandle = async (event) => {
        let key = event.target.value;
        let result = await axios.get(`http://localhost:5000/search?key=${key}`);
        setProducts(result.data);
      };
      

    return (
        <div>
            <h4>Product List</h4>
            <Form.Group className='mt-1' controlId='formBasicCompany'>
              <Form.Label style={{ float: 'left' }}>Search Product Data</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter company'
                className='form-control-sm'
                onChange={searchHandle}
              />
            </Form.Group>

            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}$</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <Button className='bg-danger text-light' onClick={()=>deleteProduct(product._id)}>
                                    <td>Delete</td>
                                </Button>
                                <Nav.Link href={"/update/"+product._id}>Update</Nav.Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductList;
