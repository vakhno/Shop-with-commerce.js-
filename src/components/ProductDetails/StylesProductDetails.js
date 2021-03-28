import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(() => ({
	root: {
		maxWidth: '600px',
		width: '100%',
		margin: '100px auto 0 auto'
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
	cardActions: {
		dispay: 'flex',
		justifyContent: 'flex-end',
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}))