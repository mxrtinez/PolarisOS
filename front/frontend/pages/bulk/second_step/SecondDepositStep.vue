<template>
<div class="columns is-centered">
    <div class="column">
        <div class="card">
            <div class="card-content">
                <dynamic-form :form="subform" :cform="creationSink" @crud-form-change="refetch_form" />
                <div v-if="!validated" class="columns is-centered">
                    <div class="column has-text-centered is-8 redify">
                        <p v-html="lang('f_step_not_validated')"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = require('./SecondDepositStep');
</script>
