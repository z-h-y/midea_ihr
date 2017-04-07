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
    <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="loadNodeDetail"></tree>
	  </div>
		<div slot="footer">
        <ui-button color="primary" @click="handleSave">{{$t('button.confirm')}}</ui-button>
        <ui-button @click="close">{{$t('button.cancel')}}</ui-button>
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
          default: 'Nation Selector'
        },
				handleComfirmed: {
					type: Function,
          default() {
            return function(){};
          }
				},
				selectedNode:{},
        selectedEl: {}
    },
    data() {
			 let _self = this;
        return {
            trees: {},
            currentNode: 0, //organization trees root node
            levelConfig: {
                labelProperty: 'areaName',
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'nationalityName',
                    load: function(node, callback) {
                        let parentId = node.data['areaId'] || node.data['nationalityId'];
                        _self.$http.get(`/employee/employees/${parentId}/children`).then((response) => {
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
		computed:{
			showCheckbox() {
				return false;
			}
		},
    created() {
        const currentNode = this.currentNode;
        //TODO Initialize root node
        this.$http.get('/employee/employees/nationalitys/root').then((response) => {
            this.trees = Object.prototype.toString.call(response.data) === '[object Array]' ? response.data: [response.data];
        });
    },
    mounted() {
      this.$refs.tree.$hasLoad = true;
    },
    methods: {
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
					this.close();
				}

    },
    components: {
      Tree: require('../tree/tree.vue')
    }
};

</script>
