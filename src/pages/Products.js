import { Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { createMessage } from 'src/redux/actions/message';
import { v4 as uuidv4 } from 'uuid';
import { addProduct, archiveProduct, getProducts, unarchiveProduct } from '../redux/actions/products';
import { convertToDate } from '../utils/utils';


const Products = () => {
    const dispatch = useDispatch();
    const { products, archivedProducts } = useSelector(state => state.products);

    const [tabIndex, setTabIndex] = useState(0)
    const [newProductModal, setNewProductModal] = useState(false)
    const [newProductData, setNewProductData] = useState({
        id: uuidv4(),
        name: '',
        price: '',
        store: '',
        date: new Date()
    })

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const renderArchiveButton = (value) => {
        return <Button color='primary' variant='contained' onClick={() => dispatch(archiveProduct(value.row.id))}>Archive</Button>
    }
    const renderUnarchiveButton = (value) => {
        return <Button color='secondary' variant='outlined' onClick={() => dispatch(unarchiveProduct(value.row.id))}>Unarchive</Button>
    }
    const addNewProduct = (e) => {
        e.preventDefault();
        dispatch(addProduct(newProductData))
        setNewProductData({
            id: uuidv4(),
            name: '',
            price: '',
            store: '',
            date: new Date()
        })
        setNewProductModal(false);
        dispatch(createMessage('meow nigga'))
    }

    return (
        <div className='Products'>
            <div className="Products__toolbar">
                <div className='Products__toolbar__tab-list'>
                    <button onClick={() => setTabIndex(0)} className={`Products__toolbar__tab${tabIndex === 0 ? ' selected' : ''}`}>On Delivery</button>
                    |
                    <button onClick={() => setTabIndex(1)} className={`Products__toolbar__tab${tabIndex === 1 ? ' selected' : ''}`}>Archived</button>
                </div>
                {tabIndex === 0 &&
                    <Button 
                        classes={{root: 'Products__toolbar__new-product-button'}}
                        color='success' 
                        onClick={() => setNewProductModal(true)}
                    >
                        Add new product
                    </Button>
                }
            </div>
            <div className="grid">
                <DataGrid
                    columns={[
                        { field: 'name', headerName: 'Name', flex: 1 },
                        { field: 'price', headerName: 'Price', width: 150, valueFormatter: (price) => `$${price.value}` },
                        { field: 'store', headerName: 'Store', width: 150 },
                        { field: 'date', headerName: 'Estimated delivery', width: 150, valueFormatter: (date) => convertToDate(date.value)},
                        { field: 'actions', headerName: 'Actions', width: 150, sortable: false, filterable: false, renderCell: (value) => {
                            if (tabIndex === 0) {
                                return renderArchiveButton(value);
                            } else if (tabIndex === 1) {
                                return renderUnarchiveButton(value);
                            }
                        }},
                    ]}
                    rows={(tabIndex === 0 ? products : archivedProducts).map((product, index) => {
                        return {
                            id: product.id,
                            key: index,
                            name: product.name,
                            price: product.price,
                            store: product.store,
                            date: product.date,
                        }
                    })}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <Modal isOpen={newProductModal} toggle={() => setNewProductModal(false)} onClose={() => alert('nigga')}>
                <ModalHeader tag='h3' toggle={() => setNewProductModal(false)}>Add new product</ModalHeader>
                <ModalBody>
                    <Form onSubmit={addNewProduct}>
                        <FormGroup>
                            <TextField 
                                id='name'
                                label='Name'
                                value={newProductData.name}
                                onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id='store'
                                label='Store'
                                value={newProductData.store}
                                onChange={(e) => setNewProductData({ ...newProductData, store: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id='price'
                                type='number'
                                label='Price (in USD)'
                                value={newProductData.price}
                                onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor='date'>Estimated date of delivery:</label>
                            <DatePicker selected={newProductData.date} onChange={(date) => setNewProductData({ ...newProductData, date: date.getTime() })} />
                        </FormGroup>
                        <FormGroup style={{textAlign: 'center'}}>
                            <Button color='success' type='submit' disabled={!newProductData.name || !newProductData.price || !newProductData.store || !newProductData.date}>Add</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Products;