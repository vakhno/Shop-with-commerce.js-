const initialState = {
	subdivisionList: [],
	firstSubdivision: ''
}

const subdivisions = (state = initialState, action) => {
	switch(action.type){
		case 'SET_SUBDIVISIONS':
			return {
				...state,
				subdivisionList: action.payload,
				firstSubdivision: Object.entries(action.payload)[0][1],
			}
		default:
			return state
	}
}

export default subdivisions