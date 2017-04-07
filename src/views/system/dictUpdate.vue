<style lang="less">

.ihr-setting-templateUpdate {
    .label-hide > label {
        display: none;
    }
    label {
        color: #545454;
    }
    .field-content {
        padding-right: 0px;
    }
    .field-row {
        display: table;
        width: 100%;
    }
    .cell {
        width: auto;
    }
    .radio-input-wrapper label {
        margin-right: 15px;
    }
    .d-radio-group {
        width: 120px;
    }
    .w160 {
        width: 160px;
    }
    .pl4 {
        padding-left: 4px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-setting-templateUpdate">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form ref="dictform" :model="dict" :schema="dictSchema" label-width="145" label-suffix="" :cols="1" form-style="org-form">
            <text-field property='dictCode' editor-width="250"></text-field>
            <text-field property="dictName" editor-width="250"></text-field>
            <select-field property='language' editor-width="220" ></select-field>
            <text-field property="description" editor-width="250"></text-field>
            <field class="label-hide" property="dicts">
                <div class="field-row">
                    <div class="cell tl w160 pl4">
                        <label>{{ $t('system.dictUpdate.order') }}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{ $t('system.dictUpdate.dictName') }}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{ $t('system.dictUpdate.dictCode') }}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{ $t('system.dictUpdate.remark') }} </label>
                    </div>
                    <span class="icon-area cell" @click="handleAdd()">
                        <i class="fa fa-plus-circle poi"></i>
                    </span>
                </div>
                <template v-for="item in dictItemDataList">
                    <v-form class="mt5" :model="item" :schema="dictItemDataSchema" label-width="0" label-suffix="" :cols="1">
                        <div class="field-row">
                            <div class="cell w160 tl">
                                <text-field label-width="0" :hide-label="true" property='orderNo' editor-width="140"></text-field>
                            </div>
                            <div class="cell w160 tl">
                                <text-field label-width="0" :hide-label="true" property='dictItemName' editor-width="140"></text-field>
                            </div>
                            <div class="cell w160">
                                <text-field label-width="0" :hide-label="true" property='dictItemValue' editor-width="140"></text-field>
                            </div>
                            <div class="cell w160">
                                <text-field label-width="0" :hide-label="true" property='remark' editor-width="140"></text-field>
                            </div>
                            <span class="icon-area pl2" @click="handleRemove($index)"> <i class="fa fa-trash-o del-bottom"></i></span>
                        </div>
                    </v-form>
                </template>
            </field>
        </v-form>
        <div class="btn-group">
            <ui-button @click="submit" color="primary mr10">{{$t('button.submit')}}</ui-button>
            <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
        </div>
    </panel>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    convert,
    getDictMapping,
    formatDate
}
from '../../util/assist.js';

export default {
    data() {
            let dictSchema = new Schema({
                dictCode: {
                    label: this.$t('system.dict.dictCode'),
                    required: true,
                    whitespace: false,
                },
                dictName: {
                    label: this.$t('system.dict.dictName'),
                    required: true,
                    whitespace: false,
                },
                language: {
                    label: 'Language',
                    required: true,
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
                description: {
                    label: this.$t('system.dict.description'),
                    required: true,
                    whitespace: false,
                },
                dictId: {

                }
            });
            var dictItemData = {
                orderNo: {
                    required: true,
                    whitespace: false,
                },
                dictItemName: {
                    required: true,
                    whitespace: false,
                },
                dictItemValue: {
                    required: true,
                    whitespace: false,
                },
                remark: {
                    required: true,
                    whitespace: false,
                }
            };
            let _self = this;
            return {
                panelTitle: 'Add Dict',
                dictSchema: dictSchema,
                dict: dictSchema.newModel(),
                dictItemDataList: [],
                dictItemDataSchema: new Schema(dictItemData),
                selIndex: 0
            }
        },
        created() {
            var self = this;

        },
        methods: {
            handleAdd() {
                    this.dictItemDataList.push(this.dictItemDataSchema.newModel());
                },
                handleRemove(_Index) {
                    this.dictItemDataList.splice(_Index, 1);
                },
                submit() {
                    let _dictModel = this.dict,
                        _self = this;
                    let passed = this.dict.$schema.isFormValidate(this.$refs.dictform);
                    if (!passed) return;
                    let dicts = [];
                    for (var t of _self.dictItemDataList) {
                        let obj = {
                            orderNo: t.orderNo,
                            dictItemName: t.dictItemName,
                            dictItemValue: t.dictItemValue,
                            remark: t.remark
                        }
                        dicts.push(obj);
                    }
                    let sysDict = {
                        dictItemList: dicts,
                        dictCode: _dictModel.dictCode,
                        dictName: _dictModel.dictName,
                        language: _dictModel.language,
                        description: _dictModel.description,
                        dictId: _dictModel.dictId
                    }
                    let data = {};
                    convert(sysDict, data, "", true);

                    if (_self.$route.name === 'addDict') {
                        _self.$http.post('/system/dict/createDict', data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'dict'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });

                    } else if (_self.$route.name === 'editDict') {

                        _self.$http.post(`/system/dict/updateDict`, data, {
                            emulateJSON: true
                        }).then((response) => {
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                            _self.$router.go({
                                name: 'dict'
                            });
                        });

                    }
                },
                cancel() {
                    this.$router.go({
                        name: 'dict'
                    });
                }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.dict.dictId = transition.to.params.dictId;
                if (_self.$route.name === 'addDict') {
                    _self.panelTitle = 'Add System Dict';


                } else if (_self.$route.name === 'editDict') {
                    _self.panelTitle = 'Edit System Dict';

                    _self.$http.post('/system/dict/find', {
                        id: _self.dict.dictId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.dict[prop] = props[prop];
                            }
                        }
                        _self.dictItemDataList = props.dictItemList;
                    });
                }
            }
        },
        events: {

        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
}

</script>
