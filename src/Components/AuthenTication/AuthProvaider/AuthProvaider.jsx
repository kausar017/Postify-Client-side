import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/Firebase.init";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";

export const AuthContext = createContext();

const axiosPiblic = useAxiosPiblic()

const AuthProvaider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [looder, setLoader] = useState(true);

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
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token
                const userInfo = { email: currentUser.email };
                axiosPiblic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoader(false);
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching token:', err);
                        setLoader(false);
                    });
            } else {
                // remove token
                localStorage.removeItem('access-token');
                setLoader(false);
            }

            console.log(currentUser);
        });

        return () => {
            unsubscribe(); 
        };
    }, [axiosPiblic]);


    console.log({ user, looder });

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvaider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvaider;
