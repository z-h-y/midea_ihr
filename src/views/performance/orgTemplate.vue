<style lang="less">
.ihr-staff-orgTemplate {
    min-width: 921px;
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

    .orgTemplate-form {
      height: 46px;
      transition: height .3s linear;
    }
    .orgTemplate-form.expended {
      height: 92px;
      transition: height .3s linear;
    }
    .vuetable th{
      white-space:nowrap;
    }
    .vuetable td{
      word-break: break-all;
    }
    .status{
      white-space: nowrap;
    }
}
</style>

<template lang="html">
  <div class="content-wrap bg-w ihr-staff-orgTemplate">
    <div class="mb16 pt16">
      <div class="search-area">
          <v-form :class="{expended: expended}" :model="orgTemplate" :schema="orgTemplateSchema" label-width="150" :cols="3" >
              <text-field property='orgTemplateName' editor-width="150"></text-field>
              <select-field property="templateCategory" editor-width="150"></select-field>
              <select-field property="indicatorsSetting" editor-width="150"></select-field>
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
          <ui-confirm header="Delete Template" @confirmed="delConfirmed" :show.sync="show.delConfirm" close-on-confirm autofocus="confirm-button">
              Do you want to delete this?
          </ui-confirm>
          <ui-modal
              :show.sync="show.edit" header="Waring"
              body="please choose only one Template"
          ></ui-modal>
          <ui-modal
              :show.sync="show.del" header="Waring"
              body="please choose atleast one Template"
          ></ui-modal>
      </div>
      <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="tableUrl" v-ref:orgtemptable :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
      </div>
    </div>
    <ui-confirm @confirmed="confirm.confirmedFunc" :show.sync="show.tempConfirm" :header="confirm.confirmTitle" close-on-confirm>
      {{confirm.confirmText}}
    </ui-confirm>
  </div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';

import {default as Message} from '../../components/basic/message';
import { getDictMapping } from '../../util/assist';

let orgTemplateSchema = new Schema({
    orgTemplateName: {
        label: ' Template Name'
    },
    templateCategory: {
      label: 'Template Category',
      mapping: function() {
        return getDictMapping('TEMPLATE_CATEGORY');
      }
    },
    indicatorsSetting: {
      label: 'Indicators Setting',
      mapping: function() {
        return getDictMapping('INDICATORS_SETTING');
      }
    },
    validStatus: {
        label: 'Status',
        mapping: function() {
          return getDictMapping('TEMPLATE_VALID_STATUS');
        }
    }
});

