module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(318);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tabs = __webpack_require__(319);

	var _tabs2 = _interopRequireDefault(_tabs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_tabs2.default.install = function (Vue) {
	  Vue.component(_tabs2.default.name, _tabs2.default);
	};

	exports.default = _tabs2.default;

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(320),
	  /* template */
	  null,
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tabNav = __webpack_require__(321);

	var _tabNav2 = _interopRequireDefault(_tabNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElTabs',

	  components: {
	    TabNav: _tabNav2.default
	  },

	  props: {
	    type: String,
	    activeName: String,
	    closable: Boolean,
	    addable: Boolean,
	    value: {},
	    editable: Boolean
	  },

	  data: function data() {
	    return {
	      currentName: this.value || this.activeName,
	      panes: []
	    };
	  },


	  watch: {
	    activeName: function activeName(value) {
	      this.setCurrentName(value);
	    },
	    value: function value(_value) {
	      this.setCurrentName(_value);
	    },
	    currentName: function currentName(value) {
	      var _this = this;

	      if (this.$refs.nav) {
	        this.$nextTick(function (_) {
	          _this.$refs.nav.scrollToActiveTab();
	        });
	      }
	    }
	  },

	  methods: {
	    handleTabClick: function handleTabClick(tab, tabName, event) {
	      if (tab.disabled) return;
	      this.setCurrentName(tabName);
	      this.$emit('tab-click', tab, event);
	    },
	    handleTabRemove: function handleTabRemove(pane, ev) {
	      ev.stopPropagation();
	      this.$emit('edit', pane.name, 'remove');
	      this.$emit('tab-remove', pane.name);
	    },
	    handleTabAdd: function handleTabAdd() {
	      this.$emit('edit', null, 'add');
	      this.$emit('tab-add');
	    },
	    setCurrentName: function setCurrentName(value) {
	      this.currentName = value;
	      this.$emit('input', value);
	    },
	    addPanes: function addPanes(item) {
	      var index = this.$slots.default.indexOf(item.$vnode);
	      this.panes.splice(index, 0, item);
	    },
	    removePanes: function removePanes(item) {
	      var panes = this.panes;
	      var index = panes.indexOf(item);
	      if (index > -1) {
	        panes.splice(index, 1);
	      }
	    }
	  },
	  render: function render(h) {
	    var type = this.type,
	        handleTabClick = this.handleTabClick,
	        handleTabRemove = this.handleTabRemove,
	        handleTabAdd = this.handleTabAdd,
	        currentName = this.currentName,
	        panes = this.panes,
	        editable = this.editable,
	        addable = this.addable;


	    var newButton = editable || addable ? h(
	      'span',
	      {
	        'class': 'el-tabs__new-tab',
	        on: {
	          'click': handleTabAdd
	        }
	      },
	      [h(
	        'i',
	        { 'class': 'el-icon-plus' },
	        []
	      )]
	    ) : null;

	    var navData = {
	      props: {
	        currentName: currentName,
	        onTabClick: handleTabClick,
	        onTabRemove: handleTabRemove,
	        editable: editable,
	        type: type,
	        panes: panes
	      },
	      ref: 'nav'
	    };

	    return h(
	      'div',
	      { 'class': {
	          'el-tabs': true,
	          'el-tabs--card': type === 'card',
	          'el-tabs--border-card': type === 'border-card'
	        } },
	      [h(
	        'div',
	        { 'class': 'el-tabs__header' },
	        [newButton, h(
	          'tab-nav',
	          navData,
	          []
	        )]
	      ), h(
	        'div',
	        { 'class': 'el-tabs__content' },
	        [this.$slots.default]
	      )]
	    );
	  },
	  created: function created() {
	    if (!this.currentName) {
	      this.setCurrentName('0');
	    }
	  }
	};

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(322),
	  /* template */
	  null,
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tabBar = __webpack_require__(323);

	var _tabBar2 = _interopRequireDefault(_tabBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function noop() {}

	exports.default = {
	  name: 'TabNav',

	  components: {
	    TabBar: _tabBar2.default
	  },

	  props: {
	    panes: Array,
	    currentName: String,
	    editable: Boolean,
	    onTabClick: {
	      type: Function,
	      default: noop
	    },
	    onTabRemove: {
	      type: Function,
	      default: noop
	    },
	    type: String
	  },

	  data: function data() {
	    return {
	      scrollable: false,
	      navStyle: {
	        transform: ''
	      }
	    };
	  },


	  methods: {
	    scrollPrev: function scrollPrev() {
	      var containerWidth = this.$refs.navScroll.offsetWidth;
	      var currentOffset = this.getCurrentScrollOffset();

	      if (!currentOffset) return;

	      var newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;

	      this.setOffset(newOffset);
	    },
	    scrollNext: function scrollNext() {
	      var navWidth = this.$refs.nav.offsetWidth;
	      var containerWidth = this.$refs.navScroll.offsetWidth;
	      var currentOffset = this.getCurrentScrollOffset();

	      if (navWidth - currentOffset <= containerWidth) return;

	      var newOffset = navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : navWidth - containerWidth;

	      this.setOffset(newOffset);
	    },
	    scrollToActiveTab: function scrollToActiveTab() {
	      if (!this.scrollable) return;
	      var nav = this.$refs.nav;
	      var activeTab = this.$el.querySelector('.is-active');
	      var navScroll = this.$refs.navScroll;
	      var activeTabBounding = activeTab.getBoundingClientRect();
	      var navScrollBounding = navScroll.getBoundingClientRect();
	      var navBounding = nav.getBoundingClientRect();
	      var currentOffset = this.getCurrentScrollOffset();
	      var newOffset = currentOffset;

	      if (activeTabBounding.left < navScrollBounding.left) {
	        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
	      }
	      if (activeTabBounding.right > navScrollBounding.right) {
	        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
	      }
	      if (navBounding.right < navScrollBounding.right) {
	        newOffset = nav.offsetWidth - navScrollBounding.width;
	      }
	      this.setOffset(Math.max(newOffset, 0));
	    },
	    getCurrentScrollOffset: function getCurrentScrollOffset() {
	      var navStyle = this.navStyle;

	      return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
	    },
	    setOffset: function setOffset(value) {
	      this.navStyle.transform = 'translateX(-' + value + 'px)';
	    }
	  },

	  updated: function updated() {
	    var navWidth = this.$refs.nav.offsetWidth;
	    var containerWidth = this.$refs.navScroll.offsetWidth;
	    var currentOffset = this.getCurrentScrollOffset();

	    if (containerWidth < navWidth) {
	      var _currentOffset = this.getCurrentScrollOffset();
	      this.scrollable = this.scrollable || {};
	      this.scrollable.prev = _currentOffset;
	      this.scrollable.next = _currentOffset + containerWidth < navWidth;
	      if (navWidth - _currentOffset < containerWidth) {
	        this.setOffset(navWidth - containerWidth);
	      }
	    } else if (currentOffset > 0) {
	      this.setOffset(0);
	    }
	  },
	  render: function render(h) {
	    var type = this.type,
	        panes = this.panes,
	        editable = this.editable,
	        onTabClick = this.onTabClick,
	        onTabRemove = this.onTabRemove,
	        navStyle = this.navStyle,
	        scrollable = this.scrollable,
	        scrollNext = this.scrollNext,
	        scrollPrev = this.scrollPrev;


	    var scrollBtn = scrollable ? [h(
	      'span',
	      { 'class': ['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled'], on: {
	          'click': scrollPrev
	        }
	      },
	      [h(
	        'i',
	        { 'class': 'el-icon-arrow-left' },
	        []
	      )]
	    ), h(
	      'span',
	      { 'class': ['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled'], on: {
	          'click': scrollNext
	        }
	      },
	      [h(
	        'i',
	        { 'class': 'el-icon-arrow-right' },
	        []
	      )]
	    )] : null;

	    var tabs = this._l(panes, function (pane, index) {
	      var tabName = pane.name || pane.index || index;
	      var closable = pane.isClosable || editable;

	      pane.index = '' + index;

	      var btnClose = closable ? h(
	        'span',
	        { 'class': 'el-icon-close', on: {
	            'click': function click(ev) {
	              onTabRemove(pane, ev);
	            }
	          }
	        },
	        []
	      ) : null;

	      var tabLabelContent = pane.$slots.label || pane.label;
	      return h(
	        'div',
	        {
	          'class': {
	            'el-tabs__item': true,
	            'is-active': pane.active,
	            'is-disabled': pane.disabled,
	            'is-closable': closable
	          },
	          ref: 'tabs',
	          refInFor: true,
	          on: {
	            'click': function click(ev) {
	              onTabClick(pane, tabName, ev);
	            }
	          }
	        },
	        [tabLabelContent, btnClose]
	      );
	    });
	    return h(
	      'div',
	      { 'class': ['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : ''] },
	      [scrollBtn, h(
	        'div',
	        { 'class': ['el-tabs__nav-scroll'], ref: 'navScroll' },
	        [h(
	          'div',
	          { 'class': 'el-tabs__nav', ref: 'nav', style: navStyle },
	          [!type ? h(
	            'tab-bar',
	            {
	              attrs: { tabs: panes }
	            },
	            []
	          ) : null, tabs]
	        )]
	      )]
	    );
	  }
	};

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(324),
	  /* template */
	  __webpack_require__(325),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 324:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	//
	//
	//

	exports.default = {
	  name: 'TabBar',

	  props: {
	    tabs: Array
	  },

	  computed: {
	    barStyle: {
	      cache: false,
	      get: function get() {
	        var _this = this;

	        if (!this.$parent.$refs.tabs) return {};
	        var style = {};
	        var offset = 0;
	        var tabWidth = 0;

	        this.tabs.every(function (tab, index) {
	          var $el = _this.$parent.$refs.tabs[index];
	          if (!$el) {
	            return false;
	          }

	          if (!tab.active) {
	            offset += $el.clientWidth;
	            return true;
	          } else {
	            tabWidth = $el.clientWidth;
	            return false;
	          }
	        });

	        var transform = 'translateX(' + offset + 'px)';
	        style.width = tabWidth + 'px';
	        style.transform = transform;
	        style.msTransform = transform;
	        style.webkitTransform = transform;

	        return style;
	      }
	    }
	  }
	};

/***/ },

/***/ 325:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-tabs__active-bar",
	    style: (_vm.barStyle)
	  })
	},staticRenderFns: []}

/***/ }

/******/ });