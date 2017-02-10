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

<ui-modal id="select-organization " :show.sync="show.modal" transition="ui-modal-fade" header="Select Organization">
    <div class="select-cnt">
        <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="loadNodeDetail" :dblclick-node="dblclickNode"></tree>
    </div>
    <div slot="footer">
        <ui-button color="primary" @click="handleSave">Confirm</ui-button>
        <ui-button @click="show.modal = false">Cancel</ui-button>
    </div>
</ui-modal>

</template>

<script >

export default {
    props: {
        show: {
            type: Object,
            default: {}
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        disableValue: {
            type: Array,
            default () {
                return [];
            }
        },
        selectedNode: {},
        historyDate: '',
    },
    data() {
        let _self = this;
        return {
            unitId: '1',
            trees: {},
            searchId: '',
            currentNode: -1, //organization trees root node
            levelConfig: {
                labelProperty: 'fullUnitName',  //树节点显示的名称
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'shortName',
                    load: function(node, callback) {
                        let parentId = node.data.unitId; //父节点ID
                        let url = `/org/historyorgs/${parentId}/children`;
                        _self.$http.get(url,{params:{queryDate:_self.historyDate}}).then((response) => {
                            var data = response.data;
                            let shortName = '';   //子组织的智短名称
                            let shortNameArr = [];
                            //
                            data.forEach(function(item) { //获取子组织节点的名称
                                for (var i = 0, len = data.length; i < len; i++) {
                                    shortNameArr = item.fullUnitName.split('_');
                                    shortName = shortNameArr.splice(-1,1); //获取子组织节点的名称
                                    item.shortName = shortName

                                }
                            })

                            node.children = data;
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    }
                }
            }
        };
    },
    computed: {
        showCheckbox() {
            return false;
        }
    },
    created() {
        this.initLoadTree();
    },

    methods: {
            /*** save to selected node. */
            loadNodeDetail(node) {
                    this.selectedNode = node;
                },

            initLoadTree() {
                const currentNode = 0;  //请求默认根节点
                let date = this.historyDate;  //从父组件上获取请求有效日期
                let url = `/org/historyorgs/${currentNode}/children`;
                //TODO Initialize root node
                this.$http.get(url,{params:{queryDate:date}}).then((response) => {
                    var data = response.data;
                    this.trees = data;
                });
            },


            handleSave() {
                this.show.modal = false;
                this.$dispatch('getSearchId', this.selectedNode);
            },
            dblclickNode() {
                this.handleSave();
            }

    },
    events: {
        'reloadTree': function() {
            this.initLoadTree();
        }
    },
    components: {
      Tree: require('../tree/tree.vue')
    }
};

</script>
