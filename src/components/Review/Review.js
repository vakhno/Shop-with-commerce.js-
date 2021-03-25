import React from 'react'
import {Typography, List, ListItem, ListItemText} from '@material-ui/core'
import {useSelector} from 'react-redux'

const Review = () => {
	const tokenLineItems = useSelector(({token}) => token.id.live.line_items)
	const totalPrice = useSelector(({cart}) => cart.totalPrice)

	return (
		<>
			<Typography variant='h6' gutterBottom>Підсумки замовлення</Typography>
			<List disablePadding>
				{
					tokenLineItems.map((elem, index) => {
						return  <ListItem style={{padding: '10px 0'}} key={index}>
									<ListItemText primary={elem.name} secondary={`Кількість: ${elem.quantity}`}/>
									<Typography variant='body2'>
										₴{elem.line_total.raw}
									</Typography>
								</ListItem>
					})
				}
				<ListItem style={{padding: '10px 0'}}>
					<ListItemText primary='Сума до сплати'/>
					<Typography variant='subtitle1' style={{fontWeight: 700}}>
						₴{totalPrice}
					</Typography>
				</ListItem>
			</List>
		</>
	)
}

export default Review
