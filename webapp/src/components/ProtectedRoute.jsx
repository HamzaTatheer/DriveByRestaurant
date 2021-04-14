import React, { Component, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";


const ProtectedRoute = ({role, component: Component, user, ...rest }) => {


    return (
        <>
            <Route {...rest} render={
                props => {
                    if (localStorage.getItem("rnr-user") != null && user.role == role) {
                        return <Component {...props} />
                    }
                    else {
                        return <Redirect to={
                            {
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    }
                }
            } />
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(ProtectedRoute);