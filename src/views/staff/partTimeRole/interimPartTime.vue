<style lang="css">

  .panel-b{
		border:	1px solid #ecedee;
	}
  .foot-submit {
    text-align: right;
  }
</style>

<template lang="html">
  <div class="ihr-staff-interns content-wrap">

    <panel :title="$t('staff.interimPartTimeRole')" class="panel-b mb-suitable" header="panel-header">
      <v-form ref="myform" :model="interim" :schema="interimSchema" label-width="250" label-suffix="" :cols="1" form-style="org-form">
          <text-field @open-selector="openSelector('perselect')" type="selector" :readonly="true" :show="person" property="employeeName" editor-width="400"></text-field>
          <text-increment property="orgName" editor-width="400"></text-increment>
          <text-increment property="hostPosition" editor-width="400"></text-increment>
          <text-field @open-selector="openSelector('posselect')" type="selector" :readonly="true" :show="position" property="positionName" editor-width="400"></text-field>
          <select-field :mapping="mibGradeMapping" property="mibGrade" editor-width="400"></select-field>
          <text-increment property="unitName" editor-width="400"></text-increment>
          <text-increment :title="interim.reportLine" property="reportLine" editor-width="400"></text-increment>
          <text-increment property="dottedReportLine" editor-width="400"></text-increment>
          <text-field :min-date="hireDate" property="effectiveDate" editor-width="400"></text-field>
          <text-field :min-date="interim.effectiveDate" property="expectedEndDate" editor-width="400"></text-field>
      </v-form>
    </panel>
    <person-selector ref="perselect" :show="person" :handle-comfirmed="selectPerson" :handle-before-comfirmed="beforeSelectPerson" :multi-selected="false"  :limit="false" ></person-selector>
    <position-selector ref="posselect" :show="position" :handle-comfirmed="selectPosition"></position-selector>
    <employee-submit ref="employeesubmit" :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
  </div>
</template>

<script type="text/ecmascript-6">
import {
    default as Schema
} from '../../../schema/index';
import {default as Message} from '../../../components/basic/message';
import {formatDate} from '../../../util/assist';

export default {
    data() {
      let interimSchema = new Schema({
          employeeName: {
              label: this.$t('staff.selectEmployee'),
              required: true
          },
          orgName: {
              label: this.$t('staff.hostOrganizatoin')
          },
          hostPosition: {
              label: this.$t('staff.hostPosition')
          },
          positionName: {
              label: this.$t('staff.parttimePosition'),
              required: true
          },
          mibGrade: {
              label: this.$t('staff.parttimeMibGrade'),
              required: true
          },
          unitName: {
              label: this.$t('staff.parttimeOrganization')
          },
          reportLine: {
              label: this.$t('staff.reportLine')
          },
          dottedReportLine: {
              label: this.$t('staff.dottedReportLine')
          },
          effectiveDate: {
              label: this.$t('staff.startDate'),
              type: 'date',
              required: true
          },
          expectedEndDate: {
              label: this.$t('staff.expectedEndDate'),
              type: 'date'
          }

      });
        return {
            interimSchema: interimSchema,
            interim: interimSchema.newModel(),
            hireDate: '',
            mibGradeMapping: {},
            position: {
              modal: false
            },
            person: {
              modal: false
            }
        };
    },
    watch: {
      'interim.effectiveDate': function(newVal) {
        var date = this.interim.expectedEndDate;
        if (newVal && date && newVal > date) {
          this.interim.expectedEndDate = '';
        }
      }
    },
    computed: {},
    mounted() {},
    
    methods: {
        openSelector(selector) {
          this.$refs[selector].open();
        },
        isFormValidate() {
          var passed = this.$refs.myform.isFormValidate();
          return passed;
        },
        confirmed() {
          var data = {
            employeeId: this.interim.employeeId,
            positionCode: this.interim.positionCode,
            mibGrade: this.interim.mibGrade,
            unitCode: this.interim.unitCode,
            unitName: this.interim.unitName,
            unitId: this.interim.unitId,
            positionId: this.interim.positionId,
            positionName: this.interim.positionName
          };
          if (this.interim.effectiveDate) {
            data.beginDate = formatDate(new Date(this.interim.effectiveDate))
          }
          if (this.interim.expectedEndDate) {
            data.expectedEndDate = formatDate(new Date(this.interim.expectedEndDate))
          }
              this.$http.post('/employee/parttimes', data, {
                  emulateJSON: true
              }).then(function(res) {
                Message({
                    type: 'success',
                    message: this.$t('staff.message.success')
                });
                  this.$router.push({
                      name: 'staffPartTimeRole'
                  });
              },(response) => {
                  this.$refs.employeesubmit.loading = false;
              });
        },
        selectPosition(pos, org) {
          this.interim.positionName = pos.positionName;
          this.interim.positionId = pos.positionId;
          this.interim.positionCode = pos.positionCode;
          this.interim.unitName = org.orgShortName;
          this.interim.unitId = org.orgId;
          this.interim.unitCode = org.orgCode;
          this.$http.get('/employee/parttimes/getReportLine?positionId=' + pos.positionId).then(function(res) {
            this.interim.dottedReportLine = res.data.dottedReportLine;
            this.interim.reportLine = res.data.reportLine;
          });
          this.$http.get('/pos/positions/dicts/positionMibgrade/items/?positionId=' + pos.positionId).then(function(res) {
            var data = res.data;
            var result = {};
            for(var i = 0; i < data.length; i++) {
              result[data[i].NAME] = data[i].VALUE;
            }
            this.mibGradeMapping = result;
          });
        },
        selectPerson(value, org) {
          if (value && value instanceof Array) {
              let tempNames = [],
                  positionName = [],
                  tempIds = [];
              for (let index of value.keys()) {
                  tempNames.push(value[index].employeeName);
                  tempIds.push(value[index].employeeId);
                  positionName.push(value[index].positionName);
              }
              this.interim.employeeName = tempNames.join(',');
              this.interim.employeeId = tempIds.join(',');
              this.interim.hostPosition = positionName.join(',');
              this.interim.orgName = org.orgShortName;
              this.$http.get('/employee/employees/' + this.interim.employeeId).then(function(res) {
                this.hireDate = res.data.hireDate;
                var effectiveDate = this.interim.effectiveDate;
                if (effectiveDate && formatDate(new Date(effectiveDate)) < this.hireDate) {
                  this.interim.effectiveDate = '';
                }
              });
          }
        },
        beforeSelectPerson(per, org, callback) {
          this.$http.get('/employee/parttimes/checkEmployeeCategory?employeeId=' + per[0].employeeId).then(function(res) {
            if (res.data) {
              callback(true);
              return;
            }
            Message({
                type: 'error',
                message: this.$t('staff.message.validatePerson')
            });
            callback(false);
          })
          return false;
        },
        cancel() {
            this.$router.push({
                name: 'staffPartTimeRole'
            });
        }
    },
    components: {
        EmployeeSubmit: require('../employeeSubmit.vue'),
        Panel: require('../../../components/basic/panel.vue')
    }
};
</script>
