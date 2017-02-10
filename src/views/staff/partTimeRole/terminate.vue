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

    <panel :title="$t('staff.terminate')" class="panel-b mb-suitable" header="panel-header">
      <v-form v-ref:myForm :model="terminate" :schema="terminateSchema" label-width="250" label-suffix="" :cols="1" form-style="org-form">
          <text-increment property="parttimePosition" editor-width="400"></text-increment>
          <text-increment property="parttimeOrganization" editor-width="400"></text-increment>
          <text-field type="textarea" :editor-height="100" editor-width="400" property="terminationReason"></text-field>
          <text-field property="effectiveDate" editor-width="400"></text-field>
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
import {formatDate} from '../../../util/assist';

export default {
    data() {
      let terminateSchema = new Schema({
          parttimePosition: {
              label: this.$t('staff.parttimePosition')
          },
          parttimeOrganization: {
              label: this.$t('staff.parttimeOrganization')
          },
          terminationReason: {
            label: this.$t('staff.terminationReason'),
            required: true
          },
          effectiveDate: {
              label: this.$t('staff.dateOfTermination'),
              type: 'date',
              required: true
          }

      });
        return {
            terminateSchema: terminateSchema,
            terminate: terminateSchema.newModel(),
            position: {
              modal: false
            }
        };
    },
    computed: {},
    created() {
      	this.$http.get('/employee/parttimes/' + this.$route.params.employeeId).then(function(res) {
          this.terminate.parttimePosition = res.data.positionName;
          this.terminate.parttimeOrganization = res.data.unitName;
        })
    },
    attached() {},
    methods: {
        isFormValidate() {
          var passed = this.terminate.$schema.isFormValidate(this.$refs.myform);
          return passed;
        },
        confirmed() {
          var data = {
            employeeId: this.$route.params.employeeId,
            partTimeId: this.$route.params.partTimeId,
            terminationReason: this.terminate.terminationReason,
            beginDate: formatDate(new Date(this.terminate.effectiveDate))
          };
              this.$http.post('/employee/parttimes/terminate', data, {
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