export default {
    data() {
          return {
              // tableUrl:'/performance/orgTemplates/',
              orgTemplateSchema:orgTemplateSchema,
              orgTemplate:orgTemplateSchema.newModel(),
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
                  delConfirm: false,
                  modal: false,
                  tempConfirm:false
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
                    name: 'templateName',
                    title: 'Template Name',
                    callback:'viewTemplate'
                  },
                  {
                    name: 'templateCategoryName',
                    title: 'Template Category'
                  },
                  {
                    name: 'description',
                    title: 'Description'
                  },
                  {
                    name: 'indicatorsSettingName',
                    title: 'Indicators Setting'
                  },
                  {
                    name: 'validStatusName',
                    title: 'Status',
                    dataClass:'status'
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
                    id: 'inActivate',
                    text: 'Inactivate',
                    icon: 'inActivate',
                    secondaryText: 'Ctrl+E'
                }
              ]
            }
        },
        computed: {
          queryParams() {
            let orgTemplateName = this.orgTemplate.orgTemplateName || "";
            let templateCategory = this.orgTemplate.templateCategory || "";
            let indicatorsSetting = this.orgTemplate.indicatorsSetting || "";
            let validStatus =  this.orgTemplate.validStatus || "";
            return [
              `templateName=${orgTemplateName}`,
              `templateCategory=${templateCategory}`,
              `indicatorsSetting=${indicatorsSetting}`,
              `validStatus=${validStatus}`
            ]
          },
          tableUrl() {
            // let unitId = this.orgTemplate.organization ? this.reportLine.organization : 90;
            return `/performance/department/templates`;
          },
          checkedRows() {
            let tableData = this.$refs.orgtemptable.tableData;
            let result = [];
            for(let item of this.selectedRow) {
              result.push(tableData[item]);
            }
            return result;
          },
          checkedIds() {
            let ids = [];
            for(let item of this.checkedRows) {
              ids.push(item.templateId);
            }
            return ids;
          }
        },
        ready() {},
        methods: {
          searchTable() {
            this.$broadcast('vuetable:refresh');
          },
          resetTable() {
            this.orgTemplate.reset();
            this.$nextTick(()=>{
              this.$broadcast('vuetable:refresh');
            })
          },
          expendSearch() {
            this.expended = !this.expended;
            this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
          },
          goAdd() {
            this.$router.go({
                name: 'addOrgTemplate',
            });
          },
          goEdit() {
            if(!this.checkSelected('edit')) return;
            let _self = this;
                _self.$router.go({
                    name: 'editOrgTemplate',
                    params: {
                        id: _self.checkedRows[0].templateId
                    }
                });
          },
          delete() {
            if(!this.checkSelected('delete')) return;
            this.show.delConfirm = true;
          },
          delConfirmed() {
            let _self = this;

            if (this.checkedIds) {
                _self.$http.delete(`/performance/templates/delete`,{params:{templatesIds:this.checkedIds}}).then((response) => {
                  _self.show.delConfirm = false;
                  Message({type: 'success',message: this.$t('common.deleteSuccess')});
                  _self.$broadcast('vuetable:refresh');
                });
            }
          },
          goActivate() {
            if(!this.checkSelected('activate')) return;
            this.confirmAction('activate');
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
                  case 'inActivate':
                      if(!this.checkSelected('inactivate')) return ;
                      this.confirmAction('inActivate');
                      // this.handleInactivate();
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
              this.confirm.confirmTitle = this.$t('performance.header.importantTip');
              this.confirm.confirmText = this.$t('performance.message.tempToInactivate');
              this.confirm.confirmedFunc = this.handleInactivate;
            } else if (actionCode=="activate") {
              this.confirm.confirmTitle = this.$t('performance.header.importantTip');
              this.confirm.confirmText = this.$t('performance.message.tempToActivate');
              this.confirm.confirmedFunc = this.handleActivate;
            }
            this.$nextTick(function(){
              this.show.tempConfirm = true;
            })
          },
          handleCopy() {
            let templateId = this.checkedRows[0].templateId;
            this.$http.post(`/performance/templates/copy`,{templatesId:templateId},{
                emulateJSON: true
            }).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.copySuccess')})
              this.$broadcast('vuetable:reload');
            });
          },
          handleActivate() {

            this.$http.post(`/performance/templates/active`,{templatesIds:this.checkedIds},{
                emulateJSON: true
            }).then((response) => {
                Message({type: 'success',message: this.$t('performance.message.activateSuccess')})
                this.$broadcast('vuetable:reload');
            });
          },
          handleInactivate() {
            this.$http.post(`/performance/templates/inactive`,{templatesIds:this.checkedIds},{
                emulateJSON: true
            }).then((response) => {
              Message({type: 'success',message: this.$t('performance.message.InactivateSuccess')})
              this.$broadcast('vuetable:reload');
            });
          },
          viewTemplate(value,data){
            return `<a href="${location.href}/${data.templateId}">${value}</a>`;
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
                  return this.doCheckItems(["mandatory",'inActivateDraft']);
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
                          message: this.$t('performance.message.tempDoCheckItemsChooseOne')
                      });
                      return false;
                    }
                  break;
                  case 'single':
                    if(this.checkedRows.length > 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.tempDoCheckItemsOnlyOne')
                      });
                      return false;
                    }
                    break;
                  case 'editActivate':
                    if(this.checkedRows[0].validStatus == 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.tempActivateCantEdit')
                      });
                      return false;
                    }
                    break;
                  case 'editInactivate':
                    if(this.checkedRows[0].validStatus == 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.tempInActivateCantEdit')
                      });
                      return false;
                    }
                    break;
                  case 'delActivate':
                    if(this.checkedRows[0].validStatus == 1) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.tempActivateCantDelete')
                      });
                      return false;
                    }
                    break;
                  case 'delInactivate':
                    if(this.checkedRows[0].validStatus == 0) {
                      Message({
                          type: 'error',
                          message: this.$t('performance.message.tempInActivateCantDelete')
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
          }
        },
        components: {}
};

</script>
