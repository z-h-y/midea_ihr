<style lang="css">

.text-editor {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: 32px;
}

.text-editor > .inrement-text{
  display: inline-block;
  vertical-align: top;
  line-height:28px;
  background-color: transparent;
  border: none;
  outline: none;
  width:90%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

</style>

<template>

<span :class="['text-editor', haveTrigger ? 'have-trigger' : '', pickerVisible ? 'active' : '']">
    <increment></increment>
</span>

</template>

<script type="text/ecmascript-6">

export default {
    props: {
        value: {},
        height: {}
    },
    computed: {

            visualValue() {
                return this.value
            }
    },
    components: {
        increment: {
            inherit: true,
            template: '',

            created() {
                var parent = this.$parent;
                var lazy = parent.lazy;
                this.$options.template = `<label class="inrement-text" disabled="disabled" :style="{ height: $parent.height ? $parent.height + 'px' : '' }" v-text="$parent.visualValue"/>`;
            }
        }
    }
};

</script>
