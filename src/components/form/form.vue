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
                // this.$broadcast('formModelChange');
                this.$children.forEach(function(item) {
                  if (item.formModelChange) {
                    item.formModelChange()
                  }
                })
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
        },
        methods: {
          isFormValidate() {
            var pass = true;
            this.$children.forEach(function(item) {
              if (item.checkFormValidate) {
                if (!item.checkFormValidate()) {
                  pass = false;
                }
              }
            })
            return pass;
          }
        }
};

</script>
