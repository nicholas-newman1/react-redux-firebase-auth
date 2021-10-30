import {
  Typography,
  Card,
  Dialog,
  makeStyles,
  DialogProps,
  TypographyProps,
  CardProps,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    padding: theme.spacing(3),
    margin: '0 auto',
    overflow: 'auto',
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
}));

interface Props extends DialogProps {
  onClose: () => any;
  heading: string;
  DialogHeadingProps?: TypographyProps<'h1'>;
  DialogProps?: DialogProps;
  CardProps?: CardProps;
}

const CustomDialog: React.FC<Props> = props => {
  const classes = useStyles();
  const {
    heading,
    children,
    ref,
    title,
    DialogHeadingProps,
    DialogProps,
    CardProps,
    ...rest
  } = props;

  return (
    <Dialog fullWidth {...rest} {...DialogProps}>
      <Card className={classes.card} {...CardProps}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.heading}
          {...DialogHeadingProps}
        >
          {heading}
        </Typography>

        {children}
      </Card>
    </Dialog>
  );
};

export default CustomDialog;
