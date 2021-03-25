const initialStep = {
	currentStep: 0,
	stepsQuantity: 2,
}

const steps = (state = initialStep, action) => {
	switch(action.type){
		case 'INCREASE_STEP':
			return {
				...state,
				currentStep: state.currentStep + 1
			}
		case 'REDUCE_STEP':
			return {
				...state,
				currentStep: state.currentStep - 1
			}
		case 'CLEAR_STEPS':
			return {
				...state,
				currentStep: 0
			}	
		default:
			return state
	}
}

export default steps