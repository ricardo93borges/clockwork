import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  card: {
    padding: '10px 5px',
  },
  cardContent: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.12)',
    marginBottom: '10px'
  },
  icon: {
    marginRight: 10
  },
  buttonWrapper: {
    padding: 10
  },
  deleteBtn: {
    float: 'right',
    marginTop: 30,
    cursor: 'pointer'
  },
  saveBtn: {
    float: 'right'
  },
}))