const initialStates = {
	items: [],
	isLoaded: false,
}

const products = (state=initialStates, action) => {
	switch(action.type){
		case 'SET_PRODUCTS':
			return {
				...state,
				items: action.payload,
				isLoaded: true,
			}
		case 'SET_LOADED_PRODUCTS':
			return {
				...state,
				isLoaded: action.payload,
			}
		default:
			return state
	}
}

export default products