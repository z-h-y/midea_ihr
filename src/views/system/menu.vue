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
    .group {
        border: none;
    }
    .tree-panel {
        width: auto;
    }
    .zh,
    .en {
        .text-editor,
        .inrement-text {
            width: initial;
        }
        .ui-button {
            height: 28px;
            padding: 0 10px;
            min-width: 40px;
            margin: 0 0 0 10px;
        }
    }
}

</style>

<template lang="html">

<div class="content-wrap fix bg-w ihr-system-menu">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" :text="$t('button.add')" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" :text="$t('button.edit')" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" :text="$t('button.delete')" @click="del" button-type="button"></ui-button>
    </div>
    <div class="tree-panel fix ml16 mr16 mb16">
        <div class="treelist">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail">
            <v-form ref="menuform" :model="menu" :schema="menuSchema" label-width="200" label-suffix="" :cols="1" form-style="">
                <text-field property='menuName' editor-width="400" :readonly="readonlyFlag">
                </text-field>
                <text-increment property='zh_CN' editor-width="" :readonly="true" class="zh">
                    <ui-button @click="showLang('zh')" color="primary mr10" v-show="selMenu.menuId">编辑</ui-button>
                </text-increment>
                <text-increment property='en_US' editor-width="" :readonly="true" class="en">
                    <ui-button @click="showLang('en')" color="primary mr10" v-show="selMenu.menuId">编辑</ui-button>
                </text-increment>
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
        <ui-button @click="submit" color="primary mr10">{{$t('button.submit')}}</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>
    <menu-selector :show.sync="show" v-if="!readonlyFlag"></menu-selector>


    <ui-modal :show.sync="show.langmodal" header="Modify Lang" body="">
        <v-form class="mt10" :model="lang" :schema="langSchema" label-width="130" label-suffix="" :cols="1">
            <select-field property='language' editor-width="220" :readonly="true"></select-field>
            <text-field property='languageLabel' editor-width="220"></text-field>
        </v-form>
        <div slot="footer">
            <ui-button @click="saveLang" color="primary">{{$t('button.confirm')}}</ui-button>
            <ui-button @click="show.langmodal = false">{{$t('button.close')}}</ui-button>
        </div>
    </ui-modal>

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

export default {
    data() {

            let langSchema = new Schema({
                language: {
                    label: 'Language',
                    required: false,
                    whitespace: false,
                    mapping: {
                        'en_US': 'en_US',
                        'zh_CN': 'zh_CN',
                        'ja': 'ja',
                        'id': 'id',
                        'vi': 'vi'
                    },
                    default: 'en_US'
                },
                languageLabel: {
                    label: 'Value',
                    required: false,
                    whitespace: false
                },
                menuId: {

                }
            });
            let menuSchema = new Schema({
                menuName: {
                    label: this.$t('system.menu.menuName'),
                    required: true,
                    whitespace: false
                },
                superiorMenu: {
                    label: this.$t('system.menu.superiorMenu'),
                    required: false,
                    whitespace: false
                },
                menuAddress: {
                    label: this.$t('system.menu.menuAddress'),
                    required: false,
                    whitespace: false
                },
                orderNo: {
                    label: this.$t('system.menu.orderNo'),
                    required: true,
                    whitespace: false
                },
                openWay: {
                    label: this.$t('system.menu.openWay'),
                    required: true,
                    whitespace: false,
                    mapping: {
                        '_self': '_self'
                    },
                    multiSelect: false
                },
                isVisible: {
                    label: this.$t('system.menu.isVisible'),
                    required: true,
                    whitespace: false,
                    mapping: {
                        '可见': 'Y',
                        '隐藏': 'N'
                    },
                },
                description: {
                    label: this.$t('system.menu.description'),
                    required: true,
                    whitespace: false
                },
                en_US: {
                    label: this.$t('system.menu.en_US'),
                    required: false,
                    whitespace: false
                },
                zh_CN: {
                    label: this.$t('system.menu.zh_CN'),
                    required: false,
                    whitespace: false
                },

            });

            let _self = this;
            return {
                langSchema: langSchema,
                lang: langSchema.newModel(),
                menuSchema: menuSchema,
                selMenu: {},
                readonlyFlag: true,
                editModel: 'view',
                menu: menuSchema.newModel(),
                //tree
                regions: [], // 树数据
                menus: [],
                langs: [],
                levelConfig: {
                    labelProperty: 'menuName',
                    recursive: true
                },
                showCheckbox: false,
                show: {
                    modal: false,
                    langmodal: false
                },
                clickNode: function(node) {
                    _self.editModel = 'view';
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
                    _self.menu.zh_CN = "";
                    _self.menu.en_US = "";
                    for (var m of _self.langs) {
                        if (_self.selMenu.menuId === m.businessId) {
                            if (m.language === 'zh_CN') {
                                _self.menu.zh_CN = m.languageLabel;
                            }
                            if (m.language === 'en_US') {
                                _self.menu.en_US = m.languageLabel;
                            }
                        }
                    }

                }
            };
        },
        computed: {},
        ready() {
            this.init();
            this.initlang();
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
                initlang() {
                    let _self = this;
                    this.$http.post('/system/menu/listLangMenu').then((response) => {
                        this.langs = response.json();
                        if (_self.selMenu.menuId) {
                            _self.menu.zh_CN = "";
                            _self.menu.en_US = "";
                            for (var m of _self.langs) {
                                if (_self.selMenu.menuId === m.businessId) {
                                    if (m.language === 'zh_CN') {
                                        _self.menu.zh_CN = m.languageLabel;
                                    }
                                    if (m.language === 'en_US') {
                                        _self.menu.en_US = m.languageLabel;
                                    }
                                }
                            }
                        }
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
                showLang(lang) {
                    this.show.langmodal = true;
                    let _self = this;
                    if (!_self.selMenu.menuId) {
                        return;
                    }
                    if (lang === 'zh') {
                        lang = 'zh_CN';
                    } else if (lang === 'en') {
                        lang = 'en_US';
                    }
                    _self.lang.language = lang;
                    _self.lang.languageLabel = "";
                    _self.$http.post('/system/menu/findLangMenu', {
                        language: lang,
                        menuId: _self.selMenu.menuId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {
                            let props = response.json();
                            _self.lang.languageLabel = props.languageLabel;
                        }
                    });
                },
                saveLang() {
                    let _self = this;
                    if (!_self.selMenu.menuId) {
                        return;
                    }
                    _self.$http.post('/system/menu/updateLangMenu', {
                        language: _self.lang.language,
                        languageLabel: _self.lang.languageLabel,
                        menuId: _self.selMenu.menuId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });
                        this.show.langmodal = false;
                        _self.initlang();
                    });
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
