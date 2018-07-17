import * as types from '../constants/ActionTypes';
import { populateFactoryList, addNewFactory, updatedFactory, removedFactory } from '../actions';

const setupSocket = (dispatch) => {
	const socket = new WebSocket('');
	
	socket.onopen = () => {
		socket.send(JSON.stringify({
			type: types.FETCH_FACTORIES
		}))
	};
	socket.onmessage = (event) => {
		const message = JSON.parse(event.data);
		console.log('=========Incoming Messages========= ', message)
		const { type, data } = message;
		switch (type) {
			case types.FACTORY_LIST:
				dispatch(populateFactoryList(data));
				break;
			case types.NEW_FACTORY:
				dispatch(addNewFactory(data));
				break;
			case types.FACTORY_UPDATED:
				dispatch(updatedFactory(data));
				break;
			case types.FACTORY_REMOVED:
				dispatch(removedFactory(data));
			default:
				break
		}
	};
	
	return socket
};

export default setupSocket