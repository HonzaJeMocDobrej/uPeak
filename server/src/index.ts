import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import db from './models/index'

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

db.sequelize.sync({ force: true, alter: true })

app.use(`/api/v${process.env.API_VER}/users`, require('./routes/user'))

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})