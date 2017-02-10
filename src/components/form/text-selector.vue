<style lang="css">
   span.item{
		margin-right: -3px;
		display: inline-block;
	}
	 .selector{
		 margin-left: 5px;
	 }
  span.item:after,span.item.before{
		display: table;
     content: "";
	}
	span.item:after{
		clear: both;
	}


</style>

<template lang="html">

<span class="item">
	  <input @focus="handleFocus" @blur="handleBlur" lazy @change="handleChange($event)" type="{{editorType}}" v-model="visualValue" placeholder="{{placeholder}}" readonly="{{readonly}}" :style="{height: height ? height + 'px' : ''}"/>
	</span>
<span class="item">
		<input class="selector" @focus="handleFocus" @blur="handleBlur" lazy @change="handleChange($event)" type="{{editorType}}" v-model="visualValue" placeholder="{{placeholder}}" readonly="{{readonly}}" :style="{ height:height ?height + 'px' : '' }"/>
		<span @click="toggleSelector()" v-if="haveSelector"></span>
</span>

</template>

<script>

export default {
    props: {

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
    },
    computed: {
        selectorClass() {
                // debugger;
                // let cols = this.cols;
                // if (cols >= 1 && cols <= 6) {
                //     return `cell-1-${cols}`;
                // }
                // return '';
            },
            haveSelector() {
                return this.$parent.ype === 'selector' || this.type === 'select';
            },

            visualValue: {
                get() {
                        return this.value;
                    },

                    set(value) {
                        this.value = value;
                    }
            },

            editorType() {
                return this.type === 'password' ? 'password' : 'text';
            }
    },

    data() {
        return {
            pickerVisible: false
        };
    },
    methods: {
        handleChange(event) {
                let value = event.target.value;
                let type = this.type;
                if (type === 'selector') {
                    if (value === undefined || value === null || value === '') {
                        this.value = null;
                        return;
                    }
                    this.value = value;

                }
            },

            handleFocus() {
                let type = this.type;
                if (type === 'selector') {
                    this.showSelector();
                }
                this.$emit('focus', this);
            },

            handleBlur() {
                this.$emit('blur', this);
            },

            onDocumentClick() {
                this.hideSelector();
            },

            hideSelector() {},

            showSelector() {}
    }
};

</script>
