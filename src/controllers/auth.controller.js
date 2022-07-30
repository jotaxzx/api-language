import { getConnection } from "../database/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import { restart } from "nodemon";
import { config } from "dotenv";

// funcion firma de token
const signToken = id => jwt.sign({ id }, process.env.SECRET)

// Middelware
const validateToken = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })


const register = async (req, res) => {

    const { nombre, email, password } = req.body;

    // console.log(email);
    try {
        const connection = await getConnection();
        if (nombre === "" || email === "" || password === "") {
            return res.status(400).json({ message: "Bad Request" });
        }

        const result = await connection.query("SELECT email from usuario where email = ?", email)

        if (email === result[0]?.email) {
            return res.json({ message: "email ya registrado, intente con otro" })
        }
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        const user = { nombre, email, password: hash }
        const newUser = await connection.query("INSERT INTO usuario SET ?", user);
        // console.log(newUser.insertId);
        const token = signToken(newUser.insertId)
        res.status(201).send({
            token,
            message: "usuario registrado exitosamente!"
        });

    } catch (error) {
        res.json({ message: error })
    }

};

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const connection = await getConnection();
        if (email === '' || password === '') {
            return res.status(400).json({ message: "email and password empty" });
        }

        const result = await connection.query("SELECT id, email, password from usuario where email = ?", email)
        console.log(result);
        const pass = result[0]?.password; // saco la pass de la bd para compararla con la password escrita
        const id = result[0]?.id; // saco el id para pasarselo a la funcion de token
        console.log(pass);
        if (email !== result[0]?.email) {
            return res.status(403).json({ message: "usuario y/o contraseña invalida perro ql" })
        }
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        const isMatch = await bcrypt.compare(password, hash)
        // bcrypt.compare(password, pass)
        // console.log(password);
        // console.log(pass);

        if (isMatch) {
            const token = signToken(id)
            return res.status(200).send(token)
        } else {
            return res.status(403).json({ message: "usuario y/o contraseña invalida ctm" })
        }

    } catch (error) {

    }

};





// export default getLanguages;
export const method = {
    register,
    login,
    validateToken
};