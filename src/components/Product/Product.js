import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './StylesProduct'
import {useDispatch} from "react-redux"
import {Link} from 'react-router-dom'

const Product = ({id, name, image, description, price, onAddToCart}) => {
	const dispatch = useDispatch()
	const classes = useStyles()

	return (
		<Card className={classes.root}> 
			<Link to={`products/${id}`}>
				<CardMedia className={classes.media} image={image} title={name}/>
			</Link>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant='h5' gutterBottom>
						{name}
					</Typography>
					<Typography variant='h5'>
						₴{price}
					</Typography>
				</div>
				<Typography variant='body2' color='textSecondary'>
					{description.replace(/<\/?[a-zA-Z]+>/gi,'')}
				</Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label='Add to Cart' onClick={() => onAddToCart(dispatch, id, 1)}>
					<AddShoppingCart/>
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default Product
