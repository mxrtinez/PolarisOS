<template>
<div class="hero-body">
    <div class="container is-fluid">
        <div class="columns is-centered">
            <div class="column is-12 has-text-centered">
                <h4 class="title is-4"> {{lang('l_uspc_news')}} </h4>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-10 has-text-centered">
                <h4 class="title is-4">{{message.title}}</h4>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-8 is-centered">
                    <div class="message-body">
                        <p>{{message.author.fullName}}, {{message.createdAt}}</p>
                        <time class="is-pulled-right" :datetime="message.createdAt">{{message.createdAt | format_date('fromNow')}}</time>
                        <span v-for="tag in message.tags" class="tag is-info has-small-right-margin">{{tag.value}}</span>
                        <p><strong v-html="message.header"></strong></p>
                    </div>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-narrow">
                <figure class="figure">
                    <p class="image">
                        <img :src="message.main_picture" alt="Picture"/>
                    </p>
                </figure>
            </div>
            <div class="column is-10">
                <article class="message is-link">
                <p v-html="message.body"></p>
                </article>
            </div>
        </div>
    </div>
</div>
</template>

<script>
module.exports = require('./NewsPage');
</script>
