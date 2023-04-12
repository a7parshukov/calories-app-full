import { createContext } from "react";

function noFunc() {}

const AuthContext = createContext({
      token: null,
      userID: null,
      login: noFunc,
      logout: noFunc,
      isAuth: false,
      isNormal: false
})

export default AuthContext;