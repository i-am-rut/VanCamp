import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        checkLogin();
    }, []); 

    const checkLogin = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
            setUser(res.data.user);
        } catch (error) {
            console.error("Auth check failed:", error.response?.data || error.message);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            await axios.post("http://localhost:5000/api/auth/login", {email, password}, {withCredentials: true}, {headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
            checkLogin()
        } catch (error) {
            throw new Error(error.response?.data?.error || "Login failed")
        }
    }

    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, {withCredentials: true})
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
