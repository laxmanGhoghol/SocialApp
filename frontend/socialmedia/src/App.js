import './App.css';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import Messenger from './pages/Messenger/Messenger'
import SearchResult from './pages/SearchResult/SearchResult'
import ErrorPage from './pages/ErrorPage/Error'
import { Route, BrowserRouter as Router, Switch, Redirect, } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import api from './apiCalls'

function App() {
  const { user, dispatch } = useContext(AuthContext)
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (user == null) {
      if (accessToken !== null && accessToken !== "null") {
        const getuser = async () => {
          try {
            const userdata = await api.getUser();
            dispatch({ type: "LOGIN_SUCCESS", payload: userdata });
          } catch (error) {
            console.log('login required')
          }
        }

        getuser() //refresh login

      }
    }

  }, [user, dispatch])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Login />}
        </Route>
        <Route path="/Search/:searchKey">
          {user ? <SearchResult /> : <Login />}
        </Route>
        <Route path="/messenger">
          {user ? <Messenger /> : <Login />}
        </Route>

        <Route path="*">
          <ErrorPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
