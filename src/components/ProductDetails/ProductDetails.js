import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import useStyles from './StylesProductDetails'
import {handleAddToCart} from '../../services/commerceApi'

const ProductDetails = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const {productId} = useParams()
	const products = useSelector(({products}) => products.items)
	const productInfo = products.find( elem => productId === elem.id)

	console.log(productInfo)
	return (
		productInfo &&
		<Card className={classes.root}> 
			<CardMedia className={classes.media} image={productInfo.media.source} title={productInfo.name}/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant='h5' gutterBottom>
						{productInfo.name}
					</Typography>
					<Typography variant='h5'>
						₴{productInfo.price.raw}
					</Typography>
				</div>
				<Typography variant='body2' color='textSecondary'>
					{productInfo.description.replace(/<\/?[a-zA-Z]+>/gi,'')}
				</Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label='Add to Cart' onClick={() => handleAddToCart(dispatch, productInfo.id, 1)}>
					<AddShoppingCart/>
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default ProductDetails
