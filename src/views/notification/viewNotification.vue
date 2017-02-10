<style lang="less">

.ihr-viewNotification {
    * {
        box-sizing: border-box;
    }
    .panel-b {
        margin: 16px;
    }
    .label {
        float: left;
        white-space: nowrap;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 160px;
        height: 28px;
        padding-right: 16px;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
        color: #545454;
        font-weight: bold;
    }
    .text {
        height: 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        line-height: 28px;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        outline: none;
        color: #222;
        padding-right: 10px;
        font-size: 14px;
    }
    .download-btn {
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        padding: 0 10px;
    }
}

</style>

<template lang="html">

<div class="ihr-viewNotification">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <div class="mb20">
            <label class="label" for="">Subject</label>
            <span class="text">{{message.messageTitle}}</span>
        </div>
        <div class="mb20">
            <label class="label">Body</label>
            <span class="text">{{message.messageBody}}</span>
        </div>
        <div class="mb20">
            <label class="label">Creation Date</label>
            <span class="text">{{message.createDate | formatDate }}</span>
        </div>
        <div class="mb20">
            <label class="label">Recipients</label>
            <span class="text">{{message.unitShortName}}</span>
        </div>
        <div class="mb20"  v-if="message.attachmentId!=null && message.attachmentId!=''" >
            <label class="label">Attachment(s)</label>
            <span class="text" >{{message.attachmentName}}</span>
            <ui-button class="download-btn" @click="downloadFile" color="primary">Download</ui-button>
        </div>
    </panel>
    <div class="btn-group">
        <ui-button @click="cancel" class="btn-default-bd" type="flat">Close</ui-button>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

import {
    default as Schema
}
from '../../schema/index';

import {
    default as Message
}
from '../../components/basic/message';
import {
    convert, formatDate, downloadFile
}
from '../../util/assist.js';

export default {
    data() {
            return {
                panelTitle: 'Notification Details',
                message: {},
                operationType: ''
            }
        },
        methods: {
            cancel() {
                    if (this.$route.query.back === 'home') {
                      this.$router.go({
                          name: 'home'
                      });
                      return;
                    }
                    if (this.operationType === 'viewNotificationManage') {
                        this.$router.go({
                            name: 'notificationManage'
                        });
                    } else if (this.operationType === 'viewNotification') {
                        this.$router.go({
                            name: 'notification'
                        });
                    }
                },
                updateReadFlag(message) {
                    if (message.readStatus === 'N') {
                        let _self = this;
                        _self.$http.post('/system/message/updateMessageReciever', {
                            messageLineId: message.messageLineId,
                            messageId: message.messageId,
                            readFlag: 'Y'
                        }, {
                            emulateJSON: true
                        }).then((response) => {

                        });
                    }
                },
                downloadFile() {
                    let exportParam = {
                        attachmentId: this.message.attachmentId || ""
                    }
                    downloadFile('/system/attachment/downloadFile', exportParam);
                }
        },
        computed: {},
        ready() {



        },
        route: {
            data(transition) {

                let _self = this;
                _self.operationType = _self.$route.name;
                _self.message.id = transition.to.params.id;

                if (_self.operationType === 'viewNotificationManage') {
                    _self.$http.post('/system/message/findMessageReciever', {
                        messageId: _self.message.id
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        _self.message = response.data;
                    });
                } else if (_self.operationType === 'viewNotification') {
                    // _self.$http.post('/system/message/findMessageReciever', {
                    //     messageLineId: _self.message.id
                    // }, {
                    //     emulateJSON: true
                    // }).then((response) => {
                    //     _self.message = response.data;
                    //     _self.updateReadFlag(response.data);
                    // });

                    _self.$http.post('/system/message/findMessageReciever', {
                        messageId: _self.message.id
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        _self.message = response.data;
                        // _self.updateReadFlag(response.data);
                    });
                }
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
}

</script>
