<template lang="html">
  <v-form :model="data" :schema="internsShipSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
      <text-increment v-show="isEdit" property='employeeCode' editor-width="250"></text-increment>
      <text-field property='localEmployeeCode' editor-width="250" v-if="!isInterns"></text-field>
      <text-field v-if="!isEdit || isReHire" type="selector" :readonly="true" :show.sync="position" property='positionName' editor-width="250"></text-field>
      <text-field v-if="isEdit && !isReHire" :readonly="true" property='positionName' editor-width="250"></text-field>
      <text-field property='businessCardTitle' editor-width="250"></text-field>
      <text-field property='unitShortName' editor-width="250" :readonly="true" :placeholder="$t('staff.selectPosition')"></text-field>
      <select-field property='outsourceType' :mapping="dist.outsourceType" v-if="isOutsource" editor-width="250"></select-field>
      <select-field property='mibGrade' editor-width="250" :mapping="mibGradeMapping"></select-field>
      <text-field :readonly="true" property='localJobGrade' editor-width="250"></text-field>
      <select-field :select-change="changeHeight" property='employementCategory' :mapping="employementCategory" editor-width="250" v-if="isReHire"></select-field>
      <text-field property="hireDate" :readonly="isEdit && !isReHire" :type="(isEdit && !isReHire) ? '' : 'date'" editor-width="250" v-if="isEmployee"></text-field>
      <select-field :readonly="isEdit && !isReHire" :select-change="changeHeight" property='hireDateRules' :mapping="hireDateRulesDist" v-if="!isInterns && !isOutsource" editor-width="250"></select-field>
      <text-field :readonly="isEdit && !isReHire" type="date" v-show="data.hireDateRules === '3'" property='hireBeginDate' editor-width="250"></text-field>
      <select-field :readonly="isEdit && !isReHire" :select-change="changeHeight" property='isProbation' :mapping="dist.whetherType" v-if="(isEmployee && !isReHire) || (isReHire && data.employementCategory ==='9')" editor-width="250"></select-field>
      <select-field :readonly="isEdit && !isReHire" :select-change="changeHeight" property='probationType' v-show="data.isProbation === '1'" :mapping="dist.probationTypeDist" editor-width="250"></select-field>
      <select-field :readonly="isEdit && !isReHire" :select-change="changeProbationDay" property='probationDay' v-show="data.isProbation === '1' && data.probationType === '1'" :mapping="dist.hireBeginDateDist" editor-width="250"></select-field>
      <text-field property="mentor" type="selector" :readonly="true" :show.sync="mentor" editor-width="250" v-if="isInterns"></text-field>
      <text-field :readonly="isEdit && !isReHire" :type="(isEdit && !isReHire) ? '' : 'date'" property="registerDate" :max-date="data.endDate" editor-width="250" v-show="!isEmployee || data.isProbation === '1'"></text-field>
      <text-field :readonly="isEdit && !isReHire" :type="(isEdit && !isReHire) ? '' : 'date'" property="endDate" :min-date="data.registerDate" editor-width="250" v-show="((!isEmployee || data.isProbation === '1') && !isOutsource && !isInterns) && !isAdd"></text-field>
  </v-form>
  <person-selector :show.sync="mentor" :handle-comfirmed="selectMentor" :multi-selected="false"></person-selector>
  <position-selector :show.sync="position" :handle-comfirmed="selectPosition"></position-selector>
</template>

