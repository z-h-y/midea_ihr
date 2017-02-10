<style lang="less">

.position-select {
    * {
        box-sizing: border-box;
    }
    .vuetable th{
        padding: 6px 10px;
    }
    .ui-modal-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .tree-panel {
        height: 383px;
    }
    .treelist {
        height: 380px;
    }
    .ui-modal-wrapper .ui-modal-container{
        height: 505px;
    }
    .vuetable-pagination {
        margin-top: 32px;
        padding-right: 0px;
    }
    .vuetable-wrapper {
        width: auto;
        height: 329px;
        overflow: auto;
    }
    .help-desk{
      height:auto;
    }
    .treelist {
        overflow-x: auto;
    }
    .search-ctx {
        position: relative;
        height: 48px;
    }
    .search-pos {
        position: absolute;
        right: 16px;
        top: 8px;
    }
    .search-pos .search-bg {
        display: inline-block;
        border: 1px solid #e8e8e8;
        height: 100%;
        background: #fff;
        padding: 2px 16px 2px 10px;
        border-radius: 16px;
    }
    .search-pos .search-input {
        border: none;
        background: transparent;
        width: 202px;
        height: 26px;
        line-height: 26px;
    }
    .search-pos .search-input::placeholder {
        color: #a5acbe;
        font-size: 12px;
    }
    .search-pos .search-input:focus {
        outline: none;
        border: none;
    }
    .search-btn {
        cursor: pointer;
    }
    .treelist-detail {
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
    }
    .vuetable-area {
        margin-bottom: 0px;
        padding-bottom: 0px;
    }
}

</style>

<template lang="html">

<ui-modal class="position-select" :show.sync="show.modal" type="large" header="Select Position" body="" :backdrop-dismissible="false">
    <div class="tree-panel fix">
        <div class="treelist">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail">
            <div class="search-ctx">
                <div class="search-pos">
                    <span class="search-bg">
               <input @keydown="goSearch($event)" class="search-input" placeholder="Search" type="text" v-model="searchTxt" />
               <span @click="search" class="search-btn"><i class="fa fa-search"></i></span>
                    </span>
                </div>
            </div>
            <div class="vuetable-wrapper">
                <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
    <div slot="footer">
        <ui-button @click="yes" color="primary">Confirm</ui-button>
        <ui-button @click="show.modal = false">Cancel</ui-button>
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
            tableData: [],
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
                title: 'Position Name',
                sortField: 'positionName'
                    // callback: 'posName'
            }, {
                name: 'standardJobName',
                title: 'Restrict To Title',
                sortField: 'standardJobName'
            }, {
                name: 'mibGrade',
                title: 'MIB Grade',
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

    },
    ready() {
    },
    created() {
    },
    methods: {
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
            yes() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.show.modal = false;
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.handleComfirmed(_self.selData, _self.orgGroup);
                            _self.$dispatch('selected-position', _self.selData)
                        }
                    })
                } else {
                    Message({
                        type: 'error',
                        message: 'Please select a valid node.'
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
    events: {
        'vuetable:load-success': function(response) {
            this.tableData = response.data.data;
        }
    },
    components: {
      Tree: require('../tree/tree.vue')
    }
}

</script>
