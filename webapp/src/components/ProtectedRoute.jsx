import React, { Component, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {useSelector} from "react-redux";


const ProtectedRoute = ({privelage, component: Component, ...rest }) => {


    let user = useSelector((state)=>state.user);


    return (
        <>
            <Route {...rest} render={
                props => {
                    if (localStorage.getItem("se-user") != null && user.role == "customer") {
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