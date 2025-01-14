import { useContext } from "react";
import { AuthContext } from "../AuthProvaider/AuthProvaider";

const UseAuth = () => {
    const auth = useContext(AuthContext)
    return auth;
};

export default UseAuth;