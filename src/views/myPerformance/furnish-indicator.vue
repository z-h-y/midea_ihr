<style lang="less">



</style>

<template lang="html">

<ui-confirm header="Delete" type="danger" confirm-button-text="Delete" confirm-button-icon="delete" deny-button-text="Cancel" @confirmed="deleteConfirmed" @denied="deleteDenied" :show.sync="show.deleteConfirm" close-on-confirm>
    Are you sure to delete this?
</ui-confirm>
<template v-for="(index,item) in data">

    <div class="indicators-item" v-show="!item.isEdit">
        <div class="indicators-head">
            <div class="title">
                <i class="number">{{ index + 1}}</i>
                <span class="indicators-weight-title">{{item.indicatorName}} ({{item.unit}})</span>
            </div>
            <div class="operate">
                <i v-if="item.mandatory==='0'" class="fa fa-trash" :class="{'cursor-default':edit}" @click="handleDelete(index,item)" aria-hidden="true" v-show="isAdmin"></i>
                <i v-if="item.mandatory==='0'" class="fa fa-pencil" :class="{'cursor-default':edit}" @click="handleEdit(index,item)" aria-hidden="true"></i>
                <i v-if="item.mandatory==='0'" class="fa fa-arrow-up" :class="{'cursor-default':edit}" @click="handleUp(index)" aria-hidden="true" v-show="isAdmin"></i>
                <i v-if="item.mandatory==='0'" class="fa fa-arrow-down" :class="{'cursor-default':edit}" @click="handleDown(index)" aria-hidden="true" v-show="isAdmin"></i>
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
        </div>
    </div>
    <v-form :model="item.model" :schema="item.schema" label-width="150" label-suffix="" :cols="1" v-show="item.isEdit" class="form-edit-ctn">
        <text-field property='indicatorName' editor-width="400"></text-field>
        <text-field property='unit' editor-width="400"></text-field>
        <text-field property='weight' editor-width="400" type="number"></text-field>
        <text-field property='target' editor-width="400" ></text-field>
        <text-field property='criteria' editor-width="400"></text-field>
        <text-field property='dataSources' editor-width="400"></text-field>
        <div class='field'>
            <div class="btn-wrap">
                <ui-button color="primary mr10" @click="handleItemSubmit(item.model,index,item)">Save</ui-button>
                <ui-button class="btn-default-bd" @click="handleCancelEdit(index,item)" type="flat">Cancel</ui-button>
            </div>
        </div>
    </v-form>

</template>

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
    formatDate
}
from '../../util/assist';
let indicatorSchema = new Schema({
    indicatorName: {
        label: 'Indicator Name',
        required: true,
        whitespace: false,
    },
    unit: {
        label: 'Unit',
        required: true,
        whitespace: false,
    },
    weight: {
        label: 'Weight',
        required: true,
        whitespace: false,
        rules: {
            type: 'custom',
            message: 'Please enter a 1~101 positive integer!',
            validate() {
                var isValidate = true;
                if (this.weight < 1 || this.weight > 100) {
                    isValidate = false;
                } else {
                    if (this.weight % 1 !== 0) {
                        isValidate = false;
                    }
                }
                return isValidate;
            }
        }
    },
    target: {
        label: 'Targets',
        required: true,
        whitespace: false
    },
    criteria: {
        label: 'Criteria/Formula',
        required: true,
        whitespace: false,
    },
    dataSources: {
        label: 'Data Source Dept',
        required: true,
        whitespace: false,
    },
    mandatory: {

    },
    employeeIndicatorId: {

    }
});

