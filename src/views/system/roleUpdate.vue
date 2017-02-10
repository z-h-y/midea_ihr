<style lang="less">

.ihr-system-roleAdd {
    * {
        box-sizing: border-box;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-system-roleAdd">
    <panel :title="panelTitle" class="panel-b mt20 ml20 mb20 mr20" header="panel-header">
        <v-form v-ref:roleform :model="role" :schema="roleSchema" label-width="150" label-suffix="" :cols="1" form-style="">
            <text-field property="roleName" editor-width="400"></text-field>
            <select-field property="roleType" editor-width="400"></select-field>
            <text-field property="description" editor-width="400"></text-field>
        </v-form>
        <div class="btn-group">
            <ui-button @click="submit" color="primary mr10">Submit</ui-button>
            <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
        </div>
    </panel>
</div>

</template>

<script>

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
let roleSchema = new Schema({
    roleName: {
        label: 'System Role Name',
        required: true,
        whitespace: false
    },
    roleType: {
        label: 'System Role Type',
        required: true,
        mapping: function() {
            return getDictMapping('SYS_ROLE_TYPE');
        }
    },
    description: {
        label: 'description',
        required: true,
        whitespace: false
    },
    roleId: {

    }
});
export default {
    data() {
            return {
                panelTitle: 'Add System Role',
                roleSchema: roleSchema,
                role: roleSchema.newModel()
            }
        },
        computed: {},
        ready() {},
        attached() {},
        methods: {
            // 提交
            submit() {
                    let _roleModel = this.role,
                        _self = this;

                    let passed = this.role.$schema.isFormValidate(this.$refs.roleform);
                    if (!passed) return;

                    if (_self.$route.name === 'addRole') {
                        _self.$http.post('/system/role/createRole', {
                            roleName: _roleModel.roleName,
                            roleType: _roleModel.roleType,
                            description: _roleModel.description
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'role'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });
                    } else if (_self.$route.name === 'editRole') {
                        _self.$http.post('/system/role/updateRole', {
                            roleId: _roleModel.roleId,
                            roleName: _roleModel.roleName,
                            roleType: _roleModel.roleType,
                            description: _roleModel.description
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'role'
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
                        name: 'role'
                    });
                }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        },
        route: {
            data(transition) {
                let _self = this;
                _self.role.roleId = transition.to.params.roleId;
                if (_self.$route.name === 'addRole') {
                    _self.panelTitle = 'Add System Role';


                } else if (_self.$route.name === 'editRole') {
                    _self.panelTitle = 'Edit System Role';
                    _self.$http.get(`/pos/standardJobs/${_self.role.roleId}`).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.role[prop] = props[prop];
                            }
                        }
                    });
                }
            }
        }
}

</script>
