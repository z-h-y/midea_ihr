<style lang="less">

.ihr-system-job {
    // .ui-button {
    //     height: auto;
    // }
    .button-sty {
        background: rgba(0, 0, 0, 0);
        border: #fff;
        color: #2196f3;
        &:hover {
            text-decoration: underline;
        }
    }
    .group {
        border: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-job">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="beforeDel" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-stop" type="flat" text="Pause" @click="pause" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pause" type="flat" text="Resume" @click="resume" button-type="button"></ui-button>
    </div>
    <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="jobUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="jobColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
    <ui-confirm header="Delete" @confirmed="delete" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
        Do you want to delete this? May prevent the system from running!
    </ui-confirm>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
export default {
    data() {
            return {
                jobUrl: "/scheduler/job/query",
                selectedRow: [],
                showdel: false,
                jobColumns: [{
                    name: '__checkbox:id',
                    title: ''
                }, {
                    name: 'name',
                    title: 'job name',
                    sortField: 'name'
                }, {
                    name: 'status',
                    title: 'job status',
                    sortField: 'status'
                }, {
                    name: 'beanId',
                    title: 'RPC service address',
                    sortField: 'beanId'
                }, {
                    name: 'executor',
                    title: 'RPC name',
                    sortField: 'executor'
                }, {
                    name: 'description',
                    title: 'description',
                    sortField: 'description'
                }, {
                    name: '__actions',
                    title: 'operation',
                    sortField: ''
                }],
                itemActions: [{
                    name: 'trigger-btn',
                    label: 'Associated trigger',
                    icon: 'fa fa-plus mr5',
                    class: 'mr10 button-sty',
                    extra: {
                        'title': '',
                        'data-toggle': "tooltip",
                        'data-placement': "left"
                    }
                }, {
                    name: 'execute-btn',
                    label: 'Alternative Translations',
                    icon: 'fa fa-hand-o-up mr5',
                    class: 'button-sty',
                    extra: {
                        title: '',
                        'data-toggle': "tooltip",
                        'data-placement': "top"
                    }
                }],
            }
        },
        computed: {},
        mounted() {},
        methods: {
            beforeDel: function() {
                this.showdel = true;
            },
            add() {
                let _self = this;
                _self.$router.go({
                    name: 'addJob'
                });
            },
            delete() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.$http.post('/scheduler/job/batchDel', {
                        ids: rows,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                    });
                } else {
                    Message({
                        type: 'error',
                        message: 'Please select a valid node.'
                    })
                }
            },
            edit() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.$router.go({
                        name: 'editJob',
                        params: {
                            id: `${rows[0]}`
                        }
                    });
                } else {
                    Message({
                        type: 'error',
                        message: 'Please select a valid node.'
                    })
                }
            },
            pause() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length > 0) {
                    _self.$http.post('/scheduler/job/pause', {
                        ids: rows.join(',')
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                    });
                } else {
                    Message({
                        type: 'error',
                        message: 'Please select a valid node.'
                    })
                }
            },
            resume() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length > 0) {
                    _self.$http.post('/scheduler/job/resume', {
                        ids: rows.join(',')
                    }, {
                        emulateJSON: true
                    }).then((response) => {
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
        events: {
            'vuetable:action': function(action, data) {
                let _self = this;
                if (action == 'trigger-btn') {
                    _self.$router.go({
                        name: 'jobTrigger',
                        params: {
                            id: data.id
                        }
                    });

                } else if (action == 'execute-btn') {
                    _self.$http.post('/scheduler/job/execute', {
                        id: data.id,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });
                    });
                }
            }
        },
        components: {}
}

</script>
