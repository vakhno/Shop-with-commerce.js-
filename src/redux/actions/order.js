export const setOrder = (data) => ({
	type: 'SET_ORDER',
	payload: data,
})

export const clearOrder = () => ({
	type: 'CLEAR_ORDER',
})