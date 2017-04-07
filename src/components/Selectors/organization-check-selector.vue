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

<ui-modal ref="modal" id="select-organization " :show.sync="show.modal" transition="ui-modal-fade" :title="$t('selectors.selectOrganization')">
    <div class="select-cnt">
        <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="loadNodeDetail" :dblclick-node="dblclickNode"></tree>
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
        handleComfirmed: {
					type: Function,
          default() {
            return function() {};
          }
				}
    },
    data() {
        let _self = this;
        return {
            unitId: '1',
            trees: [],
            currentNode: 0, //organization trees root node
            showCheckbox: true, //树隐藏多选框
            levelConfig: {
                labelProperty: 'orgShortName',
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'orgShortName',
                    load: function(node, callback) {
                        let parentId = node.data.orgId;
                        _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                            var data = response.data;
                            var disableValue = _self.disableValue;
                            if (disableValue && disableValue.length > 0) {
                                disableValue.forEach(function(item) {
                                    for (var i = 0, len = data.length; i < len; i++) {
                                        if (data[i].orgId === item || data[i].orgId === Number(item)) {
                                            data.splice(i, 1);
                                            break;
                                        }
                                    }
                                })
                            }
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
    watch: {
        'show.modal': function(newVal) {
            if (newVal === true && this.trees.length < 1) {
                this.getTreeData();
            }
        }
    },
    computed: {

    },
    created() {},
    methods: {
      open() {
          this.$refs['modal'].open();
        },
        close() {
          this.$refs['modal'].close()
        },
        getTreeData() {
                const currentNode = this.currentNode;
                let url = `/org/orgs/parent`;
                if (this.isAdmin) {
                    url = `/org/orgs/${currentNode}/children`;
                }
                //TODO Initialize root node
                this.$http.get(url).then((response) => {
                    var data = response.data;
                    var disableValue = this.disableValue;
                    if (disableValue && disableValue.length > 0) {
                        disableValue.forEach(function(item) {
                            for (var i = 0, len = data.length; i < len; i++) {
                                if (data[i].orgId === item || data[i].orgId === Number(item)) {
                                    data.splice(i, 1);
                                    break;
                                }
                            }
                        })
                    }
                    this.trees = data;
                });
            },
            /**
             * On the node to Click get the detail
             */

            loadNodeDetail(node) {
                this.selectedNode = node;
            },

            /**
             * save to selected node.
             */
            handleSave() {
                this.close();
                this.handleComfirmed(this.$refs.tree.getCheckedNodes());
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
