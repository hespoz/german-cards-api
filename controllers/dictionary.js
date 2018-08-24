import {Dictionary} from "../models/dictionary";


export const searchByKeyword = async (keyword) => {
    return await Dictionary.find({searchKey: { $regex: `.*${keyword}.*`, $options: 'i' } })
}

export const addNewWord = async (word) => {
    let newWord = new Dictionary()
    newWord.word = word.word
    newWord.translation = word.translation
    newWord.searchKey = word.searchKey
    newWord.nounProps = word.nounProps
    newWord.verbProps = word.verbProps
    let res = await newWord.save()

    return res
}
