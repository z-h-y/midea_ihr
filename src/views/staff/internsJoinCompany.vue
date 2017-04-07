<style lang="css">

  .panel-b{
		border:	1px solid #ecedee;
	}
</style>

<template lang="html">
<div>
    <position-selector :show="position" :handle-comfirmed="selectPosition"></position-selector>
    <div class="content-wrap ihr-staff-interns">
      <panel :title="$t('staff.internsJoinCompany')" class="panel-b mb-suitable" header="panel-header">
        <employee-common-info :employee-id="employeeId" :edit-able="false"></employee-common-info>
        <v-form ref="myform" :model="intJoinCom" :schema="intJoinComSchema" label-width="200" label-suffix="" :cols="1" form-style="int-join-com-form">
            <text-increment property="source" editor-width="400"></text-increment>
            <text-increment property="employeeCode" editor-width="400"></text-increment>
            <text-field property="localEmployeeCode" editor-width="400"></text-field>
            <text-field property="hireDate" editor-width="400" :min-date="format(registerDate)"></text-field>
            <select-field property="hireDateRules" :mapping="workingAge" editor-width="400"></select-field>
            <text-field property="hireBeginDate" editor-width="400" v-show="intJoinCom.hireDateRules === '3'"></text-field>
            <text-field property="preferredName" editor-width="400"></text-field>
            <text-field type="selector" :readonly="true" :show="position" property="positionName" editor-width="400"></text-field>
            <text-field property="businessCardTitle" editor-width="400"></text-field>
            <text-field :placeholder="$t('staff.selectPosition')" :readonly="true" property="unitName" editor-width="400"></text-field>
            <select-field property="mibGrade" editor-width="400" :mapping="mibGradeMapping"></select-field>
            <text-field :readonly="true" property="localJobGrade" editor-width="400"></text-field>
            <!-- <select-field property="employementCategory" editor-width="400"></select-field> -->
            <text-field property="officeAddress" editor-width="400"></text-field>
            <radiogroup-field :mapping="whetherType" property="isProbation"></radiogroup-field>
            <select-field editor-width="400" property='probationType' :mapping="probationType" v-show="intJoinCom.isProbation === '1'"></select-field>
            <select-field editor-width="400" :select-change="changeProbationDay" property='probationDay' :mapping="duration" v-show="intJoinCom.isProbation === '1' && intJoinCom.probationType === '1'"></select-field>
            <text-field v-show="intJoinCom.isProbation === '1'" property="beginDate" :min-date="format(intJoinCom.hireDate)" :max-date="format(intJoinCom.endDate)" editor-width="400"></text-field>
            <text-field v-show="intJoinCom.isProbation === '1'" property="endDate" :min-date="format(intJoinCom.beginDate)" editor-width="400"></text-field>
            <!-- <select-field property="employeeStatus" editor-width="400" :mapping="employeeStatus"></select-field> -->
        </v-form>
        <employee-submit ref="employeesubmit" :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>
      </panel>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import { default as Schema } from '../../schema/index';
import {default as Message} from '../../components/basic/message';
import {
    formatDate,getDictMapping,transformDict
} from '../../util/assist';



