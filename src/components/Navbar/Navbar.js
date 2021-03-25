import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import logo from '../../images/commerce.png'
import useStyles from './StylesNavbar'
import {useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

function Navbar() {
	const totalCount = useSelector(({cart}) => cart.totalCount)
	const location = useLocation()
	const classes = useStyles()

	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
						<img src={logo} alt='Commerce' height='25px' className={classes.image} />
						Інтернет-магазин
					</Typography>
					<div className={classes.grow}/>
					<div className={classes.button}>
						{
						location.pathname === '/' && 
						<IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
							<Badge badgeContent={totalCount} color="secondary">
								<ShoppingCart/>
							</Badge>
						</IconButton>
						}
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
