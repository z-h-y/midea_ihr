<template>
  <div class="tree-node" :class="{ expanded: childrenRendered && expanded }">
    <div class="tree-node-content" :class="{active: active}">
      <div class="optional-controls">
         <div class="checkbox">
           <div class="incognito-control">
             <i class="fa tree-icon" :class="{ loading: loading, leafnode: !hasChild, 'fa-plus-square-o': !(hasChild && expanded) && !loading, 'fa-minus-square-o': hasChild && expanded && !loading }" @click="handleExpandIconClick" aria-hidden="true"></i>
             <!-- <span class="expand-icon" :class="{ leafnode: !hasChild, expanded: hasChild && expanded }" @click="handleExpandIconClick"></span> -->
             <input type="checkbox" v-if="showCheckbox" v-model="isChecked" @change="handleCheckChange()" v-el:input />
             <span :class="['icon', icon]" v-if="icon"></span>
             <span class="text" @click="getClickNode" @dblclick="dblclick($event)">{{ label }}</span>
           </div>
         </div>
      </div>
    </div>
    <transition name="tree-node-fade">
      <div class="tree-node-fade" v-if="!lazyRenderChildren || (lazyRenderChildren && childrenRendered)" v-show="expanded" >
        <tree-node ref="treenode" v-for="child of children || childrenData" :key="child.id" :data="child"></tree-node>
      </div>
    </transition>
  </div>
</template>

<style lang="less">
  .test{

  }
  .tree-node-fade{
      background-color: transparent;
      padding-left: 16px;
      transition: all 0.2s ease-in-out;
      overflow: hidden;
      max-height: 500px;
    }
    .tree-node-fade-enter,
    .tree-node-fade-leave-active {
        max-height:0;
    }


  .tree-node {
    white-space: nowrap;
  }
  .fa-plus-square-o.leafnode {
    display: none;
  }
  .tree-node .tree-icon{
    cursor: pointer;
    margin-right: 6px;
    vertical-align: middle;
    height: 12px;
    width: 12px;
  }

  .tree-node .text {
    cursor: pointer;
    display: inline-block;
    background-color:transparent;
    font-size: 14px;
    vertical-align: middle;
  }
  .tree-node .icon {
    display: inline-block;
    width: 13px;
    height: 13px;
    vertical-align: middle;
    margin-right: 2px;
  }

  .tree-node .tree-node-content {
    font-size:14px;
    height:30px;
    line-height: 30px;
    padding: 2px;
    padding-left: 10px;
    cursor: default;
  }
  .tree-node .optional-controls{
    display: block;
    padding:0px 10px;
  }
  .tree-node label{
    user-select: none;
    align-items: center;
    display: inline-flex;
    input{
      height: 13px;
      position: relative;
      vertical-align: middle;
      margin-right: 6px;
      width: 13px;
    }
    span{
      display: block;
    }

  }
  .tree-node .tree-node-content:hover, .tree-node .tree-node-content.active {
      background-color: #eee;
  }


  .tree-node > .tree-node-children {
    // overflow: hidden;
    background-color: transparent;
    padding-left: 16px;
    display: none;
  }

  .tree-node.expanded > .tree-node-children {
    display: block;
  }
  .tree-icon.loading:after {
    display: inline-block;
  	content: '';
  	width: 12px;
  	height: 12px;
  	-webkit-animation: segment-spin .6s linear;
  	animation: segment-spin .6s linear;
  	-webkit-animation-iteration-count: infinite;
  	animation-iteration-count: infinite;
  	border-radius: 500rem;
  	border-color: #767676 rgba(0,0,0,.1) rgba(0,0,0,.1);
  	border-style: solid;
  	border-width: .2em;
  	box-shadow: 0 0 0 1px transparent;
  	visibility: visible;
  	z-index: 101
  }
  @-webkit-keyframes segment-spin {
      from {
          -webkit-transform: rotate(0);
          transform: rotate(0)
      }

      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg)
      }
  }

  @keyframes segment-spin {
      from {
          -webkit-transform: rotate(0);
          transform: rotate(0)
      }

      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg)
      }
  }
</style>

