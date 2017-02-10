<template>
  <div class="select-option" :class="{ selected: !showCheckbox && value === $parent.value, 'select-option-disable': isDisable }" @click="handleClick">
    <!-- <input type="checkbox" v-if="showCheckbox" v-model="selected" /> -->
    <div :class="{'ui-checkbox': true, 'checked': selected}" v-if="showCheckbox">
      <input type="checkbox" v-model="selected" />
      <div class="ui-checkbox-checkmark">
          <div class="ui-checkbox-focus-ring"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="css">
  .select-option {
    padding: 0 5px;
    font-size: 14px;
    cursor: pointer;
    min-height: 32px;
    line-height: 32px;
  }
  .select-option:hover,
  .select-option.selected {
    background-color: #3aa2eb;
    color: #2a3c59;
  }
  .select-option-disable {
    cursor: default;
    color: #a5acbe;
  }
  .select-option-disable:hover {
    background-color: #fff;
    color: #a5acbe;
  }
  .select-option .ui-checkbox {
    display: inline-block;
    vertical-align: text-top;
  }
  .select-option .ui-checkbox input {
    position: absolute;
  }
  .select-option .ui-checkbox .ui-checkbox-checkmark {
    width: 16px;
    height: 16px;
  }
  .select-option .ui-checkbox .ui-checkbox-checkmark:after {
    left: 5px;
    height: 10px;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      value: {},
      showCheckbox: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Boolean
      },
      isDisable: {
        type: Boolean
      }
    },

    ready() {
      if (this.$parent.multiSelect) {
        this.showCheckbox = true;
        const parentValue = this.$parent.value;
        if (parentValue instanceof Array) {
          this.selected = parentValue.indexOf(this.value) !== -1;
        }
      }
    },

    methods: {
      handleClick() {
        if (this.isDisable) {
          return;
        }
        if (this.showCheckbox) {
          this.selected = !this.selected;
          this.$parent.$emit('selection-change');
        } else {
          this.$parent.value = this.value;
          this.$parent.$emit('select', this.value);
        }
      }
    }
  };
</script>
