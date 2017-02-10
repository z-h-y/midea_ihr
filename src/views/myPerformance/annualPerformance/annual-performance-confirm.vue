<style lang="less">

.ihr-annualPerformanceConfirm {
    min-width: 1087px;
    padding-bottom: 88px;
    * {
        box-sizing: border-box;
    }
    table {
        td,
        th {
            text-align: center;
        }
        /*针对这个页面下拉控件修改的css*/
        .field-hint {
            display: none;
        }
        .field-hashint {
            min-height: 32px;
            width: 200px;
            margin: 0 auto;
        }
        .field-hashint label {
            display: none;
        }
        .field-content {
            margin-left: 0 !important;
        }
        /*针对这个页面下拉控件修改的css*/
    }
    .w-per15 {
        width: 15%;
    }
    .mt50 {
        margin-top: 50px;
    }
    .hideTitle {
        display: none;
    }
    .group {
        border: none;
        margin-left: 0;
    }
    .hideBorderB {
        border-bottom: none;
    }
    .hideBorderT {
        border-top: none;
        position: relative;
        .ui-checkbox {
            position: absolute;
            top: -8px;
        }
    }
    .ui-modal-body {
        height: 225px;
    }
    .ui-confirm .ui-modal-body {
        height: auto;
    }
    .panel-header{
      text-align: center;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-annualPerformanceConfirm">
    <panel :title="schemeName" class="panel-b" header="panel-header">
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
                    <td>{{defaultRatio.excellentRatio}}%</td>
                    <td>{{defaultRatio.veryGoodRatio}}%</td>
                    <td>{{defaultRatio.goodRatio}}%</td>
                    <td>{{defaultRatio.needsRatio}}%</td>
                    <td>{{defaultRatio.disqualifiedRatio}}%</td>
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
                    <td>{{ratio.excellentScale}}</td>
                    <td>{{ratio.veryGoodScale}}</td>
                    <td>{{ratio.goodScale}}</td>
                    <td>{{ratio.needsImpScale}}</td>
                    <td>{{ratio.disqualifiedScale}}</td>
                </tr>
            </tbody>
        </table>

        <div class="group mt50 mb16">
            <ui-button class="mr10 dis-tc btn-default-bd" v-if="show.showBtn" @click="goEdit" icon="fa-pencil-square-o" type="flat" text="Modify Grade"></ui-button>
        </div>
        <div class="vuetable-wrapper">
            <vuetable :api-url="tableUrl" v-ref:annualtable :selected-to="selectedRow" :append-params="queryParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
            </vuetable>

        </div>
    </panel>
    <div class="btn-group">
        <ui-button @click="submit" v-if="show.showBtn" icon="" color="primary mr10" text="Confirm All"></ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat" text="Back"></ui-button>
    </div>

    <!-- 弹框修改等级 -->
    <ui-modal :show.sync="show.modal" header="Modify Grade" body="">
        <v-form class="mt10" :model="annual" :schema="annualSchema" label-width="130" label-suffix="" :cols="1">
            <select-field property='adjustGrade' editor-width="220"></select-field>
        </v-form>
        <div slot="footer">
            <ui-button @click="confirmGrade" color="primary">Confirm</ui-button>
            <ui-button @click="show.modal = false">Close</ui-button>
        </div>
    </ui-modal>
    <!-- 确认审核绩效询问框 -->
    <ui-confirm :class="confirm-all" header="Confirm All" @confirmed="confirmAll" :show.sync="show.confirmTips" close-on-confirm autofocus="confirm-button">
        Once all the performance results have been confirmed, you couldn't change them anymore. Are you sure to confirm all ?
    </ui-confirm>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../../schema/index';
import {
    default as Message
}
from '../../../components/basic/message';
import {
    getDictMapping,
    convert
}
from '../../../util/assist.js';

let annualSchema = new Schema({
    adjustGrade: {
        label: 'Adjust Grade',
        required: true,
        whitespace: false,
        mapping: function() {
            return getDictMapping('YEAR_SCHEME_ADJUST_GRADE');
        }
    },
    employeeId: {},
    schemeYearId: {}
});
export default {
    data() {
            let _self = this;
            return {
                show: {
                    modal: false,
                    confirmTips: false,
                    showBtn: true
                },
                annualSchema: annualSchema,
                annual: annualSchema.newModel(),
                defaultRatio: '',
                ratio: '',
                yearPfmScores: '',
                tableUrl: '',
                tableData: [],
                employeeId: [],
                syId: '',
                schemeName: '',
                isView: '',
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
                    dataClass: 'tr',
                    title: 'Score'
                }, {
                    name: 'businessUnitWeight',
                    title: 'Weight',
                    dataClass: 'tr',
                    callback: function(value, data) {
                        return _self.businessUnitWeight(value, data);
                    }
                }, {
                    name: 'unitScore',
                    dataClass: 'tr',
                    title: 'Score'
                }, {
                    name: 'unitWeight',
                    title: 'Weight',
                    dataClass: 'tr',
                    callback: function(value, data) {
                        return _self.unitWeight(value, data);
                    }
                }, {
                    name: 'personalScore',
                    dataClass: 'tr',
                    title: 'Score'
                }, {
                    name: 'personalWeight',
                    dataClass: 'tr',
                    title: 'Weight',
                    callback: function(value, data) {
                        return _self.personalWeight(value, data);
                    }
                }, {
                    name: 'finalScore',
                    dataClass: 'tr',
                    title: 'Score'
                }, {
                    name: 'rank',
                    title: 'Rank'
                }, {
                    name: 'grade',
                    title: 'Grade',
                    callback: function(value) {
                        return _self.fixAdjustGrade(value);
                    }
                }, {
                    name: 'adjustGrade',
                    title: 'Adjust Grade',
                    callback: function(value) {
                        return _self.fixAdjustGrade(value);
                    }

                }, {
                    name: 'releaseStatusName',
                    title: '',
                    titleClass: 'hideTitle'
                }],
                dist: {
                    YEAR_SCHEME_ADJUST_GRADE: {},
                },
                selectedRow: []
            };
        },
        ready() {
            var html = this.$refs.annualtable.$el.getElementsByTagName('thead')[0].innerHTML;
            var tr = document.createElement('tr');
            tr.appendChild(this.creatThElement({class: 'hideBorderB'}));
            tr.appendChild(this.creatThElement({rowspan: 2}, 'Employee Name'));
            tr.appendChild(this.creatThElement({rowspan: 2}, 'Employee ID'));
            tr.appendChild(this.creatThElement({rowspan: 2}, 'Position'));
            tr.appendChild(this.creatThElement({colspan: 2}, 'Business Unit'));
            tr.appendChild(this.creatThElement({colspan: 2}, 'Department'));
            tr.appendChild(this.creatThElement({colspan: 2}, 'Individual'));
            tr.appendChild(this.creatThElement({colspan: 4}, 'Final'));
            tr.appendChild(this.creatThElement({rowspan: 4}, 'Status'));
            var thead = this.$refs.annualtable.$el.getElementsByTagName('thead')[0];
            thead.insertBefore(tr, thead.getElementsByTagName('tr')[0]);
            // this.$refs.annualtable.$el.getElementsByTagName('thead')[0].insertAdjacentHTML('afterBegin',
            //     '<tr><th class="hideBorderB"></th><th rowspan="2">Employee Name</th><th rowspan="2">Employee ID</th><th rowspan="2">Position</th><th colspan="2">Business Unit</th><th colspan="2">Department</th><th colspan="2">Individual</th><th colspan="4">Final</th><th rowspan="2">Status</th></tr>'
            // );

            this.isState(); // 判断是否查看页面

        },
        created() {
            var _self = this;
            getDictMapping('YEAR_SCHEME_ADJUST_GRADE').then(function(res) {
                _self.dist.YEAR_SCHEME_ADJUST_GRADE = res;
            });
            _self.schemeName = _self.$route.params.schemeName;
            this.initData();
        },
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
            // 判断是否查看页面
            isState() {
                    this.isView = this.$route.params.state;
                    if (this.isView === '1') {
                        debugger;
                        this.show.showBtn = false;
                    }
                },
                goEdit() {
                    let rows = this.selectedRow,
                        _self = this;
                    if (rows.length > 0) {
                        _self.employeeId = [];
                        let flag = true;
                        rows.forEach(function(obj, index) {
                            _self.tableData.forEach(function(item, i) {
                                if (i === obj) {
                                    if (item.confirmedHod === '0') {
                                        _self.employeeId.push({
                                            employeeId: item.employeeId
                                        })
                                    } else if (!item.finalScore && !item.confirmedHod) {
                                        Message({
                                            type: 'error',
                                            message: _self.$t('myperformance.message.finalscore')
                                        });
                                        flag = false;
                                        return;
                                    } else {
                                        Message({
                                            type: 'error',
                                            message: _self.$t('myperformance.message.approved')
                                        });
                                        flag = false;
                                        return;
                                    }
                                }
                            })
                        })
                        if (flag)
                            _self.show.modal = true;
                    } else {
                        Message({
                            type: 'error',
                            message: _self.$t('myperformance.message.performanceModify')
                        });
                    }

                },
                confirmGrade() {
                    let _self = this;
                    if (_self.annual.adjustGrade) {
                        let rows = _self.selectedRow;
                        let params = {};
                        let tempParams = {
                            dtos: _self.employeeId,
                            adjustGrade: _self.annual.adjustGrade,
                            schemeYearId: _self.syId
                        }
                        convert(tempParams, params, "", true);
                        _self.$http.post('/performance/yearPfmScores/updateAdjustGrade', params, {
                            emulateJSON: true
                        }).then((response) => {
                            Message({
                                type: 'success',
                                message: _self.$t('common.saveSuccess')
                            });
                            _self.show.modal = false; //弹出框
                            _self.$broadcast('vuetable:refresh');
                            _self.initData();
                        });
                    }
                },
                submit() {
                    // 显示提示框
                    this.show.confirmTips = true;
                },
                fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'YEAR_SCHEME_ADJUST_GRADE':
                            dist = this.dist.YEAR_SCHEME_ADJUST_GRADE || {};
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
                fixAdjustGrade(value) {
                    return this.fixDist(value, 'YEAR_SCHEME_ADJUST_GRADE');
                },

                cancel() {
                    this.$router.go({
                        name: 'myPerformance'
                    });
                },
                businessUnitWeight(value, data) {
                    return data.businessUnitWeight + '%';
                },
                unitWeight(value, data) {
                    return data.unitWeight + '%';
                },
                personalWeight(value, data) {
                    return data.personalWeight + '%';
                },
                // reviewStatus(data) {
                //     if (data) {
                //         if (data.confirmedHod === '1') {
                //             return 'Confirmed';
                //         }
                //     }
                // },
                initData() {
                    let _self = this;
                    _self.syId = this.$route.params.id
                        //默认比例
                    _self.$http.get(`/performance/yearPfmScores/ratio?schemeYearId=${_self.syId}`).then((response) => {
                        _self.defaultRatio = response.data;
                    });
                    // 实际比例
                    _self.$http.get(`/performance/yearPfmScores/${_self.syId}/ratio`).then((response) => {
                        _self.ratio = response.data;
                    });
                    // 列表
                    _self.tableUrl = `/performance/yearPfmScores/confirmed/${_self.syId}`;
                },
                confirmAll() {
                    let rows = this.selectedRow,
                        _self = this;


                    let params = {};
                    let tempParams = {
                        schemeYearId: _self.syId
                    }
                    convert(tempParams, params, "", true);

                    this.$http.post(`/performance/scoreYears/confirmedHodYear`, params, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: this.$t('common.saveSuccess')
                        });
                        this.$router.go({
                            name: 'myPerformance'
                        });
                        // this.$broadcast('vuetable:refresh');
                        // this.initData();
                    });
                }
        },
        events: {
            'vuetable:load-success': function(response) {
                this.tableData = response.data.data;
            }
        },
        components: {
            Panel: require('../../../components/basic/panel.vue')
        }

};

</script>
