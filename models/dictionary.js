import mongoose from "mongoose"
mongoose.Promise = Promise

const NounPropsSchema = new mongoose.Schema({
    article:String,
    plural:String,
    nominative_example:String,
    accusative_example:String,
    dative_example:String,
    genitive_example:String
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


const DictionarySchema = new mongoose.Schema({
    word:String,
    translation:String,
    searchKey:String,
    word:String,
    type: { type: String, enum: ['noun', 'verb', 'modal_verb', 'local_preposition'] },
    nounProps: NounPropsSchema,
    verbProps: VerbPropsSchema,

})

export const Dictionary = mongoose.model('Dictionary', DictionarySchema)