import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'





function App() {
  return (
    <>
    <Router>
    <Routes>
           <Route element={<ProtectedRoute />}>

    <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/profile' element={<Profile/>}></Route>



    </Route>
     <Route exact path='/login' element={<Login/>}></Route>
    <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='*' element={<PageNotFound/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
