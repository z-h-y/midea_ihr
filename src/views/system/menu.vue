<style lang="less">

.ihr-system-menu {
    margin-bottom: 87px;
    * {
        box-sizing: border-box;
    }
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
    .ui-tabs-body {
        padding-left: 0;
        padding-right: 0;
    }
    .bg-f5f5f5 {
        background: #f5f5f5;
    }
    .text-editor [readonly] {
        background: #f5f5f5;
    }
    .group{
      border: none;
    }
    .tree-panel{
      width:auto;
    }
}

</style>

<template lang="html">

<div class="content-wrap fix bg-w ihr-system-menu">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="del" button-type="button"></ui-button>
    </div>
    <div class="tree-panel fix ml16 mr16 mb16">
        <div class="treelist">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail">
            <v-form v-ref:menuform :model="menu" :schema="menuSchema" label-width="200" label-suffix="" :cols="1" form-style="">
                <text-field property='menuName' editor-width="400" :readonly="readonlyFlag"></text-field>
                <text-field property="superiorMenu" type="selector" :readonly="readonlyFlag" editor-width="400" :show.sync="show"></text-field>
                <text-field property='menuAddress' editor-width="400" :readonly="readonlyFlag"></text-field>
                <text-field property='orderNo' editor-width="400" :readonly="readonlyFlag" type="number"></text-field>
                <select-field property="openWay" editor-width="400" :readonly="readonlyFlag"></select-field>
                <select-field property="isVisible" editor-width="400" :readonly="readonlyFlag"></select-field>
                <text-field type="textarea" :editor-height="100" editor-width="400" property="description" :readonly="readonlyFlag"></text-field>
            </v-form>
        </div>
    </div>
    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">Submit</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
    </div>
    <menu-selector :show.sync="show" v-if="!readonlyFlag"></menu-selector>
</div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';
import {
    Datashaping
}
from '../../util/assist.js';

let menuSchema = new Schema({
    menuName: {
        label: 'Menu Name',
        required: true,
        whitespace: false
    },
    superiorMenu: {
        label: 'Superior Menu',
        required: false,
        whitespace: false
    },
    menuAddress: {
        label: 'Access Address',
        required: false,
        whitespace: false
    },
    orderNo: {
        label: 'Order',
        required: true,
        whitespace: false
    },
    openWay: {
        label: 'Open',
        required: true,
        whitespace: false,
        mapping: {
            '_self': '_self'
        },
        multiSelect: false
    },
    isVisible: {
        label: 'Visible',
        required: true,
        whitespace: false,
        mapping: {
            '可见': 'Y',
            '隐藏': 'N'
        },
    },
    description: {
        label: 'Description',
        required: true,
        whitespace: false
    }
});
export default {
    data() {
            let _self = this;
            return {
                menuSchema: menuSchema,
                selMenu: {},
                readonlyFlag: true,
                editModel: 'add',
                menu: menuSchema.newModel(),
                //tree
                regions: [], // 树数据
                menus: [],
                levelConfig: {
                    labelProperty: 'menuName',
                    recursive: true
                },
                showCheckbox: false,
                show: {
                    modal: false
                },
                clickNode: function(node) {
                    _self.readonlyFlag = true;
                    _self.selMenu = node; //树节点对象
                    let props = node;
                    if (props.parentMenuId) {
                        for (var m of _self.menus) {
                            if (props.parentMenuId === m.menuId) {
                                props.superiorMenu = m.menuName;
                                break;
                            }
                        }
                    } else {
                        props.superiorMenu = '根目录';
                    }
                    for (let prop in props) {
                        if (props.hasOwnProperty(prop)) {
                            _self.menu[prop] = props[prop];
                        }
                    }
                }
            };
        },
        computed: {},
        ready() {
            this.init();
        },
        methods: {
            init() {
                    this.$http.post('/system/menu/list').then((response) => {
                        this.regions = Datashaping(response.json(), {
                            orderBy: 'order_no',
                            sorting: -1
                        });
                        this.menus = response.json();
                    }, (response) => {
                        Message({
                            type: 'error',
                            message: response.statusText
                        });
                    });
                },
                // 提交
                submit() {
                    let _menuModel = this.menu,
                        _self = this;


                    let passed = this.menu.$schema.isFormValidate(this.$refs.menuform);
                    if (!passed) return;


                    if (_self.editModel === 'add') {
                        _self.$http.post('/system/menu/createMenu', {
                            menuName: _menuModel.menuName,
                            parentMenuId: _menuModel.parentMenuId,
                            menuAddress: _menuModel.menuAddress,
                            orderNo: _menuModel.orderNo,
                            openWay: _menuModel.openWay,
                            isVisible: _menuModel.isVisible,
                            description: _menuModel.description
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                            _self.init();
                            this.readonlyFlag = true;
                            _menuModel.reset();
                        });
                    } else if (_self.editModel === 'edit') {
                        _self.$http.post('/system/menu/updateMenu', {
                            menuId: _menuModel.menuId,
                            menuName: _menuModel.menuName,
                            parentMenuId: _menuModel.parentMenuId,
                            menuAddress: _menuModel.menuAddress,
                            orderNo: _menuModel.orderNo,
                            openWay: _menuModel.openWay,
                            isVisible: _menuModel.isVisible,
                            description: _menuModel.description
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                            this.readonlyFlag = true;
                            _self.init();
                        });
                    }
                },
                cancel() {

                },
                add() {
                    this.editModel = 'add';
                    this.readonlyFlag = false;

                },
                edit() {
                    this.editModel = 'edit';
                    this.readonlyFlag = false;

                },
                del() {
                    let _menuModel = this.menu,
                        _self = this;
                    if (!_menuModel.menuId) {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                        return;
                    }
                    _self.$http.post('/system/menu/deleteMenu', {
                        menuIds: _menuModel.menuId
                    }, {
                        emulateJSON: true
                    }).then((response) => {

                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });
                        _menuModel.reset();
                        _self.init();

                    });
                }
        },
        components: {
          Tree: require('../../components/tree/tree.vue')
        },
        events: {
            menuselector: function(data) {
                let _self = this
                _self.menu.superiorMenu = data.menuName;
                _self.menu.parentMenuId = data.menuId;
                return false
            }
        }
};

</script>
