import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const useStoreDivider = () => {
    const { products, archivedProducts } = useSelector(state => state.products);

    const [stores, setStores] = useState([])

    useEffect(() => {
        const allProducts = [...products, ...archivedProducts];
        let storeArray = []
        allProducts.forEach(product => {
            if (!storeArray.some(store => store.name === product.store)) {
                storeArray.push({name: product.store});
            }
        })
        storeArray.forEach(store => {
            const storeProducts = allProducts.filter(product => product.store === store.name);
            store.quantity = storeProducts.length;
            store.price = storeProducts.map(product => parseInt(product.price)).reduce((a, b) => a + b)
            store.id = uuidv4();
        })
        setStores(storeArray);
        //eslint-disable-next-line
    }, [products])

    return stores;
}

export default useStoreDivider;