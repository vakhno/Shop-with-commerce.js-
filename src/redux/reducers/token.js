const initialState = {
	id: {},
}

const token = (state = initialState, action) => {
	switch(action.type){
		case 'SET_TOKEN':
			return {
				...state,
				id: action.payload,
			}
		default:
			return state
	}
}

export default token