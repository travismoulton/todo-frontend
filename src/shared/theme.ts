import { createTheme } from '@mui/material';
import { purple, lightGreen } from '@mui/material/colors';

const palette = {
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
};

const theme = createTheme({
  palette,
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          '&:hover': {
            borderColor: palette.primary.main,
            outlineColor: palette.primary.main,
          },
          '&::before': {
            borderColor: palette.primary.main,
            outlineColor: palette.primary.main,
          },
        },
        root: {
          '&:hover:not(.Mui-disabled)::before': {
            borderBottom: `1px solid ${palette.primary.main}`,
          },
        },
      },
    },

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
            backgroundColor: palette.primary.main,
            color: '#fff',
          },
          backgroundColor: '#fff',
        },
        inputRoot: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary.main,
          },
        },
      },
    },
  },
});

export default theme;
