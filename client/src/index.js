import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { handleMutations } from './sagas'
import setupSocket from './sockets'
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(sagaMiddleware)
));

const socket = setupSocket(store.dispatch);

sagaMiddleware.run(handleMutations, { socket });

ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
	document.getElementById('root'));

registerServiceWorker();
