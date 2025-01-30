import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    
    // useEffect(() => {
    //     checkLogin();
    // }, []); 

    // const checkLogin = async () => {
    //     try {
    //         const res = await axios.get("https://vancamp-backend.onrender.com/api/auth/me", { withCredentials: true });
    //         setUser(res.data.user);
    //     } catch (error) {
    //         setUser(null);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const login = async (email, password) => {
        try {
            const res = await axios.post("https://vanlife-backend.onrender.com/api/auth/login", {email, password}, {withCredentials: true}) 
            setUser(res.data)
            // checkLogin()
        } catch (error) {
            throw new Error(error.response?.data?.error || "Login failed")
        }
    }

    const logout = async () => {
        await axios.post("https://vancamp-backend.onrender.com/api/auth/logout", {}, {withCredentials: true})
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
