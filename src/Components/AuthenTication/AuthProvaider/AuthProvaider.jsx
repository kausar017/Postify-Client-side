import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/Firebase.init";

export const AuthContext = createContext();

const AuthProvaider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [looder, setLooder] = useState(true);

    const googleProvaider = new GoogleAuthProvider();
    const handaleGoogle = () => {
        return signInWithPopup(auth, googleProvaider);
    };
    const gitHubProbaider = new GithubAuthProvider();
    const handaleGithub = () => {
        return signInWithPopup(auth, gitHubProbaider);
    };
    const handaleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const handalLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const handalLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
        });
    };

    const manageUsr = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            }).then(() => {
                auth.currentUser.reload().then(() => {
                    setUser({ ...auth.currentUser });
                });
            });
        }
    };

    const authInfo = {
        handaleGoogle,
        handaleGithub,
        handaleRegister,
        handalLogin,
        handalLogout,
        user,
        looder,
        manageUsr,
        setUser,
    };

    useEffect(() => {
        const unsubscrive = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
            setLooder(false);
        });
        return () => {
            unsubscrive();
        };
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvaider.propTypes = {
    children: PropTypes.node.isRequired, // Corrected from `func` to `node`
};

export default AuthProvaider;
