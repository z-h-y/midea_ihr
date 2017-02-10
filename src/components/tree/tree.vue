<template>
  <div class="tree">
    <tree-node v-for="child in data" :data="child"></tree-node>
  </div>
</template>

<style scoped>
  .tree {
    position: relative;
    top: 0px;
    left: 0px;
    cursor: default;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    created() {
      this.$isTree = true;
    },

    components: {
      TreeNode: require('./tree-node.vue')
    },

    computed: {
      children: {
        set(value) {
          this.data = value;
        },
        get() {
          return this.data;
        }
      }
    },

    methods: {
      getCheckedNodes(leafNodeOnly, exceptIndeterminate) {
        var checkedNodes = [];
        var acceptable = exceptIndeterminate ? [true] : [true, 'half'];
        var walk = function(node) {
          var children = node.$children;
          children.forEach(function(child) {
            if (leafNodeOnly) {
              if (~acceptable.indexOf(child.isChecked) && !child.hasChild) {
                checkedNodes.push(child.data);
              }
            } else {
              if (~acceptable.indexOf(child.isChecked)) {
                checkedNodes.push(child.data);
              }
            }

            walk(child);
          });
        };

        walk(this);
        return checkedNodes;
      },
      delCheckedNodes(selectNode, id) {
        this.$broadcast('treeDelNode' , selectNode[id], id);
        var childrenProperty = this.levelConfig.childrenProperty || 'children';
        var data = this.data;
        var walk = function(data, node) {
          if (data && data.length > 0) {
            data.forEach(function(child, key) {
              if (node[id] === child[id]) {
                data.splice(key, 1);
              } else {
                var children = child[childrenProperty];
                walk(children, node);
              }
            });
          }
        };
        if (selectNode instanceof Array) {
          selectNode.forEach(function(child) {
            walk(data, child);
          });
        } else {
          walk(data, selectNode);
        }
      },
      setNodeActive(id, key) {
        this.$broadcast('setNodeActive', id, key);
      }
    },
    ready() {
      if (this.levelConfig && this.levelConfig.lazy !== undefined) {
        var loadFn = this.levelConfig.load;
        if (!loadFn) return;
        loadFn(this, (callback) => {
          if (callback) {
            callback.call(this);
          }
        });
      }
    },

    props: {
      data: {
      },
      levelConfig: {},
      lazyRender: {
        type: Boolean,
        default: true
      },
      showCheckbox: {
        type: Boolean,
        default: true
      },
      clickNode: {
        type: Function,
        default() {
          return function() {};
        }
      },
      dblclickNode: {
        type: Function,
        default() {
          return function() {};
        }
      },
      selected: {}
    }
  };
</script>
