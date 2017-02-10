<style lang="less">
.ihr-staff-indicator {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }

    .form{
      height: 46px;
    }

    .indicator-form {
      height: 46px;
      overflow: hidden;
      transition: height .3s linear;
    }
    .indicator-form.expended {
      height: 92px;
      transition: height .3s linear;
    }

    .mr20 {
      margin-right:10px;
    }

}
</style>

<template lang="html">
  <div class="content-wrap bg-w ihr-staff-indicator">
    <div class="mb20 pt20">
      <div class="search-area">
          <v-form :class="{expended: expended}" :model="indicator" :schema="indicatorSchema" label-width="130" :cols="3">
              <text-field property='indicatorName' editor-width="150"></text-field>
              <select-field property='indicatorCategory' editor-width="150"></select-field>
              <select-field property='indicatorFunction' editor-width="150"></select-field>
              <select-field v-show = "expended" property='subFunction' editor-width="150"></select-field>
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
          <ui-button class="dis-tc-t btn-default-bd" type="flat" @opened="openMenu" show-menu-icons has-dropdown-menu button-type="button" :menu-options="shareMenuOptions" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" text="More"></ui-button>
          <file-upload title="upload" id="excelFile" class="menu-option-upload file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" v-ref:upload :drop="files.drop"></file-upload>
          <!-- 询问框 -->
          <ui-confirm header="Delete Indicator" @confirmed="delConfirmed" :show.sync="show.delConfirm" close-on-confirm autofocus="confirm-button">
              Do you want to delete this?
          </ui-confirm>
      </div>
      <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="tableUrl" :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
      </div>
    </div>
    <!--上传-->
    <div class = "uploadInput dn">
      <form v-el:fileform>
        <input v-el:excelupload type="file" name="messageAttachment" value="" @change="changeFile($event)">
      </form>
    </div>
  </div>
</template>

<script>

import {
    default as Schema
}
from '../../schema/index';

import { getDictMapping,downloadFile } from '../../util/assist';
import {default as Message} from '../../components/basic/message';

let indicatorSchema = new Schema({
    indicatorName: {
        label: ' Indicator Name'
    },
    indicatorCategory: {
        label: 'Indicator Type',
        mapping: function(){
          return getDictMapping('INDICATOR_CATEGORY');
        },
    },
    indicatorFunction: {
        label: 'Function',
        mapping: function(){
          return getDictMapping('INDICATOR_FUNCTION');
        }
    },
    subFunction: {
        label: 'Sub-Function',
        mapping: function(){
          return getDictMapping('SUB_FUNCTION');
        }
    }
});

