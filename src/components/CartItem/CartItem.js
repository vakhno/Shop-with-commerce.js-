import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core'
import useStyles from './StylesCartItem'
import {removeCartItem, updateCartItemQuantity} from '../../services/commerceApi'
import {useDispatch} from 'react-redux'

const CartItem = ({id, name, image, price, count}) => {
	const dispatch = useDispatch()
	const classes = useStyles()

	return (
		<Card>
			<CardMedia image={image} alt={name} className={classes.media}/>
			<CardContent className={classes.cardContent}>
				<Typography variant='h4'>{name}</Typography>
				<Typography variant='h5'>₴{price}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button type='button' size='small' onClick={() => updateCartItemQuantity(dispatch, id, count - 1)}>-</Button>
					<Typography>{count}</Typography>
					<Button type='button' size='small' onClick={() => updateCartItemQuantity(dispatch, id, count + 1)}>+</Button>
				</div>
				<Button variant='contained' type='button' color='secondary' onClick={() => removeCartItem(dispatch, id)}>Видалити</Button>
			</CardActions>
		</Card>
	)
}

export default CartItem
