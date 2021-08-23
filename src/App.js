import './App.css';
import ItemList from './components/itemList/ItemList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BuyForm from './components/buyForm/BuyForm';


export default function App() {
  const [selectedTicker, setSelectedTicker] = useState({});

  const list = useSelector(state => state.stockList);

  const orders = useSelector(state => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'STOCKS_UPDATE' })
    }, 5000);

    return () => { // clear interval on unmount
      clearInterval(interval);
    }
  }, [dispatch]);

  const isEmpty = (obj) => {
    return (Object.entries(obj).length === 0 && obj.constructor === Object) || obj.length === 0;
  }

  return (
    <div className="App">
      <div className='body'>
        <ItemList list={list} setSelectedTicker={setSelectedTicker} />
        {!isEmpty(selectedTicker) ? <BuyForm selectedTicker={selectedTicker} list={list} setSelectedTicker={setSelectedTicker} /> : null}
        {!isEmpty(orders) && <ItemList orders={orders} /> }
      </div>
    </div>
  );
}
