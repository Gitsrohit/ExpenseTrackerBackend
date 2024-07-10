
// const express = require('express')
// const app = express()
// require('dotenv').config()
// const cors = require('cors')
// const {db} = require('./database/db')
// const {readdirSync} = require('fs');
// const { route } = require('./routes/transactions');

// // const PORT = 5000
// const PORT = process.env.PORT || 5002

// // const PORT = process.env.PORT
// // middlewares
// app.use(express.json())
// app.use(cors())

// //routes
// readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+ route )))

// const server = () =>{
//     db()
//   app.listen(PORT,()=>{
//        console.log('we are listening: ',PORT)
//   })
// }
// server()

const express = require('express')
const cors = require('cors');
const { db } = require('./database/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
