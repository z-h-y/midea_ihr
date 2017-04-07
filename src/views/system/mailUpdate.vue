<style lang="less">

.ihr-position-mailServer {
    * {
        box-sizing: border-box;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-position-mailServer">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form ref="emailform" :model="email" :schema="emailSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <text-field property='companyId' editor-width="400"></text-field>
            <text-field property='companyName' editor-width="400"></text-field>
            <text-field property='companyCode' editor-width="400"></text-field>
            <text-field property='email' editor-width="400"></text-field>
            <text-field property='emailAccount' editor-width="400"></text-field>
            <text-field property='pwd' editor-width="400"></text-field>
            <text-field property='maxReceiverNum' editor-width="400"></text-field>
            <text-field property='onceSendNum' editor-width="400"></text-field>
            <text-field property='ip' editor-width="400"></text-field>
            <text-field property='port' editor-width="400"></text-field>
            <select-field property='encryptType' editor-width="400"></select-field>
            <select-field property='status' editor-width="400"></select-field>

        </v-form>
    </panel>
    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">{{$t('button.submit')}}</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>
</div>

</template>

<script>

import Vue from 'vue';
import {
    default as Schema
}
from '../../schema/index';
import {
    getDictMapping
}
from '../../util/assist';

import {
    default as Message
}
from '../../components/basic/message';


export default {

    data() {
            let emailSchema = new Schema({
                companyId: {
                    label: this.$t('system.mailUpdate.companyId'),
                    required: true,
                    whitespace: false
                },
                companyName: {
                    label: this.$t('system.mailUpdate.companyName'),
                    required: true,
                    whitespace: false
                },
                companyCode: {
                    label: this.$t('system.mailUpdate.companyCode'),
                    required: true,
                    whitespace: false
                },
                email: {
                    label: this.$t('system.mailUpdate.email'),
                    required: true,
                    whitespace: false
                },
                emailAccount: {
                    label: this.$t('system.mailUpdate.emailAccount'),
                    required: true,
                    whitespace: false
                },
                pwd: {
                    label: this.$t('system.mailUpdate.pwd'),
                    required: true,
                    whitespace: false
                },
                maxReceiverNum: {
                    label: this.$t('system.mailUpdate.maxReceiverNum'),
                    required: true,
                    whitespace: false
                },
                onceSendNum: {
                    label: this.$t('system.mailUpdate.onceSendNum'),
                    required: true,
                    whitespace: false
                },
                ip: {
                    label: this.$t('system.mailUpdate.ip'),
                    required: true,
                    whitespace: false
                },
                port: {
                    label: this.$t('system.mailUpdate.port'),
                    required: true,
                    whitespace: false
                },
                encryptType: {
                    label: this.$t('system.mailUpdate.encryptType'),
                    mapping: {
                        'SSL': 'SSL',
                        'ON': 'ON'
                    }
                },
                status: {
                    label: 'status',
                    mapping: function() {
                        return getDictMapping('IS_ENABLED');
                    }
                },
                emaililConfigId: {

                }

            });
            return {
                panelTitle: '',
                emailSchema: emailSchema,
                email: emailSchema.newModel()
            }
        },
        methods: {
            // 提交
            submit() {
                    let _emailModel = this.email,
                        _self = this;

                    let passed = this.email.$schema.isFormValidate(this.$refs.emailform);
                    if (!passed) return;

                    if (_self.$route.name === 'addMail') {
                        _self.$http.post('/system/emailConfig/createEmailConfig', {
                            companyCode: _emailModel.companyCode,
                            companyName: _emailModel.companyName,
                            companyId: _emailModel.companyId,
                            email: _emailModel.email,
                            emailAccount: _emailModel.emailAccount,
                            pwd: _emailModel.pwd,
                            encryptType: _emailModel.encryptType,
                            ip: _emailModel.ip,
                            maxReceiverNum: _emailModel.maxReceiverNum,
                            onceSendNum: _emailModel.onceSendNum,
                            port: _emailModel.port,
                            status: _emailModel.status
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'mail'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });
                    } else if (_self.$route.name === 'editMail') {
                        _self.$http.post('/system/emailConfig/updateEmailConfig', {
                            emaililConfigId: _emailModel.emaililConfigId,
                            companyCode: _emailModel.companyCode,
                            companyName: _emailModel.companyName,
                            companyId: _emailModel.companyId,
                            email: _emailModel.email,
                            emailAccount: _emailModel.emailAccount,
                            pwd: _emailModel.pwd,
                            encryptType: _emailModel.encryptType,
                            ip: _emailModel.ip,
                            maxReceiverNum: _emailModel.maxReceiverNum,
                            onceSendNum: _emailModel.onceSendNum,
                            port: _emailModel.port,
                            status: _emailModel.status,
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (response)
                                _self.$router.go({
                                    name: 'mail'
                                });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });
                    }
                },
                cancel() {
                    let _self = this;
                    _self.$router.go({
                        name: 'mail'
                    });
                }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.email.emaililConfigId = transition.to.params.mailId;
                if (_self.$route.name === 'addMail') {
                    _self.panelTitle = 'Add Email';

                } else if (_self.$route.name === 'editMail') {
                    _self.panelTitle = 'Edit Email';

                    _self.$http.post('/system/emailConfig/findEmailConfig', {
                        emailId: _self.email.emaililConfigId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.email[prop] = props[prop];
                            }
                        }
                    });
                }
            }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
}

</script>
