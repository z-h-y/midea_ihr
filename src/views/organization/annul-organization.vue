<style lang="less">

#annul-org {
    .annul-org {
        overflow: initial;
        padding: 0;
    }
    .d-panel-content {
        padding: 0px;
    }
    .warp {
        padding: 15px 20px 20px 20px;
    }
    .warp.affiliation-area {
        border-top: solid 1px #e8e8e8;
    }
    .annul-org-form {
        padding-top: 30px;
    }
    .guidance {
        padding: 6px 8px;
        .transfer,
        .transfer-explain {
            line-height: 32px;
            font-size: 16px;
            color: #72777c;
        }
        .transfer .a-link {
            text-decoration: underline;
            color: blue;
            cursor: pointer;
        }
        .nums {
            color: red;
            font-size: 14px;
        }
    }
    .fade-transition {
        display: inline-block;
        /* 否则 scale 动画不起作用 */
    }
    .fade-enter {
        animation: all .2s ease;
    }
    .fade-leave {
        animation: all .2s ease;
    }
    .mr16 {
        margin-right: 16px;
    }
    .ml16 {
        margin-left: 16px;
    }
    .mt16 {
        margin-top: 16px;
    }
    // @keyframes fade-in {
    //     0% {
    // 			  margin-left: -100%;
    // 			  color:#fff;
    //         width:0px;
    // 				height:0px;
    //     }
    //     100% {
    // 			  margin-left: 0px;
    //         width:100%;
    //     }
    // }
    // @keyframes fade-out {
    // 			0% {
    // 				  height: auto;
    //           width:0px;
    //       }
    //       100% {
    //           width:100%;
    //       }
    // }
}

</style>

<template lang="html">

