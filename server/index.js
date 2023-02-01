const express = require('express')
const userRouter = require('./routes/user.routes')
const cors = require('cors')
const PORT = process.env.PORT || 1234

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))