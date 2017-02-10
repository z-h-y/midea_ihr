<style lang="less">

.ihr-staff-interns {
    font-size: 14px;
    .visa-upload .text-editor {
      display: none;
    }
    .visa-upload .file-upload-content {
      position: relative;
      width: 400px;
    }
    .visa-upload .file-name {
      width: 280px!important;
    }
    .file-upload-content {
      .file-upload {
          display: inline-block;
          height: 32px;
          width: 80px;
          background-color: #6ec3ff;
      }
      .file-upload span{
          display: block;
          font-size: 16px;
          line-height: 32px;
          color: #fff;
          text-align: center;
      }
      span.file-name {
        position: absolute;
        width: 70px;
        height: 28px;
        line-height: 28px;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        position: absolute;
        right: 0;
        top: 6px;
        font-size: 16px;
        cursor: pointer;
      }
    }
}

</style>

<template lang="html">

  <div class="content-wrap bg-w ihr-staff-interns">
    <panel :title="$t('staff.overseasPosting')" class="panel-b mb-suitable" header="panel-header">
    <employee-common-info :employee-id="employeeId" :employee-info.sync="employeeInfo"></employee-common-info>
    <v-form v-ref:myform :model="overseas" :schema="overseasSchema" label-width="220" label-suffix="" :cols="1" form-style="int-join-com-form">
        <radiogroup-field :mapping="whetherType" property="isFirstDispatch"></radiogroup-field>
        <select-field property="expatriationCategory" :mapping="expatriationCategory" editor-width="400"></select-field>
        <text-field property="dispatchPositionName" type="selector" :readonly="true" :show.sync="position" editor-width="400"></text-field>
        <text-field property="businessCardTitle" editor-width="400"></text-field>
        <text-field property="disptachUnitName" :placeholder="$t('staff.selectPosition')" :readonly="true" editor-width="400"></text-field>
        <select-field :mapping="mibGradeMapping" property="jobGrade" editor-width="400"></select-field>
        <text-field :readonly="true" property="localGrade" editor-width="400"></text-field>
        <text-field property="dispatchAddress" editor-width="400"></text-field>
        <text-field property="startDate" :max-date="format(overseas.endDate)" editor-width="400"></text-field>
        <text-field property="endDate" :min-date="format(overseas.startDate)" editor-width="400"></text-field>
        <select-field :readonly="disableSelect" property="expatriationPeriod" :mapping="expatriationPeriod" editor-width="400"></select-field>
        <text-field type="textarea" :editor-height="100" editor-width="400" property="roles"></text-field>
        <text-field class="visa-upload" property="visa" editor-width="400">
          <div class="file-upload-content">
            <file-upload title="upload" class="file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" v-ref:upload :drop="files.drop"></file-upload>
            <span class="file-name" :title="fileName">{{fileName}}</span>
            <i v-show="fileName || fileName === '0'" class="fa fa-trash-o" aria-hidden="true" @click="delFile"></i>
          </div>
          <!-- <input-file class="visa-upload-file" name="file" :file-name="fileName" :change-file="changeFile" :del-file="delFile" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"></input-file> -->
        </text-field>
    </v-form>
    </panel>
    <position-selector :show.sync="position" :handle-comfirmed="selectPosition"></position-selector>
    <employee-submit v-ref:employeesubmit :form-confirmed="confirmed" :form-cancel="cancel" :is-form-validate="isFormValidate"></employee-submit>

</div>

</template>

