<style lang="less">

.title-select {
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
    .ui-modal-wrapper .ui-modal-container {
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
    .help-desk {
        height: auto;
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

<ui-modal class="title-select" :show.sync="show.modal" type="large" header="Select Title" body="" :backdrop-dismissible="false">
    <div class="tree-panel fix">
        <div class="treelist p10">
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
                <vuetable :api-url="selectedTableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="titlesColumns" per-page="10" load-on-start="false">
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
            jobGroup: {},
            selData: {},
            tableData: [],
            regions: [],
            selectedRow: [],
            titlesColumns: [{
                name: '__radio:',
                title: ''
            }, {
                name: 'standardJobName',
                title: 'Title Name',
                sortField: 'standardJobName'
            }, {
                name: 'standardJobCode',
                title: 'Title ID',
                dataClass: 'tr',
                sortField: 'standardJobCode'
            }, {
                name: 'mibGrade',
                title: 'MIB Grade',
                sortField: 'mibGrade'
            }],
            levelConfig: {
                labelProperty: 'jobFamilyName',
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'jobFamilyName',
                    load: function(node, callback) {
                        var data;
                        if (node.data.isParent === 'true') {
                            let parentId = node.data.jobFamilyId;
                            _self.$http.get(`/pos/jobFamilys/${parentId}/children`).then((response) => {
                                node.children = response.data;
                                if (callback) {
                                    callback();
                                }

                            }, (response) => {
                                Message({
                                    type: 'error',
                                    message: response.statusText
                                });
                            });
                        } else {
                            node.children = [];
                        }
                    }
                }
            },
            showCheckbox: false,
            // 弹框选择器表格接口
            selectedTableUrl: '',
            clickNode: function(node) {
                _self.selectedTableUrl = `/pos/standardJobs?jobFamilyId=${node.jobFamilyId}&standardJobName=${_self.searchTxt}`;
                _self.jobGroup = node;
            }
        }
    },
    watch: {
      'show.modal': function(newVal) {
        if (newVal === true) {
          this.getTreeData();
          this.$broadcast("vuetable:refresh");
        }
      }
    },
    // ready() {
    //     this.$http.get('/pos/jobFamilys/0/children', {}, {}).then((response) => {
    //         let Items = [];
    //         Items.push(response.data);
    //         this.regions = Items;
    //         this.selectedTableUrl = `/pos/standardJobs?jobFamilyId=${response.data.jobFamilyId}`;
    //     }, (response) => {
    //         Message({
    //             type: 'error',
    //             message: response.statusText
    //         });
    //     });
    //
    // },
    methods: {
        getTreeData() {
          this.$http.get('/pos/jobFamilys/0/children', {}, {}).then((response) => {
              let Items = [];
              Items.push(response.data);
              this.regions = Items;
              this.selectedTableUrl = `/pos/standardJobs?jobFamilyId=${response.data.jobFamilyId}`;
          }, (response) => {
              Message({
                  type: 'error',
                  message: response.statusText
              });
          });
        },
        yes() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.show.modal = false;
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.handleComfirmed(_self.selData, _self.jobGroup);
                            _self.$dispatch('titleselector', _self.selData, _self.jobGroup)
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
                if (this.jobGroup.jobFamilyId === undefined || this.jobGroup.jobFamilyId === null) {
                    this.jobGroup.jobFamilyId = 1;
                }
                let jobFamilyId = this.jobGroup.jobFamilyId;
                let standardJobName = this.searchTxt;
                this.selectedTableUrl = `/pos/standardJobs?standardJobName=${standardJobName}&jobFamilyId=${jobFamilyId}`;
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
