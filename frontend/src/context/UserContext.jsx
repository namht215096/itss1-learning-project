import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isAuth, setIsAuth] = useState(true); 
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false); 

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success("Login successful!");
      localStorage.setItem("token", data.token); 
      setUser(data.user); 
      setIsAuth(true);
      setBtnLoading(false);

      navigate("/");
      if (fetchMyCourse) fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error("Invalid login credentials.");
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setBtnLoading(false);
      navigate("/verify"); 
    } catch (error) {
      setBtnLoading(false);
      toast.error("Registration failed.");
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    try {
      const activationToken = localStorage.getItem("activationToken");
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      localStorage.clear();
      navigate("/login"); 
      setBtnLoading(false);
    } catch (error) {
      toast.error("Verification failed.");
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`);

      // const { data } = await axios.get(`${server}/api/user/me`, {
      //   headers: {
      //     token: localStorage.getItem("token"),
      //   },
      // });

      setUser(data.user); 
      setIsAuth(true); 
      setLoading(false); 
    } catch (error) {
      console.error("Failed to fetch user data");
      setLoading(false);
      setIsAuth(false); 
    }
  }

  useEffect(() => {
    // ignore
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { server } from "../main";
// import toast, { Toaster } from "react-hot-toast";

// const UserContext = createContext();

// export const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState([]);
//   // const [isAuth, setIsAuth] = useState(false);
//   const [isAuth, setIsAuth] = useState(true);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [loading, setLoading] = useState(true);

//   async function loginUser(email, password, navigate, fetchMyCourse) {
//     setBtnLoading(true);
//     try {
//       const { data } = await axios.post(`${server}/api/user/login`, {
//         email,
//         password,
//       });

//       toast.success(data.message);
//       localStorage.setItem("token", data.token);
//       setUser(data.user);
//       setIsAuth(true);
//       setBtnLoading(false);
//       navigate("/");
//       fetchMyCourse();
//     } catch (error) {
//       setBtnLoading(false);
//       setIsAuth(false);
//       toast.error(error.response.data.message);
//     }
//   }

//   async function registerUser(name, email, password, navigate) {
//     setBtnLoading(true);
//     try {
//       const { data } = await axios.post(`${server}/api/user/register`, {
//         name,
//         email,
//         password,
//       });

//       toast.success(data.message);
//       localStorage.setItem("activationToken", data.activationToken);
//       setBtnLoading(false);
//       navigate("/verify");
//     } catch (error) {
//       setBtnLoading(false);
//       toast.error(error.response.data.message);
//     }
//   }

//   async function verifyOtp(otp, navigate) {
//     setBtnLoading(true);
//     const activationToken = localStorage.getItem("activationToken");
//     try {
//       const { data } = await axios.post(`${server}/api/user/verify`, {
//         otp,
//         activationToken,
//       });

//       toast.success(data.message);
//       navigate("/login");
//       localStorage.clear();
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   }

//   async function fetchUser() {
//     try {
//       const { data } = await axios.get(`${server}/api/user/me`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       setIsAuth(true);
//       setUser(data.user);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchUser();
//   }, []);
//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         // setIsAuth,
//         // isAuth,
//         loginUser,
//         btnLoading,
//         loading,
//         registerUser,
//         verifyOtp,
//         fetchUser,
//       }}
//     >
//       {children}
//       <Toaster />
//     </UserContext.Provider>
//   );
// };

// export const UserData = () => useContext(UserContext);