export default {
    data() {
          return {
              tableUrl:'/performance/indicators/',
              indicatorSchema:indicatorSchema,
              indicator:indicatorSchema.newModel(),
              expendIcon: 'fa-angle-double-down',
              files: {
                url: Vue.config.APIURL + '/performance/indicators/importIndicatorInfo',
                accept: '',
                size: 1024 * 1024 * 2,
                multiple: false,
                extensions: '',
                // extensions: ['gif','jpg','png'],
                // extensions: /\.(gif|png|jpg)$/i,
                files: [],
                upload: {},
                drop: true,
                auto: true
              },
              selectedRow:[],
              expended: false,
              show: {
                  delConfirm:false,
                  genericConfirm: false,
                  modal: false
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
                    name: '__checkbox:indicatorId',
                    title: ''
                  },
                  {
                    name: 'indicatorName',
                    title: 'Indicator Name'
                  },
                  {
                    name: 'unit',
                    title: 'Unit'
                  },
                  {
                    name: 'indicatorCategoryName',
                    title: 'Indicator Type'
                  },
                  {
                    name: 'indicatorFunctionName',
                    title: 'Function'
                  },
                  {
                    name: 'subFunctionName',
                    title: 'Sub-Function'
                  },
                  {
                    name: 'formula',
                    title: 'Criteria'
                  },
                  {
                    name: 'dataSources',
                    title: 'Data Source'
                  }
              ],
              shareMenuOptions: [
                {
                    id: 'upload',
                    text: this.$t('button.batchImport'),
                    icon: 'content_copy',
                    secondaryText: 'Ctrl+D'
                }, {
                    id: 'downloadTemplate',
                    text: 'Download template',
                    icon: 'content_copy',
                    secondaryText: 'Ctrl+D'
                },{
                  id: 'download',
                  text:  this.$t('button.download'),
                  icon: 'edit',
                  secondaryText: 'Ctrl+E'
                }
              ]
            }
        },
        computed: {
          queryParams() {
            let indicatorName = this.indicator.indicatorName || "";
            let indicatorCategory = this.indicator.indicatorCategory || "";
            let indicatorFunction = this.indicator.indicatorFunction || "";
            let subFunction = this.indicator.subFunction || "";
            return [
              `indicatorName=${indicatorName}`,
              `indicatorCategory=${indicatorCategory}`,
              `indicatorFunction=${indicatorFunction}`,
              `subFunction=${subFunction}`,
            ]
          }
        },
        ready() {},
        attached() {},
        methods: {
          openMenu() {
            var el = document.getElementById('excelFile');
            el.style.display = "block";
            document.getElementsByClassName('ui-menu-option')[0].appendChild(el);
          },
          searchTable() {
            this.$broadcast('vuetable:refresh');
          },
          resetTable() {
            this.indicator.reset();
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
                name: 'addIndicator',
            });
          },
          goEdit() {
            let _self = this;
            if(!this.checkSelected('edit')) return;
            if (_self.selectedRow[0]) {
                _self.$router.go({
                  name: 'editIndicator',
                  params: {
                      id: _self.selectedRow[0]
                  }
                });
            } else {
                _self.show.genericConfirm = true;
            }
          },
          delete() {
            if(!this.checkSelected('delete')) return;
            this.show.delConfirm = true;
          },
          delConfirmed() {
            let _self = this;
            let selectedIds  =_self.selectedRow;
            if (selectedIds) {
                this.$http.delete(`/performance/indicators/${selectedIds}`).then((response) => {
                  _self.show.delConfirm = false;
                  Message({
                      type: 'success',
                      message: this.$t('common.deleteSuccess')
                  });
                  this.$broadcast('vuetable:refresh');
                });
            }
          },
          checkSelected(actionCode) {
            let codes = ['edit','copy'];
            if (this.selectedRow.length == 0) {
              Message({
                  type: 'error',
                  message: this.$t('performance.message.indicatorDoCheckItemsChooseOne')
              });
              return false;
            }
            if(codes.indexOf(actionCode) != -1) {
              if(this.selectedRow.length > 1) {
                Message({
                    type: 'error',
                    message: this.$t('performance.message.indicatorDoCheckItemsOnlyOne')
                });
                return false;
              }
            }
            return true;
          },
          // changeFile(e) {
          //   let formdata =  new FormData();
          //   let files = this.parseFiles(e.srcElement.files);
          //   this.$els.fileform.reset();
          //   formdata.append('file',files[0]);
          //   this.$http.post('/performance/indicators/importIndicatorInfo',formdata).then((response)=>{
          //     if(response.body === 'true' || response.body === true) {
          //       Message({
          //         type: 'success',
          //         message: this.$t('performance.message.uploadSuccess')
          //       });
          //       this.$broadcast('vuetable:refresh');
          //     } else {
          //       downloadFile('/system/attachment/downloadFile', {attachmentId: response.body});
          //       Message({
          //           type: 'error',
          //           message: this.$t('performance.message.importFail')
          //       });
          //     }
          //   })
          // },
          downloadTemplate() {
            downloadFile('/performance/indicators/dowloadIndicatorTemplate');
          },
          downloadAsExcel() {
            let exportParam = {
              indicatorName:this.indicator.indicatorName || "",
              indicatorCategory:this.indicator.indicatorCategory || "",
              indicatorFunction:this.indicator.indicatorFunction || "",
              subFunction:this.indicator.subFunction || ""
            }

            downloadFile('/performance/indicators/exportIndicatorInfo',exportParam);
            // this.$http.get('/performance/indicators/exportIndicatorInfo',{params:exportParam}).then((response)=>{
            //   debugger;
            //   var headers = response.headers;
            //   var blob = new Blob([response.data],{type:headers['content-type']});
            //   var link = document.createElement('a');
            //   link.href = window.URL.createObjectURL(blob);
            //   link.download = "Filename.xls";
            //   link.click();
            // })
          },
          parseFiles(rawFiles) {
            return Array.prototype.slice.call(rawFiles, 0);
          },
          menuOptionSelected(option) {
            option = option || null;
            if (!option) return;
            switch (option.id) {
              case 'upload' :
                // this.$els.excelupload.click();
                break;
              case 'download' :
                this.downloadAsExcel();
                break;
              case 'downloadTemplate' :
                this.downloadTemplate();
                break;
            }
          }
        },
        events: {
          addFileUpload(file, component) {
            if (this.files.auto) {
              component.active = true;
            }
          },
          afterFileUpload(file, component) {
            if (file.data === 'true' || file.data === true) {
              Message({
                type: 'success',
                message: this.$t('performance.message.uploadSuccess')
              });
              this.$broadcast('vuetable:refresh');
            } else {
              if (!file.error) {
                downloadFile('/system/attachment/downloadFile', {attachmentId: file.data});
              }
              Message({
                  type: 'error',
                  message: file.data.message || this.$t('performance.message.importFail')
              });
            }
          }
        },
        components: {
          FileUpload: require('../../components/basic/FileUpload.vue')
        }
};

</script>
