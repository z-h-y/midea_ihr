// let  APIURL = "http://10.16.80.167:8071";  //后端-SIT环境
// let  APIURL = "http://10.16.80.167:8073";  //后端-dev环境 开发时使用这个,不要提交这个配置
//let  APIURL = "http://xxx:8080";  //后端-UAT环境
let  APIURL = "http://www.ihr.com/backend";  //后端-UAT环境


// 公共css
import {css} from './static/styles/common/index.less'

import NavMenu from './components/basic/nav-menu.vue';
import NavMenuItem from './components/basic/nav-menu-item.vue';
// -------KUI----------
import './components/keen-ui/helpers/modality';
import UiButton from './components/keen-ui/UiButton.vue';
import UiRippleInk from './components/keen-ui/UiRippleInk.vue';
import UiConfirm from './components/keen-ui/UiConfirm.vue';
import UiModal from './components/keen-ui/UiModal.vue';
import UiProgressLinear from './components/keen-ui/UiProgressLinear.vue';

export let Components = {
    NavMenu,
    NavMenuItem,
    // KUI
    UiButton,
    UiRippleInk,
    UiConfirm,
    UiModal,
    UiProgressLinear
};
import FormComponents from './components/form/index';
// import Timeline from './components/timeline/index';
import { merge,filterUndefined } from './util/assist';

merge(Components,FormComponents);

let initComponents = (Vue, components) => {
    if (!components) components = Object.keys(Components);
    components.forEach((key) => Vue.component(key, Components[key]));
};

// import Vue from 'vue';
// import i18n from 'vue-i18n';
// import VueResource from 'vue-resource';
// import VueRouter from 'vue-router';

let language = 'en';

window.Vue = Vue || {};

Vue.config.debug = true; //开启错误提示
Vue.config.APIURL = APIURL; //接口url

// import { default as locales } from './locales/index';
import { default as routerMap } from './index';
import { filter } from './util/filter';
import {default as Message} from './components/basic/message';
import store from './store';

Vue.use(VueI18n);
Vue.config.lang = '';
var curLang = localStorage.getItem('language');
if (curLang) {
  curLang = JSON.parse(curLang);
}
if (curLang && curLang.version === '1.0.0') {
  Vue.locale(language, curLang);
} else {
  Vue.locale(language, function () {
    return Vue.http.get('/data/' + language + '.json').then(function(res) {
      localStorage.setItem('language', JSON.stringify(res.data));
      return res.json();
    })
  }, function () {
    Vue.config.lang = language
  })
}

Vue.use(VueResource);
Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'hash',
  routes: routerMap()
});

// router.redirect({
//   '*': '/error'
// });
initComponents(Vue);


Vue.http.interceptors.push((request,next) => {

  request.url = APIURL + request.url;
  let $route = router.app.$route;

 //TODO modity request
 Object.assign(request.headers,{'Content-Type' : 'application/x-www-form-urlencoded'});
 if($route.path !== '/login' && $route.path !== '/' && localStorage.getItem('ewptoken')) {
   Object.assign(request.headers,{'ewpAdminAuthorization' : localStorage.getItem('ewptoken')});
 }
  // ie9去掉缓存
  if(request.method === 'get' && window.navigator.userAgent.indexOf("MSIE") >= 0) {
    var leadingChar = request.url.indexOf('?') === -1 ? '?' : '&';
    request.url += leadingChar + 'timeStamp=' + new Date().getTime();
  }
  //filter undefined
  if(request.method === 'post') filterUndefined(request.body);
  //continue to next interceptors
  next((response) => {
    if(response.status === 404){
       Message({type:'error',message:'interface Not Found(code 404), Please contact administrators'});
    } else if (response.status === 403) {
       Message({type:'error',message:'Not logged in or Login timed out, please log in again'});
       var timer;
       clearTimeout(timer);
       timer = setTimeout(() => {
         // $route.router.go('/login');
         localStorage.removeItem('ewptoken');
         location.href = location.origin + '/login.html';
       },2000);
    } else if(response.status === 500) {
      if(response.data.exception == 'com.midea.hrms.framework.core.exception.HrmsException') {
        Message({type:'error',message:response.data.message});
      }else{
        Message({type:'error',message:'Internal Server Error'});
      }
    } else if(response.status === 400) {
      if (/\/security\/login/i.test(response.data.path)) {
        return;
      }
      var message = response.data.message || 'Parameter Error';
      var errors = response.data.errors;
      if (errors && errors.length > 0) {
        message = errors[0].defaultMessage;
      }
      Message({type:'error',message: message});
    }
  })
});

const app = new Vue({
  router,
  store
}).$mount('#app')
