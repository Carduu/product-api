import express from 'express'
import path from 'path'
import router from './router'

const app = express()

app.use(express.static("static"));

app.get('/', (req, res) => {
  // res.send('Hello from Express!')
  // res.json({message: 'Hello from Express'})
  res.status(200)
  res.sendFile(path.resolve("pages/index.html"));
})

app.use('/api', router)

export default app