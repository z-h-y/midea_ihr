<style lang="css">

.textfield {}

.text-field.validate-error input {
    border-color: #ed5565;
}

.textfield .text-editor {
    width: 100%;
}

</style>

<template lang="html">

<div class="field textfield" :class="{'validate-error':hintType === 'error',require:isRequired,'field-hashint':!hideHint}">
    <label :style="{width:labelWidth != null ? labelWidth + 'px' :'' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="field-content" :style="{ marginLeft:labelWidth != null ? labelWidth + 'px' : ''}	">
        <increment></increment>
        <slot></slot>
        <div class="field-hint" v-if="!hideHint">
            <i class="icon" :class="{'icon-error': hintType === 'error' ,'icon-warning': hintType === 'warning'}"></i>{{ hintMessage || '' }}
        </div>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

import {
    merge
}
from '../../../util/assist';
import {
    default as common
}
from './field-common';

export default {
    props: merge({
        type: {
            type: String
        },
        editorHeight: {
            type: Number
        },
        placeholder: {},
        lazy: {
            type: Boolean,
            default: false
        }
    }, common.props),
    events: common.events,
    components: {
        increment: {
            inherit: true,
            template: '',
            components: {
                TextIncrement: require('../text-increment.vue')
            },
            created() {
                this.$options.template = `<text-increment :style="{ width: $parent.realEditorWidth ? $parent.realEditorWidth : '' }" :value.sync="${'$parent.model.' + this.$parent.property}" :height="$parent.editorHeight"/>`;
            }
        }
    },
    computed: common.computed,

    created: common.onCreated,

    destroyed: common.onDestroyed,

    compiled: common.onCompiled,

    methods: common.methods
};

</script>
