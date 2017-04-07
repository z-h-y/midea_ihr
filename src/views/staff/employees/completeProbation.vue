<style lang="css">

  .panel-b{
		border:	1px solid #ecedee;
	}
  .foot-submit {
    text-align: right;
  }
  .visa-upload-file {
    width: 230px;
  }
</style>

<template lang="html">
  <div class="ihr-staff-interns content-wrap">

    <panel :title="$t('staff.completeProbation')" class="panel-b mb-suitable" header="panel-header">
      <employee-common-info :employee-id="employeeId" :edit-able="false"></employee-common-info>
      <v-form ref="myform" :model="comp" :schema="compSchema" label-width="250" label-suffix="" :cols="1" form-style="org-form">
          <text-increment property="beginDate" editor-width="400"></text-increment>
          <text-increment property="endDate" editor-width="400"></text-increment>
          <text-field property='actualEndDate' :min-date="comp.beginDate" editor-width="400"></text-field>
          <text-field type="textarea" :editor-height="100" editor-width="400" property="kpi"></text-field>
          <text-field type="textarea" :editor-height="100" editor-width="400" property="probationEvaluation"></text-field>
          <text-field class="visa-upload" property="visa" editor-width="400">
            <!-- <input-file class="visa-upload-file" name="file" :file-name="fileName" :change-file="changeFile" :del-file="delFile" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"></input-file> -->
            <div class="file-upload-content">
              <file-upload @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload" :title="$t('button.upload')" class="file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" ref="upload" :drop="files.drop"></file-upload>
              <span class="file-name" :title="fileName">{{fileName}}</span>
              <i v-show="fileName || fileName === '0'" class="fa fa-trash-o" aria-hidden="true" @click="delFile"></i>
            </div>
          </text-field>
      </v-form>
    </panel>
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
      let compSchema = new Schema({
          beginDate: {
              label: this.$t('staff.probationstartDate')
          },
          endDate: {
              label: this.$t('staff.probationEndDate')
          },
          actualEndDate: {
              label: this.$t('staff.probationActualEndDate'),
              type: 'date',
              required: true
          },
          kpi: {
              label: this.$t('staff.probationKPI')
          },
          probationEvaluation: {
              label: this.$t('staff.probationResults'),
              required: true
          },
          visa: {
              label: this.$t('staff.attachment')
          }

      });
        return {
            employeeId: this.$route.params.employeeId,
            compSchema: compSchema,
            comp: compSchema.newModel(),
            fileName: '',
            files: {
              url: Vue.config.APIURL + '/system/attachment/uploadFile',
              accept: 'image/:,application+/msexcel,application/msword,application/pdf',
              size: 1024 * 1024 * 2,
              multiple: false,
              extensions: 'gif,jpg,jpeg,png,pdf,doc,docx,xlsx,xls',
              // extensions: ['gif','jpg','png'],
              // extensions: /\.(gif|png|jpg)$/i,
              files: [],
              upload: {},
              drop: true,
              auto: true
            }
        };
    },
    computed: {},
    mounted() {
        this.$http.get('/employee/onProbation/employees/' + this.employeeId + '/probationInfo').then(function(res) {
            Object.assign(this.comp, res.data);
            if (res.data.beginDate) {
              this.comp.beginDate = formatDate(new Date(res.data.beginDate));
            }
            if (res.data.endDate) {
              this.comp.endDate = formatDate(new Date(res.data.endDate));
              this.comp.actualEndDate = new Date(res.data.endDate);
            }
        })
    },
    methods: {
        delFile() {
          this.comp.visa = '';
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
          var passed = this.$refs.myform.isFormValidate();
          return passed;
        },
        confirmed() {
              this.$http.post('/employee/onProbation/employees/' + this.employeeId + '/completion', {
                  employeeId: this.employeeId,
                  actualEndDate: formatDate(new Date(this.comp.actualEndDate)),
                  probationEvaluation: this.comp.probationEvaluation,
                  attachmentId: this.comp.visa || ''
              }, {
                  emulateJSON: true
              }).then(function(res) {
                Message({
                    type: 'success',
                    message: this.$t('staff.message.probationSuccess')
                });
                  this.$router.push({
                      name: 'employeesOnProbation'
                  });
              },(response) => {
                  this.$refs.employeesubmit.loading = false;
              });
        },
        cancel() {
            this.$router.push({
                name: 'employeesOnProbation'
            });
        },
        addFileUpload(file, component) {
          if (this.files.auto) {
            component.active = true;
          }
        },
        afterFileUpload(file, component) {
          this.comp.visa = file.data;
          this.fileName = file.name;
        }
    },
    components: {
        EmployeeSubmit: require('../employeeSubmit.vue'),
        // InputFile: require('./../input-file.vue'),
        Panel: require('../../../components/basic/panel.vue'),
        EmployeeCommonInfo: require('../employeeCommonInfo.vue'),
        FileUpload: require('../../../components/basic/FileUpload.vue')
    }
};
</script>
