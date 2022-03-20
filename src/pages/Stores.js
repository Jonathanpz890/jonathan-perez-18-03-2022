import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import useStoreDivider from 'src/hooks/useStoreDivider';

const Stores = () => {
    const stores = useStoreDivider();

    return(
        <div className='Stores'>
            <div className="grid">
                <DataGrid
                    columns={[
                        { field: 'store', headerName: 'Store', flex: 1 },
                        { field: 'quantity', headerName: 'Number of items', flex: 1 },
                        { field: 'price', headerName: 'Sum of item prices', flex: 1, valueFormatter: (price) => `$${price.value}` },
                    ]}
                    rows={stores.map((store, index) => {
                        return {
                            id: store.id,
                            key: store.id,
                            store: store.name,
                            price: store.price,
                            quantity: store.quantity
                        }
                    })}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    )
}

export default Stores;