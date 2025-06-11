import express, {Request, Response, Express} from "express"
import { config } from "dotenv";
import mainRouter from "./routes/main.route"
import path from "path"

const app: Express = express();
config()

const PORT = process.env.PORT || 80

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")))

//Rotes
app.use('/api', mainRouter)


app.listen(PORT, () => {
    console.log("Сервер запущен");
})