import { makeStyles } from '@material-ui/core';
import React, { CSSProperties } from 'react';
import clsx from 'clsx';
// import spinner from '../images/spinner.gif';

const useStyles = makeStyles({
  spinner: {
    maxWidth: '75px',
  },
});

interface Props {
  className?: string;
  style?: CSSProperties;
}

const Spinner: React.FC<Props> = ({ className = '', style = {} }) => {
  const classes = useStyles();

  return (
    <div
      data-testid="loader"
      className={clsx(className, classes.spinner)}
      style={style}
    >
      {/* <img src={spinner} alt="loading" /> */}
      Loading...
    </div>
  );
};

export default Spinner;
