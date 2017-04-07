<style lang="less">

.person-select {
    * {
      box-sizing: border-box;
    }
    .ui-modal-wrapper .ui-modal-container {
      width: 870px;
      height: 600px;
    }
    .vuetable th {
      padding: 6px 10px;
    }
    .vuetable tbody td {
      padding: 5px 10px;
    }
    .search-ctx {
        position: relative;
        height: 48px;
    }

    .search-pos {
        position: absolute;
        right: 14px;
        top: 8px;
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
    .search-btn {
      cursor: pointer;
    }
    .ui-modal-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .leftRight-panel {
        height: 419px;
    }
    .left-panel {
        height: 418px;
    }
    .right-panel {
        padding-left: 16px;
        margin-left: 0;
    }
    .bottom-panel {
      margin-top: 16px;
      height: 44px;
      border: 1px solid #eee;
      overflow: auto;
    }
    .all-selected-person {
      display: inline-block;
      line-height: 42px;
      padding: 0 16px;
      position: relative;
    }
    .rm-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    .vuetable-pagination {
        margin-top: 16px;
        padding-right: 16px;
    }
    .vuetable-wrapper {
        width: auto;
        height: 369px;
        padding-bottom: 16px;
        overflow: auto;
    }
}

</style>

<template lang="html">

<ui-modal ref="perselect" class="person-select" :show="show.modal" type="large" :title="$t('selectors.selectPerson')" body="" :backdrop-dismissible="false">
    <div class="leftRight-panel bg-f5f5f5 fix">
        <div class="left-panel p10">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="clickNode"></tree>
        </div>
        <div class="right-panel">
            <div class="search-ctx">
                <div class="search-pos">
                    <span class="search-bg">
                 <input @keydown="goSearch($event)" class="search-input" :placeholder="$t('button.search')" type="text" v-model="searchTxt" />
                 <span @click="search" class="search-btn"><i class="fa fa-search"></i></span>
                    </span>
                </div>
            </div>
            <div class="vuetable-wrapper">
                <vuetable ref="vuetable" :api-url="selectedTableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" per-page="10" :load-success-callback="loadSuccessCallback">
                </vuetable>
            </div>
        </div>
    </div>
    <div class="bottom-panel">
      <span class="all-selected-person" v-for="(item, index) in allSelectedPer" track-by="index">
        {{item.employeeName}}
        <i class="rm-btn fa fa-times" aria-hidden="true" @click="delPer(index)"></i>
      </span>
    </div>
    <div slot="footer">
        <ui-button @click="confirmSelect" color="primary">{{$t('button.confirm')}}</ui-button>
        <ui-button @click="close">{{$t('button.cancel')}}</ui-button>
    </div>
</ui-modal>

</template>

<script type="text/ecmascript-6">

import {
    default as Message
}
from '../../components/basic/message';
export default {
    props: {
        show: {},
        multiSelected: {
          type: Boolean,
          default: true
        },
        handleComfirmed: {
					type: Function,
          default() {
            return function() {};
          }
				},
        handleBeforeComfirmed: {
					type: Function,
          default() {
            return function() {
              return true;
            };
          }
				},
        limit: {
          type: Boolean,
          default: true
        }
    },
    data() {
        let _self = this;
        let tableColumns = [{
          name: '__radio:',
          title: ''
        }, {
            name: 'employeeName',
            title: this.$t('staff.employeeName')
        }, {
            name: 'positionName',
            title: this.$t('performance.position')
        }, {
            name: 'officePhone',
            dataClass: 'tr',
            title: this.$t('selectors.phone')
        }, {
            name: 'email',
            title: this.$t('selectors.email')
        }];
        if (this.multiSelected) {
          tableColumns[0].name = '__checkbox:';
        }
        return {
            searchTxt: '',
            orgGroup: {},
            selData: [],
            tableData: [],
            selectedRow: [],
            allSelectedPer: [],
            loadTableData: false,
            tableColumns: tableColumns,
            regions: [],
            levelConfig: {
                labelProperty: 'orgShortName',
                children: {
                    lazy: true,
                    recursive: true,
                    labelProperty: 'orgShortName',
                    load: function(node, callback) {
                        var data;
                        if (node.data.isParent) {
                            let parentId = node.data.orgId;
                            _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                                node.children = response.data;
                                if (callback) {
                                    callback();
                                }

                            }, (response) => {
                                console.log('错误信息 ：' + response.statusText);
                            });
                        } else {
                            node.children = [];
                        }
                    }
                }
            },
            showCheckbox: false,
            // 弹框选择器表格接口
            selectedTableUrl: '',
            clickNode: function(node) {
                _self.selectedTableUrl = '/org/orgs/' + node.orgId + '/members';
                _self.orgGroup = node;
            }
        }
    },
    watch: {
      'selectedRow': function(newVal) {
        if (!this.loadTableData) {
          this.setAllSelectedPer(newVal);
        }
      },
      'show.modal': function(newVal) {
        if (newVal === true && this.regions.length < 1) {
          this.getTreeData();
        }
      }
    },
    computed: {},
    mounted() {

    },
    methods: {
        open() {
          this.$refs['perselect'].open();
        },
        close() {
          // this.handleComfirmed(this.allSelectedPer, this.orgGroup);
          this.$refs['perselect'].close()
        },
        getTreeData() {
          this.selectedTableUrl = '/org/orgs/getUnitMembersByUserId';
          var url = '/org/orgs/parent';
          if (!this.limit) {
            url = '/org/orgs/0/children';
          }
          this.$http.get(url).then((response) => {
              // this.orgGroup = response.data;
              this.regions = response.data;
          }, (response) => {
              Message({
                  type: 'error',
                  message: response.statusText
              });
          });
        },
        confirmSelect() {
            var orgChiefInfo = this.allSelectedPer;
            var orgGroup = this.orgGroup;
            var self = this;
            if (orgChiefInfo.length < 1) {
                Message({
                    type: 'error',
                    message: this.$t('selectors.selectEmployee')
                })
                return false;
            }
            this.$emit('select-chief',orgChiefInfo,orgGroup);
            var validate = this.handleBeforeComfirmed(orgChiefInfo, orgGroup, function(value) {
                if (value) {
                  self.close();
                }
            });
            if (validate) {
              this.close();
            }
        },
        goSearch(event) {
          if (event.keyCode === 13) {
            this.search();
          }
        },
        search() {
            if (this.orgGroup.orgId === undefined || this.orgGroup.orgId === null) {
              this.orgGroup.orgId = 1;
            }
            this.selectedTableUrl = '/org/orgs/' + this.orgGroup.orgId + '/members?employeeName=' + this.searchTxt;
        },
        // 删除人员
        delPer(index) {
          var tableData = this.tableData;
          var isExist = false;
          for (var i = 0, len = tableData.length; i < len; i++) {
            if (this.allSelectedPer[index].employeeId === tableData[i].employeeId) {
              for(var j = 0; j < this.selectedRow.length; j++) {
                if (this.selectedRow[j] === i) {
                  this.selectedRow.splice(j, 1);
                  break;
                }
              }
              this.$refs.vuetable.checkAll = false;
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            this.allSelectedPer.splice(index, 1);
          }
        },
        // 设置所有的选择人员
        setAllSelectedPer(selectedRow) {
          var self = this;
          var i,j;
          var allSelectedPer = self.allSelectedPer;
          var tableData = self.tableData;
          var delArr = [];
          for (i = 0; i < allSelectedPer.length; i++) {
            for (j = 0; j < tableData.length; j++) {
              if (allSelectedPer[i].employeeId === tableData[j].employeeId) {
                delArr.push(i);
                break;
              }
            }
          }
          for (i = delArr.length - 1; i > -1; i--) {
            allSelectedPer.splice(delArr[i], 1);
          }
          if (!this.multiSelected && selectedRow.length > 0) {
            self.allSelectedPer.splice(0,self.allSelectedPer.length);
          }
          selectedRow.forEach(function(item) {
            var isExist = false;
            for (i = 0; i < allSelectedPer.length; i++) {
              if (tableData[item].employeeId === self.allSelectedPer[i].employeeId) {
                isExist = true;
              }
            }
            if (!isExist) {
              self.allSelectedPer.push(self.tableData[item]);
            }
          });
        },
        // 表格刷新时重新设置selectedRow
        setSelectedRow() {
          this.loadTableData = true;
          var allSelectedPer = this.allSelectedPer;
          var tableData = this.tableData;
          for (var i = 0; i < allSelectedPer.length; i++) {
            for (var j = 0; j < tableData.length; j++) {
              if (allSelectedPer[i].employeeId === tableData[j].employeeId) {
                this.selectedRow.push(j);
                break;
              }
            }
          }
          this.loadTableData = false;
        },
        // 表格数据加载完成后的回调事件
        loadSuccessCallback(response) {
          this.tableData = response.data;
          this.setSelectedRow();
        }
    },
    components: {
      Tree: require('../tree/tree.vue')
    }
}

</script>
