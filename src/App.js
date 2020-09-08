import React from 'react';
import { BrowserRouter, Switch, Link, Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


import MyAuth from './requests/auth'
import MealService from './requests/meals'

import Signup from './components/signup'
import Login from './components/login'
import MainBoard from './components/board/main-board'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      currentUser: MyAuth.getCurrentUser() ? MyAuth.getCurrentUser(): undefined,
      mealList: []
    }
    this.setUser = this.setUser.bind(this)
    this.login = this.login.bind(this)
    this.fetchMeals = this.fetchMeals.bind(this)
  }

  setUser() {
    const user = MyAuth.getCurrentUser();
    console.log(user)
    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  fetchMeals() {
    MealService.getMeals().then(
      response => {
        this.setState({
          mealList: response.data
        })
      }
    ).catch(error => {
      console.log("Should only be able to get meals when successfully logged in.")
      console.log(error.toString())
    })
  }


  login() {
    this.setUser()
    this.fetchMeals()
  }

  logout() {
    MyAuth.logout()
    //window.alert('Successfully logged out.')
  }

  componentDidMount() {
    this.login()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
                { this.state.currentUser ? <MainBoard dates={this.state.mealList}/> : <Redirect to="/login" />}
              </Route>


              <Route exact path="/login">
                <Login onLogin={this.login}/>
              </Route>

              <Route exact path="/signup">
                <Signup/>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
