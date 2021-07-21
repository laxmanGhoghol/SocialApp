import './App.css';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import { Route, BrowserRouter as Router, Switch, Redirect, } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, dispatch } = useContext(AuthContext)
  useEffect(()=>{
    const stored_user = JSON.parse(localStorage.getItem('user'));
    console.log(stored_user);
    dispatch({ type: "LOGIN_SUCCESS" , payload: stored_user});
  }, [])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login/>}
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/profile:username">
          {user ? <Profile /> : <Login/>}
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
