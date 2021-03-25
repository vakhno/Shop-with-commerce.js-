const initiaState = {
	items: [],
	firstOption: {},
}

const options = (state = initiaState, action) => {
	switch(action.type){
		case 'SET_OPTIONS':
			return {
				...state,
				items: action.payload,
				firstOption: action.payload[0],
			}
		default:
			return state
	}
}

export default options