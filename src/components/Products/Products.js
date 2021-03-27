import React from 'react'
import {Grid} from '@material-ui/core'
import Product from '../Product/Product'
import Filter from '../Filter/Filter'
import useStyles from './StylesProducts'
import {useSelector} from 'react-redux'
import {handleAddToCart} from '../../services/commerceApi'

const Products = () => {
	const products = useSelector(({products}) => products.items)
	const isLoaded = useSelector(({products}) => products.isLoaded)
	const classes = useStyles()

	return (
		<main className={classes.content}>
			<div className={classes.toolbar}/>
			<Filter/>
			<Grid container justify='center' spacing={4}>
				{isLoaded &&
					products.map( (product, index) => {
						return  <Grid item key={`${product.id}_${index}`} xs={12} sm={6} md={4} lg={3}>
									<Product id={product.id} name={product.name} image={product.media.source} description={product.description} price={product.price.raw} onAddToCart={handleAddToCart}/>
								</Grid>
					})
				}
			</Grid>
		</main>
	)
}

export default Products