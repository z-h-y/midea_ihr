<style lang="less">

.ihr-staff-interns {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }
    .vuetable-wrapper {
      padding: 0 16px 16px 16px;
    }

    .group {
      margin: 16px;
      padding-top: 16px;
      border-top: 1px solid #ecedee;
    }
    .interns-form {
      height: 46px;
      margin: 0 40px;
    }
    .interns-form.expended {
      height: 92px;
    }
    #excelFile {
      display: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-interns">
    <div class="mb20 pt20">
        <organization-selector ref="orgselect" :show="org" :handel-select="selectOrg"></organization-selector>
        <div class="search-area">
            <v-form :class="{expended: expended}" :model="interns" :schema="internsSchema" label-width="170" label-suffix="" :cols="3" form-style="interns-form">
                <text-field property="fullName" editor-width="150"></text-field>
                <text-field property="employeeCode" editor-width="150"></text-field>
                <text-field type="selector" :readonly="true" @open-selector="openSelector" :show="org" property="orgUnitName" editor-width="150"></text-field>
                <text-field v-show="expended" property="positionName" editor-width="150"></text-field>
            </v-form>
            <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{ $t('button.search') }}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" @click="reset" type="flat">{{ $t('button.reset') }}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="goAdd" color="primary" icon="fa-plus" button-type="button">{{$t('button.add')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="goEdit" icon="fa-pencil-square-o" type="flat" button-type="button">{{$t('button.edit')}}</ui-button>
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
            <file-upload @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload" :title="$t('button.upload')" id="excelFile" class="menu-option-upload file-upload" name="internEmployeeFile" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" ref="upload" :drop="files.drop"></file-upload>
            <!-- <input id="excelFile" type="file" name="file" v-on:change="uploadExcel($event)"> -->
        </div>
        <div class="vuetable-wrapper">
          <vuetable ref="vuetable" :append-params="moreParams" api-url="/employee/employees/" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
          </vuetable>
        </div>
    </div>


    <ui-modal ref="modal" :show="task.modal" title="Feedback" :body="taskShowText">
        <div slot="footer">
            <ui-button v-show=" importStatus == '2'" @click="downloadTaskFile" color="primary">{{$t('staff.downloadfeedback')}}</ui-button>
            <ui-button @click="canDownloadTask">{{$t('button.close')}}</ui-button>
        </div>
    </ui-modal>


    <ui-modal ref="loading" :show="task.loading" header="">
        <div class="tc">
            <img src="assets/images/public/gears.gif" alt="">
            <div class="loading-txt">{{$t('staff.dataprocessing')}}</div>
        </div>
        <div slot="footer"></div>
    </ui-modal>

</div>
</template>

<script>
import {
    default as Schema
}
from '../../schema/index';
import {downloadFile} from '../../util/assist';
import {default as Message} from '../../components/basic/message';


