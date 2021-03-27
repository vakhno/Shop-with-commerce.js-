const initialState = {
	filters: [],
	activeFilter: 'all',
}

const setFilters = (filters) => {
	const allProductsSlug = {
		slug: 'all',
		name: 'Усі',
		description: '',
	}
	let allFilters = filters.map( elem => ({
		slug: elem.slug,
		name: elem.name,
		description: elem.description,
	}))
	allFilters = [allProductsSlug, ...allFilters]

	return allFilters
}

const filter = (state=initialState, action) => {
	switch(action.type){
		case 'SET_FILTERS':
			return {
				...state,
				filters: setFilters(action.payload),
			}
		case 'SET_ACTIVE_FILTER':
			return {
				...state,
				activeFilter: action.payload,
			}
		default:
			return state
	}
}

export default filter