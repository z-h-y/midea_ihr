<style lang="less">
.ihr-staff-orgScheme {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }
    .form{
      height: 46px;
    }

    .orgScheme-form {
      height: 46px;
      overflow: hidden;
      transition: height .3s linear;
    }
    .orgScheme-form.expended {
      height: 92px;
      transition: height .3s linear;
    }
}
</style>

<template lang="html">
  <div class="content-wrap bg-w ihr-staff-orgScheme">
    <div class="mb20 pt20">
      <div class="search-area">
          <v-form :class="{expended: expended}" :model="orgScheme" :schema="orgSchemeSchema" label-width="130" :cols="3">
              <text-field property='schemeName' editor-width="150"></text-field>
              <select-field property="restrictYear" editor-width="150"></select-field>
              <select-field property="frequency" editor-width="150"></select-field>
              <select-field v-show="expended" property="validStatus" editor-width="150"></select-field>
          </v-form>
          <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
          <div class="query-btn">
              <ui-button class="query-btn-search mr10" color="primary" @click="searchTable">{{$t('button.search')}}</ui-button>
              <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">{{$t('button.reset')}}</ui-button>
          </div>
      </div>
      <div class="group">
          <ui-button class="mr10 dis-tc btn-primary-bd" @click="goAdd" color="primary" icon="fa-plus" button-type="button">{{$t('button.add')}}</ui-button>
          <ui-button class="mr10 dis-tc btn-default-bd" @click="goEdit" icon="fa-pencil-square-o" type="flat" button-type="button">{{$t('button.edit')}}</ui-button>
          <ui-button class="mr10 dis-tc btn-default-bd" @click="deleteBtn" icon="fa-remove" type="flat" button-type="button">{{$t('button.delete')}}</ui-button>
          <ui-button class="mr10 dis-tc btn-default-bd" @click="goActivate" type="flat" button-type="button">{{$t('button.activate')}}</ui-button>
          <ui-button class="dis-tc-t btn-default-bd" icon="fa-caret-down" has-dropdown ref="dropdownButton" size="normal" iconPosition="right">
                  <ui-menu
                      contain-focus
                      has-icons
                      has-secondary-text
                      slot="dropdown"
                      :options="shareMenuOptions"
                      @select="menuOptionSelected"
                      @close="$refs.dropdownButton.closeDropdown()"
                  ></ui-menu>
                  {{$t('button.more')}}
              </ui-button>
          <!-- 询问框 -->
          <ui-confirm ref="uidelconfirm" :title="$t('button.delete')" @confirm="delConfirmed" :show="show.delConfirm" close-on-confirm autofocus="confirm-button">
              {{$t('common.deleteConfirm')}}
          </ui-confirm>
      </div>
      <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable ref="vuetable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
      </div>
    </div>
    <ui-confirm $refs="schemeconfirm" @confirm="confirm.confirmedFunc" :show="show.schemeConfirm" :title="confirm.confirmTitle" close-on-confirm>
      {{confirm.confirmText}}
    </ui-confirm>
  </div>
</template>

<script>

import {default as Schema} from '../../schema/index';
import { getDictMapping,formatDate } from '../../util/assist';
import {default as Message} from '../../components/basic/message';

// import { formatDate } from '../util/assist';


