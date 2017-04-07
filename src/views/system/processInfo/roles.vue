<style lang="less">

.ihr-system-roles {
    padding-bottom: 88px;
    .field-hashint {
        padding: 0 0 0 2px;
    }
    .addList {
        display: inline-flex;
    }
    .add-new {
        font-size: 16px;
        color: #3aa2eb;
        text-align: center;
        cursor: pointer;
    }
    .add-new i {
        font-size: 20px;
        margin-right: 10px;
    }
    .radio-input-wrapper {
        // top: -8px;
    }
    .operation {
        width: 140px !important;
        .field-content {
            width: 140px;
            margin: 0;
            padding-right: 0;
        }
        .selectfield-box {
            width: 140px;
        }
    }
    .selector .text-editor {
        top: -1px;
    }
    .add-interns-id {
        position: relative;
    }
    .text-editor [readonly] {
        background: #f5f5f5;
    }
}


/*form信息 与checkProcess 详情页面通用 start*/

.approveRole {
    width: 200px;
    margin-right: 30px;
    label {
        margin-left: 3px !important;
        float: none;
        ;
    }
    .field-content {
        margin-left: 0px !important;
        margin-top: 10px;
    }
    .field-hint {
        width: 185px;
    }
}

.nodeName {
    min-width: 206px;
    label {
        margin-left: 3px !important;
        float: none;
    }
    .field-content {
        margin-left: 0px !important;
        margin-top: 10px;
    }
    .field-hint {
        width: 185px;
    }
}

.orderNo {
    min-width: 206px;
    label {
        float: none;
    }
    .field-content {
        margin-left: 0px !important;
        margin-top: 10px;
    }
    .text-editor {
        width: 28px !important;
        height: 28px;
        text-align: center;
        background: #97caff;
        border-radius: 50%;
        color: #fff;
        margin: 0 0 0 12px;
    }
}

.employeeName {
    min-width: 206px;
    label {
        float: none;
    }
    .field-content {
        margin-left: 0px !important;
        margin-top: 10px;
    }
}


/*form信息 与checkProcess 详情页面通用 end*/

</style>

<template lang="html">

<div class="ihr-system-roles">
    <ui-confirm header="Delete this" @confirmed="delList" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
        Do you want to delete this?
    </ui-confirm>
    <template v-for="item in data">
        <div class="add-interns-id">
            <v-form :model="item" :schema="roleSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
                <text-increment class="orderNo" :hide-label="$index !== 0" type="number" property="orderNo" editor-width="80"></text-increment>
                <select-field class="approveRole" :hide-label="$index !== 0" property='approveRole' editor-width="200"></select-field>
                <text-field class="nodeName" :hide-label="$index !== 0" property='nodeName' editor-width="200"></text-field>
            </v-form>
            <i v-show="data.length > 1" class="fa fa-trash-o del-bottom" aria-hidden="true" @click="beforeDel($index)"></i>
        </div>
    </template>
    <div class="add-new">
        <div class="addList" @click="addList"><i class="fa fa-plus-circle" aria-hidden="true"></i>{{$t('system.checkProcess.add')}}</div>
    </div>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../../schema/index';
import {
    getDictMapping
}
from '../../../util/assist';
export default {
    props: [{
        name: 'data',
        type: Array
    }, {
        name: 'parentId'
    }],
    data() {
        let _self = this;
        var roleData = {
            orderNo: {
                label:  this.$t('system.checkProcess.orderNo'),
                required: false,
                default: 1
            },
            approveRole: {
                label: this.$t('system.checkProcess.approveRole'),
                mapping: function() {
                    return getDictMapping('PROCESS_TEMPLATE_APPROVE_ROLE');
                },
                required: true
            },
            nodeName: {
                label: this.$t('system.checkProcess.nodeName'),
                required: true,
                whitespace: false
            }
        };
        return {
            roleSchema: new Schema(roleData),
            delIndex: 0,
            showdel: false,
            selected: 0,
            show: {
                modal: false
            },
            selIndex: 0
        };
    },
    computed: {},
    ready() {
        var ptid = this.$route.params.ptid;
        if (!ptid) {
            this.data.push(this.roleSchema.newModel());
        }
    },
    attached() {},
    methods: {
        showEmployee(approveRole, index) {
                if (approveRole === '4') {
                    this.show.modal = true;
                    this.selIndex = index;
                }
            },
            initList: function(data) {
                let _self = this;
                data.forEach(function(item, index) {
                    var model = _self.roleSchema.newModel();
                    var obj = Object.assign(model, item);
                    _self.data.push(obj);
                })
            },
            addList: function() {
                let model = this.roleSchema.newModel();
                let orderNo = this.data.length + 1;
                model.orderNo = orderNo;
                this.data.push(model);
                this.$nextTick(function() {
                    this.$dispatch('ui-collapsible::refresh-height', this.parentId);
                });
            },
            beforeDel: function(index) {
                this.delIndex = index;
                this.showdel = true;
            },
            delList: function() {
                this.data.splice(this.delIndex, 1);
                let n = 1;
                for (let r of this.data) {
                    r.orderNo = n;
                    n++;
                }
                this.$nextTick(function() {
                    this.$dispatch('ui-collapsible::refresh-height', this.parentId);
                });
            }
    },
    components: {},
    events: {}
};

</script>
