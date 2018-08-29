import {Dictionary} from "../models/dictionary";


export const searchByKeyword = async (keyword, lang) => {

    return await Dictionary.find({
        $or: [{
            searchKey: {
                $regex: `^${keyword}.*`,
                $options: 'i'
            }
        }, {'translations': {$elemMatch: {translation: {$regex: `^${keyword}.*`, $options: 'i'}}}}]
    })

}

export const addNewWord = async (word) => {

    const result = await Dictionary.find({word: word.word}).limit(1)

    if (result.length > 0) {
        throw new Error("This word is already added")
    }

    let newWord = new Dictionary()
    newWord.word = word.word
    newWord.type = word.type
    newWord.translations = word.translations
    newWord.searchKey = word.searchKey
    newWord.nounProps = word.nounProps
    newWord.verbProps = word.verbProps
    let res = await newWord.save()

    return res
}
