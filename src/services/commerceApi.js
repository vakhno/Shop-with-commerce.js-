import {commerce} from '../lib/commerce'
import {setProducts} from '../redux/actions/products'
import {setCart, clearCart} from '../redux/actions/cart'
import {getCountries} from '../redux/actions/countries'
import {setToken} from '../redux/actions/token'
import {setSubdivision} from '../redux/actions/subdivisions'
import {setOptions} from '../redux/actions/shippingOptions'
import {setOrder} from '../redux/actions/order'
import {setFilters} from '../redux/actions/filter'

export const getProducts = async (dispatch, slug=[]) => {
	const response = await commerce.products.list({category_slug: slug === 'all' ? [] : [slug],})
	.catch((error) => console.log(`Помилка при отриманні товарів: ${error}`))

	dispatch(setProducts(response.data))
}

export const getCart = async (dispatch) => {
	const response = await commerce.cart.retrieve()
	.catch((error) => console.log(`Error: ${error}`))

	dispatch(setCart(response))
}

export const handleAddToCart = async (dispatch, productId, quantity) => {
	const response = await commerce.cart.add(productId, quantity)

	dispatch(setCart(response.cart))
}

export const updateCartItemQuantity = async (dispatch, productId, quantity) => {
	const response = await commerce.cart.update(productId, {quantity})

	dispatch(setCart(response.cart))
}

export const removeCartItem = async (dispatch, productId) => {
	const response = await commerce.cart.remove(productId)

	dispatch(setCart(response.cart))
}

export const handleClearCart = async (dispatch) => {
	const response = await commerce.cart.empty()

	dispatch(clearCart())
}

export const generateToken = async (dispatch, cartId) => {
	const response = await commerce.checkout.generateToken(cartId, {type: 'cart'})
	.catch((error) => console.log(`Помилка при формувані ТОКЕНА: ${error}`))

	dispatch(setToken(response))
}

export const getShippingCountries = async (dispatch, tokenId) => {
	const response = await commerce.services.localeListShippingCountries(tokenId)
	.catch((error) => console.log(`Помилка при отрманні списку країн: ${error}`))

	dispatch(getCountries(response.countries))
}

export const getSubdivisions = async (dispatch, countryCode) => {
	const response = await commerce.services.localeListSubdivisions(countryCode)
	.catch((error) => console.log(`Помилка при отрманні регіонів країни: ${error}`))
	
	dispatch(setSubdivision(response.subdivisions))
}

export const getShippingOptions = async (dispatch, tokenId, country, subdivision=null) => {
	const response = await commerce.checkout.getShippingOptions(tokenId, {country})
	.catch((error) => console.log(`Помилка при отрманні типу і вартості доставки: ${error}`))

	dispatch(setOptions(response))
}

export const refreshCart = async (dispatch) => {
	const response = await commerce.cart.refresh()
	.catch((error) => console.log(`Помилка при оновлені кошика: ${error}`))

	dispatch(setCart(response))
}

export const handleCaptureCheckout = async (dispatch, tokenId, newOrder) => {
	const response = await commerce.checkout.capture(tokenId, newOrder)
	.catch((error) => console.log(`Помилка при формувані замовлення: ${error}`))

	dispatch(setOrder(response))
	refreshCart(dispatch)
}

export const setFilter = async (dispatch) => {
	const response = await commerce.categories.retrieve([], { type: 'slug' })
	.catch((error) => console.log(`Помилка при отриманні списку фільтрів: ${error}`))

	dispatch(setFilters(response.data))
}