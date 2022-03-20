import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getCurrencyList, setCurrency } from 'src/redux/actions/currencies';

const Currency = () => {
    const dispatch = useDispatch();
    const { currencyList, currency } = useSelector(state => state.currencies)

    useEffect(() => {
        dispatch(getCurrencyList())
    }, [])
    useEffect(() => {
        dispatch(setCurrency())
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