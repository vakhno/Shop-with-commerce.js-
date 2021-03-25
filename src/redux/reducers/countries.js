const initialState = {
	countriesList: [],
}

const countries = (state = initialState, action) => {
	switch(action.type){
		case 'GET_COUNTRIES':
			return {
				...state,
				firstCountry: Object.entries(action.payload)[0],
				countriesList: action.payload,
			}
		default:
			return state
	}
}

export default countries