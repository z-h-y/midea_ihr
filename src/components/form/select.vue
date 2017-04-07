<style lang="less">

.select {
    border: 1px solid #ccc;
    overflow: auto;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}

</style>

<template>

<div class="select">
    <slot></slot>
    <v-option v-for="item in filterMappingTemp" :key="item.id" :value="item.value" :is-disable="checkDisable(item.value)" :show-checkbox="multiSelect">{{ item.key }}</v-option>
</div>

</template>

<script type="text/ecmascript-6">

export default {
    components: {
        VOption: require('./select-option.vue')
    },

    props: {
        value: {},
        multiSelect: {
            type: Boolean,
            default: false
        },
        mapping: {
            default () {
                return [];
            }
        },
        selectChange: {
            type: Function,
            default () {
                return function() {};
            }
        },
        disableValue: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    computed: {
        filterMappingTemp(){
            var _self = this;
            return _self.mappingTemp.filter(function(item){
                return item.key.indexOf(_self.filterWord) !==-1
            })
        },
        filterWord() {
                return this.$parent.filterWord;
            },
        mappingTemp() {
            var arr = [];
            for (var key of Object.keys(this.mapping)) {
                var obj = {};
                obj.key = key;
                obj.value = this.mapping[key];
                arr.push(obj);
            }
            return arr;
        }
    },
    methods: {
        checkDisable(value) {
            var arr = this.disableValue;
            var isDisable = false;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (value === arr[i]) {
                    isDisable = true;
                    break;
                }
            }
            return isDisable;
        }
    },
    events: {
        'select': function(value) {
            this.selectChange(value);
            this.$dispatch('form-select-change', value);
        }
    }
};

</script>