export default {
    data() {
        let internsData = {
            fullName: {
                label: this.$t('staff.internsName')
            },
            employeeCode:{
              label: this.$t('staff.internId')
            },
            orgUnitName: {
              label: this.$t('staff.organization')
            },
            positionName: {
                label: this.$t('staff.mibPostion')
            }
        };
            return {
                moreParams: ['employementCategory=7'],
                moreParamsKeys: ['fullName', 'employeeCode', 'unitId', 'positionName'],
                org: {
                  modal: false
                },
                task: {
                    modal: false,
                    loading: false,
                    close: false
                },
                importStatus: '-1',
                taskShowText: '',
                taskAttachmentId: '',
                selectedRow: [],
                internsSchema:new Schema(internsData),
                interns: null,
                expendIcon: 'fa-angle-double-down',
                expended: false,
                files: {
                  url: Vue.config.APIURL + '/employee/employees/import/uploadInternEmployeeFile',
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
                columns: [{
                      name: '__checkbox:employeeId',
                      title: ''
                    },
                    {
                      name: 'fullName',
                      title: this.$t('staff.name'),
                      callback: 'cname'
                    },
                    {
                      name: 'loginId',
                      title: this.$t('staff.loginId')
                    },
                    {
                      name: 'employeeCode',
                      dataClass: 'tr',
                      title: this.$t('staff.internId')
                    },
                    {
                      name: 'positionName',
                      title: this.$t('staff.mibPostion')
                    },
                    {
                      name: 'unitShortName',
                      title: this.$t('staff.organization')
                    },
                    {
                      name: 'registerDate',
                      dataClass: 'tr',
                      titleClass: 'mw80',
                      title: this.$t('staff.startDate')
                    }
                ],
                shareMenuOptions: [
                  {
                      id: 'join',
                      label: this.$t('staff.joinCompany')
                  }, {
                      id: 'terminatep',
                      label: this.$t('staff.terminateInternship')
                  }, {
                      id: 'template',
                      label: this.$t('staff.downloadTemplate')
                  }, {
                      id: 'import',
                      label: this.$t('button.batchImport')
                  }, {
                      id: 'download',
                      label: this.$t('button.download')
                  }
              ]
            };
        },
        created() {
          let organizationId = this.$route.query.orgId;
          if(organizationId) {
            this.moreParams.push('unitId=' + organizationId);
          }
        },
        computed: {},
        mounted() {
          this.interns = this.internsSchema.newModel();
        },
        methods: {
            openSelector() {
              this.$refs['orgselect'].open();
            },
            openMenu() {
              var el = document.getElementById('excelFile');
              el.style.display = "block";
              document.getElementsByClassName('ui-menu-option')[3].appendChild(el);
            },
            search() {
              this.moreParams = ['employementCategory=7'];
              for (let i = 0, len = this.moreParamsKeys.length; i < len; i++) {
                let key = this.moreParamsKeys[i];
                let value = this.interns[key];
                if (value || value === 0) {
                  this.moreParams.push(key + '=' + value);
                }
              }
              this.$nextTick(function() {
                this.$refs.vuetable.reloadData();
              })
            },
            reset() {
              this.interns.reset();
              this.interns.unitId = '';
            },
            goAdd() {
              this.$router.push({ name: 'internsAdd'})
            },
            goEdit() {
              if (this.selectedRow.length === 1) {
                this.$router.push({ name: 'internsView', params: { employeeId: this.selectedRow[0] }})
              } else {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.selectOnePerson')
                });
              }
            },
            menuOptionSelected(option) {
              switch(option.id) {
                case 'join':
                  if (this.selectedRow.length === 1) {
                    this.$router.push({ name: 'internsJoinCompany', params: { employeeId: this.selectedRow[0] }});
                  } else {
                    Message({
                        type: 'error',
                        message: this.$t('staff.message.selectOnePerson')
                    });
                  }
                  break;
                case 'terminatep':
                  if (this.selectedRow.length === 1) {
                    this.$router.push({ name: 'internsResign', params: { employeeId: this.selectedRow[0] }});
                  } else {
                    Message({
                        type: 'error',
                        message: this.$t('staff.message.selectOnePerson')
                    });
                  }
                  break;
                case 'template': this.downloadTemplate();break;
                // case 'import': document.getElementById('excelFile').click();break;
                case 'download': this.download();break;
              }
            },
            downloadTemplate() {
              downloadFile('/employee/employees/dowloadInternsTemplate');
            },
            download() {
              var tablePagination = this.$refs.vuetable.tablePagination;
              if (tablePagination && tablePagination.total > 5000) {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.downloadLimit')
                });
                return;
              }
              var interns = this.interns;
              var data = {employementCategory: 7};
              this.moreParamsKeys.forEach(function(item) {
                var value = interns[item];
                if (value || value === '0') {
                  data[item] = value;
                }
              });
              downloadFile('/employee/employees/exportInternsOutsourceEmployees', data);
            },
            expendSearch() {
              this.expended = !this.expended;
              this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            },
            cname(value, data) {
              return `<a href="${location.href}/view/${data.employeeId}">${value}</a>`;
            },
            checkTask() {
                let _self = this;
                _self.$http.get(`/employee/employees/import/getUploadStatus?businessType=emp_interns&&importStatus=${this.importStatus}`).then(function(res) {
                    _self.importStatus = '-1';
                    _self.importStatus = res.data.importStatus;
                    if (res.data.importStatus === '0') {
                        _self.startTaskFile();
                        var timer;
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            _self.checkTask();
                        }, 3000);
                    }
                    if (res.data.importStatus === '1' || res.data.importStatus === '0') {
                        var timer;
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            _self.checkTask();
                        }, 3000);

                        if (this.task.loading === false && this.task.close === false) {
                            this.$refs.loading.open()
                            this.task.loading = true;
                            this.task.close = true;
                        }
                    }
                    if (res.data.importStatus === '2') {
                        if (this.task.loading === true) {
                            this.$refs.loading.close()
                            this.task.loading = false;
                        }
                        _self.taskAttachmentId = res.data.businessId;
                        _self.taskShowText = 'Data import failure, please download the  feedback excel. You can modify the data according to error tips and then upload it again.';
                    }
                    if (res.data.importStatus === '3') {
                        if (this.task.loading === true) {
                            this.task.loading = false;
                            this.$refs.loading.close()
                        }
                        Message({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                        _self.$http.get(`/employee/employees/import/getUploadStatus?businessType=emp_interns&&importStatus=3`).then(function(res) {})
                    }
                    if (res.data.importStatus === '4') {
                        if (this.task.loading === true) {
                            this.task.loading = false;
                            this.$refs.loading.close()
                        }
                        Message({
                            type: 'success',
                            message: this.$t('staff.message.importSuccess')
                        });
                        var timer;
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            _self.checkTask();
                        }, 3000);
                    }
                    if (res.data.importStatus === '2') {
                        _self.$refs.modal.open();
                    }

                })
            },
            downloadTaskFile() {
                if (this.taskAttachmentId) {
                    var attachmentId = this.taskAttachmentId;
                    this.$refs.modal.close();
                    this.$http.get(`/employee/employees/import/getUploadStatus?businessType=emp_interns&&importStatus=-2`).then(function(res) {
                        downloadFile('/system/attachment/downloadFile', {
                            attachmentId: attachmentId
                        });
                    })
                }
            },
            startTaskFile() {
                let _self = this;
                _self.$http.get("/employee/employees/import/lookupImportBusiness?businessType=emp_interns").then(function(res) {

                })
            },
            canDownloadTask() {
                let _self = this;
                _self.$http.get(`/employee/employees/import/getUploadStatus?businessType=emp_interns&&importStatus=-2`).then(function(res) {
                    this.$refs.modal.close();
                })
            },
            selectOrg(value) {
                if (value) {
                    this.interns.orgUnitName = value.orgShortName;
                    this.interns.unitId = value.orgId;
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
                      message: this.$t('staff.message.importUploadSuccess')
                  });
                  this.checkTask();
              } else {
                  Message({
                      type: 'error',
                      message: file.data.message || this.$t('staff.message.importUploadFail')
                  });
              }
            }
        },
        components: {
          FileUpload: require('../../components/basic/FileUpload.vue')
        }
};

</script>
