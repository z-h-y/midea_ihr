<style lang="css">

  .panel-b{
		border:	1px solid #ecedee;
	}
  .org-form{
    padding:20px;
  }
  .foot-submit {
    text-align: right;
  }
</style>

<template lang="html">
<div class="ihr-staff-interns content-wrap">

  <panel :title="$t('staff.extendProbation')" class=" panel-b mb-suitable" header="panel-header">
    <employee-common-info :employee-id="employeeId" :edit-able="false"></employee-common-info>
    <v-form v-ref:myForm :model="extend" :schema="extendSchema" label-width="250" label-suffix="" :cols="1" form-style="org-form">
        <text-increment property="beginDate" editor-width="400"></text-increment>
        <text-increment property="endDate" editor-width="400"></text-increment>
        <text-field property='delayDate' :min-date="delayDate" editor-width="400"></text-field>
        <text-field type="textarea" :editor-height="100" editor-width="400" property="delayReason"></text-field>
    </v-form>
  </panel>
  <employee-submit v-ref:employeesubmit :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>

</div>
</template>

<script type="text/ecmascript-6">
import {
    default as Schema
} from '../../../schema/index';
import {default as Message} from '../../../components/basic/message';
import {
    formatDate
} from '../../../util/assist';

export default {
    data() {
      var self = this;
      let extendSchema = new Schema({
          beginDate: {
              label: this.$t('staff.probationstartDate')
          },
          endDate: {
              label: this.$t('staff.probationEndDate')
          },
          delayDate: {
              label: this.$t('staff.postponeTo'),
              type: 'date',
              required: true
          },
          delayReason: {
              label: this.$t('staff.postponementReason'),
              required: true
          }

      });
        return {
            employeeId: this.$route.params.employeeId,
            extendSchema: extendSchema,
            extend: extendSchema.newModel()
        };
    },
    computed: {
      delayDate() {
        var date = this.extend.endDate;
        if (date) {
          date = formatDate(new Date((new Date(date)).getTime() + 24*60*60*1000));
          return date;
        }
        return '';
      }
    },
    ready() {
        this.$http.get('/employee/onProbation/employees/' + this.employeeId + '/probationInfo').then(function(res) {
            if (res.data.beginDate) {
              this.extend.beginDate = formatDate(new Date(res.data.beginDate));
            }
            if (res.data.endDate) {
              this.extend.endDate = formatDate(new Date(res.data.endDate));
              this.extend.delayDate = new Date(res.data.endDate);
            }
        })
    },
    attached() {},
    methods: {
        cancel() {
            this.$route.router.go({
                name: 'employeesOnProbation'
            });
        },
        isFormValidate() {
          var passed = this.extend.$schema.isFormValidate(this.$refs.myform);
          return passed;
        },
        confirmed() {
              this.$http.post('/employee/onProbation/employees/' + this.employeeId + '/delay', {
                  endDate: this.extend.endDate,
                  delayDate: formatDate(new Date(this.extend.delayDate)),
                  delayReason: this.extend.delayReason
              }, {
                  emulateJSON: true
              }).then(function(res) {
                Message({
                    type: 'success',
                    message: this.$t('staff.message.extendProbationSuccess')
                });
                  this.$route.router.go({
                      name: 'employeesOnProbation'
                  });
              },function(response) {
                  this.$refs.employeesubmit.loading = false;
              });
        }
    },
    components: {
        EmployeeSubmit: require('../employeeSubmit.vue'),
        Panel: require('../../../components/basic/panel.vue'),
        EmployeeCommonInfo: require('../employeeCommonInfo.vue')
    }
};
</script>
