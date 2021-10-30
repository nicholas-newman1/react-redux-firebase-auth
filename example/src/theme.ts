import {
  // solves findDOMNode deprecation warnings
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core';

export const theme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2C813F',
    },
    secondary: {
      main: '#3A9197',
    },
    info: {
      main: '#7E4CCB',
    },
    background: {
      paper: '#222',
      default: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 300,
    },
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
    },
    h6: {
      fontWeight: 300,
    },
  },
});

theme.props = {
  MuiCard: {
    elevation: 0,
  },
  MuiPaper: {
    elevation: 0,
  },
  MuiIconButton: {
    size: 'small',
  },
  MuiSvgIcon: {
    fontSize: 'large',
  },
  MuiButton: {
    disableElevation: true,
  },
  MuiContainer: {
    maxWidth: 'xl',
  },
};

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.6em',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.3)',
      },
    },
  },
  MuiIconButton: {
    root: {
      color: theme.palette.background.default,
    },
  },
  MuiButton: {
    root: {
      whiteSpace: 'nowrap',
    },
  },
  MuiInputBase: {
    input: {
      transition: 'background-color 5000s ease-in-out 0s',
      WebkitTextFillColor: theme.palette.text.primary,
      caretColor: theme.palette.text.primary,
    },
  },
  MuiSelect: {
    select: {
      marginRight: '1rem',
      minWidth: '100px',
    },
  },
};
