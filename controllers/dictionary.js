import {Dictionary} from "../models/dictionary";

export const addTranslation = async (body) => {
    let word = await Dictionary.findById(body.id)
    word.translations.push({
        lang: body.lang,
        translation: body.translation
    })

    await Dictionary.update({_id: body.id}, word, {multi: false})
    return word
}

export const searchByKeyword = async (keyword, exact) => {

    if (exact) {

        let searchQuery = {
            $or: [{
                word: keyword
            }, {
                plural: keyword
            }, {
                perfect: keyword
            }]
        }

        return await Dictionary.findOne(searchQuery)

    } else {
        let searchQuery = {
            $or: [{
                word: {
                    $regex: `^${keyword}.*`,
                    $options: 'i'
                }
            }, {
                plural: {
                    $regex: `^${keyword}.*`,
                    $options: 'i'
                }
            }, {
                perfect: {
                    $regex: `^${keyword}.*`,
                    $options: 'i'
                }
            },
                {'translations': {$elemMatch: {translation: {$regex: `^${keyword}.*`, $options: 'i'}}}}
            ]
        }

        return await Dictionary.find(searchQuery)

    }




}

export const addNewWord = async (word) => {

    const result = await Dictionary.find({word: word.word}).limit(1)

    if (result.length > 0) {
        throw new Error("This word is already added")
    }

    let newWord = new Dictionary()
    newWord.word = word.word
    newWord.type = word.type
    newWord.plural = word.plural
    newWord.article = word.article
    newWord.perfect = word.perfect
    newWord.translations = word.translations
    newWord.conjugation_present = word.conjugation_present

    let res = await newWord.save()

    return res
}
