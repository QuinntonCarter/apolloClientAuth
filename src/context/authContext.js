import { useReducer, createContext } from "react";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
};

// // checks for token in localstorage
if (localStorage.getItem("token")) {
  // decodes current token in localstorage
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  //   if token is expired, remove token
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        // spreads rest of state in
        ...state,
        // adds user information to user state obj via action.payload
        user: action.payload,
      };
    case "LOGOUT":
      return {
        // spreads rest of state in
        ...state,
        // removes user object from user state
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //  login function
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  //  logout function
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
