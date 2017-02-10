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

    <panel :title="$t('staff.transfer')" class="panel-b mb-suitable" header="panel-header">
      <v-form v-ref:myForm :model="transfer" :schema="transferSchema" label-width="250" label-suffix="" :cols="1" form-style="org-form">
          <text-increment property="employeeName" editor-width="400"></text-increment>
          <text-increment property="parttimePosition" editor-width="400"></text-increment>
          <text-increment property="parttimeOrganization" editor-width="400"></text-increment>
          <select-field property="transferReason" editor-width="400"></select-field>
          <text-field type="selector" :readonly="true" :show.sync="position" property="positionName" editor-width="400"></text-field>
          <select-field :mapping="mibGradeMapping" property="mibGrade" editor-width="400"></select-field>
          <text-increment property="unitName" editor-width="400"></text-increment>
          <text-increment :title="transfer.reportLine" property="reportLine" editor-width="400"></text-increment>
          <text-increment property="dottedReportLine" editor-width="400"></text-increment>
          <text-field property="effectiveDate" editor-width="400"></text-field>
          <text-field :min-date="transfer.effectiveDate" property="expectedEndDate" editor-width="400"></text-field>
      </v-form>
    </panel>
    <position-selector :show.sync="position" :handle-comfirmed="selectPosition"></position-selector>
    <employee-submit v-ref:employeesubmit :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
  </div>
</template>

<script type="text/ecmascript-6">
import {
    default as Schema
} from '../../../schema/index';
import {default as Message} from '../../../components/basic/message';
import {formatDate, getDictMapping} from '../../../util/assist';

export default {
    data() {
      let transferSchema = new Schema({
          employeeName: {
              label: this.$t('staff.employeeName')
          },
          parttimePosition: {
              label: this.$t('staff.parttimePosition')
          },
          parttimeOrganization: {
              label: this.$t('staff.parttimeOrganization')
          },
          transferReason: {
              label: this.$t('staff.reasonForTransfer'),
              mapping() {
                  return getDictMapping('CHANGE_REASON');
              },
              required: true
          },
          positionName: {
              label: this.$t('staff.positionAfterTransfer'),
              required: true
          },
          mibGrade: {
              label: this.$t('staff.jobGradeAfterTransfer'),
              required: true
          },
          unitName: {
              label: this.$t('staff.organizatonAfterTransfer')
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
            transferSchema: transferSchema,
            transfer: transferSchema.newModel(),
            mibGradeMapping: {},
            position: {
              modal: false
            }
        };
    },
    computed: {},
    watch: {
      'transfer.effectiveDate': function(newVal) {
        var date = this.transfer.expectedEndDate;
        if (newVal && date && newVal > date) {
          this.transfer.expectedEndDate = '';
        }
      }
    },
    created() {
      	this.$http.get('/employee/parttimes/' + this.$route.params.employeeId).then(function(res) {
          this.transfer.employeeName = res.data.empFullName;
          this.transfer.parttimePosition = res.data.positionName;
          this.transfer.parttimeOrganization = res.data.unitName;
          this.transfer.reportLine = res.data.reportLine;
          this.transfer.dottedReportLine = res.data.dottedReportLine;
        })
    },
    attached() {},
    methods: {
        isFormValidate() {
          var passed = this.transfer.$schema.isFormValidate(this.$refs.myform);
          return passed;
        },
        confirmed() {
          var data = {
            employeeId: this.$route.params.employeeId,
            historyPartTimeId: this.$route.params.partTimeId,
            positionCode: this.transfer.positionCode,
            mibGrade: this.transfer.mibGrade,
            unitCode: this.transfer.unitCode,
            unitName: this.transfer.unitName,
            unitId: this.transfer.unitId,
            positionId: this.transfer.positionId,
            positionName: this.transfer.positionName,
            transferReason: this.transfer.transferReason
          };
          if (this.transfer.effectiveDate) {
            data.beginDate = formatDate(new Date(this.transfer.effectiveDate))
          }
          if (this.transfer.expectedEndDate) {
            data.expectedEndDate = formatDate(new Date(this.transfer.expectedEndDate))
          }
              this.$http.post('/employee/parttimes/transfer', data, {
                  emulateJSON: true
              }).then(function(res) {
                Message({
                    type: 'success',
                    message: this.$t('staff.message.success')
                });
                  this.$route.router.go({
                      name: 'staffPartTimeRole'
                  });
              },(response) => {
                  this.$refs.employeesubmit.loading = false;
              });
        },
        selectPosition(pos, org) {
          this.transfer.positionName = pos.positionName;
          this.transfer.positionId = pos.positionId;
          this.transfer.positionCode = pos.positionCode;
          this.transfer.unitName = org.orgShortName;
          this.transfer.unitId = org.orgId;
          this.transfer.unitCode = org.orgCode;
          this.$http.get('/employee/parttimes/getReportLine?positionId=' + pos.positionId).then(function(res) {
            this.transfer.dottedReportLine = res.data.dottedReportLine;
            this.transfer.reportLine = res.data.reportLine;
          })
          this.$http.get('/pos/positions/dicts/positionMibgrade/items/?positionId=' + pos.positionId).then(function(res) {
            var data = res.data;
            var result = {};
            for(var i = 0; i < data.length; i++) {
              result[data[i].NAME] = data[i].VALUE;
            }
            this.mibGradeMapping = result;
          })
        },
        cancel() {
            this.$route.router.go({
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
