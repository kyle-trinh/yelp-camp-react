import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  setAlert,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      props => {
        if (!isAuthenticated && !loading) {
          setAlert('You need to log in first', 'danger');
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }
      // !isAuthenticated && !loading ? (
      //   <Redirect to="/login" />
      // ) : (
      //   <Component {...props} />
      // )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(PrivateRoute);
