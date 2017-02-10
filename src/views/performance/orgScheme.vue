<style lang="less">
.ihr-staff-orgScheme {
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
      margin: 16px;
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
              <select-field property="schemeCategory" editor-width="150"></select-field>
              <!-- <text-field property='schemeCategory' editor-width="150"></text-field> -->
              <!-- <text-field property='restrictYear' editor-width="150"></text-field> -->
              <select-field property="restrictYear" editor-width="150"></select-field>
              <select-field v-show="expended" property="validStatus" editor-width="150"></select-field>
          </v-form>
          <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
          <div class="query-btn">
              <ui-button class="query-btn-search mr10" color="primary" @click="searchTable">Search</ui-button>
              <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">Reset</ui-button>
          </div>
      </div>
      <div class="group">
          <ui-button class="mr10 dis-tc btn-primary-bd" @click="goAdd" color="primary" icon="fa-plus" text="Add" button-type="button"></ui-button>
          <ui-button class="mr10 dis-tc btn-default-bd" @click="goEdit" icon="fa-pencil-square-o" type="flat" text="Edit" button-type="button"></ui-button>
          <ui-button class="mr10 dis-tc btn-default-bd" @click="delete" icon="fa-remove" type="flat" text="Delete" button-type="button"></ui-button>
          <ui-button class="mr10 dis-tc btn-default-bd" @click="goActivate" type="flat" text="Activate" button-type="button"></ui-button>
          <ui-button class="dis-tc-t btn-default-bd" type="flat" show-menu-icons has-dropdown-menu button-type="button" :menu-options="shareMenuOptions" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" text="More"></ui-button>
          <!-- 询问框 -->
          <ui-confirm header="Delete" @confirmed="delConfirmed" :show.sync="show.delConfirm" close-on-confirm autofocus="confirm-button">
              Do you want to delete this?
          </ui-confirm>
      </div>
      <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="tableUrl" v-ref:orgschemetable :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
      </div>
    </div>
    <ui-confirm @confirmed="confirm.confirmedFunc" :show.sync="show.schemeConfirm" :header="confirm.confirmTitle" close-on-confirm>
      {{confirm.confirmText}}
    </ui-confirm>
  </div>
</template>

<script>

import {default as Schema} from '../../schema/index';
import { getDictMapping,formatDate } from '../../util/assist';
import {default as Message} from '../../components/basic/message';

// import { formatDate } from '../util/assist';

let orgSchemeSchema = new Schema({
    schemeName: {
        label: 'Scheme Name'
    },
    schemeCategory: {
        label: 'Scheme Category',
        mapping: function() {
          return getDictMapping('SCHEME_CATEGORY');
        }
    },
    restrictYear: {
        label: 'Restrict To Year',
        mapping: function() {
          return getDictMapping('YEAR');
        }
    },
    validStatus: {
        label: 'Status',
        mapping: function() {
          return getDictMapping('SCHEME_VALID_STATUS');
        }
    }
});

export default {
    data() {
          return {
              tableUrl:'/performance/department/schemeInfos',
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
                    title: 'Scheme Name',
                    callback: 'viewLink'
                  },
                  {
                    name: 'schemeCategoryName',
                    title: 'Scheme Category'
                  },
                  {
                    name: 'restrictYear',
                    dataClass: 'tr',
                    title: 'Restrict To Year'
                  },
                  {
                    name: 'startDate',
                    title: 'Start Date',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    callback:'orgFormatDate'
                  },
                  {
                    name: 'endDate',
                    title: 'End Date',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    callback:'orgFormatDate'
                  },
                  {
                    name: 'validStatusName',
                    title: 'Status'
                  }
              ],
              shareMenuOptions: [
                {
                    id: 'copy',
                    text: 'Copy',
                    icon: 'copy',
                    secondaryText: 'Ctrl+E'
                },
                // {
                //     id: 'activate',
                //     text: 'Activate',
                //     icon: 'activate',
                //     secondaryText: 'Ctrl+E'
                // },
                {
                    id: 'inactivate',
                    text: 'Inactivate',
                    icon: 'inactivate',
                    secondaryText: 'Ctrl+E'
                },
                {
                    id: 'manageScheme',
                    text: 'Manage Scheme',
                    icon: 'manageScheme',
                    secondaryText: 'Ctrl+E'
                },
                {
                    id: 'viewPlanStatistics',
                    text: 'View Plan Statistics',
                    icon: 'viewPlanStatistics',
                    secondaryText: 'Ctrl+E'
                },
                {
                    id: 'viewResultStatistics',
                    text: 'View Result Statistics',
                    icon: 'viewResultStatistics',
                    secondaryText: 'Ctrl+E'
                }
              ]
            }
        },
        computed: {
          queryParams() {
            let orgSchemeName = this.orgScheme.schemeName ? this.orgScheme.schemeName : "";
            let schemeCategory = this.orgScheme.schemeCategory ? this.orgScheme.schemeCategory : "";
            let restrictYear = this.orgScheme.restrictYear ? this.orgScheme.restrictYear : "";
            let validStatus = this.orgScheme.validStatus ? this.orgScheme.validStatus : "";

            return [
              `schemeName=${orgSchemeName}`,
              `schemeCategory=${schemeCategory}`,
              `restrictYear=${restrictYear}`,
              `validStatus=${validStatus}`
            ]
          },
          checkedRows() {
            let tableData = this.$refs.orgschemetable.tableData;
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
        ready() {},
        attached() {},
        methods: {
          searchTable() {
            this.$broadcast('vuetable:refresh');
          },
          resetTable() {
            this.orgScheme.reset();
            this.$nextTick(()=>{
              this.$broadcast('vuetable:refresh');
            })
          },
          expendSearch() {
            this.expended = !this.expended;
            this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            this.$broadcast('vuetable:refresh');
          },
          goAdd() {
            this.$router.go({
                name: 'addOrgScheme',
                params: { step: 'basic',id:0, orgType:0 }
            });
          },
          goEdit() {
            if(!this.checkSelected('edit')) return ;
            let _self = this;
            if (_self.checkedRows[0].schemeInfoId) {
                _self.$router.go({
                    name: 'editOrgScheme',
                    params: {
                        id: _self.checkedRows[0].schemeInfoId,
                        step: 'basic',
                        orgType: _self.checkedRows[0].schemeCategory
                    }
                });
            }
          },
          goActivate() {
            if(!this.checkSelected('activate')) return ;
            this.confirmAction('activate');
          },
          // delete() {
          //
          //   this.show.delConfirm = true;
          // },
          // delConfirmed() {
          //   if(!this.checkSelected('delete')) return;
          //
          //       this.$http.delete(`/performance/schemeInfo/delete`,{
          //         params:{
          //           schemeInfoIds:this.selectedRow
          //         }
          //       }).then((response) => {
          //         this.show.delConfirm = false;
          //         Message({type: 'error',message: this.$t('common.deleteSuccess')});
          //         this.$broadcast('vuetable:refresh');
          //       });
          // },
          delete() {
            debugger;
            if(!this.checkSelected('delete')) return;
            this.show.delConfirm = true;
          },
          delConfirmed() {
            let _self = this;
            let ids = [];
            for(let item of this.checkedRows) {
              ids.push(item.schemeInfoId);
            }
            _self.$http.delete(`/performance/schemeInfo/delete`,{params:{schemeInfoIds:ids}}).then((response) => {
              _self.show.delConfirm = false;
              Message({type: 'success',message: this.$t('common.deleteSuccess')});
              _self.$broadcast('vuetable:refresh');
            });
          },
          forwardUrl(pathName, params) {
              params = params || {};
              this.$router.go({
                  name: pathName,
                  params: params
              });
              this.$router.go({name:pathName,params:params});
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
            debugger;
            if(actionCode=="inActivate") {
              this.confirm.confirmTitle = "Important Tip";
              this.confirm.confirmText = "Once scheme(s) get inactivated, all employees in the scheme(s) will lose their performance record. Are you sure to inactivate the scheme(s)?";
              this.confirm.confirmedFunc = this.handleInactivate;
            } else if (actionCode=="activate") {
              this.confirm.confirmTitle = "Important Tip";
              if(this.checkedRows[0].validStatus == 0) {
                this.confirm.confirmText = "Once scheme(s) get activated,  all employees in this scheme would continue to do their performance task. Are you sure to activate scheme(s)?";
              } else if (this.checkedRows[0].validStatus == 2) {
                this.confirm.confirmText = "Once scheme(s) get activated, it would neither be edited nor deleted. Are you sure to activate scheme(s)?";
              }
              this.confirm.confirmedFunc = this.handleActivate;
            }
            this.$nextTick(function(){
              this.show.schemeConfirm = true;
            })
          },
          handleCopy() {
            let schemeId = this.checkedRows[0].schemeInfoId;
            this.$http.post(`/performance/schemes/${schemeId}/copy`).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.copySuccess')})
              this.$broadcast('vuetable:reload');
            });
          },
          handleActivate() {
            this.$http.put(`/performance/schemes/activate`,{schemeIds:this.checkedIds},{emulateJSON: true}).then((response) => {
                Message({type: 'success',message: this.$t('performance.message.activateSuccess')})
                this.$broadcast('vuetable:reload');
            });
          },
          handleInactivate() {
            this.$http.put(`/performance/schemes/inactivate`,{schemeIds:this.checkedIds},{emulateJSON: true}).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.InactivateSuccess')})
              this.$broadcast('vuetable:reload');
            });
          },
          handleManageScheme() {
            this.forwardUrl('manageOrgScheme',{id:this.checkedRows[0].schemeInfoId,step:'basic',orgType:this.checkedRows[0].schemeCategory});
          },
          handleViewPlanStatistics() {
            this.forwardUrl('viewPlanStatistics',{id:this.checkedRows[0].schemeInfoId,status:'0',entrance:'1'});
          },
          handleViewResultStatistics() {
            this.forwardUrl('viewResultStatistics',{id:this.checkedRows[0].schemeInfoId});
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
                        message: this.$t('performance.message.orgSchemeManage')
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
                          message: this.$t('performance.message.orgSchemeChooseOne')
                      });
                      return false;
                    }
                  break;
                  case 'single':
                    if(this.checkedRows.length > 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.orgSchemeOnlyOne')
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
