import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      _id
      token
    }
  }
`;

export default function Register(props) {
  const { login } = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("register user callback hit!");
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    uername: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // calls REGISTER_USER mutation and pulls from as registerUser
  // sends userData as registerUser mutation argument(s); updates data in cache with results of mutation
  // sends userData to login function in context; navigates user to home route "/"
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      login(userData);
      navigate("/");
    },
    // receive errors array from backend
    onError({ graphQLErrors }) {
      // set error(s) to state if present
      setErrors(graphQLErrors);
    },
    variables: {
      // registerInput values coincide with registerInput typedef on backend
      registerInput: values,
    },
  });
  return (
    <div style={{ display: "flex" }}>
      <h3>Register</h3>
      <p> This is the register page, register below to create an account </p>
    </div>
  );
}
