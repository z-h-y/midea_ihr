<style lang="less">
.ihr-staff-resultState {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }
    .search {
      position: relative;
    }
    .search .expend-btn {
      position: absolute;
      right: 0;
      top: 5px;
    }
    .search .query-btn {
      text-align: center;
      margin: 20px;
      padding-top: 20px;
      border-top: 1px solid #ecedee;
    }

    .resultState-form {
      height: 46px;
      overflow: hidden;
      transition: height .3s linear;
    }
    .resultState-form.expended {
      height: 92px;
      transition: height .3s linear;
    }
    .operate {
      background: transparent;
      border: none;
      font-size: 15px;
      margin-left: 20px;
    }
}
</style>

<template lang="html">
<div>
  <div class="content-wrap bg-w ihr-staff-resultState">
    <panel :title="panelTitle" class=" panel-b mt20 mb20 pb30" header="panel-header">
      <div class="mb16 pt16">
        <div class="search-area">
            <v-form :class="{expended: expended}" :model="resultState" :schema="resultStateSchema" label-width="130" :cols="3" form-style="resultState-form">
                <text-field property='employeesCode' editor-width="150"></text-field>
                <text-field property='employeesName' editor-width="150"></text-field>
            </v-form>
            <!-- <ui-icon-button class="expend-btn" :class="{expended: expended}" :icon="expendIcon" @click="expendSearch"></ui-icon-button> -->
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="searchTable">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="releaseResult" color="primary" icon="fa-plus" button-type="button">{{$t('performance.button.releaseResult')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="showEditScoreModal" icon="fa-pencil-square-o" type="flat" button-type="button">{{$t('performance.button.editScore')}}</ui-button>
        </div>
        <div>
          <vuetable ref="vuetable" @action="action" :api-url="tableUrl" :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" per-page="10">
          </vuetable>
        </div>
      </div>
    </panel>
    <div class="btn-group">
        <ui-button @click="goCancel" class="btn-default-bd">{{$t('button.back')}}</ui-button>
    </div>
  </div>
  <ui-modal id="edit-score" :show="show.scoreView" type="small" :title="$t('performance.button.editScore')">
    <v-form ref="scoreform" :model="scoreModel" :schema="scoreSchema" label-width="150" label-suffix="" :cols="1" form-style="">
      <text-field property='adjustScore' editor-width="100"></text-field>
    </v-form>
    <div slot="footer">
        <ui-button color="primary mr10" @click = "saveEditScore">{{$t('button.submit')}}</ui-button>
        <ui-button class="btn-default-bd" type="flat" @click = "show.scoreView = false">{{$t('button.cancel')}}</ui-button>
    </div>
  </ui-modal>

  <ui-confirm ref="relconfirm" @confirm="confirmedFunc" :show="show.relConfirm" :title="confirm.confirmTitle" close-on-confirm>
      {{confirm.confirmText}}
  </ui-confirm>
</div>
</template>

<script>

import {default as Schema} from '../../schema/index';

import {default as Message} from '../../components/basic/message';


export default {
    data() {
      let self = this;
      let resultStateSchema = new Schema({
          employeesName: {
              label: self.$t('staff.employeeName')
          },
          employeesCode: {
              label: self.$t('staff.employeeId')
          }
      });

      let scoreSchema = new Schema({
        adjustScore: {
              label: self.$t('performance.adjustedScore'),
              required: true,
              type: 'integer'
          }
      });

          return {
              scoreResultName: [],
              releaseName: [],
              panelTitle: this.$t('performance.viewResultStatistics'),
              tableUrl:'/performance/schemeInfos/scoreResultList',
              resultStateSchema:resultStateSchema,
              resultState:resultStateSchema.newModel(),
              expendIcon: 'fa-angle-double-down',
              scoreSchema:scoreSchema,
              scoreModel: scoreSchema.newModel(),
              selectedRow:[],
              scoreViewParam:{},
              confirm: {
                  confirmTitle: this.$t('performance.header.importantTip'),
                  confirmText: this.$t('performance.message.releasedScoresConfirm'),
              },
              show: {
                scoreView:false,
                relConfirm:false
              },
              expended: false,
              columns: [
                  {
                      name: '__checkbox:',
                      title: ''
                  },
                  {
                    name: 'employeeName',
                    title: this.$t('staff.employeeName')
                  },
                  {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('staff.employeeId')
                  },
                  {
                    name: 'positionName',
                    title: this.$t('performance.position')
                  },
                  {
                    name: 'selfEvaluationScore',
                    title: this.$t('performance.selfEvaluationScore')
                  },
                  {
                    name: 'mutualScores',
                    title: this.$t('performance.mutualScore'),
                    callback: function (value) {
                      let resultArray = [];
                      if(value instanceof Array) {
                        for(let item of value) {
                          resultArray.push(item.evalueScore);// result += item.
                        }
                        return resultArray.join(',');
                      }
                    }
                  },
                  {
                    name: 'finalScore',
                    dataClass: 'tr',
                    title: this.$t('performance.finalScore')
                  },
                  {
                    name: 'adjustScore',
                    dataClass: 'tr',
                    title: this.$t('performance.adjustedScore')
                  },
                  {
                    name: 'rank',
                    title: this.$t('performance.rank')
                  },
                  {
                    name: 'releaseStatusName',
                    title: this.$t('performance.status')
                  }
              ],
            }
        },
        computed: {
          queryParams() {

            let schemeId = this.schemeId ? this.schemeId : "";
            let employeesName = this.resultState.employeesName ? this.resultState.employeesName : "";
            let employeesCode = this.resultState.employeesCode ? this.resultState.employeesCode : "";
            return [
              `schemeInfoId=${schemeId}`,
              `employeeName=${employeesName}`,
              `employeeCode=${employeesCode}`,
            ]
          },
          schemeId() {
            return this.$route.params.id ? this.$route.params.id : 0;
          },
          checkedRows() {
            let tableData = this.$refs.vuetable.tableData;
            let result = [];
            for(let item of this.selectedRow) {
              result.push(tableData[item]);
            }
            return result;
          },
          checkedScoreIds() {
            let ids = [];
            for(let item of this.checkedRows) {
              if(item.scoreResultId) {
                ids.push(item.scoreResultId);
              }
            }
            return ids;
          },
          isRelease() {
            for(let item of this.checkedRows) {
              if(!item.releaseStatus || item.releaseStatus == '0') {
                return false;
              }
            }
            return true;
          }
        },
        methods: {
          action(action, data) {

              this.empOperaterow =  data;
              if (action == 'edit-item') {
                this.scoreViewParam.employeeId = data.employeeId;
                this.show.scoreView= true;
              }
          },
          searchTable() {
            this.$refs.vuetable.reloadData();
          },
          goCancel() {
            this.forwardUrl("individualScheme");
          },
          resetTable() {
            this.resultState.employeesName = '';
            this.resultState.employeesCode = '';
            this.$nextTick(()=>{
              this.$refs.vuetable.reloadData();
            })
          },
          expendSearch() {
            this.expended = !this.expended;
            this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            this.$refs.vuetable.reloadData();
          },
          forwardUrl(pathName, params) {
              params = params || {};
              this.$router.push({
                  name: pathName,
                  params: params
              });
              this.$router.push({name:pathName,params:params});
          },
          releaseResult(){
            this.scoreResultName = [];
            this.releaseName = [];
            for(let item of this.checkedRows) {
              if(!item.scoreResultId) {
                this.scoreResultName.push(item.employeeName);
              } else if (item.releaseStatus == '1'){
                this.releaseName.push(item.employeeName);
              }
            }
            var message = '';
            var extralMessage = '';
            if (this.scoreResultName.length > 0) {
              message = this.$t('performance.message.viewResultReleaseResultMessage', { msg: this.scoreResultName.join(',') });
            }
            if (this.releaseName.length > 0) {
              extralMessage = this.$t('performance.message.viewResultReleaseAgainMessage', { msg: this.releaseName.join(',') });
            }
            if (message || extralMessage) {
              Message({
                type: 'error',
                message: message,
                extralMessage: [extralMessage],
              })
              return;
            }
            if(!this.checkSelected('releaseResult')) return;
            if(this.checkedScoreIds.length <= 0) {
              Message({
                type: 'error',
                message: this.$t('performance.message.viewResultReleaseResultFalse')
              })
              return;
            }
            this.$refs.relconfirm.open();
          },
          confirmedFunc() {
            this.$http.put('/performance/scoreResults/releaseResults',{scoreResultIds:this.checkedScoreIds}, {
                emulateJSON: true
            }).then((response) => {
              Message({
                type: 'success',
                message: this.$t('performance.message.viewResultReleaseResultSuccess')
              })
                this.$refs.vuetable.reloadData();
            });
          },
          showEditScoreModal() {
            if(!this.checkSelected('editScore')) return;

            let item = this.$refs.vuetable.tableData[this.selectedRow[0]];
            this.show.scoreView = true;
            this.scoreModel.adjustScore = item.adjustScore;
          },
          saveEditScore(){
            let pass = this.$refs.scoreform.isFormValidate();
            if(!pass) return;
            let param = {
              scoreResultId:this.checkedScoreIds[0],
              score:this.scoreModel.adjustScore,
            };
            this.$http.put('/performance/schemeInfo/editScore',param, {
                emulateJSON: true
            }).then((response) => {
                this.$refs.vuetable.reloadData();
                this.show.scoreView = false;
            });
          },
          checkSelected(actionCode) {
            switch (actionCode) {
                case 'editScore':
                  return this.doCheckItems(["mandatory","single","editCheckRelease","checkRate"]);
                  break;
                case 'releaseResult':
                  // return this.doCheckItems(["mandatory","relCheckRelease","relCheckRate"]);
                  return this.doCheckItems(["mandatory"]);
                  break;
                default:
                  Message({
                      type: 'error',
                      message: 'Internal Server Error'
                  });
            }
          },
          doCheckItems(actionCodes) {
            if(!actionCodes instanceof Array) return;
            for(let item of actionCodes) {
              switch (item) {
                  case 'mandatory':
                    if (this.checkedRows.length == 0) {
              Message({
                  type: 'error',
                  message: this.$t('performance.message.viewResultChooseOne')
              });
              return false;
            }
                  break;
                  case 'single':
                    if(this.checkedRows.length > 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.viewResultOnlyOne')
                      });
                      return false;
                    }
                    break;
                  case 'editCheckRelease':
                    if (this.isRelease) {
                      Message({
                        type:'error',
                        message:this.$t('performance.message.viewResultEditReleased')
                      })
                      return false;
                    }
                    break;
                  case 'relCheckRelease':
                    if (this.isRelease) {
                      Message({
                        type:'error',
                        message:this.$t('performance.message.viewResultReleaseAgain')
                      })
                      return false;
                    }
                    break;
                  case 'checkRate':
                    if (this.checkedScoreIds.length <= 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.viewResultShowEditScore')
                      });
                      return false;
                    }
                    break;
                  case 'relCheckRate':
                    if (this.checkedScoreIds.length <= 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.viewResultReleaseResultFalse')
                      });
                      return false;
                    }
                    break;
                }
              }
            return true;
          }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
};

</script>
