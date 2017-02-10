<style lang="less">
.ihr-staff-interns {
    font-size: 14px;
    .d-panel-content {
      padding: 0;
    }
    .int-join-com-form {
      margin: 16px;
    }
}
</style>

<template lang="html">

    <div class="content-wrap bg-w ihr-staff-interns">
      <panel :title="titleName" class="panel-b mb-suitable" header="panel-header">
        <employee-common-info :employee-id="employeeId" :employee-info.sync="employeeInfo"></employee-common-info>
        <v-form v-ref:empResignForm :model="empResign" :schema="empResignSchema" label-width="200" label-suffix="" :cols="1" form-style="int-join-com-form">
            <text-increment property="category" editor-width="400"></text-increment>
            <select-field property="terminationType" :mapping="terminationType" editor-width="400"></select-field>
            <select-field property="terminationReason" :mapping="terminationReason" editor-width="400"></select-field>
            <text-field property="effectiveDate" :min-date="employeeInfo.registerDate" editor-width="400"></text-field>
            <radiogroup-field property="inBlackList" v-if="isEmployee" :mapping="whetherType"></radiogroup-field>
            <radiogroup-field property="contractTermination" :mapping="whetherType"></radiogroup-field>
        </v-form>
        <employee-submit v-ref:employeesubmit :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
      </panel>
    </div>

</template>

<script>
import {
    getDictMapping,formatDate,transformDict
}
from '../../util/assist.js';
import {default as Message} from '../../components/basic/message';
import {
    default as Schema
} from '../../schema/index';

export default {
    data() {
      var self = this;
      let empResignData = {
          category: {
              label: this.$t('staff.personCategory')
          },
          terminationType: {
              label: this.$t('staff.typeOfTermination'),
              required: true
          },
          terminationReason: {
              label: this.$t('staff.terminationReason'),
              required: true
          },
          effectiveDate: {
              label: this.$t('staff.dateOfTermination'),
              type: 'date',
              default () {
                  return new Date();
              },
              required: true
          },
          contractTermination: {
              label: this.$t('staff.contractTermination'),
              default() {
                return '1';
              },
              required: true
          }
      };
        var isEmployee = false;
        if (this.$route.name === 'empTerminate') {
            empResignData.inBlackList = {
                label: this.$t('staff.addToBlacklist'),
                default() {
                  return '2';
                },
                required: true
            };
            isEmployee = true;
        }
        return {
            isEmployee: isEmployee,
            employeeId: this.$route.params.employeeId,
            employeeInfo: {},
            empResignSchema: new Schema(empResignData),
            empResign: {},
            employementCategory: {},
            extraInfo: {},
            whetherType: {},
            terminationType: {},
            terminationReason: {}
        };
    },
    computed: {
      titleName() {
        var name = this.$route.name;
        if (name === 'empTerminate') {
            return this.$t('staff.terminateEmployement');
        } else if (name === 'internsResign') {
            return this.$t('staff.terminateInternship');
        } else if (name === 'terminate') {
            return this.$t('staff.terminateOutsourcing');
        }
      }
    },
    created() {
      var self = this;
      let dictCodes = ['EMPLOYEE_CATEGORY', 'WHETHER_TYPE', 'TERMINATION_TYPE', 'TERMINATION_REASON'];
      let obj = {
        dictCodes : dictCodes
      }

      this.$http.post('/public-access/dicts/items', {
        dictCodes
      }, {
          emulateJSON: true
      }).then((response) => {
        for (var d of response.data) {
            if (d.dictName === 'EMPLOYEE_CATEGORY') {
               self.employementCategory = transformDict(d.dict);
            }
            if (d.dictName === 'WHETHER_TYPE') {
               self.whetherType = transformDict(d.dict);
            }
            if (d.dictName === 'TERMINATION_TYPE') {
               self.terminationType = transformDict(d.dict);
            }
            if (d.dictName === 'TERMINATION_REASON') {
               self.terminationReason = transformDict(d.dict);
            }
        }
      });
    },
    watch: {
      'employeeInfo.employementCategory': function(newVal) {
        this.fixDist(newVal);
      }
    },
    ready() {
        this.empResign = this.empResignSchema.newModel()
        switch (this.$route.extra) {
            case '/ihr/staff/outsource':
                this.extraInfo = {
                    url: '/employee/outsource/employees/' + this.employeeId + '/dimission',
                    backLink: 'outsource'
                }
                break;
            case '/ihr/staff/interns':
                this.extraInfo = {
                    url: '/employee/interns/employees/' + this.employeeId + '/dimission',
                    backLink: 'interns'
                }
                break;
            case '/ihr/staff/employees/regularEmployees':
                this.extraInfo = {
                    url: '/employee/employees/Terminate/' + this.employeeId,
                    backLink: 'regularEmployees'
                }
                break;
        }
    },
    attached() {},
    methods: {
        fixDist(value) {
          var dist = this.employementCategory;
          for (let key of Object.keys(dist)) {
            if (dist[key] === value) {
              value = key;
              break;
            }
          }
          this.empResign.category = value;
        },
        isFormValidate() {
          var passed = this.empResign.$schema.isFormValidate(this.$refs.empresignform);
          if (!passed) {
            return;
          }
          return passed;
        },
        confirmed() {
            var data = {
                terminationType: this.empResign.terminationType,
                terminationReason: this.empResign.terminationReason,
                effectiveDate: formatDate(this.empResign.effectiveDate),
                contractTermination: this.empResign.contractTermination
            }
            if (this.isEmployee) {
                data.inBlackList = this.empResign.inBlackList;
            } else {
                data.inBlackList = '2';
            }
            this.$http.post(this.extraInfo.url, data, {
                emulateJSON: true
            }).then(function(res) {
              Message({
                  type: 'success',
                  message: this.$t('staff.message.resignSuccess')
              });
                this.$route.router.go({
                    name: this.extraInfo.backLink
                });
            },function(response) {
                this.$refs.employeesubmit.loading = false;
            });
        },
        cancel() {
            this.$route.router.go({
                name: this.extraInfo.backLink
            });
        }
    },
    components: {
        EmployeeCommonInfo: require('./employeeCommonInfo.vue'),
        EmployeeSubmit: require('./employeeSubmit.vue'),
        Panel: require('../../components/basic/panel.vue')
    }
};
</script>