export default {
    props: [{
        name: 'data',
        type: Array
    }, {
        name: 'parentId'
    }],
    data() {
        let _self = this;
        return {
            show: {
                deleteConfirm: false
            },
            showModel: {
                modal: false
            },
            indtypes: ['organization', 'fundamentals'],
            panelTitle: '',
            index: '', //保存点击编辑时保存索引
            basicInfo: {}, //基本信息
            edit: false,
            loadding: false, //加载中
            newIndicator: false, //新增
            isHasIndicator: false, //显示无数据
            deleteItemObject: {}, //删除对象
            indicatorSchema: indicatorSchema,
            indicator: indicatorSchema.newModel(),

        };
    },
    computed: {
        isAdmin() {
            if (this.$route.params.indicatorsSetting === '1')
                return false;
            return true;
        }
    },
    created() {

    },
    ready() {

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
        handleFormatDate(value) {
            return formatDate(new Date(value));
        },
        /**
         * 向上移动
         */
        handleUp(index) {
            var tmp = Object.assign({}, this.data[index]);
            let target = index;
            if (index === 0) {
                return;
            } else {
                this.data.splice(target, 1);
                this.data.splice(target - 1, 0, tmp);
            }
        },
        /**
         * 向下移动
         */
        handleDown(index) {
            var tmp = Object.assign({}, this.data[index]);
            let target = index;
            if (index === this.data.length - 1) {
                return;
            } else {
                this.data.splice(target, 1);
                this.data.splice(target + 1, 0, tmp);
            }
        },

        /**
         * 指标选择器回调
         */
        indicatorCallBack(data) {
            if (data && data instanceof Array) {
                if (data.length > 1) {
                    Message({
                        type: 'error',
                        message: 'You can only select one'
                    });
                }
                let indicator = this.indicator,
                    dataIndicator = data[0];
                indicator.indicatorName = dataIndicator.indicatorName;
                indicator.criteria = dataIndicator.formula;
                indicator.dataSources = dataIndicator.dataSources;
                indicator.unit = dataIndicator.unit;
            }
            this.$refs.indicatorselector.selectedIndicators = [];
        },
        /**
         * 编辑指标
         * 处理点击编辑时让model对象得到值
         */
        handleEdit(index, item) {
            if (this.edit) {
                return;
            }
            this.edit = true;
            this.data[index].model.indicatorName = item.indicatorName;
            this.data[index].model.unit = item.unit;
            this.data[index].model.weight = item.weight;
            this.data[index].model.target = item.target;
            this.data[index].model.criteria = item.criteria;
            this.data[index].model.dataSources = item.dataSources;
            this.data[index].model.mandatory = item.mandatory;
            this.data[index].model.employeeIndicatorId = item.employeeIndicatorId;
            this.data[index].isEdit = true;
        },
        handleCancelEdit(index, item) {
            item.isEdit = false;
            this.edit = false;
        },
        /**
         * 提交每条指标
         */
        handleItemSubmit(model, index, item) {
            this.edit = false;
            this.$dispatch('check-i', index);
            // this.$http.put(`/performance/employeeIndicators/${model.employeeIndicatorId}`, item.model, {
            //     emulateJSON: true
            // }).then((response) => {
            //     if (response.data) {
            //         Message({
            //             type: 'success',
            //             message: 'Update Success.'
            //         });
            //         this.data[index].isEdit = false;
            //         this.fetchIndicators();
            //     }
            // });
        },
        fetchIndicators() {
            let _self = this;
            _self.loadding = true;
            _self.$http.get('/performance/employeeIndicators', {
                params: {
                    schemeInfoId: _self.$route.params.sid
                }
            }).then((response) => {
                let indicatorData = response.data;
                if (indicatorData.length === 0) {
                    _self.isHasIndicator = true;
                } else {
                    for (let key of indicatorData.keys()) {
                        Object.assign(indicatorData[key], {
                            isEdit: false,
                            schema: _self.indicatorSchema,
                            model: _self.indicatorSchema.newModel()
                        });
                    }
                    _self.data = indicatorData;
                }
                _self.loadding = false;
            });
        },
        handleDelete(index, item) {
            if (this.edit) {
                return;
            }
            this.deleteItemObject.index = index;
            this.deleteItemObject.item = item;
            this.show.deleteConfirm = true;
        },
        /**
         * enter to delete
         */
        deleteConfirmed() {
            let deleteItemObject = this.deleteItemObject;
            this.$http.delete(`/performance/employeeIndicators/${deleteItemObject.item.employeeIndicatorId}`).then((response) => {
                if (response.data) {
                    this.data.splice(deleteItemObject.index, 1);
                }
            });
        },
        /**
         * not delete
         */
        deleteDenied() {},
    }
};

</script>