<script type="text/ecmascript-6">
  var Vue = require('vue');

  export default {
    name: 'tree-node',

    props: {
      checked: {},
      data: {
        type: Object
      }
    },
    computed: {
      needLoadData() {
        return this.lazyload === true && !this.childrenLoaded && this.loadFn && this.hasChild;
      },

      hasChild() {
        var children = this.children || this.childrenData;
        if (this.lazyload === true && this.data.isParent !== "true") {
          return false;
        }
        if (!this.lazyload || (this.lazyload === true && this.childrenLoaded === true)) {
          return children && children.length > 0;
        }
        return true;
      },

      label() {
        var data = this.data;
        if (!data) return '';
        var levelConfig = this.levelConfig;
        var labelProperty;
        if (levelConfig) {
          labelProperty = levelConfig.labelProperty;
        }
        if (!labelProperty) {
          return data.label || data.name;
        }
        return data[labelProperty];
      },

      isChecked: {
        get() {
          if (this.checked !== undefined) return this.checked;

          var data = this.data;
          if (!data) return false;
          var levelConfig = this.levelConfig;
          var checkedProperty;

          if (levelConfig) {
            checkedProperty = levelConfig.checkedProperty;

            if (checkedProperty) {
              this.checked = !!data[checkedProperty];
            }
          }

          return this.checked;
        },

        set(value) {
          var data = this.data;
          if (!data) return;
          var levelConfig = this.levelConfig;
          var checkedProperty;

          if (levelConfig) {
            checkedProperty = levelConfig.checkedProperty;

            if (checkedProperty) {
              this.checked = value;
              data[checkedProperty] = value !== false;
              return;
            }
          }

          this.checked = value;
        }
      },

      icon() {
        var data = this.data;
        if (!data) return '';
        var levelConfig = this.levelConfig;
        var iconProperty;
        if (levelConfig) {
          iconProperty = levelConfig.iconProperty;

          if (!iconProperty) {
            if (this.hasChild) {
              return levelConfig.icon;
            } else {
              return levelConfig.leafIcon || levelConfig.icon;
            }
          }
        }
        return data[iconProperty];
      },

      children: {
        get() {
          var data = this.data;
          if (!data) return null;
          var levelConfig = this.levelConfig;
          var childrenProperty = 'children';
          if (levelConfig) {
            childrenProperty = levelConfig.childrenProperty || 'children';
          }
          if (data[childrenProperty] === undefined) {
            data[childrenProperty] = null;
          }
          return data[childrenProperty];
        },

        set(value) {
          var data = this.data;
          if (!data) return;
          var levelConfig = this.levelConfig;
          var childrenProperty = 'children';
          if (levelConfig) {
            childrenProperty = levelConfig.childrenProperty || 'children';
          }
          this.childrenData = data[childrenProperty] = value;
        }
      }
    },

    methods: {
      treeDelNode(id, key) {
        if(this.data[key] === id) {
          this.$el.style.display = 'none';
        } else {
          var treenode = this.$refs.treenode || [];
          for (let i = 0, len = treenode.length; i < len; i++) {
            this.$refs.treenode[i].treeDelNode(id, key);
          }
        }
      },
      setNodeActive(id, key) {
        if(String(this.data[key]) === id) {
          this.active = true;
        } else {
          var treenode = this.$refs.treenode || [];
          for (let i = 0, len = treenode.length; i < len; i++) {
            this.$refs.treenode[i].setNodeActive(id, key);
          }
        }
      },
      dblclick(e) {
        this.$tree.dblclickNode(this.data, this);
      },
      handleExpandIconClick() {
        // ;
        // Only work on lazy load data.
        if (this.needLoadData) {
          this.loading = true;
          this.loadIfNeeded(() => {
            this.loading = false;
            this.expanded = true;
            this.childrenRendered = true;
            this.data.expanded = true;
          });
        } else {
          if (!this.expanded) {
            this.expanded = true;
            this.childrenRendered = true;
            this.data.expanded = true;
          } else {
            this.expanded = false;
            this.childrenRendered = true;
            this.data.expanded = false;
          }
        }
      },

      handleCheckChange() {
        // var value = this.checked;
        //
        // this.setChecked(value);
        //
        // var children = this.$children;
        // for (var i = 0, j = children.length; i < j; i++) {
        //   var child = children[i];
        //   child.setChecked(value, true);
        // }
      },

      getClickNode() {
        this.handleExpandIconClick();
        if(this.$tree.clickNode && typeof this.$tree.clickNode === 'function') {
          this.$tree.clickNode(this.data, this);
        }
        var children = this.$tree.$children;
        for (var i = 0, j = children.length; i < j; i++) {
          var child = children[i];
          child.active = false;
          this.disableNodeActive(child.$children);
        }
        this.active = true;
      },

      disableNodeActive(node) {
        for (var i = 0, j = node.length; i < j; i++) {
          var child = node[i];
          child.active = false;
          this.disableNodeActive(child.$children);
        }
      },

      loadIfNeeded(callback) {
        if (this.lazyload === true && !this.childrenLoaded && this.loadFn) {
          this.childrenLoaded = 'loading';

          var loadFn = this.loadFn;

          loadFn(this, () => {
            this.childrenLoaded = true;
            if (this.lazyRenderChildren) {
              if (!this.childrenRendered) {
                this.childrenRendered = true;
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        } else {
          if (this.lazyRenderChildren) {
            if (!this.childrenRendered) {
              this.childrenRendered = true;
              if (callback) {
                callback.call(this);
              }
            }
          }
        }
      },

      setChecked(value, deep) {
        // Only work on lazy load data.
        this.loadIfNeeded(() => {
          var children = this.$children || [];
          Vue.nextTick(function() {
            for (var i = 0, j = children.length; i < j; i++) {
              var child = children[i];
              child.setChecked(value !== false);
            }
          });
        });

        var input = this.$els.input;
        if (value === 'half') {
          input.indeterminate = true;
          input.checked = false;
        } else {
          input.indeterminate = false;
          input.checked = !!value;
        }

        this.isChecked = value;
        var i, j;

        if (deep) {
          var children = this.$children;
          for (i = 0, j = children.length; i < j; i++) {
            var child = children[i];
            child.setChecked(value !== false, deep);
          }
        }

        var parent = this.$parent;

        if (parent.level === undefined) return;

        var siblings = parent.$children;

        var all = true;
        var none = true;

        for (i = 0, j = siblings.length; i < j; i++) {
          var sibling = siblings[i];
          if (sibling.checked !== true) {
            all = false;
          }
          if (sibling.checked !== false) {
            none = false;
          }
        }

        if (all) {
          parent.setChecked(true);
        } else if (!all && !none) {
          parent.setChecked('half');
        } else if (none) {
          parent.setChecked(false);
        }
      }
    },

    created() {
      var parent = this.$parent;
      if (parent.$isTree) {
        this.level = 0;
        this.$tree = parent;
        this.levelConfig = parent.levelConfig;
        if (this.levelConfig.recursive) {
          this.levelConfig.children = this.levelConfig;
        }
      } else {
        this.level = parent.level + 1;
        this.$tree = parent.$tree;
        if (parent.levelConfig) {
          this.levelConfig = parent.levelConfig.children;
          if (this.levelConfig && this.levelConfig.recursive) {
            this.levelConfig.children = this.levelConfig;
          }
        }
      }

      var levelConfig = this.levelConfig;
      if (levelConfig) {
        var children = levelConfig.children;
        if (children && children.lazy !== undefined) {
          this.lazyload = true;
          this.loadFn = children.load;
        }
      }

      if (!this.$tree) {
        console.warn('Can not find node\'s tree.');
      } else {
        this.lazyRenderChildren = this.$tree.lazyRender;
        this.showCheckbox = this.$tree.showCheckbox;
        if (this.levelConfig && this.levelConfig.lazy === false) {
          this.lazyRenderChildren = false;
        }
      }
      if (this.data.expanded === true) {
        this.childrenRendered = true;
        this.childrenLoaded = true;
        this.expanded = true;
        this.hasChild = true;
      }
      if (this.$tree.selected === this.data[this.levelConfig.childrenProperty || 'children']) {

      }
    },

    mounted() {
      if (this.levelConfig) {
        var lazy = this.levelConfig.lazy;
        if (lazy === false && this.loadFn) {
          this.loadIfNeeded();
        }
      }

      if (this.isChecked) {
        Vue.nextTick(() => {
          this.setChecked(true);
        });
      }
      if (this.level === 0 && !this.$parent.$hasLoad && !this.expanded && this.data.expanded !== true) {
        this.$parent.$hasLoad = true;
        this.handleExpandIconClick();
      }
    },

    data() {
      return {
        level: 0,
        active: false,
        childrenData: [],
        childrenLoaded: false,
        loading: false,
        expanded: false,
        levelConfig: null,
        $tree: null,
        $item: null,
        lazyRenderChildren: true,
        childrenRendered: false,
        showCheckbox: true
      };
    }
  };
</script>
