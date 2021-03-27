import {combineReducers} from 'redux'

import products from './products'
import cart from './cart'
import steps from './checkoutSteps'
import countries from './countries'
import token from './token'
import subdivisions from './subdivisions'
import options from './shippingOptions'
import userShippingData from './userShippingData'
import order from './order'
import filter from './filter'

const rootReducer = combineReducers({
	products,
	cart,
	steps,
	countries,
	token,
	subdivisions,
	options,
	userShippingData,
	order,
	filter,
})

export default rootReducer