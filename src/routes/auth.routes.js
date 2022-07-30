import { Router } from 'express';
import { method as authController } from '../controllers/auth.controller';
import { getConnection } from '../database/database'

const router = Router();


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/lele", authController.validateToken, async (req, res) => {

    // console.log(req.auth);

    try {
        const id = req.auth.id;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from usuario where id = ?", id)
        const resultId = result[0].id;

        if (result.length === 0) {
            res.status(401).end()
        }
        req.auth = result[0]
        
    } catch (error) {
       
    }

    res.send(req.auth)
})


export default router;