import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
button: {
   margin:"16px auto 16px auto",
   display:"flex",
   height: 100,
   width:200,
   fontSize:"2em",
   background: "primary 80",
   border:"1px solid #d7ceb2"
  },
  root: {
    "& .MuiFormLabel-root": {
      color: "red"
    }
},
label: {
  color:"white",
  lineHeight:"3"
}});

export default useStyles