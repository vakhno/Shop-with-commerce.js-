import React, {useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {CustomInput} from '../'
import {useSelector, useDispatch} from 'react-redux'
import {getSubdivisions, getShippingOptions} from '../../services/commerceApi'
import {getShippingData} from '../../redux/actions/userShippingData'
import {increaseStep} from '../../redux/actions/checkoutSteps'

const AddressForm = () => {
	const dispatch = useDispatch()
	const methods = useForm()
	const tokenId = useSelector(({token}) => token.id.id)

	const countries = useSelector(({countries}) => Object.entries(countries.countriesList).map( elem => elem))
	const firstCountry = useSelector(({countries}) =>  countries.firstCountry)
	const [country, setCountry] = useState('')

	const subdivisions = useSelector(({subdivisions}) => Object.entries(subdivisions.subdivisionList).map( elem => elem))
	const firstSubdivision = useSelector(({subdivisions}) => subdivisions.firstSubdivision)
	const [subdivision, setSubdivision] = useState(firstSubdivision)
	
	const options = useSelector(({options}) => options)
	const firstOption = useSelector(({options}) => options.firstOption)
	const [option, setOption] = useState(firstOption)

	useEffect(() => {
		setCountry(firstCountry)	
	}, [firstCountry])

	useEffect(() => {
		setSubdivision(firstSubdivision)
	}, [firstSubdivision])

	useEffect(() => {
		setOption(firstOption)
	}, [firstOption])

	useEffect(() => {
		country && getSubdivisions(dispatch, country[0])
	}, [country])

	useEffect(() => {
		tokenId && country && getShippingOptions(dispatch, tokenId, country[0], subdivision)
	}, [subdivision])

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Дані для оформлення доставки
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data) => {
						dispatch(getShippingData({...data, country, subdivision, option}))
						dispatch(increaseStep())
					}
				)}>
					<Grid container spacing={3}>
						<CustomInput required name='firstName' label="Ім'я"/>
						<CustomInput required name='lastName' label='Прізвище'/>
						<CustomInput required name='address1' label='Адреса'/>
						<CustomInput required name='email' label='Пошта'/>
						<CustomInput required name='city' label='Місто'/>
						<CustomInput required name='zip' label='Поштовий індекс'/>
						<Grid item xs={12} xm={6}>
							<InputLabel>Країна</InputLabel>
							<Select value={ typeof(country) !== 'undefined' && (country[0] || '')} fullWidth onChange={(e) => setCountry(countries.find(elem => e.target.value === elem[0]))}>
								{countries &&
									countries.map( (elem,index) => {
										return	<MenuItem key={`${elem[0]}_${index}`} value={elem[0]}>
													{elem[1]}
												</MenuItem>
									})
								}
							</Select>
						</Grid>
						<Grid item xs={12} xm={6}>
							<InputLabel>Регіон/область</InputLabel>
							<Select value={subdivision || ''} fullWidth onChange={(e) => setSubdivision(e.target.value)}>
								{subdivision &&
									subdivisions.map( (elem,index) => {
										return	<MenuItem key={`${elem[0]}_${index}`} value={elem[1]}>
													{elem[1]}
												</MenuItem>
									})
								}
							</Select>
						</Grid>
						<Grid item xs={12} xm={6}>
							<InputLabel>Спосіб доставки</InputLabel>
							<Select value={option.id || ''} fullWidth onChange={(e) => setOption(e.target.value)}>
								{
									options.items.length && 
										options.items.map((elem, index) => {
											return	<MenuItem key={`${elem[0]}_${index}`} value={elem.id}>
														{elem.description} - ₴{elem.price.raw} 
													</MenuItem>
										})
								}
							</Select>
						</Grid>
					</Grid>	
					<br/>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<Button component={Link} to='/cart' variant="outlined">До кошика</Button>
						<Button variant="outlined" type='submit' color='primary'>Далі</Button>
					</div>
				</form>
			</FormProvider>
		</>
	)
}

export default AddressForm
