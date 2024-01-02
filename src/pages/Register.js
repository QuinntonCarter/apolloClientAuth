import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../mutations/user";

export default function Register(props) {
  const { login } = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("register user callback hit!");
    // calls register user function pulled from line 38
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  // calls REGISTER_USER mutation and pulls from as registerUser
  // sends userData as registerUser mutation argument(s); updates data in cache with results of mutation
  // sends userData to login function in context; navigates user to home route "/"
  const [registerUser, { loading, data }] = useMutation(REGISTER_USER, {
    variables: {
      // registerInput values coincide with registerInput typedef on backend
      registerInput: values,
    },
    update(proxy, { data: { registerUser: userData } }) {
      login(userData);
      navigate("/");
    },
    // receive errors array from backend
    onError({ graphQLErrors }) {
      // set error(s) to state if present
      setErrors(graphQLErrors);
    },
  });
  if (loading) {
    return <p> Loading </p>;
  } else {
    console.log("data from mutation", data);
  }
  return (
    <div style={{ display: "flex" }}>
      <h3>Register</h3>
      <p> This is the register page, register below to create an account </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="username" />
        <input name="username" onChange={onChange} />
        <label htmlFor="email" />
        <input name="email" onChange={onChange} />
        <label htmlFor="password" />
        <input name="password" onChange={onChange} />
        {/* <input name="confirmPassword" onChange={onChange} /> */}
        {errors.map((error, i) => (
          <p key={i}> {error.message} </p>
        ))}
        <button onClick={onSubmit}> register </button>
      </div>
    </div>
  );
}
