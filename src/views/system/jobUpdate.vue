<style lang="less">

.ihr-system-jobUpdate {
    * {
        box-sizing: border-box;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-system-jobUpdate">
    <panel :title="panelTitle" class="panel-b m16" header="panel-header">
        <v-form v-ref:jobform :model="job" :schema="jobSchema" label-width="160" label-suffix="" :cols="1" form-style="org-form">
            <text-field property="name" editor-width="400"></text-field>
            <text-field property="beanId" editor-width="400"></text-field>
            <text-field property="executor" editor-width="400"></text-field>
            <text-field property="description" editor-width="400"></text-field>
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
let jobSchema = new Schema({
    name: {
        label: 'name',
        required: true,
        whitespace: false
    },
    beanId: {
        label: 'RPC service address',
        required: true,
        whitespace: false
    },
    executor: {
        label: 'RPC name',
        required: true,
        whitespace: false
    },
    description: {
        label: 'description',
        required: true,
        whitespace: false
    },
    id: {

    }
});

export default {

    data() {
            return {
                panelTitle: '',
                jobSchema: jobSchema,
                job: jobSchema.newModel()
            }
        },
        methods: {
            // 提交
            submit() {
                    let _jobModel = this.job,
                        _self = this;

                    let passed = this.job.$schema.isFormValidate(this.$refs.jobform);
                    if (!passed) return;

                    if (_self.$route.name === 'addJob') {
                        _self.$http.post('/scheduler/job/save', {
                            name: _jobModel.name,
                            executor: _jobModel.executor,
                            beanId: _jobModel.beanId,
                            description: _jobModel.description
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'job'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });
                    } else if (_self.$route.name === 'editJob') {
                        _self.$http.post('/scheduler/job/save', {
                            id: _jobModel.id,
                            name: _jobModel.name,
                            executor: _jobModel.executor,
                            beanId: _jobModel.beanId,
                            description: _jobModel.description
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (response)
                                _self.$router.go({
                                    name: 'job'
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
                        name: 'job'
                    });
                }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.job.id = transition.to.params.id;
                if (_self.$route.name === 'addJob') {
                    _self.panelTitle = 'Add System Job';


                } else if (_self.$route.name === 'editJob') {
                    _self.panelTitle = 'Edit System Job';

                    _self.$http.post('/scheduler/job/findJob', {
                        id: _self.job.id
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.job[prop] = props[prop];
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
