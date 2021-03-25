export const setCart = (products) => ({
	type: 'SET_CART',
	payload: products,
})

export const clearCart = () => ({
	type: 'CLEAR_CART',
})
