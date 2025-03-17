import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const url = process.env.NODE_ENV === "development"? "http://localhost5000" : "https://vancamp-backend.onrender.com"


    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const res = await axios.get(`${url}/api/auth/me`, { withCredentials: true });
            setUser(res.data.user);
        } catch (error) {
            console.error("Auth check failed:", error.response?.data?.message || error.message)
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${url}/api/auth/login`, {email, password}, {withCredentials: true}) 
            setUser(res.data)
        } catch (error) {
            throw new Error(error.response?.data?.error || "Login failed")
        } 
    }

    const logout = async () => {
        try {
            await axios.post(`${url}/api/auth/logout`, {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
