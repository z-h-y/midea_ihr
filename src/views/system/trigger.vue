<style lang="less">

.ihr-system-trigger {
    .button-sty {
        background: rgba(0, 0, 0, 0);
        border: #fff;
        color: #2196f3;
        &:hover {
            text-decoration: underline;
        }
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-trigger">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="beforeDel" button-type="button"></ui-button>
    </div>
    <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="schedulerUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="schedulerColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
    <ui-confirm header="Delete" @confirmed="deleteBtn" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
        Do you want to delete this? May prevent the system from running!
    </ui-confirm>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    getDictMapping,
    formatDate
}
from '../../util/assist';
export default {
    data() {
            return {
                schedulerUrl: "/scheduler/trigger/query",
                selectedRow: [],
                showdel: false,
                schedulerColumns: [{
                    name: '__checkbox:id',
                    title: ''
                }, {
                    name: 'name',
                    title: 'scheduler name',
                    sortField: 'name'
                }, {
                    name: 'type',
                    title: 'type',
                    sortField: 'type'
                }, {
                    name: 'startTime',
                    title: 'startTime',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'startTime',
                    callback: 'format'
                }, {
                    name: 'description',
                    title: 'description',
                    sortField: 'description'
                }],
            }
        },
        computed: {},
        mounted() {},
        methods: {
            // 格式化时间
            format(value) {
                    return formatDate(new Date(value));
                },
                add() {
                    let _self = this;
                    _self.$router.go({
                        name: 'addTrigger'
                    });
                },
                beforeDel: function() {
                    this.showdel = true;
                },
                deleteBtn() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$http.post('/scheduler/trigger/batchDel', {
                            ids: rows,
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.$broadcast('vuetable:refresh'); //刷新表格
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: _self.$t('system.message.selectNode')
                        })
                    }
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editTrigger',
                            params: {
                                id: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: _self.$t('system.message.selectNode')
                        })
                    }
                }
        },
        components: {}
}

</script>
