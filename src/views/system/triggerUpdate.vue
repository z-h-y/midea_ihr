<style lang="less">



</style>

<template lang="html">

<div class="ihr-position-triggerUpdate">
    <panel :title="panelTitle" class="panel-b mt20 ml20 mb20 mr20" header="panel-header">
        <v-form v-ref:triggerform :model="trigger" :schema="triggerSchema" label-width="160" label-suffix="" :cols="1" form-style="org-form">

            <select-field property='type' editor-width="400"></select-field>
            <text-field property="name" editor-width="400"></text-field>
            <text-field property="cronExpression" editor-width="400"></text-field>
            <text-field property="description" editor-width="400"></text-field>
            <radioGroup-field property='isForever'></radioGroup-field>
            <text-field property="startTime" editor-width="400"></text-field>
            <text-field property="endTime" editor-width="400"></text-field>

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
    getDictMapping,
    formatDate
}
from '../../util/assist';

import {
    default as Message
}
from '../../components/basic/message';
let triggerSchema = new Schema({
    type: {
        label: 'type',
        mapping: {
            'cron_expression': 'cron_expression'
        },
        required: true
    },
    name: {
        label: 'name',
        required: true,
        whitespace: false
    },
    cronExpression: {
        label: 'cronExpression',
        required: true,
        whitespace: false
    },
    description: {
        label: 'description',
        required: true,
        whitespace: false
    },
    isForever: {
        label: 'isForever',
        default: 'Y',
        mapping: {
            'Yes': 'Y',
            'No': 'N'
        },
        required: true
    },
    startTime: {
        label: 'startTime',
        required: true,
        type: 'date',
        rules: {
            type: 'custom',
            message: '日期有误！',
            validate() {
                if (!this.endTime || new Date(this.endTime) >= new Date(this.startTime)) {
                    return true;
                } else {
                    this.startTime = '';
                    return false;
                }
            }
        },
        default () {
            return new Date();
        }
    },
    endTime: {
        label: 'endTime',
        required: true,
        type: 'date',
        rules: {
            type: 'custom',
            message: '日期有误！',
            validate() {
                if (!this.startTime || new Date(this.endTime) >= new Date(this.startTime)) {
                    return true;
                } else {
                    this.endTime = '';
                    return false;
                }
            }
        },
        default () {
            return new Date();
        }
    },
    id: {

    }
});

export default {

    data() {
            return {
                panelTitle: '',
                triggerSchema: triggerSchema,
                trigger: triggerSchema.newModel()
            }
        },
        methods: {
            // 提交
            submit() {
                    let _triggerModel = this.trigger,
                        _self = this;

                    let passed = this.trigger.$schema.isFormValidate(this.$refs.triggerform);
                    if (!passed) return;

                    _self.$http.post('/scheduler/trigger/validateCron', {
                        cron: _triggerModel.cronExpression
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.data) {
                            _self.saveData();
                        } else {
                            Message({
                                type: 'error',
                                message: 'Please enter the correct expression'
                            });
                        }
                    });
                },
                saveData() {

                    let _triggerModel = this.trigger,
                        _self = this;
                    if (_self.$route.name === 'addTrigger') {

                        _self.$http.post('/scheduler/trigger/save', {
                            type: _triggerModel.type,
                            name: _triggerModel.name,
                            cronExpression: _triggerModel.cronExpression,
                            description: _triggerModel.description,
                            isForever: _triggerModel.isForever,
                            startTime: formatDate(_triggerModel.startTime),
                            endTime: formatDate(_triggerModel.endTime)
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'trigger'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });
                    } else if (_self.$route.name === 'editTrigger') {
                        _self.$http.post('/scheduler/trigger/save', {
                            id: _triggerModel.id,
                            type: _triggerModel.type,
                            name: _triggerModel.name,
                            cronExpression: _triggerModel.cronExpression,
                            description: _triggerModel.description,
                            isForever: _triggerModel.isForever,
                            startTime: formatDate(_triggerModel.startTime),
                            endTime: formatDate(_triggerModel.endTime)
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (response)
                                _self.$router.go({
                                    name: 'trigger'
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
                        name: 'trigger'
                    });
                }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.trigger.id = transition.to.params.id;
                if (_self.$route.name === 'addTrigger') {
                    _self.panelTitle = 'Add System Trigger';


                } else if (_self.$route.name === 'editTrigger') {
                    _self.panelTitle = 'Edit System Trigger';

                    _self.$http.post('/scheduler/trigger/showEdit', {
                        id: _self.trigger.id
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.trigger[prop] = props[prop];
                            }
                        }

                        _self.trigger.startTime = formatDate(new Date(_self.trigger.startTime));
                        _self.trigger.endTime = formatDate(new Date(_self.trigger.endTime));
                    });
                }
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
}

</script>
