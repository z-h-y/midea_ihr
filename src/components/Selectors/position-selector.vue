<style lang="less">

@import "style/select-common.less";

</style>

<template lang="html">

<ui-modal ref="posselect" class="position-select select-common" type="large" :title="$t('selectors.selectPosition')" body="" :backdrop-dismissible="false">
    <div class="tree-panel fix">
        <div class="treelist">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail">
            <div class="search-ctx">
                <div class="search-pos">
                    <span class="search-bg">
               <input @keydown="goSearch($event)" class="search-input" :placeholder="$t('button.search')" type="text" v-model="searchTxt" />
               <span @click="search" class="search-btn"><i class="fa fa-search"></i></span>
                    </span>
                </div>
            </div>
            <div class="vuetable-wrapper">
                <vuetable ref="vuetable" :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
    <div slot="footer">
        <ui-button @click="confirmSelect" color="primary">{{$t('button.confirm')}}</ui-button>
        <ui-button @click="close">{{$t('button.cancel')}}</ui-button>
    </div>
</ui-modal>

</template>

<script type="text/ecmascript-6">

import {
    default as Message
}
from '../../components/basic/message';
import {
    getDictMapping
}
from '../../util/assist.js';
export default {
    props: {
        show: {},
        handleComfirmed: {
            type: Function,
            default () {
                return function() {};
            }
        }
    },
    data() {
        let _self = this;
        return {
            searchTxt: '',
            selData: {},
            selectedRow: [],
            tableUrl: '',
            dist: {
                MIB_RANK: {}
            },
            tableColumns: [{
                name: '__radio:',
                title: ''
            }, {
                name: 'positionName',
                title: this.$t('position.label.positionName'),
                sortField: 'positionName'
                    // callback: 'posName'
            }, {
                name: 'standardJobName',
                title: this.$t('position.columns.pSetRestrictToTitle'),
                sortField: 'standardJobName'
            }, {
                name: 'mibGrade',
                title: this.$t('position.columns.groupMIBGrade'),
                sortField: 'mibGrade',
                callback: function(value) {
                    return _self.fixMIBType(value);
                }
            }],
            regions: [],
            levelConfig: {
                labelProperty: 'orgShortName',
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'orgShortName',
                    load: function(node, callback) {
                        var data;
                        if (node.data.isParent) {
                            let parentId = node.data.orgId;
                            _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                                node.children = response.data;
                                if (callback) {
                                    callback();
                                }

                            }, (response) => {
                                console.log('错误信息 ：' + response.statusText);
                            });
                        } else {
                            node.children = [];
                        }
                    }
                }
            },
            showCheckbox: false,
            orgGroup: {},
            clickNode: function(node) {
                let positionId = _self.$route.params.positionId || '0';
                _self.tableUrl = `/pos/positions/${node.orgId}/getPositionsByUnitIdNoSubList/${positionId}`;
                _self.orgGroup = node;
            }
        }
    },
    watch: {
        'show.modal': function(newVal) {
            if (newVal === true && this.regions.length < 1) {
                this.getTreeData();
            }
        }
    },
    computed: {
        tableData() {
            return this.$refs.vuetable.tableData
        }
    },

    methods: {
        open() {
                this.$refs['posselect'].open();
                if (this.regions.length < 1) {
                    this.getTreeData();
                }
            },
            close() {
                this.$refs['posselect'].close()
            },
            getTreeData() {
                var self = this;
                if (Object.keys(this.dist.MIB_RANK).length < 1) {
                    getDictMapping('MIB_RANK').then(function(res) {
                        self.dist.MIB_RANK = res;
                    });
                }
                this.$http.get('/org/orgs/parent').then((response) => {
                    this.regions = response.data;
                }, (response) => {
                    Message({
                        type: 'error',
                        message: response.statusText
                    });
                });
            },
            fixDist(value, option) {
                var dist = {};
                switch (option) {
                    case 'MIB_RANK':
                        dist = this.dist.MIB_RANK || {};
                        break;
                }
                for (let key of Object.keys(dist)) {
                    if (dist[key] === value) {
                        value = key;
                        break;
                    }
                }
                return value;
            },
            fixMIBType(value) {
                return this.fixDist(value, 'MIB_RANK');
            },
            confirmSelect() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows < 1) {
                    Message({
                        type: 'error',
                        message: this.$t('selectors.selectEmployee')
                    });
                    return false;
                }
                if (rows.length === 1) {
                    _self.close();
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.$emit('selected-position',_self.selData, _self.orgGroup);
                            _self.$refs['posselect'].close()
                        }
                    })
                } 
            },
            search() {
                if (this.orgGroup.orgId === undefined || this.orgGroup.orgId === null) {
                    this.orgGroup.orgId = 1;
                }
                let unitId = this.orgGroup.orgId;
                let positionId = this.$route.params.id || '0';
                let positionName = this.searchTxt;
                this.tableUrl = `/pos/positions/${unitId}/getPositionsByUnitIdNoSubList/${positionId}?positionName=${positionName}`;
            },
            goSearch(event) {
                if (event.keyCode === 13) {
                    this.search();
                }
            }
    },
    components: {
        Tree: require('../tree/tree.vue')
    }
}

</script>
