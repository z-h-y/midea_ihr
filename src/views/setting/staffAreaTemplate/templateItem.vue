<style lang="less">

.ihr-setting-templateUpdate {
  .t8{
    top: 8px;
  }
}

</style>

<template lang="html">

<div class="content-wrap ihr-setting-templateUpdate">


    <div class="label-hide" property="details">
        <div class="field-row">
            <div class="cell tl w160 pl4">
                <label>Default Label</label>
            </div>
            <div class="cell tl w160">
                <label>Label</label>
            </div>
            <div class="cell tl w160">
                <label>Field Type</label>
            </div>
            <div class="cell tl w160">
                <label>Data Dictionary</label>
            </div>
            <div class="cell tl w160">
                <label>Mandatory</label>
            </div>
            <div class="cell tl w160">
                <label>Enabled</label>
            </div>
            <span class="icon-area cell" @click="handleAdd()" v-if="data.length < 20">
              <i class="fa fa-plus-circle f14 poi"></i>
            </span>
        </div>
        <template v-for="item in data">
            <v-form class="mt5" :model="item" :schema="templateDetailsSchema" label-width="0" label-suffix="" :cols="1">
                <div class="field-row">
                    <div class="cell w160 tl">
                        <text-increment label-width="0" property='fieldName' editor-width="160" :hide-label="true" :readonly="true"></text-increment>
                    </div>
                    <div class="cell w160">
                        <text-field label-width="0" :hide-label="true" property='fieldBusinessName' :hide-label="true" editor-width="140"></text-field>
                    </div>
                    <div class="cell w160">
                        <select-field label-width="0" :hide-label="true" property='fieldType' :hide-label="true" editor-width="140"></select-field>
                    </div>
                    <div class="cell w160">

                        <text-field v-if="item.fieldType === '1'" label-width="0" :hide-label="true" property='dataDictionary' :hide-label="true" editor-width="140"></text-field>
                        <text-field v-if="item.fieldType === '2'" label-width="0" :hide-label="true" property='dataDictionary' :hide-label="true" editor-width="140" :readonly="true"></text-field>

                    </div>
                    <div class="cell w160">
                        <radioGroup-field property='isMustFill' :hide-label="true" label-width="0" :hide-label="true"></radioGroup-field>
                    </div>
                    <div class="cell w160">
                        <radioGroup-field property='isShow' :hide-label="true" label-width="0" :hide-label="true"></radioGroup-field>
                    </div>
                    <span class="icon-area pl2 rel t8" @click="handleRemove($index)"> <i class="fa fa-trash-o del-bottom f14 poi" v-if="data.length > 1"></i></span>
                </div>
            </v-form>
        </template>
    </div>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../../schema/index';
import {
    default as Message
}
from '../../../components/basic/message';
import {
    convert,
    getDictMapping,
    formatDate
}
from '../../../util/assist.js';
export default {
    props: [{
        name: 'data',
        type: Array
    }],
    data() {
        var templateDetailsData = {
            fieldName: {
                default () {
                    return 'Auto';
                }
            },
            fieldBusinessName: {
                required: true,
                whitespace: false,
            },
            fieldType: {
                required: true,
                whitespace: false,
                mapping: function() {
                    return getDictMapping('AREA_TEMPLATE_FIELD_TYPE');
                },
                multiSelect: false
            },
            dataDictionary: {
                required: true,
                whitespace: false,
            },
            isMustFill: {
                mapping: {
                    'Yes': 'Y',
                    'No': 'N'
                },
                default () {
                    return 'N';
                }
            },
            isShow: {
                mapping: {
                    'Yes': 'Y',
                    'No': 'N'
                },
                default () {
                    return 'Y';
                }
            }
        };
        let _self = this;
        return {
            templateDetailsSchema: new Schema(templateDetailsData),
            selIndex: 0
        }
    },
    created() {

    },
    ready() {
        var id = this.$route.params.areaTemplateId;
        if (!id) {
            this.data.push(this.templateDetailsSchema.newModel());
        }
    },
    methods: {
        initList: function(data) {
            let _self = this;
            data.forEach(function(item, index) {
                var model = _self.templateDetailsSchema.newModel();
                var obj = Object.assign(model, item);
                _self.data.push(obj);
            })
        },
        handleAdd() {
            this.data.push(this.templateDetailsSchema.newModel());
        },
        handleRemove(delIndex) {
            this.data.splice(delIndex, 1);
        }
    }

}

</script>
