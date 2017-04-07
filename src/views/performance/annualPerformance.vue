<style lang="less">
.ihr-staff-annual {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }

    .form{
      height: 46px;
    }

    .annual-form {
      height: 46px;
      overflow: hidden;
      transition: height .3s linear;
    }
    .annual-form.expended {
      height: 92px;
      transition: height .3s linear;
    }
}
</style>

<template lang="html">
  <div class="content-wrap bg-w ihr-staff-annual">
    <div class="mb20 pt20">
      <div class="search-area">
          <v-form :class="{expended: expended}" :model="annual" :schema="annualSchema" label-width="130" :cols="3">
              <text-field property='schemeName' editor-width="150"></text-field>
              <select-field property="restrictYear" editor-width="150"></select-field>
              <select-field property="validStatus" editor-width="150"></select-field>
          </v-form>
          <!-- <ui-icon-button class="expend-btn" :class="{expended: expended}" :icon="expendIcon" @click="expendSearch"></ui-icon-button> -->
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
          <ui-confirm ref="delconfirm" :title="$t('button.delete')" @confirm="confirmed" :show="show.delConfirm" close-on-confirm autofocus="confirm-button">
              {{$t('common.deleteConfirm')}}
          </ui-confirm>
          <ui-modal
              :show="show.edit" header="Waring"
              :body="$t('performance.message.onlyOneIndicator')"
          ></ui-modal>
          <ui-modal
              :show="show.del" header="Waring"
              :body="$t('performance.message.atleastOneIndicator')"
          ></ui-modal>
      </div>
      <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="tableUrl" ref="annualtable" :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
      </div>
    </div>
  </div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';

import { default as Message } from '../../components/basic/message';
import { getDictMapping } from '../../util/assist';