export default {
    data() {
      var self = this;
      let intJoinComData = {
          hireDateRules: {
               label: this.$t('staff.lengthOfService'),
               required: true
          },
          hireBeginDate: {
              label: this.$t('staff.certainDate'),
              type:'date',
              required: true,
              default(){
                 return new Date();
              }
          },
          source:{
              label: this.$t('staff.sourceOfEmployee'),
              default() {
                return self.$t('staff.interns');
              }
          },
          employeeId: {
          },
          employeeCode: {
              label: this.$t('staff.employeeId')
          },
          localEmployeeCode: {
              label: this.$t('staff.localEmployeeId')
          },
          preferredName: {
              label: this.$t('staff.preferredName')
          },
          positionName: {
               label: this.$t('staff.mibPostion'),
               required: true
          },
          positionId: {},
          positionCode: {},
          unitId: {},
          businessCardTitle: {
              label: this.$t('staff.position')
          },
          unitName: {
              label: this.$t('staff.organization'),
              required: true
          },
          mibGrade: {
              label: this.$t('staff.mibGrade'),
              required: true
          },
          localJobGrade: {
              label: this.$t('staff.jobGrade')
          },
          // employementCategory: {
          //     label: 'Employement Category',
          //     mapping() {
          //       return getDictMapping('EMPLOYEE_CATEGORY');
          //     },
          //     required: true
          // },
          officeAddress: {
              label: this.$t('staff.officeAddress')
          },
          hireDate: {
              label: this.$t('staff.hireDate'),
              type:'date',
              default(){
                 return new Date();
              },
              required: true
          },
          isProbation: {
              label: this.$t('staff.probation'),
              required: true
          },
          probationType: {
            label: this.$t('staff.probationType')
          },
          probationDay: {
            label: this.$t('staff.duration')
          },
          beginDate: {
              label: this.$t('staff.startDateOfProbation'),
              type:'date',
              required: true
          },
          endDate: {
              label: this.$t('staff.finishDateOfProbaton'),
              type:'date',
              default(){
                 return new Date();
              },
              required: true
          }
          // employeeStatus: {
          //     label: 'Status Of Employee',
          //     mapping() {
          //       return getDictMapping('EMPLOYEE_STATUS');
          //     },
          //     required: true
          // }
      };
            return {
              employeeId: this.$route.params.employeeId,
              intJoinComSchema: new Schema(intJoinComData),
              intJoinCom: {},
              mibGradeDist: {},
              workingAge: {},
              whetherType: {},
              probationType: {},
              duration: {},
              position: {
                  modal: false
              },
              mibGradeMapping: {},
              unitLeaderIds: [],
              // employeeStatus: {},
              registerDate: ''
            };
        },
        computed: {},
        created() {
          if (this.employeeId) {
            this.$http.get('/employee/employees/'+ this.employeeId).then((response) => {
                this.repalceData(this.intJoinCom, response.data);
                this.intJoinCom.areaTemplateId = response.data.areaTemplateId;
                this.intJoinCom.beginDate = response.data.probationBeginDate ? formatDate(new Date(response.data.probationBeginDate)) : '';
                this.intJoinCom.endDate = response.data.probationEndDate ? formatDate(new Date(response.data.probationEndDate)) : '';
                this.intJoinCom.parentEmployeeId = response.data.parentEmployeeId;
                this.intJoinCom.unitName = response.data.orgUnit.unitShortName;
                this.intJoinCom.parentEmployeeId = response.data.parentEmployeeId;
                this.intJoinCom.mibGrade = '';
                this.registerDate = response.data.registerDate ? formatDate(new Date(response.data.registerDate)) : '';
                this.getMibGradeMapping(response.data.positionId);
            }, (response) => {
                console.log('错误信息 ：' + response.statusText);
            });
          }
          var self = this;
          let dictCodes = ['MIB_RANK', 'WORKING_AGE', 'WHETHER_TYPE', 'PROBATION_TYPE', 'DURATION'];
          let obj = {
            dictCodes : dictCodes
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
                if (d.dictName === 'WORKING_AGE') {
                   self.workingAge = transformDict(d.dict);
                }
                if (d.dictName === 'WHETHER_TYPE') {
                   self.whetherType = transformDict(d.dict);
                }
                if (d.dictName === 'PROBATION_TYPE') {
                   self.probationType = transformDict(d.dict);
                }
                if (d.dictName === 'DURATION') {
                   self.duration = transformDict(d.dict);
                }
            }
          });
        },
        watch: {
          'intJoinCom.isProbation': function(newVal, oldVal) {
              if (newVal === '1') {
                this.intJoinCom.beginDate = this.intJoinCom.hireDate;
              }
          },
          'intJoinCom.beginDate': function(newVal) {
             if(newVal && this.intJoinCom.probationType === '1') {
               this.changeProbationDay(this.intJoinCom.probationDay);
             }
          }
        },
        mounted() {
          this.intJoinCom = this.intJoinComSchema.newModel();
        },
        
        methods: {
          changeProbationDay(value) {
            if (!this.intJoinCom.beginDate) {
              return
            }
            var time = (new Date(this.intJoinCom.beginDate)).getTime();
            var oneDay = 24*60*60*1000;
            switch (value) {
              case '1': this.intJoinCom.endDate = formatDate(new Date(time + 30 * oneDay));break;
              case '2': this.intJoinCom.endDate = formatDate(new Date(time + 60 * oneDay));break;
              case '3': this.intJoinCom.endDate = formatDate(new Date(time + 90 * oneDay));break;
              case '4': this.intJoinCom.endDate = formatDate(new Date(time + 180 * oneDay));break;
            }
          },
          // 获得要提交的数据字段，删除不需要的
          repalceData(obj, newObj) {
            for (let key of Object.keys(obj)) {
              if (newObj.hasOwnProperty(key) && newObj[key] !== undefined) {
                obj[key] = newObj[key];
              }
            }
          },
          isFormValidate() {
            if (this.intJoinCom.isProbation === '2') {
              this.intJoinCom.beginDate = this.intJoinCom.beginDate || new Date();
              this.intJoinCom.endDate = this.intJoinCom.endDate || new Date();
            }
            if (this.intJoinCom.hireDateRules !== '3') {
              this.intJoinCom.hireBeginDate = this.intJoinCom.hireBeginDate || new Date();
            }
            var passed = this.$refs.myform.isFormValidate();
            if (this.intJoinCom.hireDateRules !== '3') {
              this.intJoinCom.hireBeginDate = '';
            }
            if (!passed) {
              return;
            }
            return passed;
          },
          cancel() {
            this.$router.push({name: 'interns'});
          },
          confirmed() {
              var data = Object.assign({}, this.intJoinCom);
              data.beginDate = formatDate(new Date(data.beginDate));
              data.endDate = formatDate(new Date(data.endDate));
              data.hireDate = formatDate(new Date(data.hireDate));
              data.mibGrade = this.fixMibGrade(data.mibGrade);
              if (data.hireBeginDate) {
                data.hireBeginDate = formatDate(new Date(data.hireBeginDate));
              }
              if (this.intJoinCom.isProbation === '2') {
                delete data.beginDate;
                delete data.endDate;
              }
              this.$http.post('/employee/interns/employees/' + this.employeeId + '/induction', data, {
                  emulateJSON: true
              }).then(function(res){
                Message({
                    type: 'success',
                    message: this.$t('staff.message.internsJoinSuccess')
                });
                this.$router.push({name: 'interns'});
              },function(response) {
                  this.$refs.employeesubmit.loading = false;
              });
          },
          selectPosition(pos, org) {
            this.intJoinCom.positionName = pos.positionName;
            this.intJoinCom.positionId = pos.positionId;
            this.intJoinCom.positionCode = pos.positionCode;
            this.intJoinCom.mibGrade = undefined;
            this.intJoinCom.businessCardTitle = pos.businessTitle;
            this.intJoinCom.localJobGrade = pos.localGrade;
            this.intJoinCom.unitName = org.orgShortName;
            this.intJoinCom.unitId = org.orgId;
            this.getMibGradeMapping(pos.positionId);
          },
          getMibGradeMapping(id) {
            this.$http.get('/pos/positions/dicts/positionMibgrade/items/?positionId=' + id).then(function(res) {
              var data = res.data;
              var result = {};
              for(var i = 0; i < data.length; i++) {
                result[data[i].NAME] = data[i].VALUE;
              }
              this.mibGradeMapping = result;
            })
          },
          fixMibGrade(value) {
            var dist = this.mibGradeDist;
            var result = '';
            for(let key of Object.keys(dist)) {
              if (dist[key] === value) {
                result = key;
                break;
              }
            }
            return result;
          },
          format(value) {
            if(!value) {
              return;
            }
            return formatDate(new Date(value));
          }
        },
        components: {
          EmployeeSubmit: require('./employeeSubmit.vue'),
          Panel: require('../../components/basic/panel.vue'),
          EmployeeCommonInfo: require('./employeeCommonInfo.vue')
        }
};

</script>
