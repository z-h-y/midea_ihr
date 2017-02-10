<style lang="less">

.ihr-staff-annualResults {
    padding-bottom: 88px;
    font-size: 14px;
    h3 {
        text-align: center;
        padding: 20px 0;
    }
    .table-annualResults {
        padding: 16px;
    }
    .table-annualResults table {
        border-collapse: collapse;
    }
    .table-annualResults td,
    .table-annualResults th {
        padding: 14px 10px;
        color: #6a707d;
        border: 1px solid #ecedee;
        text-align: center;
        width: 120px;
    }
    .group {
        margin: 20px;
        border-top: none;
    }

    #edit-modify .org-form {
        min-height: 120px;
    }
    .hideTitle {
        display: none;
    }
    .hideBorderT {
        border-top: none;
        position: relative;
        .ui-checkbox {
            position: absolute;
            top: -8px;
        }
    }
    .gradeThClass {
        width: 20px;
    }
    .font-color-red {
        color: red;
    }

}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-annualResults">
    <h3>Annual Performance Results ({{annualName}})</h3>
    <div class="table-annualResults">
        <table class="vuetable ui blue striped selectable celled stackable attached table">
            <thead>
                <tr>
                    <th></th>
                    <th class="w-per15">Excellent</th>
                    <th class="w-per15">Very Good</th>
                    <th class="w-per15">Good</th>
                    <th class="w-per15">Needs Improvement</th>
                    <th class="w-per15">Disqualified</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Default Sort Order</td>
                    <td>{{defaultRatio.excellentRatio + '%'}}</td>
                    <td>{{defaultRatio.veryGoodRatio + '%'}}</td>
                    <td>{{defaultRatio.goodRatio + '%'}}</td>
                    <td>{{defaultRatio.needsRatio + '%'}}</td>
                    <td>{{defaultRatio.disqualifiedRatio + '%'}}</td>
                </tr>
            </tbody>
        </table>
        <table class="vuetable ui blue striped selectable celled stackable attached table mt16">
            <thead>
                <tr>
                    <th></th>
                    <th class="w-per15">Excellent</th>
                    <th class="w-per15">Very Good</th>
                    <th class="w-per15">Good</th>
                    <th class="w-per15">Needs Improvement</th>
                    <th class="w-per15">Disqualified</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Actual Ratio</td>
                    <td>{{actRatio.excellent}}</td>
                    <td>{{actRatio.veryGood}}</td>
                    <td>{{actRatio.good}}</td>
                    <td>{{actRatio.needsImprovement}}</td>
                    <td>{{actRatio.disqualified}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" @click="goConfirmed" color="primary" text="Release Results" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" @click="goModify" type="flat" text="Modify Grade" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" @click="goCalculate" type="flat" text="Calculate" button-type="button"></ui-button>
    </div>
    <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable v-ref:resulttable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :fields="columns" per-page="10">
        </vuetable>
    </div>
    <div class="btn-group">
        <!-- <ui-button @click="submitForm" color="primary mr10">Submit</ui-button> -->
        <ui-button @click="goCancel" class="btn-default-bd" type="flat">Back</ui-button>
    </div>
    <ui-modal id="edit-modify" :show.sync="show.modifyModal" header="Modify Grade">
        <v-form :model="modifyModel" :schema="modifySchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <select-field property='grade' editor-width="150" :mapping="gradeDist"></select-field>
        </v-form>
        <div slot="footer">
            <ui-button color="primary mr10" @click="saveGrade">save</ui-button>
            <ui-button class="btn-default-bd" type="flat" @click="show.modifyModal = false">Cancel</ui-button>
        </div>
    </ui-modal>
    <ui-confirm @confirmed="confirmedFunc" :show.sync="show.finalConfirm" :header="confirm.confirmTitle" close-on-confirm>
        {{confirm.confirmText}}
    </ui-confirm>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    getDictMapping, convert
}
from '../../util/assist';

let modifySchema = new Schema({
    grade: {
        label: 'Adjust Grade'
    }
})
let modifyS