<script>
import {
    default as Schema
}
from '../../../schema/index';
import {
    getDictMapping,formatDate
} from '../../../util/assist';
export default {
    props: [{
        name: 'data',
        default: {}
    },{
      name: 'dist',
      type: Object
    }],
    data() {
        var isInterns = this.$route.extra === '/ihr/staff/interns';
        var isOutsource = this.$route.extra === '/ihr/staff/outsource';
        var isReHire = this.$route.name === 'resignedEmployeeEdit';
        var isEmployee = !isInterns && !isOutsource;
        let internsShipData = {
            employeeCode: {
                label: 'Employee ID'
            },
            localEmployeeCode: {
                label: 'Local Employee ID'
            },
            positionName: {
                label: 'MIB Position',
                required: true
            },
            positionId: {},
            positionCode: {},
            businessCardTitle: {
                label: 'Position'
            },
            unitShortName: {
                label: 'Organization',
                required: true,
                whitespace: false
            },
            outsourceType: {
                label: 'Outsource Type',
                required: true
            },
            unitId: {},
            mibGrade: {
                label: 'MIB Grade',
                required: true
            },
            localJobGrade: {
                label: 'Job Grade'
            },
            employementCategory: {
                label: 'Employement Category',
                required: true
            },
            hireDate: {
                label: 'Hire Date',
                required: true
            },
            hireDateRules: {
              label: 'Date of Calculating Service Year'
            },
            hireBeginDate: {
              label: 'Certain Date'
            },
            probationDay: {
              label: 'Duration'
            },
            probationType: {
              label: 'Probation Type'
            },
            isProbation: {
                label: 'Probation',
                required: true
            },
            mentor: {
                label: 'Mentor',
                required: false
            },
            registerDate: {
                label: 'Start Date of Probation',
                required: true,
                default () {
                    return new Date();
                }
            },
            endDate: {
                label: 'End Date of Probation',
                required: true
            }
        };
        if (isInterns) {
            internsShipData.registerDate.label = 'Start Date of Internship';
            internsShipData.endDate.label = 'End Date of Internship';
            delete internsShipData.localEmployeeCode;
            delete internsShipData.hireDateRules;
        } else if (isOutsource) {
            internsShipData.registerDate.label = 'Start Date of Outsourcing';
            internsShipData.endDate.label = 'End Date of Outsourcing';
            delete internsShipData.hireDateRules;
        }
        if (!isEmployee) {
            internsShipData.endDate.required = false;
            internsShipData.employeeCode.label = 'Intern ID';
            delete internsShipData.hireDate;
            delete internsShipData.employementCategory;
            delete internsShipData.isProbation;
        }
        if (!isInterns) {
            delete internsShipData.mentor;
        }
        if (!isOutsource) {
            delete internsShipData.reportLine;
            delete internsShipData.outsourceCategory;
        } else {
            internsShipData.employeeCode.label = 'Outsource ID';
            delete internsShipData.endDate;
        }
        if (!isReHire) {
          delete internsShipData.employementCategory;
        }
        return {
            isEdit: !!this.$route.params.employeeId,
            isEmployee: isEmployee,
            isInterns: isInterns,
            isOutsource: isOutsource,
            isReHire: isReHire,
            internsShipSchema: new Schema(internsShipData),
            employementCategory: {},
            position: {
                modal: false
            },
            mibGradeMapping: {},
            mentor: {
                modal: false
            },
            hireDateRulesDist: {}
        };
    },
    computed: {
      routeName() {
              return this.$route.name;
          },
          isAdd() {
            if (this.routeName === 'internsAdd') {
                return true;
              } else {
                return false;
              }
          }
    },
    watch: {
      'data.isProbation': function(newVal, oldVal) {
        if (oldVal === undefined) {
          return;
        }
        if (newVal === '1') {
          this.data.registerDate = this.data.hireDate;
        }
        this.$dispatch('ui-collapsible::refresh-height', 'job-info');
      },
      'data.registerDate': function(newVal, oldVal) {
        if (this.data.probationType === '1' && this.data.probationDay) {
          this.changeProbationDay('' + this.data.probationDay);
        }
      }
    },
    created() {
      this.$http.get('/employee/employees/dicts/workingAge/items').then(function(res) {
        if (res.data) {
          var data = {};
          res.data.forEach(function(item) {
            data[item.NAME] = item.VALUE;
          });
          this.hireDateRulesDist = data;
        }
      });
    },
    ready() {
      if (this.isReHire) {
        this.$http.get('/employee/employees/dicts/EMPLOYEE_CATEGORY/items/1').then(function(res) {
          if(res.data) {
            var data = {};
            res.data.forEach(function(item) {
              data[item.NAME] = item.VALUE;
            })
            this.employementCategory = data;
          }
        })
      }
        this.data = this.internsShipSchema.newModel();
    },
    attached() {},
    methods: {
      changeHeight() {
        this.$dispatch('ui-collapsible::refresh-height', 'job-info');
      },
        changeProbationDay(value) {
          if (!this.data.registerDate) {
            return;
          }
          var time = (new Date(this.data.registerDate)).getTime();
          var oneDay = 24*60*60*1000;
          switch (value) {
            case '1': this.data.endDate = formatDate(new Date(time + 30 * oneDay));break;
            case '2': this.data.endDate = formatDate(new Date(time + 60 * oneDay));break;
            case '3': this.data.endDate = formatDate(new Date(time + 90 * oneDay));break;
            case '4': this.data.endDate = formatDate(new Date(time + 180 * oneDay));break;
          }
        },
        selectMentor(value) {
            if (value && value instanceof Array) {
                let tempNames = [],
                    tempIds = [];
                for (let index of value.keys()) {
                    tempNames.push(value[index].employeeName);
                    tempIds.push(value[index].employeeId);
                }
                this.data.mentor = tempNames.join(',');
            }
        },
        selectPosition(pos, org) {
          this.data.positionName = pos.positionName;
          this.data.positionId = pos.positionId;
          this.data.positionCode = pos.positionCode;
          this.data.mibGrade = undefined;
          this.data.businessCardTitle = pos.businessTitle;
          this.data.localJobGrade = pos.localGrade;
          this.data.unitShortName = org.orgShortName;
          this.data.unitId = org.orgId;
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
          var dist = this.dist.mibGradeDist;
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
    components: {}
};
</script>

<style lang="css">
</style>
