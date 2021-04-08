import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

/** option : flag for router access
 *  null: everyOne
 *  true: onlyLoginUser
 *  false: No-LoginUser
 */
const Auth = (SpecificComponent, option, adminRoute = null) => {
  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        //no-login status
        if (!response.payload.isAuth) {
          if (option) props.history.push("/login");
        } else {
          // already login
          // access to admin route from no-admin-user
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            //access to login / register route from log-in-user
            if (option === false) props.history.push("/");
          }
        }
        console.log(response);
      });
    }, []);
    return <SpecificComponent />;
  };
  return AuthenticationCheck;
};

export default Auth;
