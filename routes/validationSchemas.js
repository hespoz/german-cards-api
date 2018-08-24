import Joi from 'joi'

Joi.objectId = require('joi-objectid')(Joi)


export const addWordSchema = Joi.object({
    word: Joi.string().required(),
    translation: Joi.string().required(),
    searchKey: Joi.string().required(),
    type: Joi.string().valid('noun', 'verb', 'modal_verb', 'local_preposition').required(),
    nounProps:Joi.object().keys({
        article: Joi.string().required(),
        plural: Joi.string().required(),
        nominative_example: Joi.string().required(),
        accusative_example: Joi.string().required(),
        dative_example: Joi.string().required(),
        genitive_example: Joi.string().required()
    }).optional(),
    verbProps: Joi.object().keys({
        perfect: Joi.string().required(),
        conjugation_present: Joi.array().items(Joi.object().keys({
            pronoum: Joi.string().valid('ich', 'du', 'es', 'sie', 'er', 'ihr', 'Sie', 'wir').required(),
            conjugation: Joi.string().required(),
            translation: Joi.string()
        }))
    }).default({})

})


export const keywordParam = Joi.object({
    keyword: Joi.string().required()
})