<script>
import { default as Schema } from '../../../schema/index';
import {
    formatDate,
    getDictMapping,
    transformDict
} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';
export default {
    data() {
      var overseasData = {
          isFirstDispatch: {
               label: this.$t('staff.firstExpatriation')
          },
          expatriationCategory:{
              label: this.$t('staff.expatriationCategory'),
              required: true
          },
          disptachUnitName: {
               label: this.$t('staff.hostCompany'),
               required: true
          },
          dispatchAddress: {
               label: this.$t('staff.expatriationAddress'),
               required: true
          },
          dispatchPositionName: {
               label: this.$t('staff.mibPostion'),
               required: true
          },
          businessCardTitle: {
              label: this.$t('staff.position')
          },
          jobGrade: {
               label: this.$t('staff.mibGrade'),
               required: true
          },
          localGrade: {
              label: this.$t('staff.jobGrade')
          },
          expatriationPeriod: {
               label: this.$t('staff.expatriationAssignmentType'),
               required: true
          },
          startDate: {
              label: this.$t('staff.startDate'),
              type: 'date',
              required: true
          },
          endDate: {
              label: this.$t('staff.endDate'),
              type: 'date'
          },
          roles: {
               label: this.$t('staff.rolesResponsibilities'),
          },
          visa: {
              label: this.$t('staff.visaAttachment')
          }
      };
            return {
                employeeId: this.$route.params.employeeId,
                employeeInfo: {},
                fileName: '',
                overseasSchema: new Schema(overseasData),
                overseas: {},
                whetherType: {},
                expatriationCategory: {},
                expatriationPeriod: {},
                mibGradeMapping: {},
                files: {
                  url: Vue.config.APIURL + '/system/attachment/uploadFile',
                  accept: 'image/*,application/msexcel,application/msword,application/pdf',
                  size: 1024 * 1024 * 2,
                  multiple: false,
                  extensions: 'gif,jpg,jpeg,png,pdf,doc,docx,xlsx,xls',
                  // extensions: ['gif','jpg','png'],
                  // extensions: /\.(gif|png|jpg)$/i,
                  files: [],
                  upload: {},
                  drop: true,
                  auto: true
                },
                position: {
                    modal: false
                }
            };
        },
        computed: {
          disableSelect() {
            if(this.overseas.startDate && this.overseas.endDate) {
              return true;
            }
            return false;
          }
        },
        watch: {
          'overseas.startDate': function(newVal) {
            if (this.overseas.endDate && newVal) {
              if (this.overOneYear(newVal, this.overseas.endDate)) {
                this.overseas.expatriationPeriod = '1';
              } else {
                this.overseas.expatriationPeriod = '2';
              }
            }
          },
          'overseas.endDate': function(newVal) {
            if (this.overseas.startDate && newVal) {
              if (this.overOneYear(this.overseas.startDate, newVal)) {
                this.overseas.expatriationPeriod = '1';
              } else {
                this.overseas.expatriationPeriod = '2';
              }
            }
          }
        },
        created() {
          var self = this;
          let dictCodes = ['EXPATRIATION_CATEGORY', 'WHETHER_TYPE', 'EXPATRIATION_PERIOD'];
          let obj = {
            dictCodes : dictCodes
          }

          this.$http.post('/public-access/dicts/items', {
            dictCodes
          }, {
              emulateJSON: true
          }).then((response) => {
            for (var d of response.data) {
                if (d.dictName === 'EXPATRIATION_CATEGORY') {
                   self.expatriationCategory = transformDict(d.dict);
                }
                if (d.dictName === 'WHETHER_TYPE') {
                   self.whetherType = transformDict(d.dict);
                }
                if (d.dictName === 'EXPATRIATION_PERIOD') {
                   self.expatriationPeriod = transformDict(d.dict);
                }
            }
          });
        },
        ready() {
          this.overseas = this.overseasSchema.newModel();
        },
        attached() {},
        methods: {
          overOneYear(start, end) {
            var year = new Date(end).getFullYear() - new Date(start).getFullYear();
            var month = new Date(end).getMonth() - new Date(start).getMonth();
            var day = new Date(end).getDate() - new Date(start).getDate();
            if (year > 1 || (year === 1 && (month > 0 || (month === 0 && day > 0)))) {
              return true;
            }
            return false;
          },
          // changeFile(e) {
          //   var rawFile = e.srcElement.files;
          //   var files = Array.prototype.slice.call(rawFile, 0);
          //   if (!this.checkFileSize(files)) {
          //     return;
          //   }
          //   var name = [];
          //   var formData = new FormData();
          //   files.forEach(function(file) {
          //       name.push(file.name);
          //       formData.append('file', file);
          //   });
          //   this.idFileName = name.join(',');
          //   this.$http.post('/system/attachment/uploadFile', formData).then(function(res) {
          //     this.overseas.visa = res.body;
          //   });
          // },
          delFile() {
            this.overseas.visa = '';
            this.fileName = '';
          },
          checkFileSize(files) {
            var validate = true;
            if (files) {
              files.forEach(function(item) {
                if (item.size >= 2*1024*1024) {
                  validate = false;
                }
              })
            }
            if (!validate) {
              Message({type: 'error', message: this.$t('staff.message.fileUploadSize')});
            }
            return validate;
          },
          isFormValidate() {
              var passed = this.overseas.$schema.isFormValidate(this.$refs.myform);
              if (!passed) {
                return;
              }
              return passed;
          },
          confirmed() {
                  var data = Object.assign({}, this.overseas);
                  data.employeeId = this.employeeId;
                  data.jobGrade = this.fixMibGrade(data.jobGrade);
                  data.startDate = formatDate(new Date(data.startDate));
                  if (data.endDate) {
                    data.endDate = formatDate(new Date(data.endDate));
                  }
                  this.$http.post('/employee/employees/Expatriate/' + this.employeeId, data, {
                      emulateJSON: true
                  }).then(function(res) {
                    Message({
                        type: 'success',
                        message: this.$t('staff.message.overseasPostingSuccess')
                    });
                      this.$route.router.go({
                          name: 'regularEmployees'
                      });
                  },function(response) {
                      this.$refs.employeesubmit.loading = false;
                  });
          },
          cancel() {
              this.$route.router.go({
                  name: 'regularEmployees'
              });
          },
          format(value) {
            if(!value) {
              return;
            }
            return formatDate(new Date(value));
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
          },
          selectPosition(pos, org) {
            this.overseas.dispatchPositionName = pos.positionName;
            this.overseas.localPosition = pos.positionId;
            this.overseas.dispatchPositionCode = pos.positionCode;
            this.overseas.businessCardTitle = pos.businessTitle;
            this.overseas.jobGrade = undefined;
            this.overseas.localGrade = pos.localGrade;
            this.overseas.disptachUnitName = org.orgShortName;
            this.overseas.disptachUnitCode = org.orgCode;
            this.overseas.disptachUnitId = org.orgId;
            this.$http.get('/pos/positions/dicts/positionMibgrade/items/?positionId=' + pos.positionId).then(function(res) {
              var data = res.data;
              var result = {};
              for(var i = 0; i < data.length; i++) {
                result[data[i].NAME] = data[i].VALUE;
              }
              this.mibGradeMapping = result;
            })
          }
        },
        events: {
            'selected-person': function(value) {
                if (value && value instanceof Array) {
                    let tempNames = [],
                        tempIds = [];
                    for (let index of value.keys()) {
                        tempNames.push(value[index].employeeName);
                        tempIds.push(value[index].employeeId);
                    }
                    this.overseas.localSupervisor = tempNames.join(',');
                }
            },
            addFileUpload(file, component) {
              if (this.files.auto) {
                component.active = true;
              }
            },
            afterFileUpload(file, component) {
              this.overseas.visa = file.data;
              this.fileName = file.name;
            }
        },
        components: {
          EmployeeCommonInfo: require('../employeeCommonInfo.vue'),
          EmployeeSubmit: require('../employeeSubmit.vue'),
          // InputFile: require('./../input-file.vue'),
          Panel: require('../../../components/basic/panel.vue'),
          FileUpload: require('../../../components/basic/FileUpload.vue')
        }
};

</script>
