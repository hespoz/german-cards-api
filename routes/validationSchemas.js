import Joi from 'joi'
import mongoose from "mongoose";

Joi.objectId = require('joi-objectid')(Joi)

const translationListSchema = Joi.array().items(Joi.object().keys({
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'jp', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required(),
    description: Joi.string()
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
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'jp', 'ru').required()
})

