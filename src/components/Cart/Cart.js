import React from 'react'
import {Container, Typography} from '@material-ui/core'
import {useSelector} from 'react-redux'
import useStyles from './StylesCart'
import {EmptyCart, FilledCart} from '../'

const Cart = () => {
	const classes = useStyles()
	const isEmpty = useSelector(({cart}) => !cart.items.length)

	return (
		<Container>
			<div className={classes.toolbar}/>
			<Typography variant='h3' className={classes.title} gutterBottom>
				Кошик
			</Typography>
			{
				isEmpty ? <EmptyCart /> : <FilledCart/>
			}
		</Container>
	)
}

export default Cart
