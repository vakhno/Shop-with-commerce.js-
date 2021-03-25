import React from 'react'
import {Button, CircularProgress, Divider, Typography} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import useStyles from './StylesConfirmation'
import {clearSteps} from '../../redux/actions/checkoutSteps'
import {useHistory} from "react-router-dom"

const Confirmation = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const classes = useStyles()
	const customer = useSelector(({order}) => order.data.customer)
	const ref = useSelector(({order}) => order.data.customer_reference)

	const closeConfirmation = () => {
		dispatch(clearSteps())
		history.push('/')
	}

	return (
		customer ? 
		<>
			<div>	
				<Typography variant='h5'>Дякуємо за покупку, {customer.firstname} {customer.lastname}</Typography>
				<Divider className={classes.divider}/>
				<Typography variant='subtitle2'>Номер замовлення: {ref}</Typography>
			</div>
			<br/>
			<Button variant='outlined' type='button' onClick={() => closeConfirmation()}>До головної</Button>
		</>
		:
		<div className={classes.spinner}>
			<CircularProgress/>
		</div>
	)
}

export default Confirmation
