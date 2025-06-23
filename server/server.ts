import express, {Request, Response, Express} from "express"
import { config } from "dotenv";
import mainRouter from "./routes/main.route"
import path from "path"
import cors from "cors"

const app: Express = express();
config()

const PORT = process.env.PORT || 80

app.use(cors({origin: 'localhost:3000'}))
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")))

//Rotes
app.use('/api', mainRouter)


app.listen(PORT, () => {
    console.log("Сервер запущен");
})