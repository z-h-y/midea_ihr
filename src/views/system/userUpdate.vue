<style lang="less">

.ihr-system-userUpdate {
    * {
        box-sizing: border-box;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-system-userUpdate">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form v-ref:userform :model="user" :schema="userSchema" label-width="160" label-suffix="" :cols="1" form-style="org-form">
            <text-field property="loginId" editor-width="400"></text-field>
            <text-field property="userName" editor-width="400"></text-field>
            <text-field property="pwd" editor-width="400"></text-field>
            <text-field property="phone" editor-width="400"></text-field>
            <text-field property="email" editor-width="400"></text-field>
            <select-field property="isEnabled" editor-width="400"></select-field>
            <select-field property="canLocalLogin" editor-width="400"></select-field>
        </v-form>
    </panel>
    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">Submit</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
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
let userSchema = new Schema({
    loginId: {
        label: 'Login ID',
        required: true,
        whitespace: false
    },
    userName: {
        label: 'User Name',
        required: true,
        whitespace: false
    },
    phone: {
        label: 'Phone',
        required: true,
        whitespace: false
    },
    email: {
        label: 'Email',
        required: true,
        whitespace: false
    },
    pwd: {
        label: 'Password',
        required: true,
        whitespace: false
    },
    isEnabled: {
        label: 'Enabled',
        mapping: {
            'Allow': 'Y',
            'not allowed': 'N'
        }
    },
    canLocalLogin: {
        label: 'Can Local Login',
        mapping: {
            'Allow': 'Y',
            'not allowed': 'N'
        },
        multiSelect: false
    },
    userId: {

    }
});

export default {

    data() {
            return {
                panelTitle: '',
                userSchema: userSchema,
                user: userSchema.newModel()
            }
        },
        methods: {
            // 提交
            submit() {
                    let _userModel = this.user,
                        _self = this;

                    let passed = this.user.$schema.isFormValidate(this.$refs.userform);
                    if (!passed) return;

                    if (_self.$route.name === 'addUser') {
                        _self.$http.post('/system/user/createUser', {
                            loginId: _userModel.loginId,
                            userName: _userModel.userName,
                            pwd: _userModel.pwd,
                            phone: _userModel.phone,
                            email: _userModel.email,
                            isEnabled: _userModel.isEnabled,
                            canLocalLogin: _userModel.canLocalLogin
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'users'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });
                    } else if (_self.$route.name === 'editUser') {
                        _self.$http.post('/system/user/updateUser', {
                            userId: _userModel.userId,
                            loginId: _userModel.loginId,
                            userName: _userModel.userName,
                            pwd: _userModel.pwd,
                            phone: _userModel.phone,
                            email: _userModel.email,
                            isEnabled: _userModel.isEnabled,
                            canLocalLogin: _userModel.canLocalLogin
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (response)
                                _self.$router.go({
                                    name: 'users'
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
                        name: 'users'
                    });
                }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.user.loginId = transition.to.params.loginId;
                if (_self.$route.name === 'addUser') {
                    _self.panelTitle = 'Add System User';


                } else if (_self.$route.name === 'editUser') {
                    _self.panelTitle = 'Edit System User';

                    _self.$http.post('/system/user/findUserByLoginId', {
                        loginId: _self.user.loginId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.user[prop] = props[prop];
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
