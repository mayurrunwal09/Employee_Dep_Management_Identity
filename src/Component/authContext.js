import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [ authToken , setAuthtoken] = useState(null);
    
    const login =(token) => {
        setAuthtoken(token);
    }
    const logout =() => {
        setAuthtoken(null);
    }
 return (
    <AuthContext.Provider value={{authToken, login,logout}}>
        {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () =>{
    return useContext(AuthContext);
}
