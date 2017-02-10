<style lang="less">

.ihr-position-notificationUpdate {
    .btn-file {
        width: 88px;
        height: 36px;
        position: relative;
        overflow: hidden;
    }
    .btn-file input {
        position: absolute;
        cursor: pointer;
        width: 190px;
        height: 32px;
        top: 0;
        left: -95px;
        opacity: 0;
    }
    .d-icon-plus {
        font-weight: bold;
        font-size: 16px;
        line-height: 1;
        margin-right: 10px;
    }
    .upload .btn {
        padding: 5px 12px;
        background-color: #6ec3ff;
        color: #fff;
        font-size: 13px;
        line-height: 1.5;
        border-radius: 3px;
    }
    .textarea {
        height: 65px;
        .field-hint {
            margin-top: -10px;
        }
    }
    .fileName {
        color: #545454;
        font-size: 12px;
    }
    .hide-text-editor {
        .text-editor {
            display: none;
        }
    }
    .file-upload-content {
      width: 400px;
      position: relative;
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
        width: 270px;
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

<div class="content-wrap ihr-position-notificationUpdate">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form v-ref:messageform :model="message" :schema="messageSchema" label-width="160" label-suffix="" :cols="1" form-style="org-form">
            <text-field property="messageTitle" editor-width="400"></text-field>
            <text-field class="textarea" property="messageBody" type="textarea" :editor-height="50" editor-width="400"></text-field>
            <!-- <text-field property="sendScope"  editor-width="400"></text-field> -->
            <text-field property="sendScopeName" editor-width="260" type="selector" :readonly="true" :show.sync="show"></text-field>
            <text-increment property="messageAttachment" editor-width="" class="hide-text-editor upload">
                <!-- <button type="button" class="btn btn-default btn-file">
                    <input type="file" name="messageAttachment" value="" @change="changeFile($event, 'messageAttachment')" id="fileupload">
                    <span class="d-icon-plus">+</span>Add
                </button>
                <span class="fileName">{{fileName}}</span>
                <i class="fa fa-remove poi f14" @click="delFile" v-if="fileName != null && fileName != '' "></i> -->
                <!-- <ui-button style="height: 36px;" v-if="fileName != null && fileName != '' " @click="delFile" class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat">Del Attachment</ui-button> -->
                <div class="file-upload-content">
                  <file-upload v-ref:upload title="Add" class="file-upload" name="messageFile" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" :drop="files.drop"></file-upload>
                  <span class="file-name" :title="fileName">{{fileName}}</span>
                  <i class="fa fa-remove poi f14 ml5" v-if="fileName != null && fileName != '' " @click="delFile"></i>
                </div>
            </text-increment>
        </v-form>
    </panel>
    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">Submit</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
    </div>

</div>
<organization-check-selector :show.sync="show"> </organization-check-selector>

</template>

<script>

import {
    default as Schema
}
from '../../../schema/index';
import {
    getDictMapping, formatDate
}
from '../../../util/assist';
import {
    default as Message
}
from '../../../components/basic/message';
let messageSchema = new Schema({
    messageTitle: {
        label: 'Subject',
        required: true,
        whitespace: false
    },
    messageBody: {
        label: 'Body',
        required: true,
        whitespace: false
    },
    sendScope: {
        label: 'Restrict to',
        required: true,
        whitespace: false
    },
    sendScopeName: {
        label: 'Restrict To',
        required: true,
        whitespace: false
    },
    messageType: {
        label: 'Type',
        mapping: {
            '系统信息': 'SYS'
        }
    },
    messageId: {

    },
    messageAttachment: {
        label: 'Attachment',
    }
});

export default {

    data() {
            return {
                panelTitle: 'Add Notification',
                messageSchema: messageSchema,
                message: messageSchema.newModel(),
                messageFile: [],
                files: {
                  url: Vue.config.APIURL + '/system/message/createMessage',
                  accept: 'image/*,application/msexcel,application/msword,application/pdf',
                  size: 1024 * 1024 * 2,
                  multiple: false,
                  extensions: 'gif,jpg,jpeg,png,pdf,doc,docx,xlsx,xls',
                  // extensions: ['gif','jpg','png'],
                  // extensions: /\.(gif|png|jpg)$/i,
                  files: [],
                  upload: {},
                  drop: true,
                  auto: false
                },
                fileName: '',
                show: {
                    modal: false
                }
            }
        },
        methods: {
            // 提交
            submit() {
                    let _messageModel = this.message,
                        _self = this;

                    let passed = this.message.$schema.isFormValidate(this.$refs.messageform);
                    if (!passed) return;

                    // var formData = new FormData();
                    // formData.append('messageTitle', _messageModel.messageTitle);
                    // formData.append('messageBody', _messageModel.messageBody);
                    // formData.append('sendScope', _messageModel.sendScope);
                    // formData.append('planSendDate', formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'));
                    // formData.append('businessType', '1');
                    // formData.append('messageType', 'SMS');
                    // this.messageFile.forEach(function(file) {
                    //     formData.append('messageFile', file);
                    // });
                    //
                    // this.$http.post('/system/message/createMessage', formData).then(function(res) {
                    //     Message({
                    //         type: 'success',
                    //         message: 'Successfully saved'
                    //     });
                    //     _self.$router.go({
                    //         name: 'notificationManage'
                    //     });
                    // });
                    var uploadData = {
                      messageTitle: _messageModel.messageTitle,
                      messageBody: _messageModel.messageBody,
                      sendScope: _messageModel.sendScope,
                      planSendDate: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                      businessType: '1',
                      messageType: 'SMS'
                    };
                    var upload = this.$refs.upload;
                    upload.request = {
                      data: uploadData
                    };
                    this.$refs.upload.active = true;
                },
                cancel() {
                    let _self = this;
                    _self.$router.go({
                        name: 'notificationManage'
                    });
                },
                parseFiles(rawFiles) {
                    return Array.prototype.slice.call(rawFiles, 0);
                },
                changeFile(e, fileName) {
                    var srcElement__src = e.srcElement.files;
                    switch (fileName) {
                        case 'messageAttachment':
                            this.messageFile = this.parseFiles(srcElement__src);
                            break;
                    }
                    this.fileName = this.messageFile[0].name;
                },
                delFile() {
                    this.messageFile = [];
                    this.fileName = '';
                }
        },
        events: {
            'organization-selector:selected': function(node) {
                if (!node) return;
                let tsendScope = [];
                let tsendScopeName = [];
                for (let n of node) {
                    tsendScope.push(n.orgId);
                    tsendScopeName.push(n.orgShortName);
                }

                this.message.sendScope = tsendScope.join(',');
                this.message.sendScopeName = tsendScopeName.join(',');
            },
            addFileUpload(file, component) {
                this.fileName = file.name;
                this.attachmentId = '';
            },
            afterFileUpload(file, component) {
                if (!file.error) {
                    Message({
                        type: 'success',
                        message: this.$t('common.addedSuccess')
                    });
                    this.$router.go({
                        name: 'notificationManage'
                    });
                }
            }
        },
        components: {
            Panel: require('../../../components/basic/panel.vue'),
            FileUpload: require('../../../components/basic/FileUpload.vue')
        }
}

</script>
