import axios from 'axios'
import authToken from './get-token'

const API_URL = 'http://localhost:5000/meals'

class MealService {
  newMeal(date, type, description) {
    return axios.post(API_URL, {
      date: date,
      meal_type: type,
      meal_desc: description
    }, {
      headers: authToken()
    })
  }

  editMeal(date, type, description) {
    return axios.put(API_URL, {
      date: date,
      meal_type: type,
      meal_desc: description
    }, {
      headers: authToken()
    })
  }

  deleteMeal(date, type) {
    //console.log(type)
    return axios({
      url: API_URL,
      method: 'delete',
      headers: authToken(),
      data: {
        date: date,
        meal_type: type
      }
    })
  }
}

export default new MealService()
