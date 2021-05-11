import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
button: {
  width: "150px",
  height: "150px",
  fontWeight: "800",
  fontSize: "1.85em"
  },
  root: {
    "& .MuiFormLabel-root": {
      color: "red"
    }
},
label: {
  color:"white",
  lineHeight:"3"
},
accordionTitle:{
   fontSize:"1.5em",
   textAlign:"center",
   fontWeight:"800",
   border:"1px solid #D7CEB2"
},
accordion:{
   backgroundColor:"#587291", 
   color:"#D7CEB2",
   width:"54.5vw", 
   marginLeft:"-96px",
   marginBottom:"32px"
}
});

export default useStyles