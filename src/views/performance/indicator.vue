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
    }
    .indicator-form.expended {
      height: 92px;
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
          <v-form :class="{expended: expended}" :model="indicator" :schema="indicatorSchema" label-width="130" :cols="3" form-style="indicator-form">
              <text-field property='indicatorName' editor-width="150"></text-field>
              <select-field property='indicatorCategory' editor-width="150"></select-field>
              <select-field property='indicatorFunction' editor-width="150"></select-field>
              <select-field v-show="expended" property='subFunction' editor-width="150"></select-field>
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
          <ui-button class="dis-tc-t btn-default-bd" icon="fa-caret-down" @dropdown-open="openMenu"  has-dropdown ref="dropdownButton" size="normal" iconPosition="right">
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
          <file-upload @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload" :title="$t('button.upload')" id="excelFile" class="menu-option-upload file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" ref="upload" :drop="files.drop"></file-upload>
          <!-- 询问框 -->
          <ui-confirm ref="delconfirm" :title="$t('button.delete')" @confirm="delConfirmed" :show="show.delConfirm" close-on-confirm autofocus="confirm-button">
              {{$t('common.deleteConfirm')}}
          </ui-confirm>
      </div>
      <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable ref="vuetable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="queryParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
      </div>
    </div>
    <!--上传-->
    <div class = "uploadInput dn">
      <form ref="fileform">
        <input ref="excelupload" type="file" name="messageAttachment" value="" @change="changeFile($event)">
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


export default {
    data() {
      let self = this;
      let indicatorSchema = new Schema({
          indicatorName: {
              label: self.$t('performance.indicatorName')
          },
          indicatorCategory: {
              label: self.$t('performance.indicatorType'),
              mapping: function(){
                return getDictMapping('INDICATOR_CATEGORY');
              },
          },
          indicatorFunction: {
              label: self.$t('performance.function'),
              mapping: function(){
                return getDictMapping('INDICATOR_FUNCTION');
              }
          },
          subFunction: {
              label: self.$t('performance.subFunction'),
              mapping: function(){
                return getDictMapping('SUB_FUNCTION');
              }
          }
      });

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
                    title: this.$t('performance.indicatorName')
                  },
                  {
                    name: 'unit',
                    title: this.$t('performance.unit')
                  },
                  {
                    name: 'indicatorCategoryName',
                    title: this.$t('performance.indicatorType')
                  },
                  {
                    name: 'indicatorFunctionName',
                    title: this.$t('performance.function')
                  },
                  {
                    name: 'subFunctionName',
                    title: this.$t('performance.subFunction')
                  },
                  {
                    name: 'formula',
                    title: this.$t('performance.criteria')
                  },
                  {
                    name: 'dataSources',
                    title: this.$t('performance.dataSources')
                  }
              ],
              shareMenuOptions: [
                {
                    id: 'upload',
                    label: this.$t('button.batchImport')
                }, {
                    id: 'downloadTemplate',
                    label: this.$t('performance.downloadtemplate')
                },{
                  id: 'download',
                  label:  this.$t('button.download')
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
        methods: {
          openMenu() {
            var el = document.getElementById('excelFile');
            el.style.display = "block";
            document.getElementsByClassName('ui-menu-option')[0].appendChild(el);
          },
          searchTable() {
            this.$refs.vuetable.reloadData();
          },
          resetTable() {
            this.indicator.reset();
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
                name: 'addIndicator',
            });
          },
          goEdit() {
            let _self = this;
            if(!this.checkSelected('edit')) return;
            if (_self.selectedRow[0]) {
                _self.$router.push({
                  name: 'editIndicator',
                  params: {
                      id: _self.selectedRow[0]
                  }
                });
            } else {
                _self.show.genericConfirm = true;
            }
          },
          deleteBtn() {
            if(!this.checkSelected('delete')) return;
            this.$refs.delconfirm.open();
          },
          delConfirmed() {
            let _self = this;
            let selectedIds  =_self.selectedRow;
            if (selectedIds) {
                this.$http.delete(`/performance/indicators/${selectedIds}`).then((response) => {
                  _self.$refs.delconfirm.close();
                  Message({
                      type: 'success',
                      message: this.$t('common.deleteSuccess')
                  });
                  this.$refs.vuetable.reloadData();
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
          },
          parseFiles(rawFiles) {
            return Array.prototype.slice.call(rawFiles, 0);
          },
          menuOptionSelected(option) {
            option = option || null;
            if (!option) return;
            switch (option.id) {
              case 'upload' :
                break;
              case 'download' :
                this.downloadAsExcel();
                break;
              case 'downloadTemplate' :
                this.downloadTemplate();
                break;
            }
          },
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
              this.$refs.vuetable.reloadData();
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
