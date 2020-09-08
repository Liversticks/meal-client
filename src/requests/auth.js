import axios from "axios";

const API_URL = "http://localhost:5000/"

class MyAuth {
  login(username, password) {
    return axios.post((API_URL + "login"), {
      username,
      password
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
        localStorage.setItem("username", username)
      }
      return response.data
    })
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("username")
  }

  register(username, email, password) {
    return axios.post((API_URL + "signup"), {
      username,
      email,
      password
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new MyAuth();
