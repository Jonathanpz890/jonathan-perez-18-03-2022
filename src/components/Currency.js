import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getCurrencyList, getCurrencyRates, setCurrency } from 'src/redux/actions/currencies';

const Currency = () => {
    const dispatch = useDispatch();
    const { currencyList, currency } = useSelector(state => state.currencies)

    useEffect(() => {
        dispatch(getCurrencyRates());
        if (!currencyList.length) {
            dispatch(getCurrencyList())
        }
        //eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (!currency) {
            dispatch(setCurrency(currencyList.find(currency => currency.value === 'USD')))
        }
        //eslint-disable-next-line
    }, [currencyList])

    return(
        <div className='Currency'>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={currency}
                value={currency}
                isClearable={false}
                name="currency"
                options={currencyList}
                onChange={(value) => dispatch(setCurrency(value))}
            />
        </div>
    )
}

export default Currency;