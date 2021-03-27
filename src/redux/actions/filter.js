export const setFilters = (filters) => ({
	type: 'SET_FILTERS',
	payload: filters,
})

export const setActiveFilter = (activeFilter) => ({
	type: 'SET_ACTIVE_FILTER',
	payload: activeFilter,
})