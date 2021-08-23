const initialState = {
    stockList: [
        { ticker: 'AAPL', price: 120, time: new Date(), timeDiff: 0, quantity: 100 },
        { ticker: 'GOOGL', price: 2550, time: new Date(), timeDiff: 0, quantity: 500 },
        { ticker: 'AMZN', price: 3580, time: new Date(), timeDiff: 0, quantity: 1000 },
        { ticker: 'MSFT', price: 304, time: new Date(), timeDiff: 0, quantity: 1800 },
        { ticker: 'FB', price: 360, time: new Date(), timeDiff: 0, quantity: 1500 },
        { ticker: 'TSLA', price: 680, time: new Date(), timeDiff: 0, quantity: 800 }
    ],
    orders: []
};

export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case 'STOCKS_UPDATE':
            const { stockList } = state;
            const updatedStocks = stockList.map(stock => {
                const timeDiff = Math.floor((new Date() - stock.time) / 1000);
                const priceThreshold = stock.price * 0.01;
                const minPrice = stock.price - priceThreshold;
                const maxPrice = stock.price + priceThreshold
                const updatedPrice = Math.random() * (maxPrice - minPrice + 1) + minPrice;
                const isPriceSame = updatedPrice - stock.price === 0; // to check if new price is same as the prev one. If yes, don't update price and time
                return { ...stock, price: isPriceSame ? stock.price : parseFloat(updatedPrice.toFixed(2)), time: !isPriceSame ? new Date() : stock.time, timeDiff }
            });
            return { ...state, stockList: updatedStocks };

        case 'PURCHASE_STOCK':
            const updated = state.stockList.map(stock => {
                if (stock.ticker === action.payload.ticker) return { ...stock, quantity: stock.quantity - action.payload.quantity };
                else return stock;
            });
            const updatedOrders = state.orders;
            updatedOrders.push(action.payload)
            return { ...state, stockList: updated, orders: updatedOrders };

        default:
            return state
    }
};
