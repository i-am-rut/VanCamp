import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const res = await axios.post("https://vancamp-backend.onrender.com/api/auth/login", {email, password}, {withCredentials: true}) 
            setUser(res.data)
        } catch (error) {
            throw new Error(error.response?.data?.error || "Login failed")
        } 
    }

    const logout = async () => {
        try {
            await axios.post("https://vancamp-backend.onrender.com/api/auth/logout", {}, {withCredentials: true})
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
