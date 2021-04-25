import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
// A custom theme for this app

const theme = createMuiTheme({
  palette: {
   type: "light",
    primary: {
      main: '#115293',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#115293',
    },
  },
  typography: {
     fontFamily: 'Arial',
  }
});

export default theme;