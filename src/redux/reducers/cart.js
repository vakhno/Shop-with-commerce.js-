const initialState = {
	id: '',
	items: {},
	totalCount: 0,
	totalPrice: 0,
}

const cart = (state = initialState, action) => {
	switch(action.type){
		case 'SET_CART': {
			return {
				...state,
				id: action.payload.id,
				items: action.payload.line_items,
				totalCount: action.payload.total_items,
				totalPrice: action.payload.subtotal.raw,
			}
		}
		case 'CLEAR_CART': {
			return {
				...state,
				id: '',
				items: [],
				totalCount: 0,
				totalPrice: 0,
			}
		}
		default:
			return state
	}
}

export default cart