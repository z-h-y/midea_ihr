<template>
  <div class='field d-radiogroupfield' :class="{ 'validate-error': hintType === 'error', require: isRequired, 'field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <radio-group :value.sync="editorValue" ref="group"><radio v-for="(val, key) in actualMapping" :key="key.id" :value="val" @click="selectRadio">{{key}}</radio><slot></slot></radio-group>
      <div class="field-hint" v-if="!hideHint">
        <i class='icon' :class="{ 'icon-error': hintType === 'error', 'icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-radiogroupfield {
  }

  .d-radiogroupfield .d-radio-group {
    line-height: 32px;
    display: flex;
  }

  .d-radiogroupfield .d-radio-group input {
    height: 16px;
  }
</style>

<script type="text/ecmascript-6">
  import { merge, getPath, setPath } from '../../../util/assist';
  import { default as common } from './field-common';
  import Vue from 'vue';

  export default {
    props: merge({}, common.props),
    data() {
      return {
        form: {},
        model: {},
        editorFocused: true,
        labelWidth: 120,
        label: '',
        hintMessage: '',
        actualMapping: {}
      };
    },
    computed: merge({
      $radioName() {
        return this.$refs.group.$radioName;
      },
      $setValue() {
        return this.$refs.group.$setValue;
      },
      editorValue: {
        get() {
          if (this.model && this.property) {
            return getPath(this.model, this.property);
          }
        },
        set(newValue) {
          if (this.model && this.property) {
            setPath(this.model, this.property, newValue);
          }
        }
      }
    }, common.computed),

    components: {
      DRadioGroup: require('../radio-group.vue'),
      DRadio: require('../radio.vue')
    },

    watch: {
      actualMapping() {
        let oldValue = this.$refs.group.value;
        this.$refs.group.value = null;
        Vue.nextTick(() => {
          this.$refs.group.value = oldValue;
        });
      }
    },

    events: common.events,

    created: common.onCreated,

    destroyed: common.onDestroyed,

    mounted: common.onMounted,

    methods: merge({
      selectRadio() {
        this.editorFocused = true;
      }
    }, common.methods)
  };
</script>
