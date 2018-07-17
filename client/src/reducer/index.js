/* eslint-disable */
import * as types from '../constants/ActionTypes';

const getFactoryIndex = (data, oldFactories) => oldFactories.findIndex((factory) => factory.id = data.id);

export default function (state = {}, action) {
	const { data = {} } = action;
	const { factories = [] } = data;
	const { factories: oldFactories } = state;
	switch (action.type) {
		case types.FACTORY_LIST:
			return {...state, factories };
		case types.FACTORY_UPDATED:
			const updateIndex = getFactoryIndex(data, oldFactories);
			oldFactories[updateIndex] = data;
			return {...state, oldFactories};
		case types.FACTORY_REMOVED:
			const deleteIndex = getFactoryIndex(data, oldFactories);
			oldFactories.slice([deleteIndex], 1);
			return {...state, oldFactories};
		case 'NEW_FACTORY':
			oldFactories.push(data);
			return {...state, oldFactories};
	}
}

