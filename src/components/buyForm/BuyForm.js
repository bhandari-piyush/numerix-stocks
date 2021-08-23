import { memo, useState } from "react";
import { useDispatch } from "react-redux";

const BuyForm = memo(function BuyForm(props) {

    const [error, setError] = useState('');
    const [orderQuantity, setOrderQuantity] = useState('');
    const [selected, setSelected] = useState(props.selectedTicker);

    const dispatch = useDispatch();

    const updateOrderQuantity = (e) => {
        if (e.target.value > selected.quantity) setError('Order Quantity exceeds total quantity');
        else setError('');
        setOrderQuantity(e.target.value);
    };

    const handlePurchase = () => {
        const current = props.list.find(item => item.ticker === selected.ticker)
        if (current.price <= selected.price) {
            dispatch({type:'PURCHASE_STOCK', payload: {...selected, quantity: orderQuantity}});
            props.setSelectedTicker({});
        } else {
            setError('Price changed. Updated price in purchase form.');
            setOrderQuantity('');
            setSelected({...selected, price: current.price});
        }
    }

    return (
        <div className='order-form'>
            <h1>Order Form</h1>
            <div className='form-container'>
                <span className='order-item'>Ticker: <input type='text' className='info-field' disabled value={selected.ticker} /></span>
                <span className='order-item'>Price: <input type='text' className='info-field' disabled value={selected.price} /></span>
                <span className='order-item'>Quantity: <input type='text' max={selected.quantity} value={orderQuantity} className='info-field' onChange={updateOrderQuantity} /></span>
                <span className='order-button'><button disabled={error !== '' || orderQuantity === ''} onClick={handlePurchase}>Purchase</button></span>
            </div>
            <span className='error-msg'>{error}</span>
        </div>
    )
});

export default BuyForm;