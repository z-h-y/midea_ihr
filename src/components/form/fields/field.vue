<template>
  <div class='field' :class="{ 'validate-error': hintType === 'error', required: isRequired, 'field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' },{display:lshow}" v-show="!hideLabel">{{ labelText }}</label>
    <div class="field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <slot></slot>
      <div class="field-hint" v-if="!hideHint">
        <i class='icon' :class="{ 'icon-error': hintType === 'error', 'icon-warning': hintType === 'warning' }"></i>
        {{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

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

  .field > label {
    float: left;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    height: 28px;
    padding-right: 10px;
    font-size: 14px;
    line-height: 28px;
    text-align: right;
    color: #545454;
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
  .item-inline{
    display: inline-block;
  }
  .field-hint {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .field.validate-error,.field-hint {
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

<script type="text/ecmascript-6">
  // import { merge } from '../../../util/assist';
  // import { default as common } from './field-common';
  //
  // export default {
  //   props: common.props,
  //
  //   created: common.onCreated,
  //
  //   compiled: common.onCompiled,
  //
  //   destroyed: common.onDestroyed,
  //
  //   computed: merge({}, common.computed)
  // };
</script>
