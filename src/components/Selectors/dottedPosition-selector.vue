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
                <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" per-page="5">
                </vuetable>
            </div>
        </div>
    </div>
    <div slot="footer">
        <ui-button @click="yes" color="primary">{{$t('button.confirm')}}</ui-button>
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
                let unitId = node.orgId;
                let positionId = _self.$route.params.positionId || '0';
                _self.tableUrl = `/pos/positions/${unitId}/getPositionsByUnitId/${positionId}`;
                _self.orgGroup = node;
            }
        }
    },

    created() {
        var _self = this;
        getDictMapping('MIB_RANK').then(function(res) {
            _self.dist.MIB_RANK = res;
        });

        _self.$http.get(`/employee/employees/profile`).then((response) => {
            if (response.data) {
                let positionId = _self.$route.params.positionId || '0';
                _self.tableUrl = `/pos/positions/${response.data.defunitId}/getPositionsByUnitId/${positionId}`;
            }
        });
        _self.$http.get('/org/orgs/0/children').then((response) => {
            _self.regions = response.data;
        }, (response) => {
            Message({
                type: 'error',
                message: response.statusText
            });
        });
    },
    methods: {
        open() {
                this.$refs['posselect'].open();
            },
            close() {
                this.$refs['posselect'].close()
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
                            _self.$refs['posselect'].close()
                        }
                    })
                } else {
                    Message({
                        type: 'error',
                        message: 'this.$t("performance.message.reportManage")'
                    })
                }
            },
            search() {
                if (this.orgGroup.orgId === undefined || this.orgGroup.orgId === null) {
                    this.orgGroup.orgId = 1;
                }
                let unitId = this.orgGroup.orgId;
                let positionName = this.searchTxt;
                let positionId = this.$route.params.id || '0';
                this.tableUrl = `/pos/positions/${unitId}/getPositionsByUnitId/${positionId}?positionName=${positionName}`;
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
