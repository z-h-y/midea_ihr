<template>
  <div :class="['select-option',{ selectedItme: !showCheckbox && value === $parent.value, 'select-option-disable': isDisable }]" @click.stop="handleClick">
    <!-- <input type="checkbox" v-if="showCheckbox" v-model="selected" /> -->
    <div :class="['ui-checkbox', {checked:selectedItme}]" v-if="showCheckbox">
      <input type="checkbox" v-model="selectedItme" />
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
      isDisable: {
        type: Boolean
      }
    },
    data() {
      return {
        selectedItme: false
      }
    },
    mounted() {
      if (this.$parent.multiSelect) {
        this.showCheckbox = true;
        const parentValue = this.$parent.value;
        if (parentValue instanceof Array) {
          this.selectedItme = parentValue.indexOf(this.value) !== -1;
        }
      }
    },

    methods: {
      handleClick() {
        if (this.isDisable) {
          return;
        }
        if (this.showCheckbox) {
          this.selectedItme = !this.selectedItme;
          this.$parent.$emit('selection-change');
        } else {
          this.$parent.$emit('selectItem', this.value);
        }
      }
    }
  };
</script>