<div>
    <panel id="annul-org" :title="panelTitle" class=" panel-b annul-cnt mt16 ml16 mb-suitable mr16 " header="panel-header">
        <div class="warp">
            <div id="annul-org-help-desk" class="help-desk annul-org">
                <div class="help-desk-header">
                    <h3 class="headline">{{orgNodeDetail.unitShortName}}</h3>
                    <span class="subhead">{{orgNodeDetail.abbreviation ? '(' + orgNodeDetail.abbreviation + ')' : ''}}</span>
                </div>
                <div class="help-desk-cnt">
                    <ul class="regular fix">
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.effectDate')}}</span>
                            <span class="prop-val">{{orgNodeDetail.beginDate}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.orgId')}}</span>
                            <span class="prop-val">{{orgNodeDetail.unitCode}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.headOfOrg')}}</span>
                            <span class="prop-val">{{orgNodeDetail.unitLeaderName}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.superiorOrg')}}</span>
                            <span class="prop-val">{{orgNodeDetail.parentUnitName}}</span>
                        </li>
                    </ul>
                </div>
                <v-form ref="orgform" :model="annulOrg" :schema="annulOrgSchema" label-width="122" label-suffix="" :cols="1" form-style="annul-org-form">
                    <text-field property="effectiveDate" :min-date="effectMinDate" editor-width="400"></text-field>
                </v-form>
            </div>
        </div>
        <div class="warp affiliation-area">
            <div class="guidance" transition="fade">
                <p class="transfer">{{$t('organization.mergeOrg.tipText1')}}
                    <span v-for="item in employeesNumber">
                    {{$t('organization.mergeOrg.tipText3')}}
                    <b class="nums">{{item.count}}</b>
                    {{item.name}} {{$t('organization.mergeOrg.tipText2')}}
                    <em v-show="item.count > 0" class="a-link" @click="gotoEmployee(item.employementCategory)">
                        GO
                    </em>
                    <br />
                </span>
                </p>
                <p class="transfer-explain">
                    {{$t('organization.mergeOrg.tipText6')}}
                </p>
            </div>
            <vuetable ref="vuetable" :api-url="findEmployees" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns.employees" :sort-order="sortOrder" per-page="10">
            </vuetable>
        </div>
    </panel>
    <ui-confirm header="Annul Organization" @confirmed="confirmSubmit" :show.sync="showConfirmed" close-on-confirm>
        This organization has child position, are you sure to continue?
    </ui-confirm>
    <div class="btn-group">
        <ui-button color="primary mr10" @click="handleSubmit" :loading="submitLoading">{{$t('button.submit')}}</ui-button>
        <ui-button class="btn-default-bd" @click="handleCancel" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';



import {
    formatDate, getDictMapping
}
from '../../util/assist';

export default {
    data() {
            let annulOrgSchema = new Schema({
                effectiveDate: {
                    label: this.$t('organization.orgInfo.effectDate'),
                    type: 'date',
                    required: true,
                    default () {
                        let newDate = new Date();
                        let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
                        return date;
                    }
                }
            });
            var self = this;
            return {
                annulOrgSchema: annulOrgSchema,
                annulOrg: annulOrgSchema.newModel(),
                effectMinDate: '',
                columns: {
                    employees: [{
                        name: 'employeeName',
                        title: this.$t('organization.mergeOrg.name')
                    }, {
                        name: 'employeeCode',
                        dataClass: 'tr',
                        title: this.$t('organization.mergeOrg.id')
                    }, {
                        name: 'positionName',
                        title: this.$t('organization.mergeOrg.position')
                    }, {
                        name: 'orgFullName',
                        title: this.$t('organization.mergeOrg.org')
                    }, {
                        name: 'employeeType',
                        title: this.$t('organization.mergeOrg.employeesType'),
                        callback(value) {
                            return self.fixIdEmployeesType(value)
                        }
                    }]
                },
                orgNodeDetail: {},
                employeesNums: "",
                employeesType: {},
                positionsCount: 0,
                showConfirmed: false,
                submitLoading: false,
                employeesNumber: []
            };
        },
        computed: {
            routeName() {
                    return this.$route.name;
                },
                panelTitle() {
                    if (this.routeName === 'annul_organization') return this.$t('organization.modifyOrg.cancelOrgTitle');
                },
                findEmployees() {
                    return `/org/orgs/${this.$route.params.oid}/employees`;
                }
        },
        created() {
            var self = this;
            getDictMapping('EMPLOYEE_CATEGORY').then(function(res) {
                self.employeesType = res;
            })
            this.$http.post(`/org/orgs/${this.$route.params.oid}/getPositionsCount`).then((response) => {
                this.positionsCount = response.data;
            });
            this.fetchData();
            this.$http.get(`/org/orgs/${this.$route.params.oid}/getEmployeeCategoryCount`).then((response) => {
                this.employeesNumber = response.data;
                this.employeesNumber.forEach(function(item) {
                    if (item.employementCategory === '6') {
                        item.name = self.$t('organization.annul.outsourced');
                    } else if (item.employementCategory === '7') {
                        item.name = self.$t('organization.annul.interns');
                    } else if (item.employementCategory === '9') {
                        item.name = self.$t('organization.annul.employees');
                    }
                })
                if (this.employeesNumber.length < 1) {
                    this.employeesNumber.push({
                        name: 'employees',
                        count: 0,
                        employementCategory: '9'
                    });
                }
            });
        },
        methods: {
            gotoEmployee(employementCategory) {
                    var routeName = '';
                    var orgId = this.$route.params.oid;
                    var dataModuleKey = '';
                    if (employementCategory === '6') {
                        routeName = 'outsource';
                        dataModuleKey = 'STAFF_OUTSOURCE';
                    } else if (employementCategory === '7') {
                        routeName = 'interns';
                        dataModuleKey = 'STAFF_INTERNS';
                    } else if (employementCategory === '9') {
                        routeName = 'regularEmployees';
                        dataModuleKey = 'STAFF_REGULAR_EMPLOYEES';
                    }
                    this.$http.get(`/org/orgs/${orgId}/checkOperationPermission?dataModuleKey=${dataModuleKey}&unitId=${orgId}`).then(function(res) {
                        if (res.data) {
                            this.$http.get('/org/orgs/checkUserMenuToGo?type=' + employementCategory).then(function(response) {
                                if (response.data) {
                                    this.$router.push({
                                        name: routeName,
                                        query: {
                                            orgId: this.$route.params.oid
                                        }
                                    })
                                } else {
                                    Message({
                                        type: 'error',
                                        message: 'This account has not the corresponding menu permissions'
                                    })
                                }
                            })
                        } else {
                            Message({
                                type: 'error',
                                message: this.$t('organization.message.operationPermission')
                            })
                        }
                    })
                },
                fetchData() {
                    let data;
                    this.$http.get(`/org/orgs/${this.$route.params.oid}/orgdetails`).then((response) => {
                        data = response.data;
                        if (data) {
                            if (data.beginDate) data.beginDate = formatDate(new Date(data.beginDate));
                            this.orgNodeDetail = data;
                        }
                        this.effectMinDate = new Date(data.beginDate);
                    });

                },
                handleSubmit() {

                    if (this.employeesNums > 0) {
                        Message({
                            type: 'error',
                            message: this.$t('organization.message.annulPreOperate')
                        });
                        return;
                    }

                    let passed = this.annulOrg.$schema.isFormValidate(this.$refs.orgform);
                    if (!passed) return;

                    this.$http.post(`/org/orgs/${this.$route.params.oid}/checkIsExistPosition`).then((response) => {
                        if (response.data) {
                            this.showConfirmed = true;
                        } else {
                            this.confirmSubmit();
                        }
                    });


                },
                confirmSubmit() {
                    this.submitLoading = true;
                    this.$http.post(`/org/orgs/org/units/${this.$route.params.oid}/annual`, {
                        unitId: this.$route.params.oid,
                        effectiveDate: formatDate(new Date(this.annulOrg.effectiveDate))
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.data) {
                            Message({
                                type: 'success',
                                message: this.$t('organization.message.annulHandupSucceed')
                            });
                            var orgId = this.$route.params.oid;
                            var treeData = this.$root.$data.orgSettingTreeCache;
                            var walk = function(data) {
                                if (data && data.length > 0) {
                                    data.forEach(function(child, key) {
                                        if (orgId === String(child['orgId'])) {
                                            data.splice(key, 1);
                                        } else {
                                            var children = child['children'];
                                            walk(children);
                                        }
                                    });
                                }
                            };
                            walk(treeData);
                            this.$router.push({
                                name: 'organizationSetting'
                            });
                        }
                    }, (response) => {
                        this.submitLoading = false;
                    })
                },
                handleCancel() {
                    this.$router.push({
                        name: 'organizationSetting',
                        query: {
                            orgId: this.$route.params.oid
                        }
                    });
                },
                fixIdEmployeesType(value) {
                    let employeesType = this.employeesType,
                        val = value;
                    for (let key of Object.keys(employeesType)) {
                        if (value === employeesType[key]) val = key;
                    }
                    return val;
                }
        },
        events: {
            'vuetable:load-success': function(response) {
                this.employeesNums = this.$refs.vuetable.tablePagination.total;
            }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }

};

</script>
