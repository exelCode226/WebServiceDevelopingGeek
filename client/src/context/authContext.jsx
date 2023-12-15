import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest,getUsersRequest, deleteUserRequest } from '../api/auth'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';



export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {


    // const [user, setUser] = useState(null);
    const [user, setUser] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {

        try {
            // console.log(values);
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true);
        toast.success('Registrado exitosamente.');
        setTimeout(() => {
            window.location.href = 'http://localhost:5173/users';
          }, 2000);
        
        } catch (error) {
            setErrors(error.response.data)
        }

    };

    const signin = async (user) => {

        try {

            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true);
            setUser(res.data)


        } catch (error) {

            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }

            setErrors([error.response.data.message])

        }

    }

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3200)
            return () => clearTimeout()
        }
    }, [errors])


    const getUsers = async () => {
        try {
          const res = await getUsersRequest();
          setUser(res.data);
        } catch (error) {
          console.error(error);
        }
      };

      const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            if (res.status === 204) {
                // Check if user is defined before calling filter
                setUser((prevUser) => (prevUser ? prevUser.filter((user) => user._id !== id) : []));
                toast.success("Usuario eliminado exitosamente");
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const sendPasswordResetEmail = async (email) => {
        try {
            const response = await sendPasswordResetEmailRequest(email);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Error sending password reset email');
        }
    };




    useEffect(() => {

        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);


            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false);


            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false);

            }

        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            getUsers,
            deleteUser,
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}