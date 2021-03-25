const initialState = {
	data: {}
}

const order = (state=initialState, action) => {
	switch(action.type){
		case 'SET_ORDER':
			return {
				...state,
				data: action.payload,
			}
		case 'CLEAR_ORDER':
			return {
				...state,
				data: {},
			}
		default:
			return state
	}
}

export default order