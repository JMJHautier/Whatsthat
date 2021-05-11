import { createMuiTheme } from '@material-ui/core/styles';
// A custom theme for this app

const theme = createMuiTheme({
  palette: {
   type: "dark",
    primary: {
      main: '#587291',
    },
    secondary: {
      main: '#D7CEB2',
    },
    error: {
      main: '#FF6978',
    },
    background: {
      default: '#0D0630',
    },
    success: {
      main: '#109648'
    }
  },
  typography: {
     fontFamily: 'Roboto',
  },
  overrides: {
    MuiFormControlLabel:{
      root: {
        fontSize: '4rem',
      }
    
  }}});

export default theme;