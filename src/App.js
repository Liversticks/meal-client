import React from 'react';
import { BrowserRouter, Switch, Link, Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './App.css'


import { getCurrentUser } from './requests/get-username'
import authToken from './requests/get-token'

import Signup from './components/signup'
import Login from './components/login'
import MainBoard from './components/board/main-board'
import Footer from './components/footer'

import localConfig from './config/local-dev'
import prodConfig from './config/prod'

const MEAL_URL = process.env.NODE_ENV === 'production' ? prodConfig['meal_url'] : localConfig['meal_url']
const LOGIN_URL = process.env.NODE_ENV === 'production' ? prodConfig['login_url'] : localConfig['login_url']
const SIGNUP_URL = process.env.NODE_ENV === 'production' ? prodConfig['signup_url'] : localConfig['signup_url']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      currentUser: getCurrentUser() ? getCurrentUser(): undefined,
      mealList: [],
      loginStale: false
    }
    this.update = this.update.bind(this)
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

  signup() {
    return axios.post()
  }

  login(username, password) {
    return axios.post(LOGIN_URL, {
      username: username,
      password: password
    })
  }

  onSignup(username, email, password) {
    return axios.post(SIGNUP_URL, {
      username: username,
      email: email,
      password: password
    })
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("username")
    this.setState({
      loginStale: false
    })
    //window.alert('Successfully logged out.')
  }

  componentDidMount() {
    this.update()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <Link to={"/"} className="navbar-brand">
            Meals
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navcollapse">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navcollapse">
                { this.state.currentUser ? (
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/signup"} className="nav-link">
                        Signup
                      </Link>
                    </li>
                  </ul>
                )}
            </div>
          </nav>
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
            </Switch>
          </div>
          <div>
            <Footer/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
