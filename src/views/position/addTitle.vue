<style lang="less">

.ihr-position-addTitle {
    * {
        box-sizing: border-box;
    }
    position: relative;
    .panel-content {
        // min-height: 450px;
        // overflow: auto;
    }
    .panel-content-label {
        padding: 10px 0;
        text-align: right;
        width: 130px;
        color: #72777c;
    }
    .panel-content-txt {
        float: left;
        padding: 10px 0 10px 20px;
        color: #6a707d;
    }
    .c-2a3c59 {
        color: #2a3c59;
    }
    .w160 {
        width: 160px;
    }
    .mibGrade1 {
        float: left;
        width: 302px;
    }
    .mibGrade2 {
        float: left;
        width: 302px;
        label {
            display: none;
        }
        .field-hint {
            width: 442px;
        }
        .field-content {
            margin-left: 0 !important;
        }
    }
    .mibGrade1-line {
        width: 50px;
        height: 1px;
        background: #e5e6e7;
        float: left;
        margin: 14px 10px 0 12px;
    }
    .field-hint {
        width: 245px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-position-addTitle">
    <panel :title="panelTitle" class=" panel-b" id="panelB" header="panel-header">
        <v-form ref="titleform" :model="title" :schema="titleSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <text-field ref="standardjobname" property='standardJobName' editor-width="400"></text-field>
            <text-increment property='jobFamilyName' editor-width="400"></text-increment>
            <!-- <select-field property='jobLevelStart' editor-width="400"></select-field>
            <select-field property='jobLevelEnd' editor-width="400"></select-field> -->
            <div class="field-content">
                <div class="field-row fix">
                    <div class="mibGrade1">
                        <select-field property='jobLevelStart' :mapping="dictList.jobStartMapping" editor-width="150"></select-field>
                    </div>
                    <div class="mibGrade1-line"></div>
                    <div class="mibGrade2">
                        <select-field property='jobLevelEnd' :mapping="dictList.jobEndMapping" editor-width="150" label-width="0" :hide-label="true"></select-field>
                    </div>
                </div>
            </div>
        </v-form>
    </panel>
    <div class="btn-group" style="height:73px;">
        <ui-button @click="submit" color="primary mr10">{{ $t('button.submit') }}</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">{{ $t('button.cancel') }}</ui-button>
    </div>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';
import {
    getDictMapping,
    transformDict
}
from '../../util/assist';

import {
    default as Message
}
from '../../components/basic/message';


export default {

    data() {
            let titleSchema = new Schema({
                standardJobName: {
                    label: this.$t('position.label.titleName'),
                    required: true,
                    whitespace: false,
                    rules: {
                        type: 'custom',
                        message: this.$t('position.message.titleRepeat'),
                        validate() {
                            return this.titleRepeat;
                        }
                    }
                },
                titleRepeat: {
                    default () {
                        return true;
                    }
                },
                jobLevelStart: {
                    label: this.$t('position.label.mibGradeStart'),
                    required: true,
                    rules: {
                        type: 'custom',
                        message: this.$t('position.message.jobLevelEnd'),
                        validate() {
                            let end = parseInt(this.jobLevelEnd);
                            let start = parseInt(this.jobLevelStart);
                            if (!this.jobLevelEnd || end >= start) {
                                return true;
                            } else {
                                this.jobLevelStart = '';
                                return false;
                            }
                        }
                    }
                },
                jobLevelEnd: {
                    label: this.$t('position.label.mibGradeEnd'),
                    required: true,
                    rules: {
                        type: 'custom',
                        message: this.$t('position.message.jobLevelEnd'),
                        validate() {
                            let end = parseInt(this.jobLevelEnd);
                            let start = parseInt(this.jobLevelStart);
                            if (!this.jobLevelEnd || end >= start) {
                                return true;
                            } else {
                                this.jobLevelStart = '';
                                return false;
                            }
                        }
                    }
                },
                remark: {
                    label: this.$t('position.label.remark'),
                    required: false,
                    whitespace: false
                },
                jobFamilyId: {

                },
                jobFamilyName: {
                    label: this.$t('position.label.family'),
                },
                standardJobId: {

                }
            });
            return {
                panelTitle: '',
                titleSchema: titleSchema,
                title: titleSchema.newModel(),
                dictList: {
                    jobStartMapping: {},
                    jobEndMapping: {}
                }
            }
        },
        mounted() {
            var _self = this;
            _self.initHeight();
            window.addEventListener('resize', function() {
                _self.initHeight();
            })
        },
        created() {
            var self = this;
            let dictionaryArr = ['MIB_RANK'];
            this.$http.post('/public-access/dicts/items', {
                dictCodes: dictionaryArr
            }, {
                emulateJSON: true
            }).then((response) => {
                let resData = response.data;
                resData.forEach(function(item) {
                    let dictionary = item.dictName;
                    if (dictionary === "MIB_RANK") {
                        self.dictList.jobStartMapping = transformDict(item.dict);
                        self.dictList.jobEndMapping = transformDict(item.dict);
                    }
                });
            });
            this.fetchData();
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
                    let _jobGroupModel = this.title,
                        _self = this

                    let passed = this.$refs.titleform.isFormValidate();
                    if (!passed) return;

                    if (_self.$route.name === 'addTitle') {
                        _self.$http.post('/pos/standardJobs/', {
                            standardJobName: _jobGroupModel.standardJobName,
                            jobFamilyId: _jobGroupModel.jobFamilyId,
                            jobFamilyName: _jobGroupModel.jobFamilyName,
                            jobLevelStart: _jobGroupModel.jobLevelStart,
                            jobLevelEnd: _jobGroupModel.jobLevelEnd,
                            remark: _jobGroupModel.remark,
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.push({
                                name: 'title',
                                query: {
                                    jobFamilyId: this.title.jobFamilyId
                                }
                            });
                            Message({
                                type: 'success',
                                message: _self.$t('common.saveSuccess')
                            });
                        });
                    } else if (_self.$route.name === 'editTitle') {
                        _self.$http.put(`/pos/standardJobs/${_self.title.id}`, {
                            standardJobName: _jobGroupModel.standardJobName,
                            jobFamilyId: _jobGroupModel.jobFamilyId,
                            jobFamilyName: _jobGroupModel.jobFamilyName,
                            jobLevelStart: _jobGroupModel.jobLevelStart,
                            jobLevelEnd: _jobGroupModel.jobLevelEnd,
                            remark: _jobGroupModel.remark,
                            standardJobId: _jobGroupModel.standardJobId

                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (response)
                                _self.$router.push({
                                    name: 'title',
                                    query: {
                                        jobFamilyId: this.title.jobFamilyId
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
                    let _self = this;
                    _self.$router.push({
                        name: 'title',
                        query: {
                            jobFamilyId: this.title.jobFamilyId
                        }
                    });
                },
                fetchData() {
                    let _self = this;

                    _self.title.standardJobId = _self.$route.params.standardJobId;
                    _self.title.jobFamilyName = _self.$route.params.jobFamilyName;
                    if (_self.$route.name === 'addTitle') {
                        _self.panelTitle = _self.$t('position.addTitle');
                        _self.title.jobFamilyId = _self.$route.params.jobFamilyId;


                    } else if (_self.$route.name === 'editTitle') {
                        _self.panelTitle = _self.$t('position.editTitle');

                        _self.$http.get(`/pos/standardJobs/${_self.title.standardJobId}`).then((response) => {
                            let props = response.json();
                            for (let prop in props) {
                                if (props.hasOwnProperty(prop)) {
                                    _self.title[prop] = props[prop];
                                }
                            }
                        });
                    }
                }
        },
        watch: {
            'title.standardJobName': {
                handler: function(val, oldVal) {
                    if (!val || val === oldVal) {
                        return;
                    }
                    if (this.$route.name === "addTitle") {
                        let parentJobFamilyId = this.$route.params.jobFamilyId;
                        this.$http.post(`/pos/standardJobs/checkStandardJobName`, {
                            standardJobName: val,
                            jobFamilyId: parentJobFamilyId
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.title.titleRepeat = response.body === 'true' ? true : false;
                            this.$refs.standardjobname.validate();
                        });
                    }
                }
            },
            '$route': 'fetchData' // 如果路由有变化，会再次执行该方法
        },

        components: {
            Panel: require('../../components/basic/panel.vue')
        }
}

</script>
