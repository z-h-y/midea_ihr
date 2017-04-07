<style lang="less">

.ihr-position-addGroup {
    * {
        box-sizing: border-box;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-position-addGroup">
    <panel :title="panelTitle" class="panel-b" id="panelB" header="panel-header">
        <v-form ref="groupform" :model="group" :schema="groupSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <text-field ref="jobfamilyname" property='jobFamilyName' editor-width="400"></text-field>
            <text-field property='standardJobCodePrefix' editor-width="400"></text-field>
            <text-increment property='parentJobFamilyName' editor-width="400"></text-increment>
        </v-form>
    </panel>
    <div class="btn-group" style="height:73px;">
        <ui-button @click="submit" color="primary mr10">{{ $t('button.submit') }}</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">{{ $t('button.cancel') }}</ui-button>
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

export default {

    data() {
            let groupSchema = new Schema({
                jobFamilyName: {
                    label: this.$t('position.label.familyName'),
                    required: true,
                    rules: {
                        type: 'custom',
                        message: this.$t('position.message.positionRepeat'),
                        validate() {
                            return this.positionRepeat;
                        }
                    }
                },
                positionRepeat: {
                    default () {
                        return true;
                    }
                },
                standardJobCodePrefix: {
                    label: this.$t('position.label.abbreviation')
                },
                parentjobFamilyId: {

                },
                parentJobFamilyName: {
                    label: this.$t('position.label.superiorFamily')
                }
            });
            return {
                panelTitle: '',
                groupSchema: groupSchema,
                group: groupSchema.newModel(),
            }
        },
        created() {

            let _self = this;
            _self.group.jobFamilyId = _self.$route.params.jobFamilyId;
            _self.group.parentJobFamilyName = _self.$route.params.jobFamilyName;

            if (_self.$route.name === 'addGroup') {
                _self.panelTitle = _self.$t('position.addFamily');

            } else if (_self.$route.name === 'editGroup') {debugger
                _self.panelTitle = _self.$t('position.editFamily');
                _self.$http.get(`/pos/jobFamilys/${_self.group.jobFamilyId}`).then((response) => {
                    let props = response.json();
                    for (let prop in props) {
                        if (props.hasOwnProperty(prop)) {
                            _self.group[prop] = props[prop];
                        }
                    }
                });
            }
        },
        mounted() {
            var _self = this;
            _self.initHeight();
            window.addEventListener('resize', function() {
                _self.initHeight();
            })
        },
        methods: {
            initHeight() {
                    let panelB = document.getElementById('panelB'),
                        bodyHeight = document.body.clientHeight, //body 高度
                        navHeight = parseInt(document.getElementsByClassName('navbar')[0].style.height) || 0, //顶部搜索导航 高度
                        breadcrumbHeight = parseInt(document.getElementsByClassName('breadcrumb')[0].style.height) || 0, //面包屑 高度
                        btnGroup = parseInt(document.getElementsByClassName('btn-group')[0].style.height) + 32 || 0, //按钮组
                        panelBHeight = bodyHeight - navHeight - breadcrumbHeight - btnGroup;
                    panelB.style.minHeight = panelBHeight + 'px';
                },
                // 提交
                submit() {
                    let _jobGroupModel = this.group,
                        _self = this;

                    let passed = _self.$refs.groupform.isFormValidate();
                    if (!passed) return;

                    if (_self.$route.name === 'addGroup') {
                        _self.$http.post('/pos/jobFamilys/', {
                            jobFamilyName: _jobGroupModel.jobFamilyName,
                            parentJobFamilyId: _self.$route.params.jobFamilyId,
                            jobFamilyCode: _jobGroupModel.jobFamilyCode,
                            standardJobCodePrefix: _jobGroupModel.standardJobCodePrefix
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.group.jobFamilyId = response.data;
                            this.setCacheTreeData('add', this.group);
                            _self.$router.push({
                                name: 'group',
                                query: {
                                    jobFamilyId: response.data
                                }
                            });
                            Message({
                                type: 'success',
                                message: _self.$t('common.saveSuccess')
                            });
                        });
                    } else if (_self.$route.name === 'editGroup') {
                        _self.$http.put(`/pos/jobFamilys/${_self.group.jobFamilyId}`, {
                            jobFamilyName: _jobGroupModel.jobFamilyName,
                            jobFamilyCode: _jobGroupModel.jobFamilyCode,
                            standardJobCodePrefix: _jobGroupModel.standardJobCodePrefix,
                            jobFamilyId: _jobGroupModel.jobFamilyId,
                            parentJobFamilyId: _jobGroupModel.parentJobFamilyId
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.setCacheTreeData('edit', this.group);
                            _self.$router.push({
                                name: 'group',
                                query: {
                                    jobFamilyId: this.$route.params.jobFamilyId
                                }
                            });
                            Message({
                                type: 'success',
                                message: _self.$t('common.saveSuccess')
                            });
                        });
                    }

                },
                cancel() {
                    this.$router.push({
                        name: 'group',
                        query: {
                            jobFamilyId: this.$route.params.jobFamilyId
                        }
                    });
                },
                setCacheTreeData(type, org) {
                    var jobFamilyId = this.$route.params.jobFamilyId;
                    var treeData = this.$root.$data.orgGroupTreeCache;
                    var walk = function(data) {
                        if (data && data.length > 0) {
                            data.forEach(function(child, key) {
                                if (jobFamilyId === child['jobFamilyId']) {
                                    switch (type) {
                                        case 'add':
                                            child['isParent'] = 'true';
                                            var node = {
                                                isParent: 'false',
                                                parentJobFamilyId: org.parentJobFamilyId,
                                                jobFamilyId: org.jobFamilyId,
                                                jobFamilyName: org.jobFamilyName
                                            };
                                            if (child['children'] instanceof Array) {
                                                child['children'].push(node);
                                            } else {
                                                child['children'] = [node];
                                            }
                                            break;
                                        case 'edit':
                                            child['jobFamilyName'] = org.jobFamilyName;
                                            break;
                                    }
                                } else {
                                    var children = child['children'];
                                    walk(children);
                                }
                            });
                        }
                    };
                    walk(treeData);
                }
        },
        watch: {
            'group.jobFamilyName': {
                handler: function(val, oldVal) {
                    if (!val || val === oldVal) {
                        return;
                    }
                    if (this.$route.name === "addGroup") {
                        let parentJobFamilyId = this.$route.params.jobFamilyId;
                        this.$http.post(`/pos/jobFamilys/ /positions/checkJobFamilyName`, {
                            jobFamilyName: val,
                            parentJobFamilyId: parentJobFamilyId
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.group.positionRepeat = response.body === 'true' ? true : false;
                            this.$refs.jobfamilyname.validate();
                        });
                    }
                }
            }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
};

</script>
