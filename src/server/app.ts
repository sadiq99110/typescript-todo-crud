
import express from 'express'
import { db} from '../Config/db.config'
import { router } from '../Routes/posts.routes'
import cors from 'cors';

const app = express()

// Enable CORS for all routes
app.use(cors());

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v1/posts', router)

const PORT = process.env.PORT || 3000;

//db connection then server connection
db.then(() => {
    app.listen(PORT, () => console.log('Server is listening on port 3000'))
})



