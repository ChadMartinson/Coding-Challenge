import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

export const handleMutations = function* handleMutations(params) {
	yield takeEvery(types.CREATE_FACTORY, (action) => {
		params.socket.send(JSON.stringify(action));
	});
	yield takeEvery(types.DELETE_FACTORY, (action) => {
		params.socket.send(JSON.stringify(action));
	});
	yield takeEvery(types.UPDATE_FACTORY, (action) => {
		params.socket.send(JSON.stringify(action));
	});
};
