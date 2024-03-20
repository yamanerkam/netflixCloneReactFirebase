import {createContext, useContext, useEffect, useState} from 'react';
import {auth, db} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({children}) {

    const [user,
        setUser] = useState({})
    const [userId,setUserId] = useState('')
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(user.user.uid)
            setDoc(doc(db, 'users', email), {
                savedShows: [],
                id: user.user.uid
            })
        })
        
    }

    function logOut() {
        return signOut(auth)
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsub()
        }
    })

    return (
        <AuthContext.Provider
            value={{
            signUp,
            logOut,
            logIn,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth() {
    return useContext(AuthContext);
}