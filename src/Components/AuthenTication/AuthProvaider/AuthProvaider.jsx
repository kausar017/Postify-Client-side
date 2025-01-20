import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/Firebase.init";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";

export const AuthContext = createContext();

const axiosPiblic = useAxiosPiblic()

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

    // useEffect(() => {
    //     const unsubscrive = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         if (currentUser) {
    //             const userInfo = { email: currentUser.email }
    //             axiosPiblic.post('/jwt', userInfo)
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token)
    //                     }
    //                 })
    //         } else {
    //             localStorage.removeItem('access-token')
    //         }
    //         setLooder(false);
    //         console.log(currentUser);

    //     });
    //     return () => {
    //         unsubscrive();
    //     };
    // }, []);

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser?.email) {
                    setUser(currentUser);

                    // Generate token
                    const { data } = await axiosPiblic.post(`/jwt`,
                        { email: currentUser?.email },
                        { withCredentials: true }
                    );
                    console.log('Token generated:', data);
                } else {
                    setUser(null);

                    // Logout request
                    const { data } = await axiosPiblic.get(`/logout`,
                        { withCredentials: true }
                    );
                    console.log('Logged out:', data);
                }
            } catch (error) {
                console.error('Error in onAuthStateChanged:', error);
            } finally {
                setLooder(false);
            }
        });

        // Properly unsubscribe on cleanup
        return () => unsubcribe();
    }, []);



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
