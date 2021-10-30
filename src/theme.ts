import { Theme } from '@material-ui/core';

export const customTheme = (theme: Theme | undefined) => ({
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-box-shadow': `0 0 0 100px rgba(0,0,0,0) inset`,
          '-webkit-text-fill-color': `${theme?.palette.text.primary}`,
        },
      },
    },
  },
});
