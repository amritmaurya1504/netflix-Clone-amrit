import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from './components/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login , logout, selectUser } from "./features/userSlice"
import Profile from './components/Profile';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
       //// console.log(userAuth);
        dispatch(login({
          uid : userAuth.uid,
          email : userAuth.email
        }))
      }else{
        dispatch(logout())
      }
    })

    return unsubscribe;
  } , [dispatch])
  //// const user = null;
  const user = useSelector(selectUser);
 //// console.log(user);

    


  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <LoginScreen />
          ) : (
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>
            </Switch>
          )
        }

      </Router>
    </div>
  );
}

export default App;
