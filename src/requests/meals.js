import axios from 'axios'
import authToken from './get-token'
import localConfig from '../config/local-dev'
import prodConfig from '../config/prod'

const API_URL = process.env.NODE_ENV === 'production' ? prodConfig['meal_url'] : localConfig['meal_url']

class MealService {
  newMeal(date, type, description) {
    console.log(date)
    return axios.post(API_URL, {
      meal_date: date,
      meal_type: type,
      meal_desc: description
    }, {
      headers: authToken()
    })
  }

  editMeal(date, type, description) {
    return axios.put(API_URL, {
      meal_date: date,
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
        meal_date: date,
        meal_type: type
      }
    })
  }
}

export default new MealService()
