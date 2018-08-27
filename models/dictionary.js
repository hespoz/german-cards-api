import mongoose from "mongoose"
mongoose.Promise = Promise

const NounPropsSchema = new mongoose.Schema({
    article:String,
    plural:String
})

const ConjugationSchema = new mongoose.Schema({
    pronoum:String,
    conjugation:String,
    translation:String
})

const VerbPropsSchema = new mongoose.Schema({
    conjugation_present:[ConjugationSchema],
    perfect:String
})


const TranslationSchema = new mongoose.Schema({
    lang:{ type: String, enum: ['es', 'en', 'fr', 'jp', 'ru'] },
    translation:String,
    description:String
})


const DictionarySchema = new mongoose.Schema({
    word:String,
    translations:[TranslationSchema],
    searchKey:String,
    word:String,
    type: { type: String, enum: ['noun', 'verb', 'modal_verb', 'local_preposition'] },
    nounProps: NounPropsSchema,
    verbProps: VerbPropsSchema,

})

export const Dictionary = mongoose.model('Dictionary', DictionarySchema)