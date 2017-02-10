<style lang="less">

#select-indicator {
    .ui-modal-container{
      height: 524px;
    }
    .select-person {
        .wh {
            width: 85px;
            height: 32px;
        }
    }
    .section-ui-modal {
        .group {
            margin-bottom: 16px;
        }
        .ui-button {
            margin-bottom: 8px;
        }
        .ui-modal-footer {
            .ui-button {
                margin-bottom: 0;
            }
        }
    }
    .select-person {
        width: 100%;
        border: 1px solid #ecedee;
        overflow: hidden;
        border-right: none;
        .select-list,
        .select-person .operat-area {
            width: 241px;
            display: block;
            position: relative;
        }
    }
    .select-area {
        width: 100%;
    }
    .person-tree {
        width: 25%;
        padding: 6px 0px;
        height: 392px;
        background: #f5f5f5;
        border-right: 1px solid #ecedee;
    }
    .search-ctx {
        position: relative;
        border: 1px solid #ecedee;
        border-top: none;
        border-left: none;
        height: 50px;
        background: #fafafa;
    }
    .search-pos {
        position: absolute;
        right: 14px;
        top: 9px;
    }
    .search-pos .search-bg {
        display: inline-block;
        border: 1px solid #e8e8e8;
        height: 100%;
        background: #fff;
        padding: 2px 16px 2px 10px;
        border-radius: 16px;
    }
    .search-pos .search-input {
        border: none;
        background: transparent;
        width: 202px;
        height: 26px;
        line-height: 26px;
    }
    .search-pos .search-input::placeholder {
        color: #a5acbe;
        font-size: 12px;
    }
    .search-pos .search-input:focus {
        outline: none;
        border: none;
    }
    .selected-area {
        padding-left: 150px;
        margin: 10px 0px;
    }
    .selected-title {
        text-align: center;
    }
    .select-list h3 {
        color: #3a3a3a;
        font-size: 12px;
        height: 26px;
    }
    .operat-area {
        width: 115px;
        padding: 65px 10px 0px;
        border: none;
        height: 277px;
    }
    .select-person .not-selected,
    .select-person .selected {
        height: 252px;
        border: 1px solid #ecedee;
    }
    .select-person .details {
        overflow: hidden;
        position: relative;
    }
    .details .details-bor {
        padding-left: 20px;
        height: 44px;
        background: #fafafa;
        border: 1px solid #ecedee;
        border-bottom: none;
        border-left: none;
    }
    .details .prompt-message {
        height: 40px;
        vertical-align: middle;
        line-height: 40px;
        color: #3a3a3a;
        font-size: 12px;
        display: inline-block;
    }
    .details .current-index {
        text-align: center;
        display: inline-block;
        min-width: 100px;
    }
    .details .message-txt {
        display: inline-block;
        min-width: 180px;
        text-align: left;
    }
    .select-person {
        * {
            box-sizing: border-box;
        }
    }
    .select-person .btn {
        padding: 5px;
    }
    .search-result,
    .selected-result {
        padding: 2px 0px;
        height: 248px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .search-result {
        position: relative;
    }
    .search-result .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @-webkit-keyframes segment-spin {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0)
        }
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg)
        }
    }
    @keyframes segment-spin {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0)
        }
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg)
        }
    }
    .search-result .load-icon:after {
        display: inline-block;
        content: '';
        width: 1em;
        height: 1em;
        -webkit-animation: segment-spin .6s linear;
        animation: segment-spin .6s linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        border-radius: 500rem;
        border-color: #767676 rgba(0, 0, 0, .1) rgba(0, 0, 0, .1);
        border-style: solid;
        border-width: .2em;
        box-shadow: 0 0 0 1px transparent;
        visibility: visible;
        z-index: 101
    }
    .selected-area .li-item {
        cursor: pointer;
        margin: 0px;
        padding: 0px 10px;
        display: list-item;
        height: 36px;
        line-height: 36px;
    }
    .selected-area .focus-row-active {
        background-color: #dfe7ef;
    }
    .selected-area .li-item:hover {
        background-color: #dfe7ef;
    }
    .selected-area .nickname {
        color: #2a3c59;
        font-size: 14px;
    }
}

