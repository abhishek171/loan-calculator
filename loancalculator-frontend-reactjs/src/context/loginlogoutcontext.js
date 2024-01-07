import loginLogoutReducerFunction,{ initialState} from "../reducer/loginreducer";
import {createContext , useReducer} from "react";

export const loginLogoutContext = createContext();
const LoginLogoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginLogoutReducerFunction, initialState);

    return (
      <loginLogoutContext.Provider value={{ state, dispatch }}>
        {children}
      </loginLogoutContext.Provider>
    );
  };
  export default LoginLogoutContextProvider;