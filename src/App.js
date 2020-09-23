import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './App.css'


import { getCurrentUser } from './requests/get-username'
import authToken from './requests/get-token'

import MealNav from './components/navbar'
import Signup from './components/signup'
import Login from './components/login'
import MainBoard from './components/board/main-board'
import Profile from './components/profile'
import Footer from './components/footer'

import localConfig from './config/local-dev'
import prodConfig from './config/prod'

const MEAL_URL = process.env.NODE_ENV === 'production' ? prodConfig['meal_url'] : localConfig['meal_url']
const LOGIN_URL = process.env.NODE_ENV === 'production' ? prodConfig['login_url'] : localConfig['login_url']
const SIGNUP_URL = process.env.NODE_ENV === 'production' ? prodConfig['signup_url'] : localConfig['signup_url']
const USERS_URL = process.env.NODE_ENV === 'production' ? prodConfig['users_url'] : localConfig['users_url']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      currentUser: getCurrentUser() ? getCurrentUser(): undefined,
      mealList: [],
      loginStale: false,
      profile: {
        username: '',
        email: '',
        birthday: ''
      }
    }
    this.update = this.update.bind(this)
    this.getUserData = this.getUserData.bind(this)
  }

  update() {
    const user = getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      })
    }
    axios.get(MEAL_URL, { headers: authToken() }).then(
      response => {
        this.setState({
          mealList: response.data
        })
      }
    ).catch(error => {
      //console.log("Should only be able to get meals when successfully logged in.")
      console.log(error.toString())
      if (user) {
        this.setState({
          loginStale: true
        })
      }
    })
  }

  login(username, password) {
    return axios.post(LOGIN_URL, {
      username: username,
      password: password
    })
  }

  onSignup(username, email, password, birthday) {
    return axios.post(SIGNUP_URL, {
      username: username,
      email: email,
      password: password,
      birthday: birthday
    })
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("username")
    this.setState({
      loginStale: false,
      profile: {
        username: '',
        email: '',
        birthday: ''
      }
    })
    //window.alert('Successfully logged out.')
  }

  getUserData() {
    axios.get(USERS_URL, { headers: authToken() }).then(
      response => {
        this.setState({
          profile: response.data
        })
      }
    )
  }

  componentDidMount() {
    this.update()
  }

  render() {
    return (
      <BrowserRouter>
          <MealNav isLoggedIn={this.state.currentUser !== undefined} onLogout={this.logout} onProfile={this.getUserData}/>
          <div>
            <Switch>
              <Route exact path={["/", "/meals"]}>
                { this.state.currentUser ? <MainBoard onLogout={this.logout} stale={this.state.loginStale} onUpdate={this.update} dates={this.state.mealList}/> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/login">
                { this.state.currentUser ? <Redirect to="/meals"/> : <Login onLogin={this.login} onLoginSuccess={this.update}/> }
              </Route>
              <Route exact path="/signup">
                { this.state.currentUser ? <Redirect to="/meals" /> : <Signup onSignup={this.onSignup}/>}
              </Route>
              <Route exact path="/profile">
                { this.state.currentUser ? <Profile profile={this.state.profile}/> : <Redirect to="/login"/> }
              </Route>
            </Switch>
          </div>
          <div>
            <Footer/>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
