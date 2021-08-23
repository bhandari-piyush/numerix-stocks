export default function ItemList(props) {
    const isOrders = props.orders && props.orders.length > 0;
    const items = isOrders ? props.orders : props.list;

    const renderTable = () => (
        <table>
            <thead>
                <tr>
                    <td>Ticker</td>
                    <td>{isOrders ? 'Order Price' : 'Price'}</td>
                    <td>{isOrders ? 'Order Quantity' : 'Quantity'}</td>
                    {!isOrders && <td>Updated</td>}
                    {!isOrders && <td>Buy</td>}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.ticker}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        {!isOrders && <td>{`${item.timeDiff} seconds`}</td>}
                        {!isOrders && <td><button onClick={() => props.setSelectedTicker(item)}>Buy</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <h1>{isOrders ? 'Orders' : 'Stocks'}</h1>
            <span className='list-table'>{renderTable()}</span>
        </>
    )
}