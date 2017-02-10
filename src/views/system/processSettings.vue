<style lang="less">

.ihr-system-processSettings {
    * {
        box-sizing: border-box;
    }
    .group{
      border: none;
    }
}

</style>

<template lang="html">

<ui-confirm header="Delete" @confirmed="delete" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
    Do you want to delete this Template? May prevent the system from running!
</ui-confirm>
<div class="content-wrap bg-w ihr-system-processSettings">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="beforeDel" button-type="button"></ui-button>
        <ui-button class="dis-tc-t btn-default-bd" type="flat" show-menu-icons has-dropdown-menu :menu-options="shareMenuOptions" button-type="button" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" text="More"></ui-button>
    </div>
    <div class="pl16 pr16 pb16">
        <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    getDictMapping,
    formatDate
}
from '../../util/assist';
let dropdownOptions = [{
    id: 'copy',
    text: 'Copy',
    icon: 'edit',
}, {
    id: 'activate',
    text: 'Active',
    icon: 'activate',
}, {
    id: 'inactive',
    text: 'Inactive',
    icon: 'inactive',
}];
export default {
    data() {
            let _self = this;
            return {
                tableUrl: '/process/template/list',
                showdel: false,
                selectedRow: [],
                tableColumns: [{
                        name: '__checkbox:processTemplateId',
                        title: ''
                    }, {
                        name: 'processTemplateName',
                        title: 'Template Name',
                        sortField: 'processTemplateName',
                        callback: function(name, value) {
                            return `<a href="${location.href}/view/${value.processTemplateId}">${name}</a>`;
                        }
                    },
                    {
                        name: 'createDate',
                        title: 'Create Date',
                        dataClass: 'tr',
                        titleClass: 'mw80',
                        sortField: 'createDate',
                        callback: function(value) {
                            return _self.handleFormatDate(value);
                        }
                    }, {
                        name: 'activeStatus',
                        title: 'Status',
                        sortField: 'activeStatus',
                        callback: function(value) {
                            return _self.fixActiveStatus(value);
                        }
                    }
                ],
                shareMenuOptions: dropdownOptions,
                dist: {
                    ACTIVESTATUS: {}
                }
            };
        },
        computed: {},
        created() {
            var self = this;
            getDictMapping('PROCESS_ACTIVE_STATUS').then(function(res) {
                self.dist.ACTIVESTATUS = res;
            });
        },
        ready() {},
        attached() {},
        methods: {
            canme() {

                },
                handleFormatDate(value) {
                    return formatDate(new Date(value));
                },
                fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'activeStatus':
                            dist = this.dist.ACTIVESTATUS || {};
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
                fixActiveStatus(value) {
                    return this.fixDist(value, 'activeStatus');
                },
                add() {
                    let _self = this;
                    _self.$router.go({
                        name: 'addProcessSettings'
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$http.post(`/process/template/${rows[0]}/checkProcessTemplateUsed`, {
                            processTemplateIds: rows,
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (!response.data) {
                                _self.$router.go({
                                    name: 'editProcessSettings',
                                    params: {
                                        ptid: `${rows[0]}`
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: 'template already in use!'
                                });
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                beforeDel: function() {
                    this.showdel = true;
                },
                delete() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post(`/process/template/delete`, {
                        processTemplateIds: rows,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                        Message({
                            type: 'success',
                            message: 'Delete Success!'
                        });
                    });
                },
                menuOptionSelected(option) {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        if (option.id === 'copy') {
                            _self.$http.post(`/process/template/${rows[0]}/copy`, {
                                processTemplateId: rows[0],
                            }, {
                                emulateJSON: true
                            }).then((response) => {
                                this.$broadcast('vuetable:refresh'); //刷新表格
                                Message({
                                    type: 'success',
                                    message: 'Copy Success!'
                                });
                            });
                        }
                        if (option.id === 'activate') {
                            _self.$http.post(`/process/template/${rows[0]}/activate`, {
                                processTemplateId: rows[0],
                                activeStatus: '1'
                            }, {
                                emulateJSON: true
                            }).then((response) => {
                                this.$broadcast('vuetable:refresh'); //刷新表格
                                Message({
                                    type: 'success',
                                    message: 'Activate Success!'
                                });
                            });
                        }
                        if (option.id === 'inactive') {
                            _self.$http.post(`/process/template/${rows[0]}/activate`, {
                                processTemplateId: rows[0],
                                activeStatus: '0'
                            }, {
                                emulateJSON: true
                            }).then((response) => {
                                this.$broadcast('vuetable:refresh'); //刷新表格
                                Message({
                                    type: 'success',
                                    message: 'Failure Success!'
                                });
                            });
                        }
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }

                }
        },
        components: {}
};

</script>
