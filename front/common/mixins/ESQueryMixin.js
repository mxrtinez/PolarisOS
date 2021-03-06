const APIRoutes = require('../api/routes');
const FormMixin = require('./FormMixin');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        query_grabber: 'query_grabber_read',
                    },
                },
                paths: {
                    reads: {
                        query_grabber: APIRoutes.entity('query', 'POST', true),
                    },
                },
                es_query_id: '',
                es_query_ids: [],
            },
        };
    },
    methods: {
    },
    watch: {
        es_query_id(q) {
            if (q && q.trim() !== '') {
                this.state.es_query_ids.push(q);
            }
        },
        es_query_ids(q) {
            const queries = q.filter(_q => _q && _q.trim() !== '');
            if (queries.length > 0) {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.query_grabber,
                    path: this.state.paths.reads.query_grabber,
                    body: {
                        where: {
                            id: queries,
                        },
                    },
                });
            }
        },
    },
    computed: {
        es_queries() {
            const content = this.fcontent(this.state.sinks.reads.query_grabber);
            if (content && content instanceof Array && content.length > 0) {
                return content;
            }
            return [];
        },
        es_query() {
            const queries = this.es_queries.filter(q => q.id === this.es_query_id);
            if (queries.length > 0) {
                return queries[0];
            }
            return null;
        },
        es_query_content() {
            if (this.es_query) {
                // WARN TODO
                // Content is already stringified!
                return this.es_query.content;
            }
            return JSON.stringify({});
        },
        es_query_contents() {
            if (this.es_queries.length > 0) {
                // WARN TODO
                // Content is already stringified!
                return this.es_queries.reduce((obj, q) => {
                    obj[q.id] = q.content;
                    return obj;
                }, {});
            }
            return {};
        },
        es_query_id() {
            return this.state.es_query_id;
        },
        es_query_ids() {
            return this.state.es_query_ids;
        },
    },
    mounted() {
        if (this.state.es_query_id.trim() !== '') {
            this.state.es_query_ids.push(this.state.es_query_id);
        } else if (this.state.es_query_ids.length > 0) {
            this.state.es_query_id = this.state.es_query_ids[0];
        }

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.query_grabber,
            path: this.state.paths.reads.query_grabber,
            body: {
                where: {
                    id: this.state.es_query_ids,
                },
            },
        });
    },
};
