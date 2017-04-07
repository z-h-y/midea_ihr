<style lang="less">

.ihr-staff-planState {
    font-size: 14px;
    .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
    }
    .group {
        margin: 20px 0;
        padding-top: 20px;
        border-top: 1px solid #ecedee;
    }
    .planState-form {
        height: 46px;
        overflow: hidden;
        transition: height .3s linear;
    }
    .planState-form.expended {
        height: 92px;
        transition: height .3s linear;
    }
    .operate {
        background: transparent;
        border: none;
        font-size: 15px;
        margin-left: 20px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-planState">
    <panel :title="panelTitle" class=" panel-b mt20 mb20 pb30" header="panel-header">
        <div class="mb20 pt20">
            <div class="search-area">
                <v-form :class="{expended: expended}" :model="planState" :schema="planStateSchema" label-width="130" :cols="3">
                    <text-field property='employeesCode' editor-width="150"></text-field>
                    <text-field property='employeesName' editor-width="150"></text-field>
                    <select-field property='status' editor-width="150"></select-field>
                </v-form>
                <!-- <ui-icon-button class="expend-btn" :class="{expended: expended}" :icon="expendIcon" @click="expendSearch"></ui-icon-button> -->
                <div class="query-btn">
                    <ui-button class="query-btn-search mr10" color="primary" @click="searchTable">{{$t('button.search')}}</ui-button>
                    <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">{{$t('button.reset')}}</ui-button>
                </div>
            </div>
            <div class="group">
                <ui-button class="mr10 dis-tc btn-primary-bd" @click="goStart" color="primary" button-type="button">{{$t('performance.button.startEvaluation')}}</ui-button>
            </div>
            <div>
                <vuetable ref="vuetable" @action="action" :api-url="tableUrl" :selected-to="selectedRow" :append-params="queryParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </panel>
    <div class="btn-group">
        <ui-button @click="goCancel" class="btn-default-bd">{{$t('button.back')}}</ui-button>
    </div>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';
import {
    getDictMapping
}
from '../../util/assist';
import {
    default as Message
}
from '../../components/basic/message';



export default {
    data() {
      let self = this;
      let planStateSchema = new Schema({
          employeesName: {
              label: self.$t('staff.employeeName')
          },
          employeesCode: {
              label: self.$t('staff.employeeId')
          },
          status: {
              label: self.$t('performance.status'),
              mapping: function() {
                  return getDictMapping('SCHEME_PROCESS_STAGE_NAME');
              }
          }
      });
            return {
                panelTitle: this.$t('performance.viewPlanStatistics'),
                tableUrl: '/performance/schemeInfos/processList',
                planStateSchema: planStateSchema,
                planState: planStateSchema.newModel(),
                expendIcon: 'fa-angle-double-down',
                selectedRow: [],
                expended: false,
                status: '',
                columns: [{
                    name: 'employeeName',
                    title: this.$t('staff.employeeName')
                }, {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('staff.employeeId')
                }, {
                    name: 'positionName',
                    title: this.$t('performance.position')
                }, {
                    name: 'orgFullName',
                    title: this.$t('staff.organization')
                }, {
                    name: 'processStatusName',
                    title: this.$t('performance.status')
                }, {
                    name: '__actions',
                    title: this.$t('performance.operate')
                }],
                itemActions: [{
                    name: 'view-item',
                    label: '',
                    icon: 'fa fa-eye',
                    class: 'operate'
                }, ]
            }
        },
        computed: {
            queryParams() {
                    let schemeId = this.schemeId ? this.schemeId : "";
                    let employeesName = this.planState.employeesName ? this.planState.employeesName : "";
                    let employeesCode = this.planState.employeesCode ? this.planState.employeesCode : "";
                    this.status = this.planState.status ? this.planState.status : this.$route.params.status;
                    if (this.status === '0') {
                        this.status = '';
                    }
                    return [
                        `schemeId=${schemeId}`,
                        `employeeName=${employeesName}`,
                        `employeeCode=${employeesCode}`,
                        `processStatus=${this.status}`,
                        `status=1`
                    ]
                },
                schemeId() {
                    return this.$route.params.id ? this.$route.params.id : 0;
                }
        },
        methods: {
            action(action, data) {
                this.operateRow = data;
                if (action == 'view-item') {
                    let param = {
                        openId: '0',
                        sid: data.schemeInfoId,
                        processTemplateId: data.processTemplateId,
                        procInstId: data.procInstId || -1,
                        schemeEmployeeId: data.schemeEmployeeId,
                        employeeId: data.employeeId,
                        back: 2
                    }
                    this.forwardUrl('performanceView', param);
                }
            },
            searchTable() {
                    this.$refs.vuetable.reloadData();
                },
                goCancel() {
                    history.back();//返回上一页
                },
                goStart() {
                    let param = {
                        schemeInfoId: this.schemeId
                    }
                    this.$http.put(`/performance/schemeInfo/startProcessSelfEvaluation`, param, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: this.$t('performance.message.startSuccess')
                        });
                        this.$refs.vuetable.reloadData();
                    });
                },
                resetTable() {
                    this.planState.reset();
                    this.$nextTick(() => {
                        this.$refs.vuetable.reloadData();
                    })
                },
                expendSearch() {
                    this.expended = !this.expended;
                    this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
                    this.$refs.vuetable.reloadData();
                },
                forwardUrl(pathName, params) {
                    params = params || {};
                    this.$router.push({
                        name: pathName,
                        params: params
                    });
                }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
};

</script>
