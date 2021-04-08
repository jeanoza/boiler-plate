import React, { useState } from "react";
import { loginUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { value, type },
    } = event;
    if (type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onChange} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onChange} />
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
