<style lang="css">

.textfield {
  position:relative;
}

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
        <editor></editor>
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

const TYPES_MAP = {
    date: 'date',
    datetime: 'datetime',
    integer: 'number',
    float: 'number',
    number: 'number'
}

export default {
    props: merge({
        type: {
            type: String
        },
        editorHeight: {
            type: Number
        },
        maxlength: {
        },
        minDate: {},
        maxDate: {},
        readonly:{
          type:Boolean,
          default:false
        },
        show:{},
        placeholder: {},
        lazy: {
            type: Boolean,
            default: false
        }
    }, common.props),
    events: common.events,
    data() {
        return {};
    },
    components: {
        editor: {
            inherit: true,
            template: '',
            components: {
                TextEditor: require('../text-editor.vue')
            },
            created() {
               this.$options.template = `<text-editor :style="{ width: $parent.realEditorWidth ? $parent.realEditorWidth : '' }" @focus="$parent.handleFocus" type="${this.$parent.editorType}" :value.sync="${'$parent.model.' + this.$parent.property}" :maxlength="$parent.maxlength" :min-date.sync="$parent.minDate" :max-date.sync="$parent.maxDate" :height="$parent.editorHeight" :placeholder="$parent.placeholder || ''" :readonly="$parent.readonly" :show.sync="$parent.show"/>`;
            }
        }
    },
    computed: merge({
        editorType() {
            if (this.type) {
                return this.type;
            }

            if (this.property) {
                var fieldSchema = this.fieldSchema;
                if (fieldSchema) {
                    var descriptor = fieldSchema.getPropertyDescriptor(this.property);
                    if (descriptor) {
                        if (TYPES_MAP[descriptor.type]) {
                            return TYPES_MAP[descriptor.type];
                        }
                    }
                }
            }

            return 'text';
        }
    }, common.computed),

    created: common.onCreated,

    destroyed: common.onDestroyed,

    beforeCompile() {
        this.editorFocused = false;
        if(this.readonly) {
          this.editorFocused = true;
        }
    },

    compiled: common.onCompiled,

    methods: merge({
        handleFocus() {
            this.editorFocused = true;
            },
        handleBlur() {
           this.editorFocused = false;
        }
    }, common.methods)
};

</script>
