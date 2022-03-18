import ByItem from './ByItem';
import ByStore from './ByStore';

export const routes = [
    {
        name: 'Purchase By Item',
        path: '/by-item',
        component: <ByItem />
    },
    {
        name: 'Purchase By Store',
        path: '/by-store',
        component: <ByStore />
    }
]