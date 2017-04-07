<template lang="html">
<div>
  <ui-confirm ref="showdel" :title="$t('button.delete')" @confirm="delList" :show="showdel" close-on-confirm autofocus="confirm-button">
      {{$t('common.deleteConfirm')}}
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-header">
      <span>{{$t('staff.IDInformation')}}</span>
      <i v-show="!isEdit" class="fa fa-plus-square-o" aria-hidden="true" @click="add"></i>
    </div>
    <div class="id-tab">
      <div class="id-head fix">
        <span class="require">{{$t('staff.idType')}}</span>
        <span class="require">{{$t('staff.IDNumber')}}</span>
        <span>{{$t('staff.issueDateOfID')}}</span>
        <span>{{$t('staff.expiryDateOfID')}}</span>
        <span>{{$t('staff.IDAttachment')}}</span>
        <span class="require">{{$t('staff.primaryID')}}</span>
      </div>
      <div class="id-list fix" v-for="(item, index) in data">
        <span>{{fixDist(item.idType, 'idType')}}</span>
        <span>{{item.idNumber}}</span>
        <span>{{item.idIssueDate}}</span>
        <span>{{item.idExpiredDate}}</span>
        <span><em v-if="item.attachmentId" @click="downFile(index)"><i class="fa fa-cloud-download id-file-download" aria-hidden="true"></i>{{item.attachmentName}}</em></span>
        <span>{{fixDist(item.mainDocuments, mainDocumentsDist)}}</span>
        <span class="list-operate"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(index)"></i><i v-show="item.mainDocuments !== '1'" class="fa fa-trash-o" aria-hidden="true" @click="beforeDel(index)"></i></span>
      </div>
      <div class="edit-form edit-bg" v-show="isEdit">
        <v-form ref="idform" :model="idInfo" :schema="idSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
          <select-field :hide-label="true" :readonly="idInfo.mainDocuments === '1' && isEdited" property='idType' :mapping="dist.idType" :disable-value="getDisableValue(index)" editor-width="140"></select-field>
          <text-field :hide-label="true" :readonly="idInfo.mainDocuments === '1' && isEdited" property='idNumber' editor-width="140"></text-field>
          <text-field :hide-label="true" property='idIssueDate' editor-width="140" :max-date="idInfo.idExpiredDate || curDate"></text-field>
          <text-field :hide-label="true" property='idExpiredDate' editor-width="140" :min-date="idInfo.idIssueDate"></text-field>
          <div class="field id-type-radiogroupfield field-hashint cell-1-6">
            <label style="width: 170px;display: none;">{{$t('staff.IDAttachment')}}</label>
            <div class="id-file-upload">
              <file-upload @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload" :title="$t('button.upload')" class="file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" ref="upload" :drop="files.drop"></file-upload>
              <span class="file-name" :title="idFileName">{{idFileName}}</span>
              <i v-show="idFileName || idFileName === '0'" class="fa fa-trash-o" aria-hidden="true" @click="delFile"></i>
            </div>
            <!-- <input-file name="id-type-file" :file-name="idFileName" :change-file="changeFile" :del-file="delFile" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"></input-file> -->
          </div>
          <select-field :hide-label="true" v-show="!isEdited" property='mainDocuments' :mapping="mainDocumentsDist" editor-width="140"></select-field>
        </v-form>
        <div class="save-info-group">
            <ui-button color="primary mr10" @click="submitForm">{{$t('button.save')}}</ui-button>
            <ui-button class="btn-default-bd" @click="cancel" type="flat">{{$t('button.cancel')}}</ui-button>
        </div>
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
  props: {
    dist: {},
    parentId: {},
    selectedNum: {}
  },
  data() {
    var self = this;
    var idData = {
        idType: {
            label: this.$t('staff.idType'),
            required: true
        },
        idNumber: {
            label: this.$t('staff.IDNumber'),
            required: true,
            rules: {
              type: 'custom',
              message: this.$t('staff.message.typeError'),
              validate() {
                return self.idNumberValiate;
              }
            }
        },
        idIssueDate: {
            type: 'date',
            label: this.$t('staff.issueDateOfID')
        },
        idExpiredDate: {
            type: 'date',
            label: this.$t('staff.expiryDateOfID')
        },
        attachmentId: {
            label: this.$t('staff.IDAttachment')
        },
        mainDocuments: {
          label: this.$t('staff.primaryID'),
          default: '0'
        },
        attachmentName: {}
    };
    return {
      data: [],
      idFileName: '',
      isEdited: !!this.$route.params.employeeId,
      idSchema: new Schema(idData),
      delIndex: 0,
      showdel: false,
      isEdit: false,
      index: -1,
      idInfo: {},
      idNumberValiate: true,
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
  computed: {
    curDate() {
      return formatDate(new Date());
    },
    mainDocumentsDist() {
      var obj = {};
      var dist = this.dist.whetherType;
      if (dist) {
        for (let key of Object.keys(dist)) {
          if (dist[key] === '1') {
            obj[key] = '1';
          } else if(dist[key] === '2') {
            obj[key] = '0';
          }
        }
      }
      return obj;
    },
    idTypeDistLen() {
      return  Object.keys(this.dist.idType).length;
    }
  },
  created() {},
  mounted() {
    this.idInfo = this.idSchema.newModel();
    var employeeId = this.$route.params.employeeId;
    if (!employeeId) {
       this.isEdit = true;
      // this.data.push(this.idSchema.newModel());
    }
  },

  methods: {
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
    add() {
      this.isEdit = true;
      this.index = -1;
      this.idFileName = '';
      this.idInfo.reset();
      var el = this.$refs.idform.$el.parentNode;
      var list = document.getElementsByClassName('id-tab')[0];
      var node = list.getElementsByClassName('id-list')[0];
      if (node) {
        list.insertBefore(el, node);
      }
    },
    edit(index) {
      this.isEdit = true;
      this.idFileName = this.data[index].attachmentName;
      this.idInfo.reset();
      Object.assign(this.idInfo, this.data[index]);
      var el = this.$refs.idform.$el.parentNode;
      var list = document.getElementsByClassName('id-tab')[0];
      var node = list.getElementsByClassName('id-list')[index];
      list.insertBefore(el, node);
      node.style.display = 'none';
      this.index = index;
    },
    cancel() {
      this.isEdit = false;
      if (this.index !== -1) {
        document.getElementsByClassName('id-list')[this.index].style.display = 'block';
      }
      this.index = -1;
    },
    submitForm() {
      var data = {};
      var index = -1;
      switch (this.idInfo.idType) {
        // 中国身份证
        case '1':
          if(this.idInfo.idNumber.length < 15 || this.idInfo.idNumber.length > 18) {
            this.idNumberValiate = false;
          }
          break;
        // 越南身份证
        case '4':
          if(this.idInfo.idNumber.length !== 12 && this.idInfo.idNumber.length !== 9) {
            this.idNumberValiate = false;
          }
          break;
      }
      var passed = true;
      passed = this.$refs.idform.isFormValidate();
      this.idNumberValiate = true;
      if (!passed) {
        return;
      }
      index = this.index;
      data = {
        idType: this.idInfo.idType,
        idNumber: this.idInfo.idNumber,
        idIssueDate: this.idInfo.idIssueDate ? formatDate(new Date(this.idInfo.idIssueDate)) : '',
        idExpiredDate: this.idInfo.idExpiredDate? formatDate(new Date(this.idInfo.idExpiredDate)) : '',
        mainDocuments: this.idInfo.mainDocuments,
        attachmentId: this.idInfo.attachmentId,
        attachmentName: this.idInfo.attachmentName
      };

      var hasPrimaryID = false;
      this.data.forEach(function(item) {
        if (data.mainDocuments === '1') {
          item.mainDocuments = '0';
        } else if (item.mainDocuments === '1' && index === -1) {
          hasPrimaryID = true;
        }
      })
      if (!hasPrimaryID) {
        data.mainDocuments = '1';
      }

      if (index === -1) {
        this.data.push(data);
      } else {
        Object.assign(this.data[index], data);
        document.getElementsByClassName('id-list')[index].style.display = 'block';
      }
      this.index = -1;
      this.idFileName = '';
      this.isEdit = false;
    },
    delFile() {
      this.idInfo.attachmentId = '';
      this.idInfo.attachmentName = '';
      this.idFileName = '';
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
    downFile(index) {
      if (this.data && this.data[index].attachmentId) {
        downloadFile('/system/attachment/downloadFile', {attachmentId: this.data[index].attachmentId});
      }
    },
    getDisableValue(index) {
      var arr = [];
      this.data.forEach(function(item, idx){
        if ((item.idType || item.idType === '0') && index !== idx) {
          arr.push(item.idType);
        }
      })
      return arr;
    },
    initList: function() {
      var self = this;
      this.data.forEach(function(item, index){
        var model = self.idSchema.newModel();
        var obj = Object.assign(model,item);
        self.data.splice(index, 1, obj);
      })
    },
    addList: function() {
      this.data.push(this.idSchema.newModel());
    },
    beforeDel: function(index) {
      this.delIndex = index;
      this.showdel = true;
      this.$refs.showdel.open()
    },
    delList: function() {
      this.selectedNum = this.selectedNum > this.delIndex ? this.selectedNum - 1 : this.selectedNum;
      this.data.splice(this.delIndex, 1);
      this.$nextTick(function() {
          var a = document.getElementById('radio-idtype-' + this.selectedNum).getElementsByTagName('input')[0].checked = true;
      });
    },
    format(value) {
      if (!value) {
        return;
      }
      return formatDate(new Date(value));
    },
    addFileUpload(file, component) {
      if (this.files.auto) {
        component.active = true;
      }
    },
    afterFileUpload(file, component) {
      this.idInfo.attachmentId = file.data;
      this.idInfo.attachmentName = file.name;
      this.idFileName = file.name;
    }
  },
  components: {
    // InputFile: require('./../input-file.vue'),
    FileUpload: require('../../../components/basic/FileUpload.vue')
  }
};
</script>

<style lang="less">
.id-type-radiogroupfield .radio-input-wrapper {
  height: 32px;
}
.update-interns-form {
  .id-type-file {
    width: 140px;
  }
  .id-file-download {
    cursor: pointer;
  }
}
.id-tab {
  .id-list {
    position: relative;
  }
  .id-list em {
    cursor: pointer;
  }
  .list-operate {
    position: absolute;
    width: auto;
    right: 28px;
  }
  .id-list span {
    height: 40px;
  }
  span.require:after {
    content: '*';
    color: #ed5565;
    margin-right: 2px;
    margin-left: 4px;
  }

  .id-file-upload {
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
