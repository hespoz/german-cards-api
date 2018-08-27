import Joi from 'joi'

Joi.objectId = require('joi-objectid')(Joi)

const translationListSchema = Joi.array().items(Joi.object().keys({
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'jp', 'ru').required(),
    translation: Joi.string().required(),
    description: Joi.string()
})).required()

export const addWordSchema = Joi.object({
    word: Joi.string().required(),
    translations: translationListSchema,
    searchKey: Joi.string().required(),
    type: Joi.string().valid('noun', 'verb', 'modal_verb', 'local_preposition').required(),
    nounProps:Joi.object().keys({
        article: Joi.string().required(),
        plural: Joi.string().required()
    }).optional(),
    verbProps: Joi.object().keys({
        perfect: Joi.string().required(),
        conjugation_present: Joi.array().items(Joi.object().keys({
            pronoum: Joi.string().valid('ich', 'du', 'es', 'sie', 'er', 'ihr', 'Sie', 'wir').required(),
            conjugation: Joi.string().required()
        }))
    }).default({})
})


export const keywordParam = Joi.object({
    keyword: Joi.string().required(),
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'jp', 'ru').required()
})

