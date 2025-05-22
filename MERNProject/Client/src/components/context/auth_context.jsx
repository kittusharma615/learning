import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const value = { isLoggedIn, setIsLoggedIn, userData, setUserData };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}