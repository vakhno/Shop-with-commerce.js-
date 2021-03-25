export const setProducts = (products) => ({
	type: 'SET_PRODUCTS',
	payload: products,
})

export const setLoadedProducts = (value) => ({
	type: 'SET_LOADED_PRODUCTS',
	payload: value,
})