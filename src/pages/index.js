import Products from './Products';
import Stores from './Stores';

export const routes = [
    {
        name: 'Purchases By Item',
        path: '/products',
        component: <Products />
    },
    {
        name: 'Purchases By Store',
        path: '/stores',
        component: <Stores />
    }
]