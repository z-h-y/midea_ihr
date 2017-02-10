<style lang="less">

.ihr-staff-searchModel {
    *{
      box-sizing: border-box;
    }
    font-size: 14px;
    .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
    }

    .group {
        margin: 16px;
        padding-top: 16px;
        border-top: 1px solid #ecedee;
    }
    .searchModel-form {
        height: 46px;
        margin: 0 40px;
    }
    .searchModel-form.expended {
        height: 92px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-searchModel">
    <div class="mb16 pt16">
        <div class="search-area">
            <v-form :model="searchModel" :schema="searchSchema" label-width="170" label-suffix="" :cols="3" form-style="searchModel-form">
                <select-field property='areaId' editor-width="150"></select-field>
                <select-field property='status' editor-width="150"></select-field>
            </v-form>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">Search</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" @click="reset" type="flat">Reset</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add"></ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit"></ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="delete"></ui-button>
            <ui-button class="dis-tc-t btn-default-bd" type="flat" show-menu-icons has-dropdown-menu :menu-options="shareMenuOptions" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" text="More"></ui-button>
        </div>
        <ui-tabs class="pl16 pr16" type="text">
            <ui-tab header="Employee Template">
                <div class="vuetable-wrapper">
                    <vuetable :append-params="queryParams1" api-url="/area/template/getAreaTemplateList" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
            <ui-tab header="Intern Template">
                <div class="vuetable-wrapper">
                    <vuetable :append-params="queryParams2" api-url="/area/template/getAreaTemplateList" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
            <ui-tab header="Outsource Template">
                <div class="vuetable-wrapper">
                    <vuetable :append-params="queryParams3" api-url="/area/template/getAreaTemplateList" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
        </ui-tabs>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

import {
    default as Schema
}
from '../../../schema/index';

import {
    default as Message
}
from '../../../components/basic/message';
import {
    convert, getDictMapping, formatDate
}
from '../../../util/assist.js';


let searchSchema = new Schema({
    employementCategory: {
        label: 'Category',
        whitespace: false,
        required: false,
        mapping: function() {
            return getDictMapping('EMPLOYEE_CATEGORY');
        },
        multiSelect: false
    },
    areaId: {
        label: 'Restrict to Country',
        whitespace: false,
        required: false,
        mapping: function() {
            return Vue.http.get('/org/area/0/child').then((response) => {
                if (response.data) {
                    let result = {},
                        datas = response.data;
                    for (var i = 0, l = datas.length; i < l; i++) {
                        result[datas[i].areaName] = datas[i].areaId;
                    }
                    return result;
                }
            });
        },
        multiSelect: false
    },
    status: {
        label: 'Status',
        whitespace: false,
        required: false,
        mapping: function() {
            return getDictMapping('COUNTRY_TEMPLATE_STATUS');
        },
        multiSelect: false
    }
});

export default {
    data() {
            let _self = this;
            return {
                moreParams: [],
                selectedRow: [],
                searchSchema: searchSchema,
                searchModel: searchSchema.newModel(),
                columns: [{
                    name: '__checkbox:areaTemplateId',
                    title: ''
                }, {
                    name: 'areaTemplateName',
                    title: 'Template Name',
                    callback: function(value, data) {
                        return _self.goDetail(value, data);
                    }
                }, {
                    name: 'areaName',
                    title: 'Restrict to Country'
                }, {
                    name: 'status',
                    title: 'Status',
                    callback: function(value) {
                        return _self.fixSTATUS(value);
                    }
                }, {
                    name: 'employementCategory',
                    title: 'Category',
                    callback: function(value) {
                        return _self.fixCategory(value);
                    }
                }],
                shareMenuOptions: [{
                    id: 'active',
                    text: 'Active'
                }, {
                    id: 'invalid',
                    text: 'Invalid'
                }],
                dist: {
                    COUNTRY_TEMPLATE_STATUS: {},
                    EMPLOYEE_CATEGORY: {}
                }
            }
        },
        computed: {
            queryParams1() {
                let employementCategory = '9';
                let areaId = this.searchModel.areaId || "";
                let status = this.searchModel.status || "";

                return [
                    `employementCategory=${employementCategory}`,
                    `areaId=${areaId}`,
                    `status=${status}`
                ]
            },
            queryParams2() {
                let employementCategory = '7';
                let areaId = this.searchModel.areaId || "";
                let status = this.searchModel.status || "";

                return [
                    `employementCategory=${employementCategory}`,
                    `areaId=${areaId}`,
                    `status=${status}`
                ]
            },
            queryParams3() {
                let employementCategory = '6';
                let areaId = this.searchModel.areaId || "";
                let status = this.searchModel.status || "";

                return [
                    `employementCategory=${employementCategory}`,
                    `areaId=${areaId}`,
                    `status=${status}`
                ]
            }
        },
        attached() {},
        created() {
            var self = this;
            getDictMapping('COUNTRY_TEMPLATE_STATUS').then(function(res) {
                self.dist.COUNTRY_TEMPLATE_STATUS = res;
            });
            getDictMapping('EMPLOYEE_CATEGORY').then(function(res) {
                self.dist.EMPLOYEE_CATEGORY = res;
            });
        },
        methods: {
            goDetail(value, data) {
                    return `<a href="/#!/ihr/setting/staffAreaTemplate/templateType/view/${data.areaTemplateId}">${value}</a>`;
                },
                fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'COUNTRY_TEMPLATE_STATUS':
                            dist = this.dist.COUNTRY_TEMPLATE_STATUS || {};
                            break;
                        case 'EMPLOYEE_CATEGORY':
                            dist = this.dist.EMPLOYEE_CATEGORY || {};
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
                fixSTATUS(value) {
                    return this.fixDist(value, 'COUNTRY_TEMPLATE_STATUS');
                },
                fixCategory(value) {
                    return this.fixDist(value, 'EMPLOYEE_CATEGORY');
                },
                menuOptionSelected(option) {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length > 0) {

                        switch (option.id) {
                            case 'active':
                                this.setActive();
                                break;
                            case 'invalid':
                                this.setInvalid();
                                break;
                        }

                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                search() {
                    this.$broadcast('vuetable:refresh');
                },
                reset() {
                    this.searchModel.reset();
                },
                add() {
                    this.$route.router.go({
                        name: 'addAreaTemplate'
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editAreaTemplate',
                            params: {
                                areaTemplateId: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                delete() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length > 0) {
                        _self.$http.post(`/area/template/deleteAreaTemplate`, {
                            ids: rows,
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.$broadcast('vuetable:refresh'); //刷新表格
                            Message({
                                type: 'success',
                                message: 'Delete Success!'
                            });
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                setActive() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post(`/area/template/activeAreaTemplate`, {
                        ids: rows,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                        Message({
                            type: 'success',
                            message: 'Active Success!'
                        });
                    });
                },
                setInvalid() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post(`/area/template/invalidAreaTemplate`, {
                        ids: rows,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                        Message({
                            type: 'success',
                            message: 'Invalid Success!'
                        });
                    });
                }
        },
        events: {
            // 'active-tab-changed': function(tabId) {
            //     switch (tabId) {
            //
            //
            //     }
            // }
        },
        components: {}
}

</script>
