import express, { Request, Response, Express } from "express"
import { config } from "dotenv";
import mainRouter from "./routes/main.route"
import path from "path"
import cors from "cors"
import bodyParser from "body-parser";

const app: Express = express();
config()

const PORT = process.env.PORT || 80


app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')))

app.use(cors({ origin: 'localhost:3000' }))
app.use(express.json());

app.use(express.static(path.join(__dirname, "static")))

app.use(bodyParser.json({ limit: "100mb" }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


//Rotes
app.use('/api', mainRouter);



    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "..", '..', "client", 'dist', 'index.html'))
    })

app.listen(PORT, () => {
    console.log("Сервер запущен");
})