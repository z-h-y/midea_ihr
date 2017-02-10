import {formatDate,parseDate} from './assist';
import Vue from 'vue';
Vue.filter('formatDate', function (value,format) {
  // 返回处理后的值
  if (!value) {
    return ''
  }
  return formatDate(new Date(value),format);
})
