<style lang="less">

.radio-input-wrapper {
    float: left;
    cursor: default;
    position: relative;
    .radio-border,
    .radio-inner-dot {
        position: absolute;
        top: 8px;
        left: 0;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
    }
    .radio-border {
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, .38);
        background-color: transparent;
        transition: border-color .2s;
    }
    .radio-inner-dot {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .38);
        opacity: 0;
        z-index: -1;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        transition-property: opacity, background-color, -webkit-transform;
        transition-property: transform, opacity, background-color;
        transition-property: transform, opacity, background-color, -webkit-transform;
        transition-duration: .3s;
    }
    .radio-input {
        width: 16px;
        height: 16px;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
        position: relative;
        top: 0 !important;
    }
    .radio-input:checked~.radio-border {
        border-color: #2196f3;
    }
    .radio-input:checked~.radio-inner-dot {
        background-color: #2196f3;
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -ms-transform: scale(.5);
        opacity: 1;
        z-index: 0;
    }
    label {
        margin: 0 30px 0 10px;
        cursor: pointer;
    }
}

</style>

<template>

<div class="radio-input-wrapper">
    <input disabled="{{disabled}}" v-model="selected" class="radio-input" type="radio" v-el:editor :value.once="value" :id.once="id" :name.once="$parent.$radioName || name" @change="onChange($event, this)" /><span class="radio-border"></span><span class="radio-inner-dot"></span>
    <label :for.once="id">
        <slot></slot>
    </label>
</div>

</template>

<script type="text/ecmascript-6">

var seed = 1;

export default {
    props: {
      value: {},
      name: {},
      selected: {},
      disabled: {
        default: false
      }
    },

    created() {
        this.id = 'd_radio_' + seed++;
    },
    methods: {
        onChange: function(event, self) {
            var target = event.target;
            if (target.checked && self.$parent.$setValue) {
                self.$parent.$setValue(self.value);
            }
        }
    }
};

</script>
