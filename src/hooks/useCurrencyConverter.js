import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useCurrencyConverter = (initialPrice) => {
    const { currency, currencyRates } = useSelector(state => state.currencies);
    const [price, setPrice] = useState(0)

    useEffect(() => {
        //Initial price is in USD, and currency rates are based on EUR
        //So first I convert initial price to EUR and then to the chosen currency
        const eurInitialPrice = initialPrice / currencyRates.USD;
        setPrice((eurInitialPrice * currencyRates[currency?.value]).toFixed())
    }, [currency])

    return price
}

export default useCurrencyConverter;