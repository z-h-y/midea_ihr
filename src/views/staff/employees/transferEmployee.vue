<style lang="less">
.ihr-staff-interns {
    font-size: 14px;
    .transferEmp-form {
        padding: 20px;
    }
}
</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-interns">
  <panel :title="$t('staff.transferEmployee')" class="panel-b mb-suitable" header="panel-header">
    <employee-common-info :employee-id="employeeId" :employee-info="employeeInfo"></employee-common-info>
    <v-form ref="myform" :model="transferEmp" :schema="transferEmpSchema" label-width="240" label-suffix="" :cols="1" form-style="transferEmp-form">
        <select-field property="reason" :mapping="changeReason" editor-width="400"></select-field>
        <text-field property="effectiveDate" :min-date="employeeInfo.hireDate" editor-width="400"></text-field>
        <text-field property="transferPositionName" @open-selector="openSelector" type="selector" :readonly="true" :show="position" editor-width="400"></text-field>
        <text-field property="businessCardTitle" editor-width="400"></text-field>
        <text-field property="transferUnitName" :readonly="true" :placeholder="$t('staff.selectPosition')" editor-width="400"></text-field>
        <select-field :mapping="mibGradeMapping" property="jobGrade" editor-width="400"></select-field>
        <text-field :readonly="true" property="localGrade" editor-width="400"></text-field>
        <text-field property="workCity" editor-width="400"></text-field>
        <radiogroup-field property="continualUse" :mapping="whetherType"></radiogroup-field>
        <radiogroup-field property="agreementTerminationon" :mapping="whetherType"></radiogroup-field>
    </v-form>
  </panel>
    <position-selector ref="posselect" :show="position" :handle-comfirmed="selectPosition"></position-selector>
    <employee-submit ref="employeesubmit" :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
</div>

</template>

<script>
import {
    default as Schema
} from '../../../schema/index';
import {
    formatDate,
    getDictMapping,
    transformDict
} from '../../../util/assist';
import {
    default as Message
} from '../../../components/basic/message';
export default {
    data() {
        var transferEmpData = {
            reason: {
                label: this.$t('staff.reasonForTransfer'),
                required: true
            },
            effectiveDate: {
                label: this.$t('staff.effectiveDate'),
                type: 'date',
                required: true,
                default () {
                    return new Date();
                }
            },
            transferUnitName: {
                label: this.$t('staff.organizatonAfterTransfer'),
                required: true
            },
            transferPositionName: {
                label: this.$t('staff.mibPositionAfterTransfer'),
                required: true
            },
            businessCardTitle: {
                label: this.$t('staff.positionAfterTransfer')
            },
            jobGrade: {
                label: this.$t('staff.jobGradeAfterTransfer'),
                required: true
            },
            localGrade: {
                label: this.$t('staff.localGradeAfterTransfer')
            },
            workCity: {
                label: this.$t('staff.workCityAfterTransfer')
            },
            continualUse: {
                label: this.$t('staff.continualUseOfContract')
            },
            agreementTerminationon: {
                label: this.$t('staff.confidentialAgreementTermination')
            }
        };
        return {
            employeeId: this.$route.params.employeeId,
            employeeInfo: {},
            transferEmpSchema: new Schema(transferEmpData),
            transferEmp: {},
            mibGradeDist: {},
            changeReason: {},
            whetherType: {},
            mibGradeMapping: {},
            position: {
                modal: false
            }
        };
    },
    computed: {},
    created() {
        var self = this;
        let dictCodes = ['MIB_RANK', 'WHETHER_TYPE', 'CHANGE_REASON'];
        let obj = {
            dictCodes: dictCodes
        }

        this.$http.post('/public-access/dicts/items', {
            dictCodes
        }, {
            emulateJSON: true
        }).then((response) => {
            for (var d of response.data) {
                if (d.dictName === 'MIB_RANK') {
                    self.mibGradeDist = transformDict(d.dict);
                }
                if (d.dictName === 'WHETHER_TYPE') {
                    self.whetherType = transformDict(d.dict);
                }
                if (d.dictName === 'CHANGE_REASON') {
                    self.changeReason = transformDict(d.dict);
                }
            }
        });
    },
    mounted() {
        this.transferEmp = this.transferEmpSchema.newModel()
    },
    methods: {
      openSelector() {
        this.$refs['posselect'].open();
      },
        cancel() {
            this.$router.push({
                name: 'regularEmployees'
            });
        },
        isFormValidate() {
            var passed = this.$refs.myform.isFormValidate();
            if (!passed) {
                return;
            }
            return passed;
        },
        confirmed() {
            this.transferEmp.employeeId = this.employeeId;
            this.transferEmp.effectiveDate = formatDate(new Date(this.transferEmp.effectiveDate));
            var data = Object.assign({}, this.transferEmp);
            data.jobGrade = this.fixMibGrade(data.jobGrade);
            this.$http.post('/employee/employees/Transfer/' + this.employeeId, data, {
                emulateJSON: true
            }).then(function(res) {
                Message({
                    type: 'success',
                    message: this.$t('staff.message.transferSuccess')
                });
                this.$router.push({
                    name: 'regularEmployees'
                });
            }, function(response) {
                this.$refs.employeesubmit.loading = false;
            });
        },
        selectPosition(pos, org) {
            this.transferEmp.transferPositionName = pos.positionName;
            this.transferEmp.transferPositionId = pos.positionId;
            this.transferEmp.transferPositionCode = pos.positionCode;
            this.transferEmp.jobGrade = undefined;
            this.transferEmp.businessCardTitle = pos.businessTitle;
            this.transferEmp.localGrade = pos.localGrade;
            this.transferEmp.transferUnitName = org.orgShortName;
            this.transferEmp.transferUnitId = org.orgId;
            this.transferEmp.transferUnitCode = org.orgCode;
            this.$http.get('/pos/positions/dicts/positionMibgrade/items/?positionId=' + pos.positionId).then(function(res) {
                var data = res.data;
                var result = {};
                for (var i = 0; i < data.length; i++) {
                    result[data[i].NAME] = data[i].VALUE;
                }
                this.mibGradeMapping = result;
            })
        },
        fixMibGrade(value) {
            var dist = this.mibGradeMapping;
            var result = '';
            for (let key of Object.keys(dist)) {
                if (dist[key] === value) {
                    result = key;
                    break;
                }
            }
            return result;
        }
    },
    components: {
        EmployeeCommonInfo: require('../employeeCommonInfo.vue'),
        EmployeeSubmit: require('../employeeSubmit.vue'),
        Panel: require('../../../components/basic/panel.vue')
    }
};
</script>
