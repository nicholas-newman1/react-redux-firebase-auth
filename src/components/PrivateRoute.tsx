import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import Spinner from './Spinner';

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user, loading } = useAppSelector((state: any) => state.auth);
  return loading ? (
    <Spinner style={{ margin: '0 auto' }} />
  ) : (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
