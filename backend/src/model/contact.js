import axios from 'axios'

const sendContact = async (Name, Address, Address2, City, Province, Email) => {
  return axios.post('https://imc-hiring-test.azurewebsites.net/Contact/Save',
    {
      Name, 
      Address, 
      Address2, 
      City, 
      Province, 
      Email, 
    })
}
export {
  sendContact
}