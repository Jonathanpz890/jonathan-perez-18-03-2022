import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../redux/actions/items';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Card } from 'reactstrap';
import { convertToDate } from '../utils/utils';

const ByItem = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.items);

    const button = <Button>Archive</Button>

    useEffect(() => {
        // dispatch(getItems())
    }, [])

    const renderButton = () => {
        return <Button color='primary' onClick={() => alert('meow')}>Archive</Button>
    }

    return(
        <div className='By-item'>
            <Tabs>
                <TabList>
                    <Tab>On Delivery</Tab>
                    |
                    <Tab>Archived</Tab>
                </TabList>

                <TabPanel>
                    <DataGrid
                        columns={[
                            { field: 'name', headerName: 'Name', flex: 1 },
                            { field: 'price', headerName: 'Price', width: 150 },
                            { field: 'store', headerName: 'Store', width: 150 },
                            { field: 'date', headerName: 'Estimated delivery', width: 150 },
                            { field: 'actions', headerName: 'Actions', width: 150, sortable: false, filterable: false, renderCell: renderButton },
                        ]}
                        rows={items.map((item, index) => {
                            return {
                                id: index,
                                key: index,
                                name: item.name,
                                price: item.price,
                                store: item.store,
                                date: convertToDate(item.date),
                                action: button
                            }       
                        })}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </TabPanel>
                <TabPanel>
                    <DataGrid
                        columns={[
                            { field: 'name', headerName: 'Name', flex: 1 },
                            { field: 'price', headerName: 'Price', width: 150 },
                            { field: 'store', headerName: 'Store', width: 150 },
                            { field: 'date', headerName: 'Estimated delivery', width: 150 },
                            { field: 'actions', headerName: 'Actions', width: 150, sortable: false, filterable: false, renderCell: renderButton },
                        ]}
                        rows={items.map((item, index) => {
                            return {
                                id: index,
                                key: index,
                                name: item.name,
                                price: item.price,
                                store: item.store,
                                date: convertToDate(item.date),
                                action: button
                            }       
                        })}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default ByItem;