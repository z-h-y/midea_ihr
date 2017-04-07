<style lang="css">

.text-editor {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: 32px;
}

.text-editor.have-trigger input {
    padding-right: 20px;
}

.text-editor input,
.text-editor textarea {
    width: 100%;
}

.text-editor .text-editor-trigger {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    width: 20px;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 32px;
}

.text-editor input {
    border: 1px solid #dee4e9;
    border-radius: 2px;
    line-height: 32px;
    height:32px;
    width: 100%;
    padding:2px 2px;
    box-sizing: border-box;
    transition: border 0.3s;
    padding:0 5px;
}

.text-editor input::-webkit-input-placeholder {
    color: #bbb;
    font-size: 12px;
}

.text-editor input::-moz-placeholder {
    color: #bbb;
    font-size: 12px;
}

.text-editor input:-ms-input-placeholder {
    color: #bbb;
    font-size: 12px;
}

.text-editor input::placeholder {
    color: #bbb;
    font-size: 12px;
}

.text-editor input[readonly="true"]:focus{
    border: 1px solid #dee4e9;
}

.text-editor textarea {
    border: 1px solid #e5e6e7;
    border-radius: 2px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    transition: border 0.3s;
    padding: 5px;
}

.text-editor input:focus,
.text-editor textarea:focus,
.text-editor.active input,
.text-editor.active textarea {
    outline: none;
    border-color: #6699FF;
}

.text-editor.lg input {
    padding: 6px 4px;
}

.text-editor.sm input {
    padding: 1px 1px;
}

.text-editor .datepicker {
    position: absolute;
    top: 33px;
    left: 0;
    z-index: 41;
}

.text-readonly{
  background: #f5f5f5 !important;
}
</style>

<template>

<span :class="['text-editor', size, haveTrigger ? 'have-trigger' : '', pickerVisible ? 'active' : '']">
    <editor></editor>
    <span @click="toggleDatePicker()" class="text-editor-trigger fa fa-calendar" v-if="haveTrigger"></span>
    <span @click="openSelector()" class="text-editor-trigger fa fa-th" v-if="haveSelector"></span>
</span>
</template>

<script type="text/ecmascript-6">

// require('../../assets/icon/iconfont.css');
// var Vue = require('vue');
import {
    merge, formatDate, parseDate
}
from '../../util/assist';
import { default as Dropdown } from '../../util/dropdown';

