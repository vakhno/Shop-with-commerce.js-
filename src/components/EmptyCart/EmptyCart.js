import React from 'react'
import {Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import useStyles from './StyledEmptyCart'

const EmptyCart = () => {
	const classes = useStyles()
	return (
		<Typography variant='subtitle'>
			Для наступного кроку оберіть бажані товари!
			<Link to='/' className={classes.link}>До списку товарів!</Link>
		</Typography>

	)
}

export default EmptyCart
