import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getCurrencyList, getCurrencyRates, setCurrency } from 'src/redux/actions/currencies';

const Currency = () => {
    const dispatch = useDispatch();
    const { currencyList, currency } = useSelector(state => state.currencies)

    useEffect(() => {
        //TODO: bring back to life
        // dispatch(getCurrencyRates());
        if (!currencyList) {
            dispatch(getCurrencyList())
        }
    }, [])
    useEffect(() => {
        dispatch(setCurrency(currencyList.find(currency => currency.value === 'USD')))
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