import axios from 'axios'
import authToken from './get-token'

const API_URL = 'http://localhost:5000/meals'

class MealService {
  getMeals() {
    return axios.get(API_URL, { headers: authToken() })
  }

  newMeal(date, type, description) {
    return axios.post(API_URL, {
      date: date,
      meal_type: type,
      meal_desc: description
    }, {
      headers: authToken()
    }).then(response => {
      console.log(response.data.message)
      return response.data.message
    }).catch(error => {
      console.log(error.response.data.message)
      return error.response.data.message
    })
  }

  editMeal(date, type, description) {
    return axios.post(API_URL, {
      date: date,
      meal_type: type,
      meal_desc: description
    }, {
      headers: authToken()
    }).then(response => {
      if (response.data.message && response.data.message == 'Meal details updated successfully!') {
        //success
        console.log("first")
      }
      return response.data.message
    })
  }
}

export default new MealService()
