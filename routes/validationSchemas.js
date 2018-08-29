import Joi from 'joi'

Joi.objectId = require('joi-objectid')(Joi)

export const updateTranslationsSchema =Joi.object().keys({
    id:Joi.objectId().required(),
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'it', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required()
}).required()

const translationListSchema = Joi.array().items(Joi.object().keys({
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'it', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required()
})).required()

export const addWordSchema = Joi.object({
    word: Joi.string().required(),
    plural: Joi.string(),
    article: Joi.string(),
    perfect: Joi.string(),
    type: Joi.string().valid('noun', 'verb', 'modal_verb', 'local_preposition').required(),
    translations: translationListSchema,
    conjugation_present: Joi.array().items(Joi.object().keys({
        pronoum: Joi.string().valid('ich', 'du', 'es', 'sie', 'er', 'ihr', 'Sie', 'wir').required(),
        conjugation: Joi.string().required()
    }))
})


export const keywordParam = Joi.object({
    keyword: Joi.string().required(),
    exact: Joi.boolean().required()
})

