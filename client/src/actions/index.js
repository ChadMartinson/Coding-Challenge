import * as types from '../constants/ActionTypes';

export const updateFactory = data => ({
	type: types.UPDATE_FACTORY,
	data
});

export const createFactory = data => ({
	type: types.CREATE_FACTORY,
	data
});

export const deleteFactory = id => ({
	type: types.DELETE_FACTORY,
	data: { id }
});

export const fetchFactories = () => ({
	type: types.FETCH_FACTORIES,
	data: {}
});

export const populateFactoryList = factories => ({
	type: types.FACTORY_LIST,
	data: { factories }
});

export const addNewFactory = newFactory => ({
	type: types.NEW_FACTORY,
	data: newFactory
});

export const updatedFactory = data => ({
	type: types.FACTORY_UPDATED,
	data
});

export const removedFactory = data => ({
	type: types.FACTORY_REMOVED,
	data
});