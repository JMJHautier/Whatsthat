import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
selected: {
  fontSize:"2em",  "&:hover": {
  backgroundColor: "#587291"
}
  },
notselected:{
  backgroundColor:"rgb(61,79,101)",
  "&:hover": {
    backgroundColor: "#587291"
  }
}
});

export default useStyles