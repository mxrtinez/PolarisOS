<template>
    <div>
        <template v-if="_oa_find(author, 'summary')">
        <div class="columns is-centered">
            <div class="column">
                <h5 class="title is-4">{{lang('l_summary')}}</h5>
                <p v-html="_oa_find(author, 'summary', '')"></p>
            </div>
        </div>
        </template>

        <template v-if="_oa_find(author, 'experiences', []).length > 0">
        <div class="columns is-centered">
            <div class="column">
                <h5 class="title is-4">{{lang('l_experience', {}, 'other')}}</h5>
                <article class="media" v-for="exp in _oa_find(author, 'experiences', [])">
                <div class="media-content">
                    <div class="content">
                        <div>
                            <strong>{{lang(exp.title)}}</strong>
                            <template v-if="exp.institution">
                                <br />
                                <span>{{lang(exp.institution)}}</span>
                            </template>
                            <template v-if="exp.city">
                                <br />
                                <span>{{lang(exp.city)}}</span>
                            </template>
                            <br />
                            <span v-if="exp.end && exp.start">{{exp.start}} - {{exp.end}}</span>
                            <span v-else-if="exp.end">{{lang('l_end_in')}} {{exp.end}}</span>
                            <span v-else>{{lang('l_from')}} {{exp.start}}</span>
                            <br />
                            <p v-if="exp.description" v-html="exp.description"></p>
                        </div>
                    </div>
                </div>
                </article>
            </div>
        </div>
        </template>

        <template v-if="_oa_find(author, 'studies', []).length > 0">
        <div class="columns is-centered">
            <div class="column">
                <h5 class="title is-4">{{lang('l_study', {}, 'other')}}</h5>
                <article class="media" v-for="exp in _oa_find(author, 'studies', [])">
                <div class="media-content">
                    <div class="content">
                        <div>
                            <strong>{{lang(exp.title)}}</strong>
                            <template v-if="exp.institution">
                                <br />
                                <span>{{lang(exp.institution)}}</span>
                            </template>
                            <template v-if="exp.city">
                                <br />
                                <span>{{lang(exp.city)}}</span>
                            </template>
                            <br />
                            <span v-if="exp.end && exp.start">{{exp.start}} - {{exp.end}}</span>
                            <span v-else-if="exp.end">{{lang('l_end_in')}} {{exp.end}}</span>
                            <span v-else>{{lang('l_from')}} {{exp.start}}</span>
                            <br />
                            <p v-if="exp.description" v-html="exp.description"></p>
                        </div>
                    </div>
                </div>
                </article>
            </div>
        </div>
        </template>
        <template v-if="_oa_find(author, 'address.address') || _oa_find(author, 'external', []).length > 0">
        <div class="columns is-centered">
            <div class="column">
                <h5 class="title is-4">{{lang('l_contact_me')}}</h5>
                <div v-if="_oa_find(author, 'address.address')">
                    <p class="has-small-bottom-margin has-text-vcentered">
                    <span class="icon is-medium">
                        <i class="fa fa-2x fa-envelope"></i> 
                    </span>
                    <span class="has-small-left-margin">{{author.address.address}}<span v-if="author.address.city">, {{author.address.city}}</span></span>
                    </p>
                </div>
                <div v-if="Object.keys(_oa_find(author, 'external', {})).length > 0">
                    <social-icon 
                        v-for="social in socials"
                        :has-url="social.hasUrl"
                        :icon="social.icon"
                        :url="social.url"
                        :social-id="social.id"
                        :has-image="social.img !== ''"
                        :img-url="social.img"
                    />
                </div>
            </div>
        </div>
        </template>
    </div>
</template>

<script>
    module.exports = require('./Overview');
</script>
