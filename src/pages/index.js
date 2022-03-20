import Products from './Products';
import Stores from './Stores';

export const routes = [
    {
        name: 'Purchase By Item',
        path: '/products',
        component: <Products />
    },
    {
        name: 'Purchase By Store',
        path: '/stores',
        component: <Stores />
    }
]