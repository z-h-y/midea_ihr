<style>

.field {
    position: relative;
    width: 100%;
}

.field-hashint {
    min-height: 44px;
}

.field.require > label::after {
    content: '*';
    color: #ed5565;
    margin-right: 2px;
    margin-left: 4px;
    vertical-align: sub;
}

.field::after {
    content: "";
    display: table;
    clear: both;
}

.field-content {
    vertical-align: top;
    font-size: 14px;
    padding-left: 2px;
    padding-right: 24px;
    box-sizing: border-box;
    border-radius: 2px;
    line-height: 32px;
}

.field-hint {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
}

.field.validate-error,
.field-hint {
    color: #ed5565;
}

.field-hint .icon {
    vertical-align: top;
}

.field-hint .icon-error {
    font-size: 14px;
    line-height: 14px;
    color: #ed5565;
}

.field-hint .icon-error:before {
    margin-right: 3px;
    vertical-align: middle;
}

.field-hint .icon-warning:before {
    line-height: 14px;
    font-size: 14px;
    color: #65c04b;
    margin-right: 3px;
    vertical-align: middle;
}

</style>

<template>

<div class='field' :class="{ 'validate-error': hintType === 'error', required: isRequired, 'field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
        <div class="text-editor" :style="{ width: realEditorWidth ? realEditorWidth : '' }">
				<text-selector :cols="cols" :type="type" :format="format" :size="size" :readonly="readonly" :placeholder="placeholder" :value="value" :height="height" :lazy="lazy"></text-selector>
			</div>
				<div class="field-hint" v-if="!hideHint">
            <i class='icon' :class="{ 'icon-error': hintType === 'error', 'icon-warning': hintType === 'warning' }"></i> {{ hintMessage || '' }}
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

        cols: {
            type: Number
        },
        type: {
            type: String,
            default: 'text'
        },

        format: {
            type: String
        },

        size: {
            type: String,
            default: ''
        },

        readonly: {
            type: Boolean,
            default: false
        },

        placeholder: {
            type: String
        },

        value: {},

        height: {},

        lazy: {
            type: Boolean,
            default: false
        }
    }, common.props),

    created: common.onCreated,

    compiled: common.onCompiled,

    destroyed: common.onDestroyed,
    computed: common.computed,
    components: {
        TextSelector: require('../text-selector.vue')
    }
}

</script>
