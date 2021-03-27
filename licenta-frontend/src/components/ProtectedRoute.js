import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, user, loggedIn, entity,...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (true) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: `/login/${entity}`,
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

const mapStateToProps = (state) => ({
    loggedIn: state.login.loggedIn
})

export default connect(mapStateToProps)(ProtectedRoute);