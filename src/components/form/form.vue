<style lang="css">

.form:after {
    content: "";
    clear: both;
    display: block;
}

.form > .field {
    float: left;
}

</style>

<template lang="html">

<div class="form" :class="formStyle">
    <slot></slot>
</div>

</template>

<script type="text/ecmascript-6">

export default {
    created() {
            this.$isForm = true;
        },
        watch: {
            model() {
                this.$broadcast('formModelChange');
            }
        },
        props: {
            cols: {
                type: Number,
                default: 1
            },
            schema:{},
            model:{},
            formStyle:{
               type:String
            },
            labelWidth:{},
            labelSuffix:{},
            editorWidth:{},
            hideHint:{
              type:Boolean,
              default:false
            }
        },
        computed: {
            fieldClass() {
                var cols = this.cols;
                if (cols >= 1 && cols <= 6) {
                    return `cell-1-${cols}`;
                }
                return '';
            }
        }
};

</script>
