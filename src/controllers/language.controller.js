import { getConnection } from "../database/database";


const getLanguages = async (req, res) => {

    try {

        const connection = await getConnection(); // que termine este proceso para poder continuar (await)
        const result = await connection.query("SELECT * from language")
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {

    try {
        const {id} = req.params;
        const connection = await getConnection(); // que termine este proceso para poder continuar (await)
         await connection.query("SELECT * from language where id = ?", id, (err, rows, fields) =>{

            
            res.json(rows[0]);
        })

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { name, programmers } = req.body;

        if (name == undefined || programmers == undefined) {
            res.status(400).json({ message: "Bad Request" });
        }

        const language = { name, programmers };
        const connection = await getConnection();
        await connection.query("INSERT INTO language SET ?", language); // como no necesito result puedo hacer directamente el await
        res.json({message: "language added"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {

    try {
        const {id} = req.params;
        const connection = await getConnection(); // que termine este proceso para poder continuar (await)
        await connection.query("DELETE from language where id = ?", id)
        res.json({message: "language deleted"});

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {

    try {
        const {id} = req.params;
        const {name, programmers} = req.body;

        if (name == undefined || programmers == undefined) {
            res.status(400).json({ message: "Bad Request" });
        }
        
        const language = {name, programmers};
        const connection = await getConnection(); 
        const result = await connection.query("UPDATE language SET ? where id = ?", [language, id]);
        res.json({message: "language edited"});

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


// export default getLanguages;
export const method = {
    getLanguages,
    getLanguage,
    addLanguage,
    deleteLanguage,
    updateLanguage
};