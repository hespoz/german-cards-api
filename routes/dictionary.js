import express from 'express'
import { searchByKeyword, addNewWord, addTranslation } from "../controllers/dictionary"
import Validator from 'express-joi-validation'
import { addWordSchema, keywordParam, updateTranslationsSchema} from './validationSchemas'

const router = express.Router()
const validator = Validator({})


router.post('/', validator.body(addWordSchema), async (req, res, next) => {
    try {
        const word = await addNewWord(req.body)
        res.json(word)
    } catch (err) {
        return next(err)
    }
})

router.put('/', validator.body(updateTranslationsSchema), async (req, res, next) => {
    try {
        const word = await addTranslation(req.body)
        res.json(word)
    } catch (err) {
        return next(err)
    }
})

router.get('/:keyword/:exact', validator.params(keywordParam), async (req, res, next) => {
    const resultList = await searchByKeyword(req.params.keyword)
    res.json(resultList)
})

export default router