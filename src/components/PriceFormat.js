import React from 'react';
import { useSelector } from 'react-redux';
import useCurrencyConverter from 'src/hooks/useCurrencyConverter';

const PriceFormat = ({ initialPrice }) => {
    const { currency } = useSelector(state => state.currencies);
    const convertedCurrency = useCurrencyConverter(initialPrice)

    return (
        <p>{currency?.symbol} {convertedCurrency}</p>
    )
}

export default PriceFormat; 