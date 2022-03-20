import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const useStoreDivider = () => {
    const { products } = useSelector(state => state.products);

    const [stores, setStores] = useState([])

    useEffect(() => {
        let storeArray = []
        products.forEach(product => {
            if (!storeArray.some(store => store.name === product.store)) {
                storeArray.push({name: product.store});
            }
        })
        storeArray.forEach(store => {
            const storeProducts = products.filter(product => product.store === store.name);
            store.quantity = storeProducts.length;
            store.price = storeProducts.map(product => parseInt(product.price)).reduce((a, b) => a + b)
            store.id = uuidv4();
        })
        setStores(storeArray);
    }, [products])

    return stores;
}

export default useStoreDivider;