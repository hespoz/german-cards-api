import express from 'express'
import { searchByKeyword, addNewWord } from "../controllers/dictionary"
import Validator from 'express-joi-validation'
import { addWordSchema, keywordParam} from './validationSchemas'

const router = express.Router()
const validator = Validator({})


router.post('/', validator.body(addWordSchema), async (req, res, next) => {
    const word = await addNewWord(req.body)
    res.json(word)
})

router.get('/:keyword', validator.params(keywordParam), async (req, res, next) => {
    const resultList = await searchByKeyword(req.params.keyword)
    res.json(resultList)
})

export default router