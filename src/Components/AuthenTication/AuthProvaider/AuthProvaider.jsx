import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/Firebase.init";




export const AuthContext = createContext(null)

const AuthProvaider = ({ children }) => {


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const creatAcount = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateuserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const GoogleProvaider = new GoogleAuthProvider()
    const Google = () => {
        return signInWithPopup(auth, GoogleProvaider)
    }
    const GithubProvaider = new GithubAuthProvider()
    const Github = () => {
        return signInWithPopup(auth, GithubProvaider)
    }
    const authInfo = {
        creatAcount,
        updateuserProfile,
        login,
        logOut,
        Google,
        Github,
        user,
        loading
    }

    useEffect(() => {
        const unsubscrive = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            }
            setLoading(false)
        })
        return () => {
            unsubscrive()
        }
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvaider.propTypes = {
    children: PropTypes.func.isRequired
};

export default AuthProvaider;