export default {
    props: {
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

        maxlength: {
        },

        minDate: {},
        maxDate: {},

        show:{},

        placeholder: {
            type: String
        },

        value: {},

        height: {},

        lazy: {
            type: Boolean,
            default: false
        }
        // optItem: {
        //   type: Object,
        //   default: {}
        // }
    },

    watch: {
        pickerVisible(newVal) {
            if (newVal === true) {
                Dropdown.open(this);
            } else {
                Dropdown.close(this);
            }
        }
    },

    computed: {
        haveTrigger() {
                return this.type === 'date' || this.type === 'datetime';
            },

            haveSelector() {
               return this.type === 'selector' || this.type === 'select';
            },

            visualValue: {
                get() {
                        var value = this.value;
                        if (value instanceof Date) {
                            return formatDate(value, this.format || (this.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'));
                        }
                        return value;
                    },

                    set(value) {

                        if ((this.type === 'date' || this.type === 'datetime') && value && !(value instanceof Date)) {
                            return;
                        } else if (this.type === 'number') {
                            if (value === null || value === undefined || value === '') {
                                // this.value = null;
                                this.$emit('set-value', null)
                                return;
                            }
                            // this.value = value;
                            this.$emit('set-value', value)
                            // value = Number(value);
                            // if (!isNaN(value)) {
                            //     this.value = value;
                            // }

                            return;
                        }
                        // this.value = value;
                        this.$emit('set-value', value)
                    }
            },

            editorType() {
                return this.type === 'password' ? 'password' : 'text';
            }
    },

    data() {
        return {
            pickerVisible: false,
            isCtrl: false
        };
    },

    components: {
        editor: {
            inherit: true,
            template: '',
            created() {
                var parent = this.$parent;

                var type = parent.type;
                var lazy = parent.lazy;

                if (type === 'date' || type === 'datetime') {
                this.$options.template = `<input @focus="$parent.handleFocus" @blur="$parent.handleBlur" lazy @change="$parent.handleChange($event)" type="${parent.editorType}" v-model="$parent.visualValue" :placeholder="$parent.placeholder" :readonly="$parent.readonly" :style="{ height: $parent.height ? $parent.height + 'px' : '' }" />`;
                } else if (type === 'number') {
                    this.$options.template = `<input @keydown="$parent.handleKeydown($event)" @keyup="$parent.handleKeyup($event)" @focus="$parent.handleFocus" @blur="$parent.handleBlur" ${lazy ? 'lazy' : ''} type="${parent.editorType}"  autocomplete="off" v-model="$parent.visualValue" :placeholder="$parent.placeholder" :style="{ height: $parent.height ? $parent.height + 'px' : '' }" :readonly="$parent.readonly" />`;
                }
                 else if (type !== 'textarea') {
                    this.$options.template = `<input @focus="$parent.handleFocus" @blur="$parent.handleBlur" ${lazy ? 'lazy' : ''} type="${parent.editorType}"  autocomplete="off" v-model="$parent.visualValue" :placeholder="$parent.placeholder" :style="{ height: $parent.height ? $parent.height + 'px' : '' }"  :readonly="$parent.readonly" />`;
                } else {
                    this.$options.template = `<textarea @focus="$parent.handleFocus" @blur="$parent.handleBlur" ${lazy ? 'lazy' : ''} :placeholder="$parent.placeholder" :readonly="$parent.readonly" v-model="$parent.visualValue" :style="{ height: $parent.height ? $parent.height + 'px' : '' }"  :maxlength="$parent.maxlength"></textarea>`;
                }
            }
        }
    },

    methods: {
      handleKeydown(event) {
        var returnValue = true;
        var value = this.visualValue;
        var hasDot = (value + '').indexOf('.') != -1 ? true : false;
        if (event.keyCode === 17 || this.isCtrl) {
          event.returnValue = true;
          this.isCtrl = true;
          return;
        }
        if (event.keyCode === 8 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode === 189 && !value) || (event.keyCode === 190 && !hasDot) ||(event.keyCode >= 96 && event.keyCode <= 105)) {
          event.returnValue = true;
        } else {
          event.returnValue = false;
        }
      },
      handleKeyup(event) {
        if (event.keyCode === 17) {
          this.isCtrl = false;
        }
      },
        handleChange(event) {
                var value = event.target.value;
                var type = this.type;
                if (type === 'date' || type === 'datetime') {
                    if (value) {
                        var parsedValue = parseDate(value, this.format || (type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'));

                        if (parsedValue) {
                            this.value = parsedValue;
                        }
                    }
                    this.hideDatePicker();
                } else if (type === 'number') {
                    if (value === undefined || value === null || value === '') {
                        this.value = null;
                        return;
                    }
                    this.value = value;
                    // value = Number(value);
                    // if (!isNaN(value)) {
                    //     this.value = value;
                    // }
                }
            },

            handleFocus() {
                var type = this.type;
                if (type === 'date' || type === 'datetime') {
                    if (!this.pickerVisible) {
                        this.showDatePicker();
                    }
                }
                this.$emit('focus', this);
            },

            handleBlur() {
                this.$emit('blur', this);
            },

            onDocumentClick() {
                this.hideDatePicker();
            },

            toggleDatePicker() {
                if (!this.pickerVisible) {
                    this.showDatePicker();
                } else {
                    this.hideDatePicker();
                }
            },

            openSelector(event){
                // this.show.modal = true;
                this.$emit('open-selector');
                
              //  this.$dispatch('text:selectorClickEvent',this.optItem);
            },

            hideDatePicker() {
                if (this.picker) {
                    this.picker.resetView && this.picker.resetView();
                    this.picker.$el.style.display = 'none';
                    this.pickerVisible = false;
                }
            },

            showDatePicker() {
                var DatePicker = require('./date-picker.vue');

                if (!this.picker) {
                    var pickerEl = document.createElement('div');
                    this.picker = new Vue(merge({
                        el: pickerEl,
                        replace: true
                    }, DatePicker));
                    this.picker.showTime = this.type === 'datetime';
                    this.picker.minDate = this.minDate;
                    this.picker.maxDate = this.maxDate;
                    this.$el.appendChild(this.picker.$el)
                    // this.picker.$appendTo(this.$el);

                    var self = this;

                    this.pickerVisible = true;

                    this.picker.$on('pick', function(arg) {
                        self.picker.$el.style.display = 'none';
                        self.visualValue = arg.date;
                        self.pickerVisible = false;
                    });
                    if (this.value instanceof Date) {
                        this.picker.date = this.value;
                    }
                } else {
                    this.picker.$el.style.display = '';
                    this.pickerVisible = true;
                    this.picker.minDate = this.minDate;
                    this.picker.maxDate = this.maxDate;
                    if (this.value instanceof Date) {
                        this.picker.date = this.value;
                    }
                }
            }
    }
};

</script>
