import * as types from '../constants/ActionTypes';

export default function (state = {}, action) {
	const { data = {} } = action;
	const { factories } = state;
	switch (action.type) {
		case types.FACTORY_LIST:
			return {...state, factories: data.factories };
		case types.FACTORY_UPDATED:
			const withUpdatedFactory = factories.map((factory) => factory.id === data.id ? data : factory );
			return {...state, factories: withUpdatedFactory};
		case types.FACTORY_REMOVED:
			console.log(data)
			const withFactoryRemoved = factories.filter((factory) => factory.id !== data.id);
			return {...state, factories: withFactoryRemoved};
		case 'NEW_FACTORY':
			return {...state, factories: [ ...factories, data ]};
		// eslint-disable-line
		default:// eslint-disable-line no-fallthrough
			
			return {...state};
	}
}

