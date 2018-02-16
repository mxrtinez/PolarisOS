// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const PubMapping = require('../../../../mappings/publication');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const moment = require('moment');

const Mapping: Object = PubMapping.msw.mappings.publication.properties;

const Validation: Array<any> = [
    {
        title: Joi.object({
            content: Joi.string().required().label('title'),
        }),
        dates: Joi.object({
            publication: Joi.number().required().label('dates.publication'),
        }),
        /* 'diffusion.rights': Joi.object({
            access: Joi.string().required().label('diffusion.rights.access'),
        }),*/
    },
    Joi.object({
        authors: Joi.array().min(1).items(Joi.any().required()).label('authors'),
        lang: Joi.string().required().label('lang'),
        type: Joi.string().required().label('type'),
        // publication_version: Joi.string().required().label('publication_version'),
    }),
];

const Formatting: Array<any> = [
    {
        abstracts: a => FormatFunctions.oarray_to_array(a),
        authors: a => FormatFunctions.oarray_to_array(a),
        classifications: a => FormatFunctions.oarray_to_array(a),
        contributors: a => FormatFunctions.oarray_to_array(a),
        'diffusion.projects': a => FormatFunctions.oarray_to_array(a),
        'diffusion.surveys': a => FormatFunctions.oarray_to_array(a),
        files: a => FormatFunctions.oarray_to_array(a),
        ids: a => FormatFunctions.oarray_to_array(a),
        keywords: a => FormatFunctions.oarray_to_array(a),
        resources: a => FormatFunctions.oarray_to_array(a),
        sources: a => FormatFunctions.oarray_to_array(a),
        subtitles: a => FormatFunctions.oarray_to_array(a),
        translated_titles: a => FormatFunctions.oarray_to_array(a),
    },
    {

    },
];

const Completion: Array<any> = [
    {
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', 'fullname', false),
        'denormalization.classifications': ComplFunctions.denormalization('subject', 'classifications._id', 'label', false),
        'denormalization.contributors': ComplFunctions.denormalization('contributor', 'contributors._id', 'fullname', false),
        'denormalization.diffusion.projects': ComplFunctions.denormalization('project', 'diffusion.projects._id', 'name', false),
        'denormalization.diffusion.surveys': ComplFunctions.denormalization('survey', 'diffusion.surveys._id', 'name', false),
        'denormalization.diffusion.internal_collection': ComplFunctions.denormalization('internal_collection', 'diffusion.internal_collection', 'label', true),
        'denormalization.diffusion.rights.license': ComplFunctions.denormalization('license', 'diffusion.rights.license', 'label', true),
        'denormalization.journal': ComplFunctions.denormalization('journal', 'journal', 'name', true),
        'denormalization.type': ComplFunctions.denormalization('typology', 'type', 'label', true),
        'denormalization.template': ComplFunctions.denormalization('typology', 'type', 'children.0.template', true),
        status: (o, p, i) => ComplFunctions.generic_complete('pending')(o, p, i),
        version: async (obj, path, info) => {
            if (!('parent' in obj)) {
                return { version: 1 };
            }

            const parent = await EntitiesUtils.retrieve(obj.parent, 'publication');
            if (parent) {
                const src = parent.source;
                return { version: src.version + 1 };
            }
            return { version: 1 };
        },
        'dates.deposit': () => ({ dates: { deposit: +moment() } }),
    },
];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Publication is successfully added',
    remove: 'Publication is successfully removed',
    modify: 'Publication is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Publication',
};
