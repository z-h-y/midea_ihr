<style lang="less">



</style>

<template lang="html" v-for="(index,item) in data">
    <div class="indicators-item" v-show="!item.isEdit">
        <div class="indicators-head">
            <div class="title">
                <i class="number">{{ index + 1}}</i>
                <span class="indicators-weight-title">{{item.indicatorName}} ({{item.unit}})</span>
            </div>
        </div>
        <div class="indicators-body">
            <div class="cell-1-1">
                <label class="prop-name">{{$t('myperformance.evaluate.weight')}}</label>
                <div class="field-content"><span class="text-editor">{{item.weight}} %</span></div>
            </div>
            <div class="cell-1-1">
                <label class="prop-name">{{$t('myperformance.evaluate.targets')}}</label>
                <div class="field-content"><span class="text-editor">{{item.target}}</span></div>
            </div>
            <div class="cell-1-1">
                <label class="prop-name">{{$t('myperformance.evaluate.criteria')}}</label>
                <div class="field-content"><span class="text-editor">{{item.criteria}}</span></div>
            </div>
            <div class="cell-1-1">
                <label class="prop-name">{{$t('myperformance.evaluate.dataSourceDept')}}</label>
                <div class="field-content"><span class="text-editor">{{item.dataSources}}</span></div>
            </div>
            <!-- 审批者填写评语 -->
            <div class="score" v-if="item.selfScoreDetails!=null">
                <!-- 展示员工自评 -->
                <div class="cell-g">
                    <div class="cell-1-1 score-type"><span>{{$t('myperformance.evaluate.selfEvaluation')}}</span></div>
                    <div class="cell-1-1 score-ctn">
                        <div class="avater">
                            <div class="img-wrap">
                                <img class="valign-inner" :src='photoUrl(item.selfScoreDetails.photoId)'>
                            </div>
                        </div>
                        <div class="score-number">
                            <span>{{item.selfScoreDetails.score}}</span>
                        </div>
                        <div class="comment">
                            <p>{{item.selfScoreDetails.comment}}</p>
                        </div>
                    </div>
                </div>
                <!-- 审批者填写评语区域 -->
                <div class="cell-g">
                    <div class="cell-1-1 score-type"><span>{{$t('myperformance.evaluate.mutualEvaluation')}} </span></div>
                    <div class="cell-1-1 score-ctn">
                        <div class="avater">
                            <div class="img-wrap">
                                <img class="valign-inner" :src='photoUrl(item.photoId)'>
                            </div>
                        </div>
                        <v-form :model="item.model" :schema="item.schema" label-style="none" label-suffix="" :cols="1">
                            <text-field property="employeeSelfScore" editor-width="300"></text-field>
                            <text-field property="comment" type="textarea" :editor-height="100" editor-width="500"></text-field>
                        </v-form>
                    </div>
                </div>
            </div>
        </div>
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


export default {
    props: [{
        name: 'data',
        type: Array
    }],
    data() {
        let indicatorSchema = new Schema({
            employeeSelfScore: {
                label: this.$t('myperformance.approve.score'),
                required: true,
                whitespace: false,
                rules: {
                    type: 'custom',
                    message: this.$t('myperformance.approve.eee'),
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
                label: this.$t('myperformance.approve.comment'),
                required: true,
                whitespace: false
            }
        });

        return {
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
                return `/assets/images/public/xwz.png`;
        },
        handleParams() {
            let tempParams = {
                    schemeId: this.$route.params.sid,
                    schemeEmployeeId: this.$route.params.schemeEmployeeId,
                    scoreDetail: [],
                    submitType: this.aprove.veteran,
                    suggestion: this.aprove.suggestions,
                    referEmployeeId: this.aprove.employeeId
                },
                indicatorData = this.data,
                params = {};
            for (let key of indicatorData.keys()) {
                let val = indicatorData[key],
                    model = val.model;
                tempParams.scoreDetail.push({
                    employeeIndicatorId: val.employeeIndicatorId,
                    score: model.employeeSelfScore,
                    comment: model.comment
                });
            }
            convert(tempParams, params, "", true);
            return params;
        }
    }
};

</script>