export default {
    data() {
            return {
                gradeDist: {},
                show: {
                    modifyModal: false,
                    finalConfirm: false
                },
                confirm: {
                    confirmTitle: 'Important Tip',
                    confirmText: 'Once scores have been released, they could not be modified. Are you sure to release the scores?',
                },
                modifySchema: modifySchema,
                modifyModel: modifySchema.newModel(),
                actRatio: {
                    excellent: '',
                    veryGood: '',
                    good: '',
                    needsImprovement: '',
                    disqualified: ''
                },
                defaultRatio: {
                    excellentRatio: 0,
                    veryGoodRatio: 0,
                    goodRatio: 0,
                    needsRatio: 0,
                    disqualifiedRatio: 0
                },
                selectedRow: [],
                columns: [{
                    name: '__checkbox:',
                    title: '',
                    titleClass: 'hideBorderT'
                }, {
                    name: 'employeeName',
                    title: 'Employee Name',
                    titleClass: 'hideTitle'
                }, {
                    name: 'employeeCode',
                    title: 'Employee ID',
                    dataClass: 'tr',
                    titleClass: 'hideTitle'
                }, {
                    name: 'positionName',
                    title: 'Position',
                    titleClass: 'hideTitle'
                }, {
                    name: 'businessUnitScore',
                    title: 'Score',
                    dataClass: 'tr',
                    callback: 'fixZeroValue'
                }, {
                    name: 'businessUnitWeight',
                    title: 'Weight',
                    dataClass: 'tr',
                    callback: 'addPercent'
                }, {
                    name: 'unitScore',
                    title: 'Score',
                    dataClass: 'tr',
                    callback: 'fixZeroValue'
                }, {
                    name: 'unitWeight',
                    title: 'Weight',
                    dataClass: 'tr',
                    callback: 'addPercent'
                }, {
                    name: 'personalScore',
                    title: 'Score',
                    dataClass: 'tr',
                    callback: 'fixZeroValue'
                }, {
                    name: 'personalWeight',
                    title: 'Weight',
                    dataClass: 'tr',
                    callback: 'addPercent'
                }, {
                    name: 'finalScore',
                    title: 'Final Score',
                    dataClass: 'tr',
                    callback: 'fixZeroValue'
                }, {
                    name: 'grade',
                    title: 'Grade',
                    callback: 'fixGrade'
                }, {
                    name: 'adjustGrade',
                    title: 'Adjusted Grade',
                    titleClass: 'gradeThClass',
                    callback: 'fixGrade'
                }, {
                    name: 'rank',
                    title: 'Rank',
                }, {
                    name: 'releaseStatusName',
                    title: 'Status'
                }],
            };
        },
        computed: {
            annualName() {
                    return this.$route.query.annual;
                },
                checkedRows() {
                    let tableData = this.$refs.resulttable.tableData;
                    let result = [];
                    for (let item of this.selectedRow) {
                        result.push(tableData[item]);
                    }
                    return result;
                },
                checkedIds() {
                    let ids = [];
                    for (let item of this.checkedRows) {
                        ids.push(item.scoreYearId);
                    }
                    return ids;
                },
                isCalculate() {
                    for (let item of this.checkedRows) {
                        if (!item.scoreYearId) {
                            return false;
                        }
                    }
                    return true;
                },
                isRelease() {
                    for (let item of this.checkedRows) {
                        if (!item.releaseStatus || item.releaseStatus == '0') {
                            return false;
                        }
                    }
                    return true;
                },
                tableUrl() {
                    let schemeYearId = this.$route.params.id;
                    return `/performance/yearPfmScores/${schemeYearId}`;
                },
                schemeYearId() {
                    return this.$route.params.id;
                }
        },
        created() {
            this.$http.get('/performance/yearPfmScores/ratio?schemeYearId=' + this.schemeYearId).then(function(res) {
                this.defaultRatio = res.data;
            })
            this.getActualRatio();
            var self = this;
            getDictMapping('YEAR_SCHEME_ADJUST_GRADE').then(function(res) {
                    self.gradeDist = res;
                })
                // this.countActualratio();
        },
        ready() {
            // var html = this.$refs.resulttable.$el.getElementsByTagName('thead')[0].innerHTML;
            // this.$refs.resulttable.$el.getElementsByTagName('thead')[0].innerHTML = '<tr><th rowspan="2"></th><th rowspan="2">Employee Name</th><th rowspan="2">Employee ID</th><th rowspan="2">Position</th><th colspan="2">Business Unit</th><th colspan="2">Department</th><th colspan="2">Individual</th><th colspan="5">Final</th></tr>' + html;

            // var html = this.$refs.resulttable.$el.getElementsByTagName('thead')[0].innerHTML;
            var tr = document.createElement('tr');
            tr.appendChild(this.creatThElement({class: 'hideBorderB'}));
            tr.appendChild(this.creatThElement({rowspan: 2}, 'Employee Name'));
            tr.appendChild(this.creatThElement({rowspan: 2}, 'Employee ID'));
            tr.appendChild(this.creatThElement({rowspan: 2}, 'Position'));
            tr.appendChild(this.creatThElement({colspan: 2}, 'Business Unit'));
            tr.appendChild(this.creatThElement({colspan: 2}, 'Department'));
            tr.appendChild(this.creatThElement({colspan: 2}, 'Individual'));
            tr.appendChild(this.creatThElement({colspan: 5}, 'Final'));
            var thead = this.$refs.resulttable.$el.getElementsByTagName('thead')[0];
            thead.insertBefore(tr, thead.getElementsByTagName('tr')[0]);
            // this.$refs.resulttable.$el.getElementsByTagName('thead')[0].insertAdjacentHTML('afterBegin', '<tr><th class="hideBorderB"></th><th rowspan="2">Employee Name</th><th rowspan="2">Employee ID</th><th rowspan="2">Position</th><th colspan="2">Business Unit</th><th colspan="2">Department</th><th colspan="2">Individual</th><th colspan="5">Final</th></tr>');
        },
        attached() {},
        methods: {
            creatThElement(attr, text) {
              var th = document.createElement('th');
              if (attr) {
                for(var key of Object.keys(attr)) {
                  th.setAttribute(key, attr[key]);
                }
              }
              th.innerHTML = text || '';
              return th;
            },
            goConfirmed() {
                    if (!this.checkSelected('release')) return;
                    if (!this.isRelease) {
                        this.show.finalConfirm = true;
                    }
                },
                confirmedFunc() {
                    this.goRelease();
                },
                fixZeroValue(value) {
                    return value == 0 ? `<span class = "font-color-red">${value}</span>` : value;
                },
                fixGrade(value) {
                    var dist = this.gradeDist;
                    var result = '';
                    for (let key of Object.keys(dist)) {
                        if (dist[key] === value) {
                            result = key
                            break;
                        }
                    }
                    return result;
                },
                goModify() {
                    if (!this.checkSelected('modify')) return;
                    this.show.modifyModal = true;
                },
                goRelease() {
                    let _self = this;
                    let param = {
                        schemeYearId: _self.schemeYearId,
                        scoreYearIds: _self.checkedIds,
                    };
                    this.$http.post(`/performance/scoreYears/releaseResults`, param, {
                        emulateJSON: true
                    }).then(() => {
                        Message({
                            type: 'success',
                            message: this.$t('performance.message.viewResultReleaseResultSuccess')
                        });
                        _self.$broadcast('vuetable:refresh');
                    });
                },
                goCalculate() {
                    this.$http.get(`/performance/yearPfmScores/calculate/${this.schemeYearId}`).then((response) => {
                        Message({
                            type: 'success',
                            message: this.$t('performance.message.finalResultGoCalculate')
                        });
                        this.getActualRatio();
                        this.$broadcast("vuetable:refresh");
                    })
                },
                goCancel() {
                    this.$router.go({
                        name: 'annualPerformance',
                    });
                },
                saveGrade() {
                    //保存修改分数
                    let _self = this;
                    let resultParam = {};
                    let dto = [];

                    for (let item of this.checkedRows) {
                        dto.push({
                            employeeId: item.employeeId
                        })
                    }

                    let param = {
                        schemeYearId: _self.schemeYearId,
                        adjustGrade: _self.modifyModel.grade,
                        dtos: dto
                    };
                    convert(param, resultParam, "", true);
                    this.$http.post(`/performance/yearPfmScores/updateAdjustGrade`, resultParam, {
                        emulateJSON: true
                    }).then(() => {
                        Message({
                            type: 'success',
                            message: this.$t("common.saveSuccess")
                        });
                        _self.$broadcast('vuetable:refresh');
                        _self.getActualRatio();
                        _self.show.modifyModal = false;
                        // _self.countActualratio();
                    });
                },
                getActualRatio() {
                    let schemeYearId = this.schemeYearId;
                    this.$http.get(`/performance/yearPfmScores/${schemeYearId}/ratio`).then((response) => {
                        let data = response.data;
                        this.actRatio.excellent = data.excellentScale;
                        this.actRatio.veryGood = data.veryGoodScale;
                        this.actRatio.good = data.goodScale;
                        this.actRatio.needsImprovement = data.needsImpScale;
                        this.actRatio.disqualified = data.disqualifiedScale;
                        this.show.modifyModal = false;
                        // _self.countActualratio();
                    });
                },
                countActualratio() {
                    //计算实际权重
                    this.$http.post(``).then(() => {
                        this.$broadcast('vuetable:refresh');
                        this.show.modifyModal = false;
                        this.countActualratio();
                    });
                },
                checkSelected(actionCode) {
                    switch (actionCode) {
                        case 'modify':
                            return this.doCheckItems(["mandatory", "editCheckRelease"]);
                            break;
                        case 'release':
                            return this.doCheckItems(["mandatory", "checkGrade", "checkCalculate", "relCheckRelease"]);
                            break;
                        default:
                            Message({
                                type: 'error',
                                message: 'Internal Server Error'
                            });
                    }
                },
                doCheckItems(actionCodes) {
                    if (!actionCodes instanceof Array) return;
                    for (let item of actionCodes) {
                        switch (item) {
                            case 'mandatory':
                                if (this.checkedRows.length == 0) {
                                    Message({
                                        type: 'error',
                                        message: this.$t('performance.message.viewResultChooseOne')
                                    });
                                    return false;
                                }
                                break;
                            case 'single':
                                if (this.checkedRows.length > 1) {
                                    Message({
                                        type: 'error',
                                        message: this.$t('performance.message.viewResultOnlyOne')
                                    });
                                    return false;
                                }
                                break;
                            case 'checkCalculate':
                                if (!this.isCalculate) {
                                    Message({
                                        type: 'error',
                                        message: this.$t('performance.message.finalResultGoCalculateFirst')
                                    })
                                    return false;
                                }
                                break;
                            case 'editCheckRelease':
                                if (this.isRelease) {
                                    Message({
                                        type: 'error',
                                        message: this.$t('performance.message.viewResultEditReleased')
                                    })
                                    return false;
                                }
                                break;
                            case 'relCheckRelease':
                                if (this.isRelease) {
                                    Message({
                                        type: 'error',
                                        message: this.$t('performance.message.viewResultReleaseAgain')
                                    })
                                    return false;
                                }
                                break;
                            case 'checkGrade':
                                for (let item of this.checkedRows) {
                                    if (!item.grade && !item.adjustGrade) {
                                        Message({
                                            type: 'error',
                                            message: this.$t('performance.message.finalResultCheckGrade')
                                        })
                                        return;
                                    }
                                }
                                break;
                        }
                    }
                    return true;
                },
                addPercent(value) {
                    return value + '%';
                }
        },
        components: {}
};

</script>
