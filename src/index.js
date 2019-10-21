import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'

import '@babel/polyfill'

import db from '../config/db'
import User from '../models/user'

db.authenticate()
  .then(() => {
    db.sync()
    console.log('connected successfully to databse')
  })
  .catch(err => {
    console.error(err)
  })

dotenv.config()

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const app = express()

const port = process.env.PORT || 3000

app.use(morgan(isDev ? 'dev' : 'combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  return res.send('hello')
})

app.get('/users', async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
})

app.get('/user/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  return res.json(user)
})

app.post('/user', async (req, res) => {
  const user = await User.create({ ...req.params })
  return res.json(user)
})

app.put('/user/:id', async (req, res) => {
  const user = await User.update({ ...req.body }, { where: { id: req.params.id } }).then(() => User.findByPk(req.params.id))
  return res.json(user)
})

app.delete('/user/:id', async (req, res) => {
  const result = await User.destroy({ where: { id: req.params.id } })
  return res.json(result)
})

app.listen(port, () => {
  console.log(`listening to port ${port}...`)
})
