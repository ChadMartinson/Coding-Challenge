import * as types from '../constants/ActionTypes';
import { populateFactoryList, addNewFactory } from '../actions';

const setupSocket = (dispatch) => {
	const socket = new WebSocket('ws://localhost:8989');
	
	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: types.FETCH_FACTORIES
		}))
	};
	socket.onmessage = (event) => {
		const message = JSON.parse(event.data);
		const { type, data } = message;
		switch (type) {
			case types.FACTORY_LIST:
				dispatch(populateFactoryList(data));
				break;
			case types.NEW_FACTORY:
				dispatch(addNewFactory(data));
				break;
			case types.FACTORY_UPDATED:
				dispatch()
			default:
				break
		}
	};
	
	return socket
};

export default setupSocket