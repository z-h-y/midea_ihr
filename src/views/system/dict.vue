<style lang="less">

.ihr-dict-searchModel {
    min-width:921px;
    font-size: 14px;
    .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
    }

    .group {
        margin: 16px;
        padding-top: 16px;
        border-top: 1px solid #ecedee;
    }
    .searchModel-form {
        height: 46px;
        margin: 0 40px;
    }
    .searchModel-form.expended {
        height: 92px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-dict-searchModel">
    <div class="mb16 pt16">
        <div class="search-area">
            <ui-confirm header="Delete" @confirmed="deleteBtn" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
                Do you want to delete this? May prevent the system from running!
            </ui-confirm>
            <v-form :model="searchModel" :schema="searchSchema" label-width="100" label-suffix="" :cols="3" form-style="searchModel-form">
                <text-field property="dictCode" editor-width="140"></text-field>
                <text-field property="dictName" editor-width="140"></text-field>
                <select-field property='language' editor-width="140" ></select-field>

            </v-form>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{ $t('button.search') }}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" @click="reset" type="flat">{{ $t('button.reset') }}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" :text="$t('button.add')" @click="add" button-type="button"></ui-button>
            <!-- <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" :text="$t('button.add')" @click="deleteCache" button-type="button"></ui-button> -->
            <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" :text="$t('button.edit')" @click="edit" button-type="button"></ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" :text="$t('button.delete')"  @click="beforeDel" button-type="button"></ui-button>

        </div>
        <div class="vuetable-wrapper pl16 pr16 pb16">
            <vuetable :append-params="queryParams" api-url="/system/dict/list" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
            </vuetable>
        </div>
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
import {
    convert, getDictMapping, formatDate
}
from '../../util/assist.js';

let searchSchema = new Schema({
    dictCode: {
        label: 'Dict Code',
        required: false,
        whitespace: false
    },
    dictName: {
        label: 'Dict Name',
        required: false,
        whitespace: false
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
    }
});

export default {
    data() {
            return {
                selectedRow: [],
                searchSchema: searchSchema,
                searchModel: searchSchema.newModel(),
                showdel: false,
                columns: [{
                    name: '__checkbox:dictId',
                    title: ''
                },{
                    name: 'language',
                    title:  this.$t('system.dict.language')
                },{
                    name: 'dictCode',
                    title:  this.$t('system.dict.dictCode')
                }, {
                    name: 'dictName',
                    title:  this.$t('system.dict.dictName')
                }, {
                    name: 'description',
                    title:  this.$t('system.dict.description')
                }]
            }
        },
        computed: {
            queryParams() {
                let dictCode = this.searchModel.dictCode || "";
                let dictName = this.searchModel.dictName || "";
                let language = this.searchModel.language || "";
                return [
                    `dictCode=${dictCode}`,
                    `dictName=${dictName}`,
                    `language=${language}`
                ]
            }
        },
        attached() {},
        methods: {
            search() {
                    this.$broadcast('vuetable:refresh');
                },
                reset() {
                    this.searchModel.reset();
                },
                add() {
                    this.$route.router.go({
                        name: 'addDict'
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editDict',
                            params: {
                                dictId: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: _self.$t('system.message.selectNode')
                        })
                    }
                },
                beforeDel: function(index) {
                  this.showdel = true;
                },
                deleteBtn() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post('/system/dict/deleteDict', {
                        dictIds: rows,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                    });

                },
                deleteCache() {
                    let _self = this;
                    _self.$http.post('/system/dict/deleteDictCache', {
                        lang: "en_US",
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                      this.$broadcast('vuetable:refresh'); //刷新表格
                    });
                }
        },
        components: {}
}

</script>
