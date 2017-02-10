<template lang="html">
  <ui-confirm header="Save" @confirmed="save" :show.sync="showSave" close-on-confirm autofocus="confirm-button">
      Do you want to save this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-content">
      <i v-show="!isEdit" class="edit-btn fa fa-pencil-square-o" aria-hidden="true" @click="edit"></i>
      <ul class="fix" v-show="!isEdit">
        <li><span>Contract Number</span>{{ data.contractNo }}</li>
        <li><span>Contract Type</span>{{ fixDist(data.contractType, 'contractType') }}</li>
        <li><span>Start Date</span>{{ data.startDate }}</li>
        <li><span>End Date</span>{{ data.endDate }}</li>
        <li><span>Length Of Contract</span>{{ fixDist(data.contractLength, 'contractLength') }}</li>
        <li><span>Subject Of Contract</span>{{ data.contractSubject }}</li>
        <li><span>Confidential Agreement</span><i v-if="data.confidentiaAgreement" class="fa fa-cloud-download contract-file-download" aria-hidden="true" @click="downFile('confidentiaAgreement')"></i></li>
        <li><span>Non Confidential Agreement</span><i v-if="data.nonCompetitionAgreement" class="fa fa-cloud-download contract-file-download" aria-hidden="true" @click="downFile('nonCompetitionAgreement')"></i></li>
      </ul>
      <div class="edit-form" v-show="isEdit">
        <v-form v-ref:form :model="data" :schema="contractSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
            <text-field property="contractNo" editor-width="250"></text-field>
            <select-field property="contractType" :mapping="dist.contractType" editor-width="250"></select-field>
            <select-field property="contractLength" :mapping="dist.contractLength" editor-width="250"></select-field>
            <text-field property="startDate" :max-date="format(data.endDate)" editor-width="250"></text-field>
            <text-field property="endDate" :min-date="format(data.startDate)" editor-width="250"></text-field>
            <text-field property="contractSubject" editor-width="250"></text-field>
            <text-increment property="confidentiaAgreement" editor-width="250" class="hide-text-editor">
              <input type="file" class="contract-file" name="confidentiaAgreement" value="" @change="changeFile($event, 'confidentiaAgreement')" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed">
            </text-increment>
            <text-increment property="nonCompetitionAgreement" editor-width="250" class="hide-text-editor">
              <input type="file" class="contract-file" name="nonCompetitionAgreement" value="" @change="changeFile($event, 'nonCompetitionAgreement')" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed">
            </text-increment>
        </v-form>
        <div class="save-info-group">
            <ui-button color="primary mr10" @click="saveComfirmed">Submit</ui-button>
            <ui-button class="btn-default-bd" @click="cancel" type="flat">Cancel</ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    default as Schema
}
from '../../../schema/index';
import {
    getDictMapping,formatDate,downloadFile
} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';
export default {
  props: [
    {
      name: 'data'
    },
    {
      name: 'employeeId'
    },
    {
      name: 'parentId'
    }
  ],
  data() {
    let contractData = {
        contractNo: {
            label: 'Contract Number',
            required: true,
            whitespace: false
        },
        contractType: {
            label: 'Contract Type',
            required: true
        },
        startDate: {
            label: 'Start Date',
            type: 'date',
            required: true
        },
        endDate: {
            label: 'End Date',
            type: 'date',
            required: true
        },
        contractLength: {
            label: 'Length Of Contract',
            required: true
        },
        contractSubject: {
            label: 'Subject Of Contract',
            required: true,
            whitespace: false
        },
        confidentiaAgreement: {
            label: 'Confidential Agreement',
        },
        nonCompetitionAgreement: {
            label: 'Non Confidential Agreement',
        }
    };
    return {
      contractSchema: new Schema(contractData),
      showSave: false,
      confidentiaAgreementFile: [],
      nonCompetitionAgreementFile: [],
      isEdit: false,
      temp: {},
      dist: {
        contractType: {},
        contractLength: {}
      }
    };
  },
  computed: {},
  created() {
    var self = this;
    getDictMapping('CONTRACT_TYPE').then(function(res) {
      self.dist.contractType = res;
    });
    getDictMapping('CONTRACT_LENGTH').then(function(res) {
      self.dist.contractLength = res;
    });
  },
  ready() {
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    this.data = this.contractSchema.newModel();
    if (this.employeeId) {
      this.getContract();
    }
  },
  attached() {},
  methods: {
    getContract() {
      this.$http.get('/employee/employees/' + this.employeeId + '/Contract').then(function(res) {
        this.data = Object.assign(this.data, res.data);
      });
    },
    fixDist(value, dist) {
      var result = '';
      var curDist = dist;
      if (typeof dist === 'string') {
        curDist = this.dist[dist];
      }
      for (var key of Object.keys(curDist)) {
        if (curDist[key] === value) {
          result = key;
          break;
        }
      }
      return result;
    },
    edit() {
      Object.assign(this.temp, this.data);
      this.isEdit = true;
      this.$dispatch('ui-collapsible::refresh-height', this.parentId);
    },
    cancel() {
      Object.assign(this.data, this.temp);
      this.isEdit = false;
      this.$dispatch('ui-collapsible::refresh-height', this.parentId);
    },
    downFile(file) {
      var attachmentId = '';
      if (!file) {
        return;
      } else if (file === 'confidentiaAgreement') {
        attachmentId = this.data.confidentiaAgreement;
      } else if (file === 'nonCompetitionAgreement') {
        attachmentId = this.data.nonCompetitionAgreement;
      }
      downloadFile('/system/attachment/downloadFile', {attachmentId: attachmentId});
    },
    saveComfirmed() {
      var passed = this.data.$schema.isFormValidate(this.$refs.form);
      if (!passed) {
        return;
      }
      this.save();
      // this.showSave = true;
    },
    save() {
        var contractId = this.data.contractId;
        var formData = new FormData();
        if (contractId) {
          formData.append('contractId', contractId);
        }
        formData.append('employeeId', this.employeeId);
        formData.append('contractNo', this.data.contractNo);
        formData.append('contractType', this.data.contractType);
        formData.append('startDate', formatDate(new Date(this.data.startDate)));
        formData.append('endDate', formatDate(new Date(this.data.endDate)));
        formData.append('contractLength', this.data.contractLength);
        formData.append('contractSubject', this.data.contractSubject);
        this.confidentiaAgreementFile.forEach(function(file) {
            formData.append('confidentiaAgreementFile', file);
        });
        this.nonCompetitionAgreementFile.forEach(function(file) {
            formData.append('nonCompetitionAgreementFile', file);
        });
		if (contractId) {
			//WXY更新
			this.$http.post('/employee/employees/' + this.employeeId + '/Contract/' + contractId, formData).then(function(res) {
				this.getContract();
        this.isEdit = false;
				Message({type:'success',message:this.$t('common.saveSuccess')});
			});
		} else {
			//WXY新增
			this.$http.post('/employee/employees/' + this.employeeId + '/Contract/' , formData).then(function(res) {
				this.data.contractId = res.body;
        this.getContract();
        this.isEdit = false;
				Message({type:'success',message:this.$t('common.saveSuccess')});
			});
		}
    },
    parseFiles(rawFiles) {
        return Array.prototype.slice.call(rawFiles, 0);
    },
    changeFile(e, fileName) {
      var srcElement__src = e.srcElement.files;
      switch (fileName) {
        case 'confidentiaAgreement':
          this.confidentiaAgreementFile = this.parseFiles(srcElement__src);
          break;
        case 'nonCompetitionAgreement':
          this.nonCompetitionAgreementFile = this.parseFiles(srcElement__src);
          break;
      }
    },
    format(value) {
      if (!value) {
        return;
      }
      return formatDate(new Date(value));
    }
  },
  components: {}
};
</script>

<style lang="less">
.hide-text-editor .text-editor {
  display: none;
}
.update-interns-form {
  .contract-save-btn {
    font-size: 20px;
    text-align: right;
    cursor: pointer;
  }
  .contract-file {
    width: 200px;
  }
  .contract-file-download {
    cursor: pointer;
  }
}

</style>
