const production = {
    port: 5556,
    elasticsearch: {
        hosts: [
            'http://elastic:password@localhost:9201',
        ],
    },
    logger: {
        transports: {
            console: {
                level: 'info',
            },
            file: {
                level: 'verbose',
            },
        },
    },
    find_diseases: {
        host: 'http://finddiseases',
        port: 5001,
    },
    classification_rare: {
        host: 'http://classificationrare',
        port: 5001,
    },
    translation: {
        host: 'http://translation',
        port: 5001,
    },
};

module.exports = production;
