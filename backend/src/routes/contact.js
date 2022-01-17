import express from 'express'
import Joi from 'joi'
import { sendContact } from '../model/contact'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    console.log('POST /contact')
    const schema = Joi.object({
      Name: Joi.string().required(),
      Address: Joi.string().required(),
      Address2: Joi.string().required(),
      City: Joi.string().required(),
      Province: Joi.string().required(),
      Email: Joi.string().required(),
  })
    const { value, error } = schema.validate(req.body)
    const response = await sendContact(value.Name, value.Address, value.Address2, value.City, value.Province, value.Email)
    console.log(response)
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).send({error: 'validation error', fields: [...error.details.map(x => x.path[0] )] })
    }
    return res.send(response.data.StatusCode)
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router