</style>

<template lang="html">

<ui-modal id="select-indicator" :show.sync="show.modal" type="large" header="Select Indicators">
    <div class="select-person fix ">
        <!-- <div class="person-tree l">
            <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="queryPerson"></tree>
        </div> -->
        <div class="select-area l">
            <div class="search-ctx">
                <div class="search-pos">
                    <span class="search-bg">
                 <input class="search-input" placeholder="Search" type="text" v-model="searchTxt" />
                 <span @click="search"><i class="fa fa-search"></i></span>
                    </span>
                </div>
            </div>
            <div class="selected-area fix">
                <div class="select-list l">
                    <div class="selected-title">
                        <h3>Not selected</h3></div>
                    <div class="not-selected">
                        <ul class="search-result">
                            <div class="loading" v-show="loadStatus">
                                <i class="load-icon"></i>
                            </div>
                            <template v-for="(index,item) of indicators">
                                <li class="li-item" @dblclick="toSelectedEmplaoyees(index)" @mousedown="selected($event,index,'notSelected')"><span class="nickname">{{ item["indicatorName"] }}</span></li>
                            </template>
                        </ul>
                    </div>
                </div>
                <div class="operat-area l">
                    <div class="btns">
                        <div class="btn">
                            <ui-button class="dis-tc btn-primary-bd wh" @click="save" color="primary" icon="fa-angle-double-right" :icon-right="true" text="Save"></ui-button>
                        </div>
                        <div class="btn">
                            <ui-button class="dis-tc btn-primary-bd wh" @click="allTo" color="primary" icon="fa-angle-double-right" :icon-right="true" text="All"></ui-button>
                        </div>
                        <div class="btn">
                            <ui-button class="dis-tc btn-default-bd wh" @click="cancel" type="flat" icon="fa-angle-double-left" text="Cancel"></ui-button>
                        </div>
                        <div class="btn">
                            <ui-button class="dis-tc btn-default-bd wh" @click="toAll" type="flat" icon="fa-angle-double-left" text="All"></ui-button>
                        </div>
                    </div>
                </div>
                <div class="select-list l">
                    <div class="selected-title">
                        <h3>selected</h3></div>
                    <div class="selected">
                        <ul class="selected-result">
                            <template v-for="(index,item) of selectedIndicators">
                                <li class="li-item" @dblclick="toEmployees(index)" @mousedown="selected($event,index,'selected')"><span class="nickname">{{ item["indicatorName"] }}</span></li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="details">
                <div class="details-bor">
                    <p class="prompt-message" v-show="prompt.employeeId">
                        <label class="current-index">Current location:</label>
                        <span class="message-txt">{{prompt.employeeName}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- <div class="person-tree l">
            <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="queryPerson"></tree>
        </div> -->
    </div>

    <div slot="footer">
        <ui-button color="primary" @click="submitModal">Confirm</ui-button>
        <ui-button @click="closeModal">Cancel</ui-button>
    </div>
</ui-modal>

</template>

<script type="text/ecmascript6">

import {
    removeClass, addClass
}
from 'wind-dom';
export default {
    name:'indicatorSelector',
    props: {
        show: {
            type: Object,
            default: {}
        },
        handleComfirmed: {
          type: Function
        },
        indType: {
          type: Array,
          default: []
        },
        multiple: {
          type: Boolean,
          default: true
        },
        selectedIndicators:{
          type:Array,
          default: []
        }
    },
    data() {
        let _self = this;
        return {
            loadStatus: false,
            isSelected: false,
            trees: {},
            rootNode: 0,
            showCheckbox: false,
            prompt: {},
            selectedObject: {},
            indicators: [],
            indtypes:{
              organization:1,
              individual:2,
              fundamentals:3
            },
            searchTxt: '',
            levelConfig: {
                labelProperty: 'orgShortName',
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'orgShortName',
                    load: function(node, callback) {
                        let parentId = node.data.orgId;
                        _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                            node.children = response.data;
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    }
                }
            }
        }
    },
    created() {
        this.initNoChoiceData();
    },
    methods: {
            initNoChoiceData() {
              let indCategoryIds = [];
              for(let item of this.indType) {
                indCategoryIds.push(this.indtypes[item]);
              }

              this.$http.get(`/performance/indicators/getIndicatorList`,{params:{indicatorCategorys:indCategoryIds}}).then((response) => {

                  let indicatorArray = response.data.data;
                  if (indicatorArray) {
                      this.indicators = indicatorArray;
                      this.loadStatus = false;
                  }
              });
            },

            toSelectedEmplaoyees(index) {
                let tempArray = this.indicators[index];
                let isExist = this.isExist(tempArray, this.selectedIndicators);
                if (tempArray && !isExist) {
                  if(this.multiple) {
                    this.selectedIndicators.push(tempArray);
                  } else {
                    if(this.selectedIndicators.length >=1)return;
                    this.selectedIndicators.push(tempArray);
                  }

                }
            },
            // 判断选择的项是否存在指定数组中
            isExist(obj, arr) {
                let isExist = false;
                if (!obj) {
                    return isExist;
                }
                for (let i = 0, len = arr.length; i < len; i++) {
                    if (obj.indicatorId === arr[i].indicatorId) {
                        isExist = true;
                        break;
                    }
                }
                return isExist;
            },

            toEmployees(index) {
                let tempArray = this.selectedIndicators[index];
                if (tempArray) {
                    this.selectedIndicators.splice(index, 1);
                    this.cleanIndex();
                }
            },

            selected($event, index, flag) {

                this.selectedObject.selectedIndex = index;
                this.selectedObject.flag = flag;

                let currentNode = $event.currentTarget,
                    lis = document.querySelectorAll(`.${currentNode.className}`);
                for (let i = 0, len = lis.length; i < len; i++) {
                    if (lis[i].tagName === 'LI') {
                        removeClass(lis[i], 'focus-row-active');
                    }
                }
                addClass(currentNode, 'focus-row-active');
                if (flag && flag === 'notSelected') {
                    this.prompt = this.indicators[index];
                } else if (flag && flag === 'selected') {
                    this.prompt = this.selectedIndicators[index];
                }

            },

            save() {

                if (this.selectedObject.flag === 'notSelected') {

                    if (this.selectedObject.selectedIndex === '') return;

                    this.toSelectedEmplaoyees(this.selectedObject.selectedIndex);
                }
            },

            allTo() {
                let tempArray = this.indicators.slice();
                for (let i = 0, len = tempArray.length; i < len; i++) {
                    if (!this.isExist(tempArray[i], this.selectedIndicators)) {
                        this.selectedIndicators.push(tempArray[i]);
                    }
                }
            },

            toAll() {
                this.selectedIndicators = [];
            },

            cancel() {

                if (this.selectedObject.flag === 'selected') {

                    if (this.selectedObject.selectedIndex === '') return;

                    this.toEmployees(this.selectedObject.selectedIndex);
                    this.cleanIndex();
                }
            },

            cleanIndex() {
                this.selectedObject.selectedIndex = '';
                this.prompt = {};
            },

            search() {

                if (!this.searchTxt) {
                    return;
                }

            },

            submitModal() {

                this.handleComfirmed(this.selectedIndicators);

                this.$nextTick(function() {
                  this.show.modal = false;
                });
            },

            closeModal() {
                this.selectedIndicators = [];
                this.$nextTick(function() {
                    this.show.modal = false;
                });
            }
    },
    components: {
      Tree: require('../tree/tree.vue')
    }
};

</script>
