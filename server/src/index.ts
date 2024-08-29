import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import db from './models/index'

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

// db.sequelize.sync({ force: true, alter: true })

app.use(`/api/v${process.env.API_VER}/users`, require('./routes/user'))
app.use(`/api/v${process.env.API_VER}/stats`, require('./routes/stats'))
app.use(`/api/v${process.env.API_VER}/todoPages`, require('./routes/todo/todoPages'))
app.use(`/api/v${process.env.API_VER}/todoPage`, require('./routes/todo/todoPage'))
app.use(`/api/v${process.env.API_VER}/todos`, require('./routes/todo/todos'))
app.use(`/api/v${process.env.API_VER}/todo`, require('./routes/todo/todo'))
app.use(`/api/v${process.env.API_VER}/groups`, require('./routes/todo/groups'))
app.use(`/api/v${process.env.API_VER}/group`, require('./routes/todo/group'))
app.use(`/api/v${process.env.API_VER}/notes`, require('./routes/notes/notes'))
app.use(`/api/v${process.env.API_VER}/note`, require('./routes/notes/note'))
app.use(`/api/v${process.env.API_VER}/notifications`, require('./routes/notifications/notifications'))

app.use('/images',express.static('images'));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})