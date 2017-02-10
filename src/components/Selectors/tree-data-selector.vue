<style lang="css">

.select-cnt {
    animation: all .38s ease;
    height: 373px;
    box-sizing: content-box;
    overflow-y: auto;
    overflow-x: hidden;
}

</style>

<template lang="html">

<ui-modal :show.sync="show.modal" transition="ui-modal-fade" :header="headText">
	  <div class="select-cnt">
    <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="loadNodeDetail" :dblclick-node="dblclickNode"></tree>
	  </div>
		<div slot="footer">
        <ui-button color="primary" @click="handleSave">Confirm</ui-button>
        <ui-button @click="show.modal = false">Cancel</ui-button>
    </div>
</ui-modal>

</template>

<script type="text/ecmascript6">

export default {
    props: {
        show: {
            type: Object,
            default: {}
        },
        headText: {
          type: String,
          default: 'Selector'
        },
        url: {
          required: true
        },
        treeData: {},
				labelName: {
					required: true
				},
				labelId: {
					required: true
				},
				handleComfirmed: {
					type: Function
				},
				selectedNode:{},
        selectedEl: {}
    },
    data() {
			 let _self = this;
        return {
            trees: [],
            currentNode: 0, //organization trees root node
            levelConfig: {
                labelProperty: _self.labelName,
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: _self.labelName,
                    load: function(node, callback) {
                        let parentId = node.data[_self.labelId];
                        _self.$http.get(_self.url[0] + parentId + _self.url[1]).then((response) => {
                            node.children = response.data;
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    }
                }
            }
        };
    },
    watch: {
      'show.modal': function(newVal) {
        if (newVal === true && this.trees.length < 1) {
          this.getTreeData();
        }
      }
    },
		computed:{
			showCheckbox() {
				return false;
			}
		},
    created() {},
    methods: {
      getTreeData() {
        const currentNode = this.currentNode;
				var url = this.url.split('${}');
				this.url = url;
        //TODO Initialize root node
        if (this.treeData) {
          this.trees = this.treeData;
          return;
        }
        this.$http.get(url[0] + currentNode + url[1]).then((response) => {
            this.trees = Object.prototype.toString.call(response.data) === '[object Array]' ? response.data: [response.data];
        });
      },
        /**
         * On the node to Click get the detail
         */

        loadNodeDetail(node, el) {
          this.selectedEl = el;
					this.selectedNode = node;
				},

				/**
				  * save to selected node.
					*/
				handleSave(){
					this.handleComfirmed(this.selectedNode, this.selectedEl);
					this.show.modal = false;
				},
        dblclickNode() {
            this.handleSave();
        }

    },
    components: {
      Tree: require('../tree/tree.vue')
    }
};

</script>
