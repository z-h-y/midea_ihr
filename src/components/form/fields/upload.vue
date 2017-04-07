<style>

  .field {
      position: relative;
      width: 100%;
  }

  .field-hashint {
      min-height: 44px;
  }

  .field.require > label::after {
      content: '*';
      color: #ed5565;
      margin-right: 2px;
      margin-left: 4px;
      vertical-align: sub;
  }

  .field::after {
      content: "";
      display: table;
      clear: both;
  }

  .field-content {
      vertical-align: top;
      font-size: 14px;
      padding-left: 2px;
      padding-right: 24px;
      box-sizing: border-box;
      border-radius: 2px;
      line-height: 32px;
  }

  .field-hint {
      font-size: 12px;
      line-height: 18px;
      height: 18px;
  }

  .field.validate-error,
  .field-hint {
      color: #ed5565;
  }

  .field-hint .icon {
      vertical-align: top;
  }

  .field-hint .icon-error {
      font-size: 14px;
      line-height: 14px;
      color: #ed5565;
  }

  .field-hint .icon-error:before {
      margin-right: 3px;
      vertical-align: middle;
  }

  .field-hint .icon-warning:before {
      line-height: 14px;
      font-size: 14px;
      color: #65c04b;
      margin-right: 3px;
      vertical-align: middle;
  }

</style>

<template>

<div tabindex="-1" class='field' :class="{ 'validate-error': hintType === 'error', require: isRequired, 'field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
        <upload ref="upload" :upload-result="uploadResult" :files-option="filesOption" :default-files="defaultFiles" :upload-class="uploadClass" :url="url" :multiple="multiple" :min-num="minNum" :max-num="maxNum" :accept="accept" :max-filesize="maxFilesize"></upload>
        <slot></slot>
        <div class="field-hint" v-if="!hideHint">
            <i class='icon' :class="{ 'icon-error': hintType === 'error', 'icon-warning': hintType === 'warning' }"></i> {{ hintMessage || '' }}
        </div>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

import {
    merge
}
from '../../../util/assist';
import {
    default as common
}
from './field-common';

export default {
    props: merge({
      uploadClass:{
        type:String,
        default:''
      },
      defaultFiles: {
        type: Array,
        default() {
          return [];
        }
      },
      removeIds: {
        type: Array,
        default() {
          return [];
        }
      },
      url:{
        type:String,
        default:''
      },
      multiple: {
        type: Boolean,
        default: true
      },
      minNum: {
        type: Number
      },
      maxNum: {
        type: Number
      },
      maxFilesize: {
        type: Number
      },
      accept: {
        type: String
      },
      filesOption: {},
      uploadResult: {
        type: Function,
        default() {
          return function() {};
        }
      }
    },common.props),
    data() {
        return {
          form: {},
          model: {},
          labelWidth: 120,
          label: '',
          hintMessage: ''
      };
    },
    events: common.events,

    created: common.onCreated,

    mounted: common.onMounted,

    methods: merge({
      uploadFile(data) {
        data = data || {};
        var upload = this.$refs.upload.$refs.upload;
        upload.request = {
          data: data
        };
        upload.active = true;
      }
    }, common.methods),

    destroyed: common.onDestroyed,

    computed: merge({}, common.computed),
    components:{
      upload:require('../upload.vue')
    }
};

</script>
