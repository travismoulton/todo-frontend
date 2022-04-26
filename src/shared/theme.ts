import { createTheme } from '@mui/material';
import { purple, lightGreen } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: purple[300],
      dark: purple[800],
    },
    secondary: {
      main: lightGreen[500],
      light: lightGreen[300],
      dark: lightGreen[800],
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          '&[aria-selected="true"]': {
            color: '#000',
          },
          '&[aria-selected="true"].Mui-focused': {
            color: '#000',
          },

          '&.Mui-focused': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
          },
          // backgroundColor: '#fff',
        },
        inputRoot: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
  },
});

export default theme;
