const initialState = {
	data: ''
}

const userShippingData = (state = initialState, action) => {
	switch(action.type){
		case 'GET_SHIPPING_DATA':
			return {
				...state,
				data: action.payload,
			}
		default:
			return state
	}
} 

export default userShippingData