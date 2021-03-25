import {commerce} from '../lib/commerce'
import {setProducts} from '../redux/actions/products'
import {setCart, clearCart} from '../redux/actions/cart'
import {getCountries} from '../redux/actions/countries'
import {setToken} from '../redux/actions/token'
import {setSubdivision} from '../redux/actions/subdivisions'
import {setOptions} from '../redux/actions/shippingOptions'
import {setOrder} from '../redux/actions/order'

export const getProducts = async (dispatch) => {
	const response = await commerce.products.list()
	.catch((error) => console.log(`Помилка при отриманні товарів: ${error}`))
	
	dispatch(setProducts(response.data))
}

export const getCart = async (dispatch) => {
	const response = await commerce.cart.retrieve()
	.catch((error) => console.log(`Error: ${error}`))
	
	dispatch(setCart(response))
}

export const handleAddToCart = async (dispatch, productId, quantity) => {
	const item = await commerce.cart.add(productId, quantity)

	dispatch(setCart(item.cart))
}

export const updateCartItemQuantity = async (dispatch, productId, quantity) => {
	const item = await commerce.cart.update(productId, {quantity})

	dispatch(setCart(item.cart))
}

export const removeCartItem = async (dispatch, productId) => {
	const item = await commerce.cart.remove(productId)

	dispatch(setCart(item.cart))
}

export const handleClearCart = async (dispatch) => {
	const item = await commerce.cart.empty()

	dispatch(clearCart())
}

export const generateToken = async (dispatch, cartId) => {
	console.log(cartId)
	const token = await commerce.checkout.generateToken(cartId, {type: 'cart'})
	.catch((error) => console.log(`Помилка при формувані ТОКЕНА: ${error}`))

	dispatch(setToken(token))
}

export const getShippingCountries = async (dispatch, tokenId) => {
	const countriesList = await commerce.services.localeListShippingCountries(tokenId)
	.catch((error) => console.log(`Помилка при отрманні списку країн: ${error}`))

	dispatch(getCountries(countriesList.countries))
}

export const getSubdivisions = async (dispatch, countryCode) => {
	const subdivisionsList = await commerce.services.localeListSubdivisions(countryCode)
	.catch((error) => console.log(`Помилка при отрманні регіонів країни: ${error}`))
	
	dispatch(setSubdivision(subdivisionsList.subdivisions))
}

export const getShippingOptions = async (dispatch, tokenId, country, subdivision=null) => {
	const options = await commerce.checkout.getShippingOptions(tokenId, {country})
	.catch((error) => console.log(`Помилка при отрманні типу і вартості доставки: ${error}`))

	dispatch(setOptions(options))
}

export const refreshCart = async (dispatch) => {
	const newCart = await commerce.cart.refresh()
	.catch((error) => console.log(`Помилка при оновлені кошика: ${error}`))

	dispatch(setCart(newCart))
}

export const handleCaptureCheckout = async (dispatch, tokenId, newOrder) => {
	const incomingOrder = await commerce.checkout.capture(tokenId, newOrder)
	.catch((error) => console.log(`Помилка при формувані замовлення: ${error}`))

	dispatch(setOrder(incomingOrder))
	refreshCart(dispatch)
}