export default {
    data() {
      var self = this;
      let annualSchema = new Schema({
          schemeName: {
              label: self.$t('performance.annualName')
          },
          restrictYear: {
              label: self.$t('performance.restrictToYear'),
              mapping: function() {
                return getDictMapping('YEAR');
              }
          },
          validStatus: {
              label: self.$t('performance.status'),
              mapping: function() {
                return getDictMapping('SCHEME_YEAR_VALID_STATUS');
              }
          }
      });
          return {
              tableUrl:'/performance/schemeYears',
              annualSchema:annualSchema,
              annual:annualSchema.newModel(),
              expendIcon: 'fa-angle-double-down',
              selectedRow:[],
              expended: false,
              show: {
                  genericConfirm: false,
                  modal: false,
                  delConfirm: false
              },
              favourite: {
                  group: 'yes',
              },
              options: {
                group: [{
                    value: 'yes',
                    text: 'Yes'
                }, {
                    value: 'no',
                    text: 'No'
                }]
              },
              columns: [{
                    name: '__checkbox:',
                    title: ''
                  },
                  {
                    name: 'schemeName',
                    title: this.$t('performance.schemeName'),
                    callback: 'viewAnnual'
                  },
                  {
                    name: 'restrictYear',
                    dataClass: 'tr',
                    title: this.$t('performance.restrictToYear')
                  },
                  {
                    name: 'resultConfirmedEmpName',
                    title: this.$t('performance.resultsConfirmedby')
                  },
                  {
                    name: 'validStatusName',
                    title: this.$t('performance.status')
                  }
              ],
              shareMenuOptions: [
                {
                    id: 'copy',
                    label: this.$t('performance.copy'),
                    icon: 'copy'
                },
                // {
                //     id: 'activate',
                //     text: 'Activate',
                //     icon: 'activate',
                //     secondaryText: 'Ctrl+E'
                // },
                {
                    id: 'manageAnnual',
                    label: this.$t('performance.manageAnnualScheme'),
                    icon: 'manageScheme'
                },
                {
                    id: 'viewFinalResult',
                    label: this.$t('performance.viewFinalResult'),
                    icon: 'manageScheme'
                }
              ]
            }
        },
        computed: {
          queryParams() {
            let schemeName = this.annual.schemeName ? this.annual.schemeName : "";
            let year = this.annual.restrictYear ? this.annual.restrictYear : "";
            let status = this.annual.validStatus ? this.annual.validStatus : "";

            return [
              `schemeName=${schemeName}`,
              `restrictYear=${year}`,
              `validStatus=${status}`
            ]
          },
          checkedRows() {
            let tableData = this.$refs.annualtable.tableData;
            let result = [];
            for(let item of this.selectedRow) {
              result.push(tableData[item]);
            }
            return result;
          },
          checkedIds() {
            let ids = [];
            for(let item of this.checkedRows) {
              ids.push(item.schemeYearId);
            }
            return ids;
          }
        },
        methods: {
          searchTable() {
            this.$refs.annualtable.reloadData();
          },
          forwardUrl(pathName, params) {
              params = params || {};
              this.$router.push({
                  name: pathName,
                  params: params
              });
              this.$router.push({name:pathName,params:params});
          },
          resetTable() {
            this.annual.reset();
            this.$nextTick(()=>{
              this.$refs.annualtable.reloadData();
            })
          },
          expendSearch() {
            this.expended = !this.expended;
            this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            this.$refs.annualtable.reloadData();
          },
          goAdd() {
            this.$router.push({ name: 'addAnnualPerformance', params: { step: 'basic',id:0 }})
          },
          goEdit() {
            let _self = this;
            if(!this.checkSelected('edit')) return ;

            _self.$router.push({
                name: 'editAnnualPerformance',
                params: {
                    id: _self.checkedRows[0].schemeYearId,
                    step: 'basic'
                }
            });
          },
          goActivate() {
            if(!this.checkSelected('activate')) return ;
            this.handleActivate();
          },
          deleteBtn() {
            if(!this.checkSelected('delete')) return ;
            this.$refs.delconfirm.open();
            // let selectedId = this.checkedRows[0].schemeYearId;

          },
          confirmed() {
            this.$refs.delConfirm.close();
            this.$http.delete(`/performance/schemeYears/`,{
                params:{schemeYearIds:this.checkedIds},
            }).then((response) => {
              Message({message: this.$t('common.deleteSuccess'),type:'success'});
              this.$refs.annualtable.reloadData();
            });
            this.$refs.annualtable.reloadData();
          },
          menuOptionSelected(option) {
              option = option || null;

              if (!option) return;
              switch (option.id) {
                  case 'copy':
                      if(!this.checkSelected('copy')) return ;
                      this.handleCopy();
                      break;
                  case 'activate':
                      if(!this.checkSelected('activate')) return ;
                      this.handleActivate();
                      break;
                  case 'manageAnnual':
                      if(!this.checkSelected('manageAnnual')) return ;
                      this.handleManageAnnual();
                      break;
                  case 'viewFinalResult':
                      if(!this.checkSelected('viewFinalResult')) return ;
                      this.handleViewFinalResult();
                      break;
                  default:
                      Message({
                          type: 'error',
                          message: 'Internal Server Error'
                      });

              }
          },
          handleCopy(){
            let schemeYearId = this.checkedRows[0].schemeYearId;
            this.$http.get(`/performance/schemeYears/${schemeYearId}/copy`).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.copySuccess')})
              this.$refs.annualtable.reloadData();
            });
          },
          handleActivate(){
            // let schemeYearId = this.checkedRows[0].schemeYearId;
            let _self = this;
            this.$http.post(`/performance/schemeYears/activate`,{schemeYearIds:this.checkedIds},{emulateJSON: true}).then((response) => {
                Message({type: 'success',message: _self.$t('performance.message.activateSuccess')})
                this.$refs.annualtable.reloadData();
            });
          },
          handleManageAnnual(){
            this.forwardUrl('manageAnnual',{id:this.checkedRows[0].schemeYearId,step:'basic'});
          },
          handleViewFinalResult(){
            this.$router.push({name:'viewFinalResult',params:{id:this.checkedRows[0].schemeYearId},query: {annual: this.checkedRows[0].schemeName}});
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
                  return this.doCheckItems(["mandatory"]);
                  break;
                case 'manageAnnual':
                  if(!this.doCheckItems(["mandatory","single"])) {
                    return false;
                  } else if (this.checkedRows[0].validStatus != 1) {
                    Message({
                        type: 'error',
                        message: this.$t('performance.message.annualcheckSelectedManage')
                    });
                    return false;
                  } else {
                    return true;
                  };
                  break;
                case 'viewFinalResult':
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
                          message: this.$t('performance.message.annualDoCheckItemsChooseOne')
                      });
                      return false;
                    }
                  break;
                  case 'single':
                    if(this.checkedRows.length > 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.annualDoCheckItemsOnlyOne')
                      });
                      return false;
                    }
                    break;
                  case 'editActivate':
                    if(this.checkedRows[0].validStatus == 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.activateSchemeEdit')
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
                          message: this.$t('performance.message.activateCantEdit')
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
              }
            }
            return true;
          },
          viewAnnual(value,data) {
            return `<a href="${location.href}/basic/${data.schemeYearId}">${value}</a>`;
          }
        },
        components: {}
};

</script>
