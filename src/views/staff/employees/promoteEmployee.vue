<style lang="less">

.ihr-staff-interns {
    font-size: 14px;
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-interns">
  <panel :title="$t('staff.promoteEmployee')" class="panel-b mb-suitable" header="panel-header">
    <employee-common-info :employee-id="employeeId" :employee-info="employeeInfo"></employee-common-info>
    <v-form ref="promoteform" :model="promoteEmp" :schema="promoteEmpSchema" label-width="220" label-suffix="" :cols="1" form-style="int-join-com-form">
        <text-field property="effectiveDate" :min-date="employeeInfo.hireDate" editor-width="400"></text-field>
        <text-field property="transferPositionName" @open-selector="openSelector" type="selector" :readonly="true" :show="position" editor-width="400"></text-field>
        <text-field property="businessCardTitle" editor-width="400"></text-field>
        <text-field property="transferUnitName" :readonly="true" :placeholder="$t('staff.selectPosition')" editor-width="400"></text-field>
        <select-field property="jobGrade" :mapping="mibGradeMapping" editor-width="400"></select-field>
        <text-field :readonly="true" property="localGrade" editor-width="400"></text-field>
        <text-field property="workCity" editor-width="400"></text-field>
    </v-form>
  </panel>
    <position-selector ref="posselect" :show="position" :handle-comfirmed="selectPosition"></position-selector>
    <employee-submit ref="employeesubmit" :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
</div>

</template>

<script>
import { default as Schema } from '../../../schema/index';
import {
    formatDate,
    getDictMapping
} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';
export default {
    data() {
      var promoteEmpData = {
          effectiveDate: {
               label: this.$t('staff.effectiveDate'),
               type: 'date',
               required: true
          },
          transferUnitName: {
               label: this.$t('staff.orgAfterPromotion'),
               required: true
          },
          transferPositionName: {
              label: this.$t('staff.mibPositionAfterPromotion'),
              required: true
          },
          businessCardTitle: {
              label: this.$t('staff.PosAfterPromotion')
          },
          jobGrade: {
               label: this.$t('staff.jobGradeAfterPromotion'),
               required: true
          },
          localGrade: {
              label: this.$t('staff.localGradeAfterPromotion')
          },
          workCity: {
              label: this.$t('staff.workCityAfterPromotion')
          }
      };
            return {
                employeeId: this.$route.params.employeeId,
                employeeInfo: {},
                promoteEmpSchema: new Schema(promoteEmpData),
                promoteEmp: {},
                mibGradeDist: {},
                mibGradeMapping: {},
                position: {
                    modal: false
                }
            };
        },
        computed: {},
        created() {
          var self = this;
          getDictMapping('MIB_RANK').then(function(res) {
            self.mibGradeDist = res;
          });
        },
        mounted() {
          this.promoteEmp = this.promoteEmpSchema.newModel();
        },
        methods: {
          openSelector() {
            this.$refs['posselect'].open();
          },
          isFormValidate() {
              var passed = this.$refs.promoteform.isFormValidate();
              if (!passed) {
                return;
              }
              return passed;
          },
          confirmed() {
                  var data = Object.assign({}, this.promoteEmp);
                  data.employeeId = this.employeeId;
                  data.effectiveDate = formatDate(data.effectiveDate);
                  data.jobGrade = this.fixMibGrade(data.jobGrade);
                  this.$http.post('/employee/employees/Promotion/' + this.employeeId, data, {
                      emulateJSON: true
                  }).then(function(res) {
                    Message({
                        type: 'success',
                        message: this.$t('staff.message.promotionSuccess')
                    });
                      this.$router.push({
                          name: 'regularEmployees'
                      });
                  },function(response) {
                      this.$refs.employeesubmit.loading = false;
                  });
          },
          cancel() {
              this.$router.push({
                  name: 'regularEmployees'
              });
          },
          selectPosition(pos, org) {
            this.promoteEmp.transferPositionName = pos.positionName;
            this.promoteEmp.transferPositionId = pos.positionId;
            this.promoteEmp.transferPositionCode = pos.positionCode;
            this.promoteEmp.businessCardTitle = pos.businessTitle;
            this.promoteEmp.jobGrade = undefined;
            this.promoteEmp.localGrade = pos.localGrade;
            this.promoteEmp.transferUnitName = org.orgShortName;
            this.promoteEmp.transferUnitId = org.orgId;
            this.promoteEmp.transferUnitCode = org.orgCode;
            this.$http.get('/pos/positions/dicts/positionMibgrade/items/?positionId=' + pos.positionId).then(function(res) {
              var data = res.data;
              var result = {};
              for(var i = 0; i < data.length; i++) {
                result[data[i].NAME] = data[i].VALUE;
              }
              this.mibGradeMapping = result;
            })
          },
          fixMibGrade(value) {
            var dist = this.mibGradeMapping;
            var result = '';
            for(let key of Object.keys(dist)) {
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
