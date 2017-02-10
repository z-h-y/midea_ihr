<style >
  #addIndicator-newstyle{
    margin-top:16px;
    margin-left:16px;
  }
  #indicator-text-newStyle{
    margin-top:-10px;
  }
</style>

<template lang="html">

<div class="ihr-position-addGroup">
    <panel :title="panelTitle" class=" panel-b  mb40 mr20" header="panel-header" id="addIndicator-newstyle">
        <v-form v-ref:indForm :model="group" :schema="groupSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <text-field property='indicatorName' editor-width="400"></text-field>
            <text-field property='unit' editor-width="400"></text-field>
            <select-field property='indicatorCategory' editor-width="400"></select-field>
            <select-field property='indicatorFunction' editor-width="400"></select-field>
            <select-field property='subFunction' editor-width="400"></select-field>
            <select-field property='mopType' editor-width="400"></select-field>
            <text-field type="textarea" :editor-height="100" editor-width="400" property="formula"></text-field>
            <text-field id="indicator-text-newStyle" property='dataSources' editor-width="400"></text-field>
        </v-form>
    </panel>
    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">Submit</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
    </div>
</div>
<!-- <ui-alert type="success" :show>
    Okilly dokilly, your account was updated successfully.
</ui-alert> -->

</template>

<script type="text/ecmascript-6">

import Vue from 'vue';
import { getDictMapping } from '../../util/assist';
import {default as Schema}from '../../schema/index';
import {default as Message} from '../../components/basic/message';

let options = {
    indicatorName: {
        label: 'Indicator Name',
        required: true,
        whitespace: false
    },
    unit: {
        label: 'Unit',
        required: true,
        whitespace: false
    },
    indicatorCategory: {
        label: 'Indicator Category',
        required: true,
        mapping: function(){
          return getDictMapping('INDICATOR_CATEGORY');
        },
    },
    indicatorFunction: {
        label: 'Function',
        required: true,
        mapping: function(){
          return getDictMapping('INDICATOR_FUNCTION');
        }
    },
    subFunction: {
        label: 'Sub-Function',
        required: true,
        mapping: function(){
          return getDictMapping('SUB_FUNCTION');
        }
    },
    mopType: {
        label: 'M\\O\\P',
        mapping: function(){
          return getDictMapping('MOP_TYPE');
        }
    },
    formula: {
        label: 'Criteria/Formula',
        required: true
    },
    dataSources: {
        label: 'Data Sources',
        required: true
    }
};
let indicatorSchema = new Schema(options);

export default {
    data() {
            return {
                panelTitle: 'Add Indicator',
                groupSchema: indicatorSchema,
                group: indicatorSchema.newModel()
            }
        },
        methods: {
            // 提交
            submit() {
                let _self = this,
                indicatorModel = this.group;

                let passed = indicatorModel.$schema.isFormValidate(this.$refs.indform);
                if (!passed) return;

                if (_self.$route.name === 'addIndicator') {

                    _self.$http.post('/performance/indicators/', {
                        indicatorName: indicatorModel.indicatorName,
                        unit: indicatorModel.unit,
                        indicatorCategory: indicatorModel.indicatorCategory,
                        indicatorFunction: indicatorModel.indicatorFunction,
                        subFunction: indicatorModel.subFunction,
                        mopType: indicatorModel.mopType,
                        formula: indicatorModel.formula,
                        dataSources: indicatorModel.dataSources,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                          type: 'success',
                          message: this.$t('common.saveSuccess')
                        })
                        _self.$router.go({
                            name: 'indicator'
                        });
                    });
                } else if (_self.$route.name === 'editIndicator') {
                    _self.$http.put(`/performance/indicators/${_self.group.id}`, {
                      indicatorName: indicatorModel.indicatorName,
                      unit: indicatorModel.unit,
                      indicatorCategory: indicatorModel.indicatorCategory,
                      indicatorFunction: indicatorModel.indicatorFunction,
                      subFunction: indicatorModel.subFunction,
                      mopType: indicatorModel.mopType,
                      formula: indicatorModel.formula,
                      dataSources: indicatorModel.dataSources,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                          Message({
                            type: 'success',
                            message: this.$t('common.saveSuccess')
                          })
                          _self.$router.go({
                              name: 'indicator'
                          });
                    });
                }
            },
            cancel() {

              this.$router.go({
                  name: 'indicator',
              });
            },
            getDicts(dictCode,handfunc) {
              let _self = this;
              _self.$http.post(`/public-access/dicts/${dictCode}/items`,{}, {
                  emulateJSON: true
              }).then((response) => {

                handfunc(response);
              });
            }
        },
        route: {
            data(transition) {
                let _self = this;

                if (_self.$route.name === 'addIndicator') {
                    // _self.$http.get('/pos/jobFamilys/generation').then((response) => {
                    //     if (response.data) {
                    //         _self.group['jobFamilyCode'] = response.data;
                    //     }
                    // });
                } else if (_self.$route.name === 'editIndicator') {

                    _self.group.id = transition.to.params.id;
                    _self.panelTitle = 'Edit Indicator';
                    _self.$http.get(`/performance/indicators/${_self.group.id}`).then((response) => {
                        let props = response.json();
                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.group[prop] = props[prop];
                            }
                        }
                    });
                }
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
}

</script>
