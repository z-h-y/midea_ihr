<style lang="less">

.position-select {

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
                <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" per-page="5">
                </vuetable>
            </div>
        </div>
    </div>
    <!-- <div class="bottom-panel">
        <span class="all-selected-person" v-for="item in allSelectedPer" track-by="$index">
        {{item.employeeName}}
        <i class="rm-btn fa fa-times" aria-hidden="true" @click="delPer($index)"></i>
      </span>
    </div> -->
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
                let unitId = node.orgId;
                let positionId = _self.$route.params.positionId || '0';
                _self.tableUrl = `/pos/positions/${unitId}/getPositionsByUnitId/${positionId}`;
                _self.orgGroup = node;
            }
        }
    },
    computed: {

    },
    ready() {
        this.$http.get(`/employee/employees/profile`).then((response) => {
            if (response.data) {
              let positionId = this.$route.params.positionId || '0';
              this.tableUrl = `/pos/positions/${response.data.defunitId}/getPositionsByUnitId/${positionId}`;
            }
        });
        this.$http.get('/org/orgs/0/children').then((response) => {
            this.regions = response.data;
        }, (response) => {
            Message({
                type: 'error',
                message: response.statusText
            });
        });
    },
    created() {
        var self = this;
        getDictMapping('MIB_RANK').then(function(res) {
            self.dist.MIB_RANK = res;
        });
    },
    methods: {
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
                            _self.$dispatch('selected-positiondotted', _self.selData)
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
