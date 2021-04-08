import React, { useState } from "react";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (Password !== ConfirmPassword) {
      return alert("Password don't match Confirm Password");
    }
    const body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
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
        <input name="email" type="email" value={Email} onChange={onChange} />
        <label>Name</label>
        <input name="name" type="text" value={Name} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={Password}
          onChange={onChange}
        />
        <label>Confirm Password</label>
        <input
          name="confirm_password"
          type="password"
          value={ConfirmPassword}
          onChange={onChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
