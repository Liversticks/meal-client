import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

import { getCurrentUser } from './requests/get-username';
import authToken from './requests/get-token';

import MealNav from './components/navbar';
import Signup from './components/signup';
import Login from './components/login';
import MainBoard from './components/board/main-board';
import Profile from './components/profile';
import Footer from './components/footer';

import localConfig from './config/local-dev';
import prodConfig from './config/prod';

const MEAL_URL = process.env.NODE_ENV === 'production' ? prodConfig.meal_url : localConfig.meal_url;
const LOGIN_URL = process.env.NODE_ENV === 'production' ? prodConfig.login_url : localConfig.login_url;
const SIGNUP_URL = process.env.NODE_ENV === 'production' ? prodConfig.signup_url : localConfig.signup_url;

class App extends React.Component {
  static onSignup(username, email, password, birthday) {
    return axios.post(SIGNUP_URL, {
      username,
      email,
      password,
      birthday,
    });
  }

  static login(username, password) {
    return axios.post(LOGIN_URL, {
      username,
      password,
    });
  }

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      currentUser: getCurrentUser() ? getCurrentUser() : undefined,
      mealList: [],
      loginStale: false,
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const user = getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    axios.get(MEAL_URL, { headers: authToken() }).then(
      (response) => {
        this.setState({
          mealList: response.data,
        });
      },
    ).catch((error) => {
      // console.log("Should only be able to get meals when successfully logged in.")
      console.log(error.toString());
      if (user) {
        this.setState({
          loginStale: true,
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    this.setState({
      loginStale: false,
    });
    // window.alert('Successfully logged out.')
  }

  render() {
    const {
      login,
      logout,
      update,
      onSignup,
    } = this;
    const {
      currentUser,
      loginStale,
      mealList,
    } = this.state;
    return (
      <BrowserRouter>
        <MealNav isLoggedIn={currentUser !== undefined} onLogout={logout} />
        <div>
          <Switch>
            <Route exact path={['/', '/meals']}>
              { currentUser ? <MainBoard onLogout={logout} stale={loginStale} onUpdate={update} dates={mealList} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              { currentUser ? <Redirect to="/meals" /> : <Login onLogin={login} onLoginSuccess={update} /> }
            </Route>
            <Route exact path="/signup">
              { currentUser ? <Redirect to="/meals" /> : <Signup onSignup={onSignup} />}
            </Route>
            <Route exact path="/profile">
              { currentUser ? <Profile /> : <Redirect to="/login" /> }
            </Route>
          </Switch>
        </div>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
