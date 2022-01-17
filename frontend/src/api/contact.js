import api from './api'
import axios from 'axios'

const create = async (Name, Address, Address2, City, Province, Email) => {
  return api.post('/contact',
    {
      Name, 
      Address, 
      Address2, 
      City, 
      Province, 
      Email, 
    })
}

const getCity = async (state) => {
  return axios.get(`https://imc-hiring-test.azurewebsites.net/Contact/Cities?province=${state}`)
}

export {
  create, 
  getCity
}