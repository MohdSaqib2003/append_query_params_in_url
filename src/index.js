import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './redux/reducers';


const store = createStore(rootReducers,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
<Provider store={store}>
<App /> 
</Provider>
);
