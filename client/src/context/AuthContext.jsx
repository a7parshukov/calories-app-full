import { createContext } from "react";

function empty() {}

const AuthContext = createContext({
      token: null,
      userID: null,
      login: empty,
      logout: empty,
      isAuth: false,
      isNormal: false
})

export default AuthContext;