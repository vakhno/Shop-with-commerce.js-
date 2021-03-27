import React, {useState, useEffect} from 'react'
import {Typography, FormControl, InputLabel, Select, NativeSelect, MenuItem} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import useStyles from './StylesFilter'
import {getProducts} from '../../services/commerceApi'
import {setActiveFilter} from '../../redux/actions/filter'

const Filter = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const filters = useSelector(({filter}) => filter.filters)
	const activeSlug = useSelector( ({filter}) => filter.activeFilter)

	useEffect(() => {
		getProducts(dispatch, activeSlug)
	}, [activeSlug])

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel htmlFor="outlined-filter-native-simple">Фільтрація</InputLabel>
			<Select
				defaultValue={'all'}
				onChange={(e) => dispatch(setActiveFilter(e.target.value))}
				inputProps={{
					id: 'outlined-filter-native-simple',
				}}
			>
				{
					filters && filters.map((elem, index) => {
						return <MenuItem value={elem.slug} key={`${elem.slug}_${index}`}>{elem.name}</MenuItem>
					})
				}		
			</Select>
		</FormControl>
	)
}

export default Filter
