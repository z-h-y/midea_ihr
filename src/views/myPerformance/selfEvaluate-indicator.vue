<style lang="less">

.ihr-selfEvaluate {
    .textarea .field-hint {
        margin-top: -10px;
    }
}

</style>

<template lang="html">

<div class="ihr-selfEvaluate">
    <template v-for="(index,item) in data">
        <div class="indicators-item" v-show="!item.isEdit">
            <div class="indicators-head">
                <div class="title">
                    <i class="number">{{ index + 1}}</i>
                    <span class="indicators-weight-title">{{item.indicatorName}} ({{item.unit}})</span>
                </div>
            </div>
            <div class="indicators-body">
                <div class="cell-1-1">
                    <label class="prop-name">Weight</label>
                    <div class="field-content"><span class="text-editor">{{item.weight}} %</span></div>
                </div>
                <div class="cell-1-1">
                    <label class="prop-name">Targets</label>
                    <div class="field-content"><span class="text-editor">{{item.target}}</span></div>
                </div>
                <div class="cell-1-1">
                    <label class="prop-name">Criteria/Formula</label>
                    <div class="field-content"><span class="text-editor">{{item.criteria}}</span></div>
                </div>
                <div class="cell-1-1">
                    <label class="prop-name">Data Source Dept</label>
                    <div class="field-content"><span class="text-editor">{{item.dataSources}}</span></div>
                </div>
                <!--填写自评-->
                <template v-if="isSelfEvaluate">
                    <div class="cell-g score">
                        <v-form :model="item.model" :schema="item.schema" label-width="190" label-suffix="" :cols="1">
                            <text-field property="employeeSelfScore" editor-width="300" type="number"></text-field>
                            <text-field class="textarea" property="comment" type="textarea" :editor-height="100" editor-width="500"></text-field>
                        </v-form>
                    </div>
                </template>
            </div>
        </div>
    </template>
</div>

</template>

<script>

import {
    default as aproveSchema
}
from './aprove-schema';
import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    convert
}
from '../../util/assist';

let indicatorSchema = new Schema({
    employeeSelfScore: {
        label: 'Employee self Score',
        required: true,
        whitespace: false,
        rules: {
            type: 'custom',
            message: 'Please enter a 1~999 positive integer!',
            validate() {
                var isValidate = true;
                if (this.employeeSelfScore < 0 || this.employeeSelfScore > 999) {
                    isValidate = false;
                } else {
                    if (this.employeeSelfScore % 1 !== 0) {
                        isValidate = false;
                    }
                }
                return isValidate;
            }
        }

    },
    comment: {
        label: 'Employee Self Comment',
        required: true,
        whitespace: false
    }
});

export default {
    props: [{
        name: 'data',
        type: Array
    }],
    data() {
        return {
            show: {
                deleteConfirm: false
            },
            panelTitle: '',
            basicInfo: {}, //基本信息
            selfEva: {
                score: 0
            },
            data: [],
            loadding: false, //加载中,
            isHasIndicator: false, //显示无数据
            indicatorSchema: indicatorSchema,
            indicator: indicatorSchema.newModel(),
        };
    },
    computed: {
        isSelfEvaluate() {
            if (this.$route.name === 'selfevaluate') return true;
            return false;
        }
    },
    created() {

    },
    methods: {
        initList: function(data) {
            let _self = this;
            _self.data = [];
            data.forEach(function(item, index) {
                var model = _self.indicatorSchema.newModel();
                var obj = Object.assign(model, item);
                _self.data.push(obj);
            })
        },
        photoUrl(photoId) {
            if (photoId)
                return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
            else
                return `/static/images/public/xwz.png`;
        },

        /**
         * 查询个人指标
         */
        fetchIndicators() {
            this.loadding = true;
            this.$http.get('/performance/employeeIndicators', {
                params: {
                    schemeInfoId: this.$route.params.sid
                }
            }).then((response) => {

                let indicatorData = response.data;
                if (indicatorData.length === 0) {
                    this.isHasIndicator = true;
                } else {
                    for (let key of indicatorData.keys()) {
                        let schema = this.selfEvaluateSchema;
                        Object.assign(indicatorData[key], {
                            schema: schema,
                            model: schema.newModel()
                        });
                    }
                    this.data = indicatorData;
                }
                this.loadding = false;
            });
        }
    }
};

</script>
