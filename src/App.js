import {Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./components/Main";
import {UserAuth} from "./context/AuthContext";
import {BrowserRouter} from 'react-router-dom';

import {AuthContextProvider} from "./context/AuthContext";
import Account from "./pages/Account";

function App() {
    const {user} = UserAuth()
    return (
        <div className="App">

            <Navbar/>
            <Routes>

                <Route path='/' element= {user ? <Home/> : <Navigate to='/signin'/>}></Route>
                <Route
                    path='/signup'
                    element={!user
                    ? <Signup/>
                    : <Navigate to='/'/>}></Route>
                <Route
                    path='/signin'
                    element={!user
                    ? <Login/>
                    : <Navigate to='/'/>}></Route>
                <Route
                    path='/account'
                    element={user
                    ? <Account/>
                    : <Navigate to='/signin'/>}></Route>

            </Routes>

        </div>
    );
}

export default App;
