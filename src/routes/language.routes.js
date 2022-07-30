import {Router} from 'express';
import  { method as languageController }  from '../controllers/language.controller';

const router = Router();

router.get("/all",  languageController.getLanguages);
router.get("/:id",  languageController.getLanguage);
router.post("/create",  languageController.addLanguage);
router.delete("/delete/:id",  languageController.deleteLanguage);
router.put("/edit/:id",  languageController.updateLanguage);

export default router;