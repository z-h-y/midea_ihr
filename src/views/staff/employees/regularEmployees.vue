<style lang="less">

.ihr-staff-emp-reg {
    font-size: 14px;
    .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
    }
    .vuetable-wrapper {
        padding: 0 16px 16px 16px;
    }
    .group {
        margin: 16px;
        padding-top: 16px;
        border-top: 1px solid #ecedee;
    }
    .regular-form {
        margin: 0 40px;
        height: 46px;
    }
    .regular-form.expended {
        height: 138px;
    }
    .content-line {
        display: inline-block;
        width: 20px;
        height: 2px;
        background-color: #ecedee;
    }
    #excelFile {
        display: none;
    }
    .loading-txt {
        font-weight: bold;
        font-size: 22px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-emp-reg">
    <div class="mb20 pt20">
        <organization-selector :show.sync="org"></organization-selector>
        <div class="search-area">
            <v-form :class="{expended: expended}" :model="regular" :schema="regularSchema" label-width="170" label-suffix="" :cols="3" form-style="regular-form">
                <text-field property='fullName' editor-width="150"></text-field>
                <text-field property="employeeCode" editor-width="150"></text-field>
                <text-field property="positionName" editor-width="150"></text-field>
                <text-field v-show="expended" type="selector" :readonly="true" :show.sync="org" property="orgUnitName" editor-width="150"></text-field>
                <select-field v-show="expended" property="contractType" :mapping="dist.employeeContract" editor-width="150"></select-field>
                <select-field v-show="expended" property="employeeStatus" :mapping="dist.searchStatus" editor-width="150"></select-field>
                <div v-show="expended" class='field cell-2-3'>
                    <label style="width:170px;">{{$t('staff.hireDate')}}</label>
                    <div class="field-content" style="margin-left:170px;">
                        <div class="">
                            <text-field property="hireDateStart" label-width="0" :hide-label="true" editor-width="150" style="width:154px;"></text-field>
                            <span class="content-line"></span>
                            <text-field property="hireDateEnd" label-width="0" :hide-label="true" editor-width="150"></text-field>
                        </div>
                    </div>
                </div>
                <select-field v-show="expended" property="contractLength" editor-width="150"></select-field>
            </v-form>
            <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="goAdd" color="primary" icon="fa-plus" :text="$t('button.add')" button-type="button"></ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="goEdit" icon="fa-pencil-square-o" type="flat" :text="$t('button.edit')" button-type="button"></ui-button>
            <ui-button class="dis-tc-t btn-default-bd" type="flat" @opened="openMenu" show-menu-icons has-dropdown-menu :menu-options="shareMenuOptions" icon="fa-caret-down" button-type="button" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" :text="$t('button.more')"></ui-button>
            <!-- <input id="excelFile" type="file" name="file" v-on:change="uploadExcel($event)"> -->
            <file-upload title="upload" id="excelFile" class="menu-option-upload file-upload" name="regularEmployeeFile" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" v-ref:upload :drop="files.drop"></file-upload>
        </div>
        <div class="vuetable-wrapper">
            <vuetable v-ref:vuetable :api-url="employeeUrl" :append-params="moreParams" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
            </vuetable>
        </div>

    </div>

    <ui-modal :show.sync="task.modal" header="Feedback" :body="taskShowText">
        <div slot="footer">
            <ui-button v-show=" importStatus == '2'" @click="downloadTaskFile" color="primary">Download feedback</ui-button>
            <ui-button @click="canDownloadTask">Close</ui-button>
        </div>
    </ui-modal>

    <ui-modal :show.sync="task.loading" header="">
        <div class="tc">
            <img src="../../../static/images/public/gears.gif" alt="">
            <div class="loading-txt">Data processing</div>
        </div>
        <div slot="footer"></div>
    </ui-modal>

</div>

</template>

<script>

import {
    default as Schema
}
from '../../../schema/index';
import {
    formatDate, getDictMapping, downloadFile, transformDict
}
from '../../../util/assist';
import {
    default as Message
}
from '../../../components/basic/message';


export default {
    data() {
            let regularSchema = new Schema({
                fullName: {
                    label: this.$t('staff.employeeName')
                },
                employeeCode: {
                    label: this.$t('staff.employeeId')
                },
                positionName: {
                    label: this.$t('staff.position')
                },
                orgUnitName: {
                    label: this.$t('staff.organization')
                },
                contractType: {
                    label: this.$t('staff.contractType')
                },
                employeeStatus: {
                    label: this.$t('staff.status')
                },
                hireDateStart: {
                    label: this.$t('staff.hireDate'),
                    type: 'date'
                },
                hireDateEnd: {
                    label: '',
                    type: 'date'
                },
                contractLength: {
                    label: this.$t('staff.lengthOfContract'),
                    mapping: function() {
                        return getDictMapping('CONTRACT_LENGTH');
                    }
                },
            });
            return {
                org: {
                    modal: false
                },
                task: {
                    modal: false,
                    loading: false,
                    close: false
                },
                importStatus: '-1',
                taskShowText: '',
                taskAttachmentId: '',
                selectedRow: [],
                regularSchema: regularSchema,
                regular: regularSchema.newModel(),
                moreParams: ['employementCategory=9'],
                moreParamsKeys: ['fullName', 'employeeCode', 'positionName', 'unitId', 'contractType', 'employeeStatus', 'hireDateStart', 'hireDateEnd', 'contractLength'],
                expendIcon: 'fa-angle-double-down',
                expended: false,
                employeeUrl: '/employee/employees/',
                dist: {
                    employeeContract: {},
                    employeeStatus: {},
                    searchStatus: {},
                    whetherType: {}
                },
                intervalID: null,
                files: {
                    //url: Vue.config.APIURL + '/employee/employees/importRegularEmployeeFile',
                    url: Vue.config.APIURL + '/employee/employees/uploadRegularEmployeeFile',
                    accept: '',
                    size: 1024 * 1024 * 2,
                    multiple: false,
                    extensions: '',
                    // extensions: ['gif','jpg','png'],
                    // extensions: /\.(gif|png|jpg)$/i,
                    files: [],
                    upload: {},
                    drop: true,
                    auto: true
                },
                columns: [{
                    name: '__checkbox:',
                    title: ''
                }, {
                    name: 'fullName',
                    title: this.$t('staff.name'),
                    callback: 'cName'
                }, {
                    name: 'loginId',
                    title: this.$t('staff.loginId')
                }, {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('staff.employeeId')
                }, {
                    name: 'positionName',
                    title: this.$t('staff.position')
                }, {
                    name: 'unitShortName',
                    title: this.$t('staff.organization')
                }, {
                    name: 'hireDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: this.$t('staff.hireDate'),
                    callback: 'format'
                }, {
                    name: 'contractType',
                    title: this.$t('staff.contractType'),
                    callback: 'fixContract'
                }, {
                    name: 'mibGrade',
                    title: this.$t('staff.mibGrade')
                }, {
                    name: 'isParttime',
                    title: this.$t('staff.partTimeRole'),
                    callback: 'isParttime'
                }, {
                    name: 'employeeStatus',
                    title: this.$t('staff.status'),
                    callback: 'fixStatus'
                }],
                shareMenuOptions: [{
                        id: 'transfer',
                        text: this.$t('staff.transferEmployee')
                    }, {
                        id: 'promote',
                        text: this.$t('staff.promoteEmployee')
                    },
                    // {
                    //     id: 'role',
                    //     text: this.$t('staff.interimPartTimeRole')
                    // },
                    {
                        id: 'overseas',
                        text: this.$t('staff.overseasPosting')
                    }, {
                        id: 'terminate',
                        text: this.$t('staff.terminateEmployement')
                    }, {
                        id: 'template',
                        text: this.$t('staff.downloadTemplate')
                    }, {
                        id: 'import',
                        text: this.$t('button.batchImport')
                    }, {
                        id: 'download',
                        text: this.$t('button.download')
                    }
                ]
            };
        },
        computed: {},
        created() {
            var self = this;
            let organizationId = this.$route.query.orgId;
            if (organizationId) {
                this.moreParams.push('unitId=' + organizationId);
            }
            let dictCodes = ['CONTRACT_TYPE', 'EMPLOYEE_STATUS', 'WHETHER_TYPE'];
            let obj = {
                dictCodes: dictCodes
            }

            this.$http.post('/public-access/dicts/items', {
                dictCodes
            }, {
                emulateJSON: true
            }).then((response) => {
                for (var d of response.data) {
                    if (d.dictName === 'CONTRACT_TYPE') {
                        self.dist.employeeContract = transformDict(d.dict);
                    }
                    if (d.dictName === 'EMPLOYEE_STATUS') {
                        self.dist.employeeStatus = transformDict(d.dict);
                    }
                    if (d.dictName === 'WHETHER_TYPE') {
                        self.dist.whetherType = transformDict(d.dict);
                    }
                }
            });
            this.$http.get('/employee/employees/dicts/EMPLOYEE_STATUS/items/2').then(function(res) {
                if (res.data) {
                    var data = {};
                    res.data.forEach(function(item) {
                        data[item.NAME] = item.VALUE;
                    })
                    this.dist.searchStatus = data;
                }
            })
        },
        ready() {
            this.checkTask();
        },
        attached() {},
        methods: {
            openMenu() {
                    var el = document.getElementById('excelFile');
                    el.style.display = "block";
                    document.getElementsByClassName('ui-menu-option')[5].appendChild(el);
                },
                // uploadExcel(e) {
                //   var srcElement__src = e.srcElement.files;
                //   var files = Array.prototype.slice.call(srcElement__src, 0);
                //   var formData = new FormData();
                //   files.forEach(function(file) {
                //       formData.append('file', file);
                //   });
                //   e.srcElement.value = '';
                //   this.$http.post('/employee/employees/importRegularEmployeeFile', formData).then(function(res) {
                //     if (res.body === 'true' || res.body === true) {
                //       Message({
                //           type: 'success',
                //           message: this.$t('staff.message.importSuccess')
                //       });
                //     } else {
                //       downloadFile('/system/attachment/downloadFile', {attachmentId: res.body});
                //       Message({
                //           type: 'error',
                //           message: this.$t('staff.message.importFail')
                //       });
                //     }
                //   });
                // },
                search() {
                    this.moreParams = ['employementCategory=9'];
                    for (let i = 0, len = this.moreParamsKeys.length; i < len; i++) {
                        let key = this.moreParamsKeys[i];
                        let value = this.regular[key];
                        if (value) {
                            if (value instanceof Date) {
                                value = formatDate(value);
                            }
                            this.moreParams.push(key + '=' + value);
                        }
                    }
                    this.$nextTick(function() {
                        this.$broadcast('vuetable:refresh')
                    })
                },
                reset() {
                    this.regular.reset();
                    this.regular.unitId = '';
                },
                goAdd() {
                    this.$route.router.go({
                        name: 'employeeAdd'
                    });
                },
                goEdit() {
                    var tableData = this.$refs.vuetable.tableData;
                    if (this.selectedRow.length === 1) {
                        this.$route.router.go({
                            name: 'regularEmployeesView',
                            params: {
                                employeeId: tableData[this.selectedRow[0]].employeeId
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: this.$t('staff.message.selectOnePerson')
                        });
                    }
                },
                menuOptionSelected(option) {
                    var tableData = this.$refs.vuetable.tableData;
                    switch (option.id) {
                        case 'transfer':
                            if (this.selectedRow.length === 1) {
                                this.$route.router.go({
                                    name: 'transferEmployee',
                                    params: {
                                        employeeId: tableData[this.selectedRow[0]].employeeId
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: this.$t('staff.message.selectOnePerson')
                                });
                            }
                            break;
                        case 'promote':
                            if (this.selectedRow.length === 1) {
                                this.$route.router.go({
                                    name: 'promoteEmployee',
                                    params: {
                                        employeeId: tableData[this.selectedRow[0]].employeeId
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: this.$t('staff.message.selectOnePerson')
                                });
                            }
                            break;
                            // case 'role':
                            //   if (this.selectedRow.length === 1) {
                            //     this.$route.router.go({ name: 'partTimeRole', params: { employeeId: tableData[this.selectedRow[0]].employeeId }});
                            //   } else {
                            //     Message({
                            //         type: 'error',
                            //         message: this.$t('staff.message.selectOnePerson')
                            //     });
                            //   }
                            //   break;
                        case 'overseas':
                            if (this.selectedRow.length === 1) {
                                this.$route.router.go({
                                    name: 'overseasPosting',
                                    params: {
                                        employeeId: tableData[this.selectedRow[0]].employeeId
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: this.$t('staff.message.selectOnePerson')
                                });
                            }
                            break;
                        case 'terminate':
                            if (this.selectedRow.length === 1) {
                                this.$route.router.go({
                                    name: 'empTerminate',
                                    params: {
                                        employeeId: tableData[this.selectedRow[0]].employeeId
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: this.$t('staff.message.selectOnePerson')
                                });
                            }
                            break;
                        case 'template':
                            this.downloadTemplate();
                            break;
                            // case 'import': document.getElementById('excelFile').click();break;
                        case 'download':
                            this.download();
                            break;
                    }
                },
                downloadTemplate() {
                    downloadFile('/employee/employees/dowloadRegularTemplate');
                },
                expendSearch() {
                    this.expended = !this.expended;
                    this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
                },
                cName(value, data) {
                    return `<a href="${location.href}/${data.employeeId}">${value}</a>`;
                },
                // 格式化时间
                format(value) {
                    if (!value) {
                        return ''
                    }
                    return formatDate(new Date(value));
                },
                // 匹配字典
                fixDist(value, option) {
                    var result = '';
                    var dist = {};
                    switch (option) {
                        case 'contract':
                            dist = this.dist.employeeContract;
                            break;
                        case 'status':
                            dist = this.dist.employeeStatus;
                            break;
                        case 'whetherType':
                            dist = this.dist.whetherType;
                            break;
                    }
                    for (let key of Object.keys(dist)) {
                        if (dist[key] === value) {
                            result = key;
                            break;
                        }
                    }
                    return result;
                },
                fixContract(value) {
                    return this.fixDist(value, 'contract');
                },
                fixStatus(value) {
                    return this.fixDist(value, 'status');
                },
                isParttime(value) {
                    return this.fixDist(value, 'whetherType');
                },
                download() {
                    this.$http.get('/employee/employees/countRegularEmpList?' + this.moreParams.join('&')).then(function(res) {
                        if (res.data.canDownload === 'false') {
                            Message({
                                type: 'error',
                                message: this.$t('staff.message.downloadLimit')
                            });
                        } else {
                            var regular = this.regular;
                            var data = {
                                employementCategory: 9
                            };
                            this.moreParamsKeys.forEach(function(item) {
                                var value = regular[item];
                                if (value || value === '0') {
                                    data[item] = value;
                                }
                            });
                            downloadFile('/employee/employees/exportRegularEmployees', data);
                        }
                    })
                },
                checkTask() {
                    let _self = this;
                    _self.$http.get(`/employee/employees/getUploadStatus?businessType=emp_regular&&importStatus=${this.importStatus}`).then(function(res) {
                        _self.importStatus = '-1';
                        _self.importStatus = res.data.importStatus;
                        if (res.data.importStatus === '0') {
                            _self.startTaskFile();
                            var timer;
                            clearTimeout(timer);
                            timer = setTimeout(() => {
                                _self.checkTask();
                            }, 3000);
                        }
                        if (res.data.importStatus === '1' || res.data.importStatus === '0') {
                            var timer;
                            clearTimeout(timer);
                            timer = setTimeout(() => {
                                _self.checkTask();
                            }, 3000);

                            if (this.task.loading === false && this.task.close === false) {
                                this.task.loading = true;
                                this.task.close = true;
                            }
                        }
                        if (res.data.importStatus === '2') {
                            if (this.task.loading === true) {
                                this.task.loading = false;
                            }
                            _self.taskAttachmentId = res.data.businessId;
                            _self.taskShowText = 'Data import failure, please download the  feedback excel. You can modify the data according to error tips and then upload it again.';
                        }
                        if (res.data.importStatus === '3') {
                            if (this.task.loading === true) {
                                this.task.loading = false;
                            }
                            Message({
                                type: 'error',
                                message: res.data.errorMessage
                            });
                            _self.$http.get(`/employee/employees/getUploadStatus?businessType=emp_regular&&importStatus=3`).then(function(res) {})
                        }
                        if (res.data.importStatus === '4') {
                            if (this.task.loading === true) {
                                this.task.loading = false;
                            }
                            Message({
                                type: 'success',
                                message: this.$t('staff.message.importSuccess')
                            });
                            var timer;
                            clearTimeout(timer);
                            timer = setTimeout(() => {
                                _self.checkTask();
                            }, 3000);
                        }
                        if (res.data.importStatus === '2') {
                            _self.task.modal = true;
                        }

                    })
                },
                downloadTaskFile() {
                    if (this.taskAttachmentId) {
                        var attachmentId = this.taskAttachmentId;
                        this.task.modal = false;
                        this.$http.get(`/employee/employees/getUploadStatus?businessType=emp_regular&&importStatus=-2`).then(function(res) {
                            downloadFile('/system/attachment/downloadFile', {
                                attachmentId: attachmentId
                            });
                        })
                    }
                },
                startTaskFile() {
                    let _self = this;
                    _self.$http.get("/employee/employees/lookupImportBusiness?businessType=emp_regular").then(function(res) {

                    })
                },
                canDownloadTask() {
                    let _self = this;
                    _self.$http.get(`/employee/employees/getUploadStatus?businessType=emp_regular&&importStatus=-2`).then(function(res) {
                        this.task.modal = false;
                    })
                }
        },
        events: {
            'organization-selector:selected': function(value) {
                if (value) {
                    this.regular.orgUnitName = value.orgShortName;
                    this.regular.unitId = value.orgId;
                }
            },
            addFileUpload(file, component) {
                if (this.files.auto) {
                    component.active = true;
                }
            },
            afterFileUpload(file, component) {
                if (file.data === 'true' || file.data === true) {
                    Message({
                        type: 'success',
                        message: this.$t('staff.message.importUploadSuccess')
                    });
                    this.checkTask();
                } else {
                    Message({
                        type: 'error',
                        message: file.data.message || this.$t('staff.message.importUploadFail')
                    });
                }
            }
        },
        components: {
            SelectTemplate: require('../selectTemplate.vue'),
            FileUpload: require('../../../components/basic/FileUpload.vue')
        }
};

</script>
