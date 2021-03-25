import React from 'react'
import {Typography, Button, Divider} from '@material-ui/core'
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {Review} from '../'
import {useSelector, useDispatch} from 'react-redux'
import {reduceStep} from '../../redux/actions/checkoutSteps'
import {handleCaptureCheckout} from '../../services/commerceApi'
import {increaseStep} from '../../redux/actions/checkoutSteps'

const PaymentForm = () => {
	const dispatch = useDispatch()
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
	const tokenId = useSelector(({token}) => token.id.id)
	const totalPrice = useSelector(({cart}) => cart.totalPrice)
	const items = useSelector(({token}) => token.id.live.line_items)
	const firstName = useSelector(({userShippingData}) => userShippingData.data.firstName)
	const lastName = useSelector(({userShippingData}) => userShippingData.data.lastName)
	const email = useSelector(({userShippingData}) => userShippingData.data.email)
	const street = useSelector(({userShippingData}) => userShippingData.data.address1)
	const city = useSelector(({userShippingData}) => userShippingData.data.city)
	const subdivision = useSelector(({userShippingData}) => userShippingData.data.subdivision)
	const zip = useSelector(({userShippingData}) => userShippingData.data.zip)
	const country = useSelector(({userShippingData}) => userShippingData.data.country[0])
	const shippingOption = useSelector(({userShippingData}) => userShippingData.data.option.id)

	const handleSubmit = async (event, elements, stripe) => {
		event.preventDefault()
		if(!stripe || !elements){
			return
		}
		const cardElement = elements.getElement(CardElement)
		const {paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})
		.catch((error) => console.log(`Помилка при отриманні Stripe: ${error}`))
		if(paymentMethod){
			const orderData = {
				line_items: items,
				customer: {
					firstname: firstName,
					lastname: lastName,
					email: email,
				},
				shipping: {
					name: 'Primary',
					street: street,
					town_city: city,
					county_state: '',
					postal_zip_code: zip,
					country: country,
				},
				fulfillment: { 
					shipping_method: shippingOption,
				},
				payment: {
					gateway: 'stripe',
					stripe: {
						payment_method_id: paymentMethod.id,
					}
				},
			}

			handleCaptureCheckout(dispatch, tokenId, orderData)
			dispatch(increaseStep())
		}
	}
	

	return (
		<div>
			<Review />
			<Divider/>
			<Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>
				Спосіб оплати (ввести: 4242 4242 4242 4242)
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{
						({elements, stripe}) => {
							return  <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
										<CardElement/>
										<br/>
										<br/>
										<div style={{display:'flex', justifyContent:'space-between'}}>
											<Button variant='outlined' onClick={() => dispatch(reduceStep())}>До оформлення доставки</Button>
											<Button type='submit' variant='contained' disabled={!stripe} color='primary'>
												Сплатити ₴{totalPrice}
											</Button>
										</div>
									</form>
						}
					}
				</ElementsConsumer>
			</Elements>
		</div>
	)
}

export default PaymentForm
