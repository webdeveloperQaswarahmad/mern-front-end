import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Nav } from 'react-bootstrap';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://sore-erin-mackerel-sock.cyclic.app/products');
                console.log('productsssssss',response);
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [getProductDetails]);

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
                await axios.delete(`https://sore-erin-mackerel-sock.cyclic.app/product/${id}`);
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


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when performing a new search
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h4 className='mt-1'>Product List</h4>
            <Form.Group className='w-25 m-4 float-right mt-2 mb-3 ' controlId="formBasicSearch">
                <Form.Control type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
            </Form.Group>

            <Table striped bordered>
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
                    {currentProducts.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}$</td>
                            <td>{product.category}</td>
                            <td>{product.company}</td>
                            <Button className='bg-danger text-light' onClick={() => deleteProduct(product._id)}>
                                <td>Delete</td>
                            </Button>
                            <Button>
                                <Nav.Link type="button" className="btn btn-outline-success text-dark" href={"/update/" + product._id}>Update</Nav.Link>
                            </Button>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                        <Button className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default ProductList;
