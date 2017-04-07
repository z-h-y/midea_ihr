<style lang="less">

@import "style/select-common.less";

</style>

<template lang="html">

<ui-modal ref="posselect" class="title-select select-common" type="large" :title="$t('selectors.selectTitle')" body="" :backdrop-dismissible="false">
    <div class="tree-panel fix">
        <div class="treelist p10">
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
                <vuetable :api-url="selectedTableUrl" :load-success-callback="tableSuccess" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="titlesColumns" per-page="10" load-on-start="false">
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
                title: this.$t('position.label.titleName'),
                sortField: 'standardJobName'
            }, {
                name: 'standardJobCode',
                title: this.$t('position.label.titleTitleID'),
                dataClass: 'tr',
                sortField: 'standardJobCode'
            }, {
                name: 'mibGrade',
                title: this.$t('position.label.mibGrade'),
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
    created() {
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
    methods: {
        open() {
                this.$refs['posselect'].open();
            },
            close() {
                this.$refs['posselect'].close()
            },
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
            tableSuccess(data) {
                this.tableData = data.data;
            },
            yes() {
                let _self = this;
                let rows = _self.selectedRow;
                _self.close();
                if (rows.length === 1) {
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.handleComfirmed(_self.selData, _self.jobGroup);
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
    components: {
        Tree: require('../tree/tree.vue')
    }
}

</script>
