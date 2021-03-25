import React from 'react'
import {Grid, Typography, Button} from '@material-ui/core'
import useStyles from './StylesFilledCart'
import {useSelector, useDispatch} from 'react-redux'
import {CartItem} from '../'
import {handleClearCart} from '../../services/commerceApi'
import {Link} from 'react-router-dom'

const FilledCart = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const cartItems = useSelector(({cart}) => cart.items)
	const totalPrice = useSelector(({cart}) => cart.totalPrice)

	return (
		<>
			<Grid container spacing={3}>
				{
					cartItems.map( (item, index) => {
						return  <Grid item xs={12} sm={4} key={`${item.id}_${index}`}>
									<CartItem id={item.id} name={item.product_name} image={item.media.source} price={item.price.raw} count={item.quantity}/>
								</Grid>
					})
				}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant='h4'>
					Загальна сума: ₴{totalPrice}
				</Typography>
				<div>
					<Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={() => handleClearCart(dispatch)}>
						Очистити кошик
					</Button>
					<Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
						Оформлення замовлення
					</Button>
				</div>
			</div>
		</>
	)
}

export default FilledCart
