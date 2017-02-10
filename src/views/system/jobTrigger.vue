<style lang="less">

.ihr-system-jobTrigger {
    .right-panel-tit span {
        font-size: 20px;
        font-weight: bold;
        color: #2a3c59;
    }
    .right-panel-info {
        background: #fafafa;
        padding: 0 20px;
    }
    .right-panel-info li {
        float: left;
        margin-right: 165px;
    }
    .right-panel-label {
        font-size: 14px;
        color: #a5acbe;
        display: inline-block;
        padding: 20px 0;
        width: 130px;
    }
    .right-panel-txt {
        font-size: 14px;
        color: #6a707d;
    }
    .ml0 {
        margin-left: 0;
    }
    .group {
        border: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-jobTrigger">
    <div class="leftRight-panel bg-f5f5f5 mt20 fix">
        <div class="right-panel p20 ml0">
            <div class="right-panel-tit pt15">
                <span>Task Information</span>
            </div>
            <ul class="right-panel-info fix mt20 mb20">
                <li>
                    <span class="right-panel-label">Job Name</span>
                    <span class="right-panel-txt">{{job.name}}</span>
                </li>
                <li>
                    <span class="right-panel-label">Description</span>
                    <span class="right-panel-txt">{{job.description}}</span>
                </li>
            </ul>
            <div class="vuetable-wrapper">
                <div class="group mb20 tr">
                    <div class="right-panel-tit pt15 l">
                        <span>Trigger list</span>
                    </div>
                    <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add"></ui-button>
                    <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="delete"></ui-button>
                </div>
                <vuetable :api-url="triggerUrl" :selected-to="selectedRow" data-path="" show-pagination="false" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="triggerColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
    <trigger-selector :show.sync="show"></trigger-selector>
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
            return {
                triggerUrl: '',
                selectedRow: [],
                job: {},
                triggerColumns: [{
                    name: '__checkbox:id',
                    title: ''
                }, {
                    name: 'name',
                    title: 'Trigger Name',
                    sortField: 'name'
                }, {
                    name: 'type',
                    title: 'Trigger Type',
                    sortField: 'type'
                }, {
                    name: 'startTime',
                    title: 'Start Time',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'startTime'
                }, {
                    name: 'endTime',
                    title: 'End Time',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'endTime'
                }, {
                    name: 'description',
                    title: 'Description',
                    sortField: 'description'
                }, {
                    name: 'createdBy',
                    title: 'Created By',
                    sortField: 'createdBy'
                }, {
                    name: 'creationDate',
                    title: 'Creation Date',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'creationDate'
                }],
                show: {
                    modal: false
                }
            }
        },
        computed: {},
        mounted() {},
        ready() {},
        methods: {
            add() {
                    this.show.modal = true;
                },
                delete() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$http.post('/scheduler/job/unbindTrigger', {
                            jobId: _self.job.id,
                            ids: rows.join(",")
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                            this.$broadcast('vuetable:refresh'); //刷新表格
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                }
        },
        components: {},
        route: {
            data(transition) {
                let _self = this;
                _self.job.id = transition.to.params.id;
                _self.triggerUrl = '/scheduler/job/showTrigger?id=' + _self.job.id;
                _self.$http.post('/scheduler/job/findJob', {
                    id: _self.job.id
                }, {
                    emulateJSON: true
                }).then((response) => {
                    _self.job = response.json();
                });
            }
        },
        events: {
            triggerselector: function(data) {
                let _self = this
                let ids = [];
                ids.push(data.id);
                _self.$http.post('/scheduler/job/bindTrigger', {
                    jobId: _self.job.id,
                    ids: ids.join(",")
                }, {
                    emulateJSON: true
                }).then((response) => {
                    this.$broadcast('vuetable:refresh'); //刷新表格
                });
                return false
            }
        }
}

</script>
