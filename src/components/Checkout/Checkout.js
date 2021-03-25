import React from 'react'
import {Paper, Stepper, Step, StepLabel, Typography} from '@material-ui/core'
import useStyles from './StylesCheckout'
import {AddressForm, PaymentForm, Confirmation} from '../'
import {useSelector} from 'react-redux'

const steps = ['Оформлення доставки', 'Оплата товарів']

const Checkout = () => {
	const currentStep = useSelector(({steps}) => steps.currentStep)
	const classes = useStyles()

	const switchCurrentComponent = () => {
		switch(currentStep){
			case 0:
				return <AddressForm/>
			case 1: 
				return <PaymentForm/>
			case 2:
				return <Confirmation/>
			default:
				return <AddressForm/>
		}	
	}

	return (
		<>
			<div className={classes.toolbar}/>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant='h4' align='center'>
						Оформлення
					</Typography>
					<Stepper activeStep={currentStep} className={classes.stepper}>
						{
							steps.map( (step, index) => {
								return  <Step key={index}>
											<StepLabel>
												{step}
											</StepLabel>
										</Step>
							})
						}
					</Stepper>
					{
						switchCurrentComponent()
					}
				</Paper>
			</main>	
		</>
	)
}

export default Checkout
