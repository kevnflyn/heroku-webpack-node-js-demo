const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')

const devMiddleware = requirqe('./server/devMiddleware.js')
const prodMiddleWare = require('./server/prodMiddleware.js')
// const scheduledJobs = require('./server/scheduledJobs/scheduledJobs')

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}))

app.use(cookieParser())

prodMiddleWare(app)

// scheduledJobs.complianceNewsEmailJob()
