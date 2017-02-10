<style lang="less">


</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-interns">
  <panel :title="$t('staff.interimPartTimeRole')" class="panel-b mb-suitable" header="panel-header">
    <employee-common-info :employee-id="employeeId" :employee-info.sync="employeeInfo"></employee-common-info>
    <v-form v-ref:parttimeform :model="partTimeEmp" :schema="partTimeEmpSchema" label-width="200" label-suffix="" :cols="1" form-style="int-join-com-form">
        <text-field property="positionName" type="selector" :readonly="true" :show.sync="position" editor-width="400"></text-field>
        <text-field property="unitName" :readonly="true" :placeholder="$t('staff.selectPosition')" editor-width="400"></text-field>
        <text-field property="beginDate" :min-date="format(employeeInfo.hireDate)" :max-date="format(partTimeEmp.endDate)" editor-width="400"></text-field>
        <text-field property="endDate" :min-date="format(partTimeEmp.beginDate) || format(employeeInfo.hireDate)" editor-width="400"></text-field>
    </v-form>
  </panel>
    <position-selector :show.sync="position" :handle-comfirmed="selectPer"></position-selector>
    <employee-submit v-ref:employeesubmit :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
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
        let partTimeEmpData = {
            positionName:{
                label: this.$t('staff.interimRole'),
                required: true
            },
            unitName:{
                label: this.$t('staff.currentDepartment'),
                required: true
            },
            beginDate: {
                 label: this.$t('staff.startDate'),
                 type: 'date',
                 required: true
            },
            endDate: {
                 label: this.$t('staff.endDate'),
                 type: 'date'
            }
        };
            return {
                employeeId: this.$route.params.employeeId,
                employeeInfo: {},
                partTimeEmpSchema: new Schema(partTimeEmpData),
                partTimeEmp: {},
                show: {
                    modal: false
                },
                position: {
                    modal: false
                }
            };
        },
        computed: {},
        ready() {
          this.partTimeEmp = this.partTimeEmpSchema.newModel();
        },
        attached() {},
        methods: {
          cancel() {
              this.$route.router.go({
                  name: 'regularEmployees'
              });
          },
          isFormValidate() {
              var passed = this.partTimeEmp.$schema.isFormValidate(this.$refs.parttimeform);
              if (!passed) {
                return;
              }
              return passed;
          },
          confirmed() {
                  var data = Object.assign({}, this.partTimeEmp);
                  data.employeeId = this.employeeId;
                  data.beginDate = formatDate(new Date(data.beginDate));
                  if (data.endDate) {
                    data.endDate = formatDate(new Date(data.endDate));
                  }
                  this.$http.post('/employee/employees/PartTime/' + this.employeeId, data, {
                      emulateJSON: true
                  }).then(function(res) {
                      Message({
                          type: 'success',
                          message: this.$t('staff.message.partTimeSuccess')
                      });
                      this.$route.router.go({
                          name: 'regularEmployees'
                      });
                  },function(response) {
                      this.$refs.employeesubmit.loading = false;
                  });
          },
          selectPer(node, org) {
            if (node) {
              this.partTimeEmp.positionName = node.positionName;
              this.partTimeEmp.positionId = node.positionId;
              this.partTimeEmp.positionCode = node.positionCode;
              this.partTimeEmp.unitName = org.orgShortName;
              this.partTimeEmp.unitId = org.orgId;
            }
          },
          format(value) {
            if(!value) {
              return;
            }
            return formatDate(new Date(value));
          }
        },
        components: {
          EmployeeCommonInfo: require('../employeeCommonInfo.vue'),
          EmployeeSubmit: require('../employeeSubmit.vue'),
          Panel: require('../../../components/basic/panel.vue')
        }
};

</script>
