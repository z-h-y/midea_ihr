<style lang="less">
.update-emp-form {
    .edit-tab {
      margin-bottom: 8px;
    }
    .edit-tab i {
      cursor: pointer;
    }
    .edit-tab .tab-header {
      height: 40px;
      line-height: 39px;
      font-size: 16px;
      padding: 0 16px;
      background-color: #eef6fb;
    }
    .tab-header i {
      float: right;
      margin-top: 12px;
      font-size: 16px;
    }
    .tab-content {
      position: relative;
    }
    .tab-content i.edit-btn {
      position: absolute;
      right: 0;
      margin-top: 12px;
      font-size: 16px;
      cursor: pointer;
    }
    .edit-bg {
      background-color: #fafafa;
    }
    .tab-content li {
      float: left;
      width: 50%;
      font-size: 14px;
      color: #6a707d;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tab-content li span {
      color: #a5acbe;
      width: 190px;
      display: inline-block;
    }
    .save-info-group {
      text-align: center;
      margin-top: 16px;
    }
    .family-head, .family-list, .id-head, .id-list {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      padding: 0 16px;
    }
    .family-list, .id-list {
      color: #a5acbe;
      border-top: 1px solid #eff0f1;
    }
    .family-head span, .family-list span, .id-head span, .id-list span {
      float: left;
      display: inline-block;
      width: 16.66%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .list-operate {
      text-align: right;
    }
    .list-operate i {
      font-size: 16px;
      margin-left: 25px;
    }
    .edit-form {
      padding: 16px;
    }
    .edu-list {
      border-top: 1px solid #eff0f1;
      position: relative;
      padding: 16px;
    }
    .training-list .training-operate {
      position: absolute;
      width: auto;
      right: 16px;
      top: 0;
    }
    .edu-operate, .exp-operate {
      position: absolute;
      top: 38px;
      right: 28px;
    }
    .skill-list p span {
      color: #a5acbe;
    }
    .skill-type, .skill-level {
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
    .skill-list .skill-level {
      color: #6a707d;
    }


    .panel-b {
        border: 1px solid #ecedee;
        margin: 16px
    }
    .update-interns {
        position: relative;
    }
    .update-interns-per {
        width: 80%;
    }
    .update-interns-form label {
        text-align: left;
        float: none;
        display: inline-block;
    }
    .update-interns-form .field-content {
        margin-left: 0 !important;
    }
    .d-panel-content {
        padding: 0;
    }

    .avatar {
        width: 20%;
        margin-top: 10px;
        float: right;
        text-align: center;
        position: relative;
    }
    .avatar img {
      position: absolute;
      left: 50%;
      margin-left: -60px;
      border-radius: 50%;
    }
    .avatar-shadow {
      display: none;
    }
    .show-shadow .avatar-shadow {
      display: block;
    }
    .avatar .avatar-input {
        position: absolute;
        left: 50%;
        margin-left: -60px;
        height: 120px;
        width: 120px;
        opacity: 0;
        cursor: pointer;
    }
    .add-interns-id {
        position: relative;
    }
    .interns-id {
        background-color: #fafafa;
        padding: 20px;
    }
    .update-interns-aca {
        background-color: #fafafa;
        margin-bottom: 16px;
        padding: 16px;
    }
    .ui-collapsible-body {
        width: auto!important;
    }
    .del-top {
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    .save-top {
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 40px;
        cursor: pointer;
    }
    .del-bottom {
        font-size: 20px;
        position: absolute;
        bottom: 24px;
        right: 10px;
        cursor: pointer;
    }

    .add-new {
        font-size: 16px;
        color: #3aa2eb;
        text-align: center;
        cursor: pointer;
    }
    .add-new i {
        font-size: 20px;
        margin-right: 5px;
    }
    .save-basic-info {
      text-align: right;
      margin: 16px;
    }
    .avatar-input .file-upload {
        display: block;
        height: 120px;
    }
    .avatar-input .file-upload span{
        display: block;
        font-size: 18px;
        padding: 1em;
        font-weight: bold;
        text-indent: -9999em;
    }
    .avatar-input .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: absolute;
        opacity: .4;
        background: #000;
    }

}
</style>

<template lang="html">
<div class="update-emp-form" >
  <panel :title="source.panelTitle" class="panel-b" header="panel-header">
    <ui-collapsible header="Personnal Information" :open.sync="collapsible.per" id="per-info">
      <div class="update-interns">
        <div class="avatar" :class="{'show-shadow': showShadow}">
          <img v-bind:src="avatar" alt="" width="120px" height="120px" />
          <img src="/static/images/public/avatar-upload-bg.png" height="119" width="119" class="avatar-shadow" >
          <div class="avatar-input" title="click to upload">
            <file-upload title="avatar" class="file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" v-ref:upload :drop="files.drop" @mouseover="showShadow = true" @mouseout="showShadow = false"></file-upload>
          </div>
          <!-- <input type="file" name="file" multiple accept="image/gif,image/jpeg,image/jpg,image/png" @change="uploadAvatar($event)" title="click to upload" @mouseover="showShadow = true" @mouseout="showShadow = false"> -->
        </div>
        <basic-info v-ref:internsper :data.sync="internsPer" :dist.sync="dist"></basic-info>
        <!-- <div class="interns-id">
          <id-type v-ref:idtype :data.sync="idList" parent-id="per-info" :selected-num="idSelect"></id-type>
        </div> -->
      </div>
    </ui-collapsible>
    <id-type v-ref:idtype :dist.sync="dist" :data.sync="idList" parent-id="per-info" :selected-num="idSelect"></id-type>
    <ui-collapsible :header="jobInfoText" :open.sync="collapsible.internship" id="job-info">
      <div class="update-interns">
        <job-info v-ref:internsjob :data.sync="internsShip" :dist.sync="dist"></job-info>
      </div>
    </ui-collapsible>
    <education v-ref:academiclist :data.sync="academicList" parent-id="aca-bg" :dist.sync="dist"></education>
    <!-- <ui-collapsible header="Academic Background" :open.sync="collapsible.academic" id="aca-bg">
        <education v-ref:academiclist :data.sync="academicList" parent-id="aca-bg" :dist.sync="dist"></education>
    </ui-collapsible> -->
    <div class="save-basic-info">
        <ui-button color="primary mr10" @click="submitForm" :loading="submitLoading">{{$t('button.submit')}}</ui-button>
        <ui-button class="btn-default-bd" @click="cancel" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>
    <!-- <div class="more-info" v-show="showMore">
      <ui-collapsible header="Additional Infomation" :open.sync="collapsible.additionInfo" id="additionInfo">
        <additional-info :data.sync="additionInfo" :employee-id.sync="employeeId" parent-id="additionInfo"></additional-info>
      </ui-collapsible>
      <ui-collapsible header="Personal Contact" :open.sync="collapsible.perContact" id="per-contact">
        <div class="update-interns">
          <personal-contact v-ref:percontact :data.sync="perContact" parent-id="per-contact" :dist.sync="dist" :employee-id.sync="employeeId"></personal-contact>
        </div>
      </ui-collapsible>
      <family :data.sync="familyList" parent-id="family-info" :dist.sync="dist" :employee-id.sync="employeeId"></family>
      <ui-collapsible header="Bank & Tax" :open.sync="collapsible.bank" id="bank">
        <bank :data.sync="bank" :employee-id.sync="employeeId"></bank>
      </ui-collapsible>
      <training-course :data.sync="courseList" parent-id="training-course" :employee-id.sync="employeeId"></training-course>
      <skill :data.sync="skillList" parent-id="skill" :employee-id.sync="employeeId" :dist.sync="dist"></skill>
      <experience :data.sync="expList" parent-id="pro-exp" :employee-id.sync="employeeId"></experience>
      <ui-collapsible header="Contract" :open.sync="collapsible.contract" id="contract-info">
        <div class="update-interns">
          <contract v-ref:contract :data.sync="contract" parent-id="contract-info" :employee-id.sync="employeeId"></contract>
        </div>
      </ui-collapsible>
    </div> -->
  </panel>

  <ui-confirm header="Tips" @confirmed="addMoreConfirm" @denied="addMoreCancel" :show.sync="show.addMoreConfirm" close-on-confirm autofocus="confirm-button" confirm-button-text="Yes, continue" deny-button-text="No,later">
      Would you like to furnish other important information for this employee?
  </ui-confirm>
</div>

</template>

<script type="text/ecmascript-6">
let Vue = require('vue');
import {
    default as Schema
} from '../../schema/index';
import {
    formatDate,getDictMapping,convert,transformDict
} from '../../util/assist';
import {default as Message} from '../../components/basic/message';
export default {
    data() {
        var isInterns = this.$route.extra === '/ihr/staff/interns';
        var isOutsource = this.$route.extra === '/ihr/staff/outsource';
        var isEmployee = !isInterns && !isOutsource;
        return {
            // 头像图片
            avatarFiles: [],
            // 证件列表的选择项
            idSelect: 0,
            // submit按钮loading状态
            submitLoading: false,
            // 提交时需要删除的字段
            delParmas: [],
            avatar: '/static/images/public/defaultAvatar.png',
            showShadow: false,
            isEmployee: isEmployee,
            isInterns: isInterns,
            isOutsource: isOutsource,
            isReHire: this.$route.name === 'resignedEmployeeEdit',
            // 员工ID
            employeeId: this.$route.params.employeeId,
            // 分为interns，emplouees, outsource时对应的值
            source: {},
            // 字典的列表
            dist: {
              area: {},
              learnType: {},
              grade: {},
              whetherType: {},
              mibGradeDist: {},
              gender: {},
              bloodType: {},
              maritalStatus: {},
              englishLevel: {},
              employeeSource: {},
              overtimeValid: {},
              degree: {},
              hireBeginDateDist: {},
              probationTypeDist: {},
              idType: {},
              outsourceType: {}
            },

            files: {
              url: Vue.config.APIURL + '/system/attachment/uploadFile',
              accept: 'image/*',
              size: 1024 * 1024 * 2,
              multiple: false,
              extensions: 'gif,jpg,png',
              // extensions: ['gif','jpg','png'],
              // extensions: /\.(gif|png|jpg)$/i,
              files: [],
              upload: {},
              drop: true,
              auto: true
            },
            photoId: '',

            idList: [],
            academicList: [],
            familyList: [],
            courseList: [],
            skillList: [],
            expList: [],
            internsPer: {},
            internsShip: {},
            perContact: {},
            contract: {},
            bank: {},
            additionInfo: {},
            // 是否显示更多信息填写
            showMore: false,
            // 所有confirmed的值
            show: {
                addMoreConfirm: false,
                addMoreConfirmText: 'Would you like to furnish other important information for this employee?'
            },
            // 各个collapsible是否展开
            collapsible: {
                per: true,
                internship: true,
                academic: true,
                perContact: true,
                family: true,
                bank: true,
                course: true,
                skills: true,
                experience: true,
                contract: true,
                additionInfo: true
            }
        };
    },
    computed: {
        jobInfoText() {
            if (this.isEmployee) {
                return this.$t('staff.jobInfomation');
            } else if (this.isOutsource) {
                return this.$t('staff.outsourceInformation');
            } else if (this.isInterns) {
                return this.$t('staff.internshipInformation');
            }
        }
    },
    created() {
      var self = this;
      this.$http.get('/org/area/0/child').then((response) => {
          if (response.data) {
              let result = {},
                  datas = response.data;
              for (var i = 0, l = datas.length; i < l; i++) {
                  result[datas[i].areaName] = datas[i].areaId;
              }
              self.dist.area = result;
          }
      });

      let dictCodes = ['ENGLISH_LEVEL', 'LEARN_TYPE', 'LEARN_GRADE','WHETHER_TYPE','MIB_RANK','DEGREE','ID_TYPE','GENDER','MARITAL_STATUS','BLOOD_TYPE','EMPLOYEE_STATUS','EMPLOYEE_CATEGORY','EMPLOYEE_SOURCE','OVERTIME_CLASSIFICATION', 'DURATION', 'PROBATION_TYPE', 'OUTSOURCE_CATEGORY'];
      let obj = {
        dictCodes : dictCodes
      }

      this.$http.post('/public-access/dicts/items', {
        dictCodes
      }, {
          emulateJSON: true
      }).then((response) => {
        for (var d of response.data) {

            if (d.dictName === 'LEARN_TYPE') {
               self.dist.learnType = transformDict(d.dict);
            }
            if (d.dictName === 'LEARN_GRADE') {
               self.dist.grade = transformDict(d.dict);
            }
            if (d.dictName === 'WHETHER_TYPE') {
               self.dist.whetherType = transformDict(d.dict);
            }
            if (d.dictName === 'MIB_RANK') {
               self.dist.mibGradeDist = transformDict(d.dict);
            }
            if (d.dictName === 'DEGREE') {
               self.dist.degree = transformDict(d.dict);
            }
            if (d.dictName === 'ID_TYPE') {
               self.dist.idType = transformDict(d.dict);
            }
            if (d.dictName === 'GENDER') {
               self.dist.gender = transformDict(d.dict);
            }
            if (d.dictName === 'MARITAL_STATUS') {
               self.dist.maritalStatus = transformDict(d.dict);
            }
            if (d.dictName === 'BLOOD_TYPE') {
               self.dist.bloodType = transformDict(d.dict);
            }
            if (d.dictName === 'ENGLISH_LEVEL') {
               self.dist.englishLevel = transformDict(d.dict);
            }
            if (d.dictName === 'EMPLOYEE_STATUS') {
               self.dist.employeeStatus = transformDict(d.dict);
            }
            if (d.dictName === 'EMPLOYEE_CATEGORY') {
               self.dist.employementCategory = transformDict(d.dict);
            }
            if (d.dictName === 'EMPLOYEE_SOURCE') {
               self.dist.employeeSource = transformDict(d.dict);
            }
            if (d.dictName === 'OVERTIME_CLASSIFICATION') {
               self.dist.overtimeValid = transformDict(d.dict);
            }
            if (d.dictName === 'DURATION') {
               self.dist.hireBeginDateDist = transformDict(d.dict);
            }
            if (d.dictName === 'PROBATION_TYPE') {
               self.dist.probationTypeDist = transformDict(d.dict);
            }
            if (d.dictName === 'OUTSOURCE_CATEGORY') {
               self.dist.outsourceType = transformDict(d.dict);
            }
        }
      });

    },
    ready() {
        this.$broadcast('ui-collapsible::refresh-height');
        // 根据人员的类型为source赋值
        var panelTitleType = 'Add';
        if (this.$route.params.employeeId) {
          panelTitleType = 'Edit';
          this.collapsible.internship = true;
          this.collapsible.academic = false;
          this.collapsible.perContact = false;
          this.collapsible.family = false;
          this.collapsible.bank = false;
          this.collapsible.course = false;
          this.collapsible.skills = false;
          this.collapsible.experience = false;
          this.collapsible.contract = false;
          this.collapsible.additionInfo = false;
        }
        if (this.isReHire) {
          panelTitleType = 'Rehire';
        }
        switch (this.$route.extra) {
            case '/ihr/staff/outsource':
                this.source = {
                    panelTitle: panelTitleType + ' Outsource',
                    refer: 'outsource',
                    url: '/employee/outsource/employees'
                };
                break;
            case '/ihr/staff/interns':
                this.source = {
                    panelTitle: panelTitleType + ' Interns',
                    refer: 'interns',
                    url: '/employee/interns/employees'
                };
                break;
            case '/ihr/staff/employees/regularEmployees':
                this.source = {
                    panelTitle: panelTitleType + ' Employees',
                    refer: 'regularEmployees',
                    url: '/employee/employees/'
                };
                break;
            case '/ihr/staff/employees/resignedEmployees':
                this.source = {
                    panelTitle: panelTitleType + ' Employees',
                    refer: 'resignedEmployees',
                    url: '/employee/employees/'
                };
                break;
        }
        var employeeId = this.employeeId;
        if (employeeId) {
            this.showMore = this.isReHire ? false : true;
            this.$http.get('/employee/employees/' + employeeId).then(function(res) {
                if (res.data.photoId) {
                  this.avatar = Vue.config.APIURL + '/system/attachment/downloadImg/' + res.data.photoId;
                }
                this.repalceData(this.internsPer, res.data);
                if (!this.isReHire) {
                  this.repalceData(this.internsShip, res.data);
                  if (this.isEmployee) {
                    var probationBeginDate = res.data.probationBeginDate;
                    var probationEndDate = res.data.probationEndDate;
                    this.internsShip.registerDate = probationBeginDate ? formatDate(new Date(probationBeginDate)) : '';
                    this.internsShip.endDate = probationEndDate? formatDate(new Date(probationEndDate)) : '';
                  }
                }
                this.internsShip.employeeCode = res.data.employeeCode;
                this.idList = res.data.dictPassportList;
                for(var i = 0, len = this.idList.length; i < len; i++) {
                  if (this.idList[i].mainDocuments === '1') {
                     this.idSelect = i;
                     break;
                  }
                }
                this.$nextTick(function(){
                  this.$refs.idtype.initList();
                  this.$broadcast('ui-collapsible::refresh-height', 'per-info');
                });
            });
            if (!this.isReHire) {
              this.$http.get('/employee/employees/' + employeeId + '/Contacts').then(function(res) {
                this.perContact = Object.assign(this.perContact, res.data);
              });
            }
        }
    },
    attached() {},
    methods: {
        // 获得要提交的数据字段，删除不需要的
        repalceData(obj, newObj) {
          for (let key of Object.keys(obj)) {
            if (newObj.hasOwnProperty(key) && newObj[key] !== undefined) {
              obj[key] = newObj[key];
            }
          }
        },
        submitForm: function() {
            var self = this;
            var allPass = true;
            var passed = this.internsPer.$schema.isFormValidate(this.$refs.internsper.$children[0]);
            if (!passed) {
                allPass = false;
                this.collapsible.per = true;
            }

            // this.idList.forEach(function(item, index){
            //   passed = item.$schema.isFormValidate(self.$refs.idtype.$children[index + 1], {
            //       focus: allPass
            //   });
            //   if (!passed) {
            //       allPass = false;
            //       self.collapsible.per = true;
            //   }
            // });
            // this.academicList.forEach(function(item, index){
            //   passed = item.$schema.isFormValidate(self.$refs.academiclist.$children[index + 1], {
            //       focus: allPass
            //   });
            //   if (!passed) {
            //       allPass = false;
            //       self.collapsible.academic = true;
            //   }
            // });
            // var passed = this.idType.$schema.isFormValidate(this.$refs.idtype.$children[0]);
            // 员工重新雇佣根据分类给隐藏的必填值设值，防止验证不通过
            if (this.isReHire && this.internsShip.employementCategory !== '9') {
              this.internsShip.isProbation = '2';
            }
            var probationBeginDate = this.internsShip.registerDate;
            var probationEndDate = this.internsShip.endDate;
            if (this.internsShip.isProbation === '2') {
              this.internsShip.registerDate = new Date();
              this.internsShip.endDate = new Date();
            }
            passed = this.internsShip.$schema.isFormValidate(this.$refs.internsjob.$children[0], {
                focus: allPass
            });
            if (!passed) {
                allPass = false;
                this.collapsible.internship = true;
            }
            this.internsShip.registerDate = probationBeginDate;
            this.internsShip.endDate = probationEndDate;
            if (!allPass) {
                return;
            }

            if (this.showMore) {
              this.show.addMoreConfirmText = 'Are you sure to save?';
            }
            this.addMoreSubmit();
            // this.show.addMoreConfirm = true;
        },
        cancel: function() {
            this.$route.router.go({
                name: this.source.refer
            });
        },
        // 删除掉值为undefind或者为空的项
        formatData(data) {
          for (let key of Object.keys(data)) {
            if (!data[key] && data[key] !== 0) {
              delete data[key];
            }
          }
        },
        // 提交表单但不继续添加信息
        addMoreCancel: function() {
          this.addMoreSubmit(true);
        },
        // 确定添加更多信息
        addMoreConfirm: function() {
          this.addMoreSubmit();
        },
        // 提交表单
        addMoreSubmit(isCancel) {
          this.submitLoading = true;
          var data = Object.assign({}, this.internsPer, this.internsShip);
          data.birthDate = formatDate(new Date(data.birthDate));
          if (data.startWorkDate) {
            data.startWorkDate = formatDate(new Date(data.startWorkDate));
          }
          if (data.hireBeginDate) {
            data.hireBeginDate = formatDate(new Date(data.hireBeginDate));
          }
          if (this.isEmployee) {
            data.hireDate = formatDate(new Date(data.hireDate));
          }
          if (this.isEmployee && data.isProbation !== '2') {
            data.probationBeginDate = formatDate(new Date(data.registerDate));
            data.probationEndDate = formatDate(new Date(data.endDate));
          } else {
            data.registerDate = data.registerDate ? formatDate(new Date(data.registerDate)) : '';
            data.endDate = data.endDate ? formatDate(new Date(data.endDate)) : '';
          }
          if (!this.employeeId) {
            delete data.employeeId;
          }
          // 删除不必要的字段
          this.delParmas.forEach(function(item) {
            delete data[item];
          });

          // 重新雇佣加上这个字段
          if (this.isReHire) {
            data.comeFromRehire = '1';
          }

          this.formatData(data);
          var idList = this.idList;
          var academicList = this.academicList;
          var idListArr = [],
              academicListArr = [];
          if (idList.length < 1) {
            this.submitLoading = false;
            Message({type:'error', message: this.$t('staff.message.needOneId')});
            return;
          }
          for (let i = 0, len = idList.length; i < len; i++) {
            let obj = {};
            obj.idType = idList[i].idType;
            obj.idNumber = idList[i].idNumber;
            if (idList[i].idIssueDate) {
              obj.idIssueDate = formatDate(new Date(idList[i].idIssueDate));
            }
            if (idList[i].idExpiredDate) {
              obj.idExpiredDate = formatDate(new Date(idList[i].idExpiredDate));
            }
            if (idList[i].attachmentId) {
              obj.attachmentId = idList[i].attachmentId;
            }
            obj.mainDocuments = idList[i].mainDocuments || 0;
            this.formatData(obj);
            idListArr.push(obj);
          }
          for (let i = 0, len = academicList.length; i < len; i++) {
            let obj = {};
            obj.institution = academicList[i].institution;
            obj.major = academicList[i].major;
            obj.admissionDate = formatDate(new Date(academicList[i].admissionDate));
            obj.graduationDate = formatDate(new Date(academicList[i].graduationDate));
            obj.educationLevel = academicList[i].educationLevel;
            obj.certificateNumber = academicList[i].certificateNumber;
            obj.learnType = academicList[i].learnType;
            obj.isTopGrade = academicList[i].isTopGrade;
            obj.grade = academicList[i].grade;
            this.formatData(obj);
            academicListArr.push(obj);
          }
          if (academicList.length < 1) {
            this.submitLoading = false;
            Message({type:'error', message: this.$t('staff.message.needOneEdu')});
            return;
          }
          var item = {};
          item['dictPassportList'] = idListArr;
          item['dictEducationList'] = academicListArr;
          convert(item, data, "", true);
          // 使用表单的数据格式提交头像图片
          if (this.photoId) {
            data.photoId = this.photoId;
          }
          this.submitData(data, isCancel);
          // if (this.avatarFiles.length > 0) {
          //   var formData = new FormData();
          //   this.avatarFiles.forEach(function(file) {
          //       formData.append('file', file);
          //   });
          //   this.$http.post('/system/attachment/uploadFile', formData).then(function(res) {
          //     //this.data.contractId = res.body;
          //     data.photoId = res.body;
          //     this.submitData(data, isCancel);
          //   });
          // } else {
          //   this.submitData(data, isCancel);
          // }
        },
        submitData(data, isCancel) {
          data.mibGrade = this.fixMibGrade(data.mibGrade);
          this.$http.post('/employee/employees/validateInBlackList', data, {
              emulateJSON: true
          }).then(function(res) {
            if (!res.data) {
              this.submitLoading = false;
              Message({type:'error',message:this.$t('staff.message.validateInBlackList')});
              return;
            }
            if (!this.employeeId) {
              this.$http.post(this.source.url, data, {
                  emulateJSON: true
              }).then(function(res) {
                  this.submitLoading = false;
                  this.employeeId = res.body;
                  this.showMore = true;
                  this.collapsible.per = false;
                  this.collapsible.internship = false;
                  this.collapsible.academic = false;
                  this.$refs.idtype.isEdit = true;
                  this.$refs.internsjob.isEdit = true;
                  Message({type:'success',message:this.$t('common.saveSuccess')});
                  this.cancel();
                  // if (isCancel) {
                  //   this.cancel();
                  // }
              },function() {
                this.submitLoading = false;
              });
            } else {
              this.$http.put('/employee/employees/' + this.employeeId, data, {
                  emulateJSON: true
              }).then(function(res) {
                  this.submitLoading = false;
                  Message({type:'success',message:this.$t('common.saveSuccess')});
                  this.collapsible.per = false;
                  this.collapsible.internship = false;
                  this.collapsible.academic = false;
                  this.cancel();
                  // this.employeeId = res.data;
              },function() {
                this.submitLoading = false;
              });
            }
          });
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
        // uploadAvatar(e) {
        //     var rawFile = e.srcElement.files;
        //     this.avatar = URL.createObjectURL(rawFile[0]);
        //     this.avatarFiles = Array.prototype.slice.call(rawFile, 0);
        // }
    },
    events: {
      addFileUpload(file, component) {
        if (this.files.auto) {
          component.active = true;
        }
      },
      afterFileUpload(file, component) {
        this.photoId = file.data;
        this.avatar = Vue.config.APIURL + '/system/attachment/downloadImg/' + file.data;
      },
      fileUploadFail(file, component) {
        Message({
            type: 'error',
            message: 'Files format limitation. Please upload png,jpeg,jpg,gif.'
        });
      }
    },
    components: {
        // AdditionalInfo: require('./updateInfoPart/additionalInfo.vue'),
        BasicInfo: require('./updateInfoPart/basicInfo.vue'),
        JobInfo: require('./updateInfoPart/jobInfo.vue'),
        // PersonalContact: require('./updateInfoPart/personalContact.vue'),
        // Contract: require('./updateInfoPart/contract.vue'),
        IdType: require('./updateInfoPart/idType.vue'),
        // Family: require('./updateInfoPart/family.vue'),
        // Bank: require('./updateInfoPart/bank.vue'),
        Education: require('./updateInfoPart/education.vue'),
        // TrainingCourse: require('./updateInfoPart/trainingCourse.vue'),
        // Experience: require('./updateInfoPart/experience.vue'),
        // Skill: require('./updateInfoPart/skill.vue'),
        Panel: require('../../components/basic/panel.vue'),
        FileUpload: require('../../components/basic/FileUpload.vue')
    }
};
</script>
