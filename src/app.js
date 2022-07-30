import express from "express";
import morgan from "morgan";
import cors from 'cors';


import languageRoutes from './routes/language.routes';
import authRoutes from './routes/auth.routes';


const app = express();

//setting
app.set("port", 3001);

//Middlewares (f(x) intermedias entre una peticion y la respuesta)
// con esto obtendre un detalle de las peticiones que se estan haciendo
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // para que pueda entender json

//Routes
app.use( "/api/languages", languageRoutes);
app.use( "/auth", authRoutes);


export default app;