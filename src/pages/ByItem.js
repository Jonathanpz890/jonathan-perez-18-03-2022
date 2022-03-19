import { Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { addItem, archiveItem, getItems, unarchiveItem } from '../redux/actions/items';
import { convertToDate } from '../utils/utils';


const ByItem = () => {
    const dispatch = useDispatch();
    const { items, archivedItems } = useSelector(state => state.items);

    const [tabIndex, setTabIndex] = useState(0)
    const [newItemModal, setNewItemModal] = useState(false)
    const [newItemData, setNewItemData] = useState({
        id: uuidv4(),
        name: '',
        price: '',
        store: '',
        date: new Date()
    })

    useEffect(() => {
        dispatch(getItems())
    }, [])

    const renderArchiveButton = (value) => {
        return <Button color='primary' variant='contained' onClick={() => dispatch(archiveItem(value.row.id))}>Archive</Button>
    }
    const renderUnarchiveButton = (value) => {
        return <Button color='secondary' variant='outlined' onClick={() => dispatch(unarchiveItem(value.row.id))}>Unarchive</Button>
    }
    const addNewItem = (e) => {
        e.preventDefault();
        dispatch(addItem(newItemData))
        setNewItemData({
            id: uuidv4(),
            name: '',
            price: '',
            store: '',
            date: new Date()
        })
        setNewItemModal(false);
    }

    return (
        <div className='By-item'>
            <div className="By-item__toolbar">
                <div className='By-item__toolbar__tab-list'>
                    <button onClick={() => setTabIndex(0)} className={`By-item__toolbar__tab${tabIndex === 0 ? ' selected' : ''}`}>On Delivery</button>
                    |
                    <button onClick={() => setTabIndex(1)} className={`By-item__toolbar__tab${tabIndex === 1 ? ' selected' : ''}`}>Archived</button>
                </div>
                {tabIndex === 0 &&
                    <Button 
                        classes={{root: 'By-item__toolbar__new-item-button'}}
                        color='success' 
                        onClick={() => setNewItemModal(true)}
                    >
                        Add new item
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
                    rows={(tabIndex === 0 ? items : archivedItems).map((item, index) => {
                        return {
                            id: item.id,
                            key: index,
                            name: item.name,
                            price: item.price,
                            store: item.store,
                            date: item.date,
                        }
                    })}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <Modal isOpen={newItemModal} toggle={() => setNewItemModal(false)} onClose={() => alert('nigga')}>
                <ModalHeader tag='h3' toggle={() => setNewItemModal(false)}>Add new item</ModalHeader>
                <ModalBody>
                    <Form onSubmit={addNewItem}>
                        <FormGroup>
                            <TextField 
                                id='name'
                                label='Name'
                                value={newItemData.name}
                                onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id='store'
                                label='Store'
                                value={newItemData.store}
                                onChange={(e) => setNewItemData({ ...newItemData, store: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id='price'
                                type='number'
                                label='Price (in USD)'
                                value={newItemData.price}
                                onChange={(e) => setNewItemData({ ...newItemData, price: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label for='date'>Estimated date of delivery:</label>
                            <DatePicker selected={newItemData.date} onChange={(date) => setNewItemData({ ...newItemData, date: date.getTime() })} />
                        </FormGroup>
                        <FormGroup style={{textAlign: 'center'}}>
                            <Button color='success' type='submit' disabled={!newItemData.name || !newItemData.price || !newItemData.store || !newItemData.date}>Add</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ByItem;