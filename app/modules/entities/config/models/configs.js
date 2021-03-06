// @flow
const Joi = require('joi');
const ConfigMapping = require('../../../../mappings/config');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');

const Mapping: Object = ConfigMapping.msw.mappings.properties;


const Validation: Array<any> = [
    Joi.object({
        environment: Joi.any().valid(['local', 'production', 'development', 'demo']).label('Environment'),
        langs: Joi.array().min(1).items(Joi.any().required()).label('Lang'),
    }),
    {
        'api.datacite': Joi.object({
            url: Joi.any().when('enabled', { is: true, then: Joi.string().required().label('DataCite URL') }),
            username: Joi.any().when('enabled', { is: true, then: Joi.string().required().label('DataCite username') }),
            password: Joi.any().when('enabled', { is: true, then: Joi.string().required().label('DataCite password') }),
            doi_prefix: Joi.any().when('enabled', { is: true, then: Joi.string().required().label('DataCite DOI Prefix') }),
        }),
    },
];

const Formatting: Array<any> = [
    {
        langs: async langs => langs
            .map((lang) => {
                if (lang == null) {
                    return null;
                }

                if (typeof lang === 'string' && lang.trim() !== '') {
                    return lang;
                }

                const val = lang.value;
                if (val && val.trim() !== '') {
                    return val.trim();
                }
                return null;
            })
            .filter(lang => lang != null)
           .map(lang => ({ value: lang })),
        'authentication.ldap.attributes': async a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
    gui: {
    },
};

const Messages: Object = {
    set: 'Config is successfully added',
    remove: 'Config is successfully removed',
    modify: 'Config is successfully modified',
};

module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [{
        Validation,
        Formatting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'Config',
};
