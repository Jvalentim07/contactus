import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//Routes----------------------------
import contact from './routes/contact'

console.log('Starting Server...')

// Express Config---------------------
const app =  express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Cors-----------------------------------------
app.use(cors())

//Routes---------------------------------------
const router = express.Router()

router.get('/version', (req, res) => res.send('1.0.0'))
router.use('/contact', contact)

app.use('/', router)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

const port = 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))