export default {
    data() {
      let self = this;
      let orgSchemeSchema = new Schema({
          schemeName: {
              label: self.$t('performance.schemeName')
          },
          restrictYear: {
              label: self.$t('performance.restrictToYear'),
              mapping: function() {
                return getDictMapping('YEAR');
              }
          },
          restrictYear: {
              label: self.$t('performance.restrictToYear'),
              mapping: function() {
                return getDictMapping('YEAR');
              }
          },
          frequency: {
              label: self.$t('performance.frequency'),
              mapping: function() {
                return getDictMapping('SCHEME_CYCLE');
              }
          },
          validStatus: {
              label: self.$t('performance.status'),
              mapping: function() {
                return getDictMapping('SCHEME_VALID_STATUS');
              }
          }
      });

          return {
              tableUrl:'/performance/personal/schemeInfos',
              orgSchemeSchema:orgSchemeSchema,
              orgScheme:orgSchemeSchema.newModel(),
              expendIcon: 'fa-angle-double-down',
              selectedRow:[],
              expended: false,
              confirm: {
                confirmText:'',
                confirmedFunc:'',
                deniedFunc:'',
                confirmTitle:''
              },
              show: {
                modal: false,
                delConfirm:false,
                schemeConfirm:false
              },
              columns: [{
                    name: '__checkbox:',
                    title: ''
                  },
                  {
                    name: 'schemeName',
                    title: this.$t('performance.schemeName'),
                    callback: 'viewLink'
                  },
                  {
                    name: 'restrictYear',
                    dataClass: 'tr',
                    title: this.$t('performance.restrictToYear')
                  },
                  {
                    name: 'frequencyName',
                    title: this.$t('performance.frequency')
                  },
                  {
                    name: 'schemePeriodName',
                    title: this.$t('performance.period')
                  },
                  {
                    name: 'startDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: this.$t('staff.startDate'),
                    callback:'orgFormatDate'
                  },
                  {
                    name: 'endDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: this.$t('staff.endDate'),
                    callback:'orgFormatDate'
                  },
                  {
                    name: 'validStatusName',
                    title: this.$t('performance.status')
                  }
              ],
              shareMenuOptions: [
                {
                    id: 'copy',
                    label: this.$t('performance.copy')
                },
                {
                    id: 'inactivate',
                    label: this.$t('performance.inactivate')
                },
                {
                    id: 'manageScheme',
                    label: this.$t('performance.manageScheme')
                },
                {
                    id: 'viewPlanStatistics',
                    label: this.$t('performance.viewPlanStatistics')
                },
                {
                    id: 'viewResultStatistics',
                    label: this.$t('performance.viewResultStatistics')
                }
              ]
            }
        },
        computed: {
          queryParams() {
            let orgSchemeName = this.orgScheme.schemeName ? this.orgScheme.schemeName : "";
            let restrictYear = this.orgScheme.restrictYear ? this.orgScheme.restrictYear : "";
            let validStatus = this.orgScheme.validStatus ? this.orgScheme.validStatus : "";
            let frequency = this.orgScheme.frequency ? this.orgScheme.frequency : "";

            return [
              `schemeName=${orgSchemeName}`,
              `restrictYear=${restrictYear}`,
              `validStatus=${validStatus}`,
              `frequency=${frequency}`
            ]
          },
          checkedRows() {
            let tableData = this.$refs.vuetable.tableData;
            let result = [];
            for(let item of this.selectedRow) {
              result.push(tableData[item]);
            }
            return result;
          },
          checkedIds() {
            let ids = [];
            for(let item of this.checkedRows) {
              ids.push(item.schemeInfoId);
            }
            return ids;
          }
        },
        methods: {
          searchTable() {
            this.$refs.vuetable.reloadData();
          },
          resetTable() {
            this.orgScheme.reset();
            this.$nextTick(()=>{
              this.$refs.vuetable.reloadData();
            })
          },
          expendSearch() {
            this.expended = !this.expended;
            this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            this.$refs.vuetable.reloadData();
          },
          goAdd() {
            this.$router.push({
                name: 'addIndividualScheme',
                params: { step: 'basic',id:0 }
            });
          },
          goEdit() {
            let _self = this;
            if(!this.checkSelected('edit')) return ;
            if (_self.checkedRows[0].schemeInfoId) {
                _self.$router.push({
                    name: 'editIndividualScheme',
                    params: {
                        id: _self.checkedRows[0].schemeInfoId,
                        step: 'basic'
                    }
                });
            }
          },
          goActivate() {
            if(!this.checkSelected('activate')) return ;
            this.confirmAction('activate');
          },
          deleteBtn() {
            if(!this.checkSelected('delete')) return;
            this.$refs.uidelconfirm.open()
          },
          delConfirmed() {
            let _self = this;
            let ids = [];
            for(let item of this.checkedRows) {
              ids.push(item.schemeInfoId);
            }
            _self.$http.delete(`/performance/schemeInfo/delete`,{params:{schemeInfoIds:ids}}).then((response) => {
              this.$refs.uidelconfirm.close()
              Message({type: 'success',message:this.$t('common.deleteSuccess')});
              _self.$refs.vuetable.reloadData();
            });
          },
          forwardUrl(pathName, params) {
              params = params || {};
              this.$router.push({
                  name: pathName,
                  params: params
              });
          },
          menuOptionSelected(option) {
              option = option || null;

              if (!option) return;
              switch (option.id) {
                  case 'copy':
                      if(!this.checkSelected('copy')) return ;
                      this.handleCopy();
                      break;
                  // case 'activate':
                  //     if(!this.checkSelected('activate')) return ;
                  //     this.confirmAction('activate');
                  //     // this.handleActivate();
                  //     break;
                  case 'inactivate':
                      if(!this.checkSelected('inactivate')) return ;
                      this.confirmAction('inActivate')
                      // this.handleInactivate();
                      break;
                  case 'manageScheme':
                      if(!this.checkSelected('manageScheme')) return ;
                      this.handleManageScheme();
                      break;
                  case 'viewPlanStatistics':
                      if(!this.checkSelected('viewPlanStatistics')) return ;
                      this.handleViewPlanStatistics();
                      break;
                  case 'viewResultStatistics':
                      if(!this.checkSelected('viewResultStatistics')) return ;
                      this.handleViewResultStatistics();
                      break;
                  default:
                      Message({
                          type: 'error',
                          message: 'Internal Server Error'
                      });
              }
          },
          confirmAction(actionCode) {
            if(actionCode=="inActivate") {
              this.confirm.confirmTitle = this.$t('performance.header.importantTip');
              this.confirm.confirmText = this.$t('performance.message.schemeInactivated1');
              this.confirm.confirmedFunc = this.handleInactivate;
            } else if (actionCode=="activate") {
              this.confirm.confirmTitle = this.$t('performance.header.importantTip');
              if(this.checkedRows[0].validStatus == 0) {
                this.confirm.confirmText = this.$t('performance.message.schemeInactivated2');
              } else if (this.checkedRows[0].validStatus == 2) {
                this.confirm.confirmText = this.$t('performance.message.schemeInactivated3');
              }
              this.confirm.confirmedFunc = this.handleActivate;
            }
            this.$nextTick(function(){
              this.$refs.schemeconfirm.open();
            })
          },
          handleCopy() {
            let schemeId = this.checkedRows[0].schemeInfoId;
            this.$http.post(`/performance/schemes/${schemeId}/copy`).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.copySuccess')})
              this.$refs.vuetable.reloadData();
            });
          },
          handleActivate() {
            this.$http.put(`/performance/schemes/activate`,{schemeIds:this.checkedIds},{emulateJSON: true}).then((response) => {
                Message({type: 'success',message: this.$t('performance.message.activateSuccess')})
                this.$refs.vuetable.reloadData();
            });
          },
          handleInactivate() {
            this.$http.put(`/performance/schemes/inactivate`,{schemeIds:this.checkedIds},{emulateJSON: true}).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.InactivateSuccess')})
              this.$refs.vuetable.reloadData();
            });
          },
          handleManageScheme() {
            this.forwardUrl('manageIndividualScheme',{id:this.checkedRows[0].schemeInfoId,step:'basic'});
          },
          handleViewPlanStatistics() {
            this.forwardUrl('individualViewPlanStatistics',{id:this.checkedRows[0].schemeInfoId,status:'0',entrance:'1'});
          },
          handleViewResultStatistics() {
            this.forwardUrl('individualViewResultStatistics',{id:this.checkedRows[0].schemeInfoId});
          },
          viewLink(value,data) {
            return `<a href="${location.href}/basic/${data.schemeInfoId}">${value}</a>`;
          },
          orgFormatDate(value) {

            return formatDate(new Date(value));
          },
          checkSelected(actionCode) {
            switch (actionCode) {
                case 'copy':
                  return this.doCheckItems(["mandatory","single"]);
                  break;
                case 'activate':
                  return this.doCheckItems(["mandatory"]);
                  break;
                case 'inactivate':
                  return this.doCheckItems(["mandatory","inActivateDraft"]);
                  break;
                case 'manageScheme':
                  if(!this.doCheckItems(["mandatory","single"])) {
                    return false;
                  } else if (this.checkedRows[0].validStatus != 1) {
                    Message({
                        type: 'error',
                        message: this.$t('performance.message.individualcheckSelectedManage')
                    });
                    return false;
                  } else {
                    return true;
                  };
                  break;
                case 'viewPlanStatistics':
                  return this.doCheckItems(["mandatory","single"]);
                  break;
                case 'viewResultStatistics':
                  return this.doCheckItems(["mandatory","single"]);
                  break;
                case 'edit':
                  return this.doCheckItems(["mandatory","single","editActivate","editInactivate"]);
                  break;
                case 'delete':
                  return this.doCheckItems(["mandatory","delActivate","delInactivate"]);
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
            let result = "";
            for(let item of actionCodes) {
              switch (item) {
                  case 'mandatory':
                    if (this.checkedRows.length == 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.individualSchemeChooseOne')
                      });
                      return false;
                    }
                  break;
                  case 'single':
                    if(this.checkedRows.length > 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.individualSchemeOnlyOne')
                      });
                      return false;
                    }
                    break;
                  case 'editActivate':
                    if(this.checkedRows[0].validStatus == 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.activateCantEdit')
                      });
                      return false;
                    }
                    break;
                  case 'editInactivate':
                    if(this.checkedRows[0].validStatus == 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.inActivateCantEdit')
                      });
                      return false;
                    }
                    break;
                  case 'delActivate':
                    if(this.checkedRows[0].validStatus == 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.activateCantDelete')
                      });
                      return false;
                    }
                    break;
                  case 'delInactivate':
                    if(this.checkedRows[0].validStatus == 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.inActivateCantDelete')
                      });
                      return false;
                    }
                    break;
                  case 'inActivateDraft':
                    if(this.checkedRows[0].validStatus == 2) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.draftToInactivate')
                      });
                      return false;
                    }
                    break;
              }
            }
            return true;
          },
          expendSearch() {
            this.expended = !this.expended;
            this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
          }
        },
        components: {}
};

</script>
