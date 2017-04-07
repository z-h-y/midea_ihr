<style lang="less">
    .panel-b {
        border: 1px solid #ecedee;
    }

    .panel-header {
        overflow: hidden;
        padding-left: 16px;
        height: 48px;
        color: #222;
        font-size: 18px;
        line-height: 48px;
        border-bottom: solid 1px #e8e8e8;
        font-weight: bold;
    }

    .org-form {
        padding: 20px;
        margin-bottom: 26px;
    }

    .cell.city {
        width: 202px;
    }

    .cell.state {
        width: 192px;
    }

    .cell.country {
        width: 192px;
    }

    .up-class {
        width: 585px !important;
    }

    .ihr-updateOrganization {
        .deletePosition {
            position: absolute;
            top: 0;
            left: 560px;
        }
        .inrement-text {
            width: 100%;
            overflow: initial;
            text-overflow: initial;
            white-space: initial;
        }
    }
</style>

<template lang="html">

<div class="content-wrap ihr-updateOrganization">
    <panel :title="panelTitle" class="panel-b mb-suitable" header="panel-header">

        <v-form ref="orgform" :model="org" :schema="orgSchema" label-width="200" label-suffix="" :cols="1" form-style="org-form">
            <text-increment :title="org.parentUnitName" property="parentUnitName" editor-width="100%"></text-increment>
            <text-field ref="unitshortname" property='unitShortName' editor-width="400"></text-field>
            <text-field property='abbreviation' editor-width="400"></text-field>
            <text-increment v-show="!isAdd" property="unitCode" editor-width="400"></text-increment>
            <div class='field'>
                <label style="width:200px;">{{$t('organization.orgDetails.location')}}</label>
                <div class="field-content" style="margin-left:200px;">
                    <div class="field-row">
                        <div class="cell country">
                            <select-field property="country" :mapping="countryArea" label-width="0" :hide-label="true" placeholder="Country" editor-width="165"></select-field>
                        </div>
                        <div class="cell state">
                            <select-field property="state" label-width="0" :hide-label="true" placeholder="State" :mapping="stateMapping" editor-width="165"></select-field>
                        </div>
                        <div class="cell city">
                            <text-field property="city" label-width="0" :hide-label="true" placeholder="City or Town" editor-width="175"></text-field>
                        </div>
                    </div>
                </div>
            </div>
            <select-field :mapping="countryArea" property="countryScope" editor-width="400"></select-field>
            <text-field property="legalentity" editor-width="400"></text-field>
            <text-field property="corporation" editor-width="400"></text-field>
            <text-field v-show="!isEdit" property="beginDate" :min-date="effectiveDate" editor-width="400"></text-field>
            <text-increment v-show="isEdit" property="beginDate" editor-width="400"></text-increment>
            <text-field property="unitSize" editor-width="400"></text-field>
            <text-field property="unitLeaderName" type="selector" @open-selector="openSelector" :readonly="true" :show="show" editor-width="400">
                <input type="hidden" v-model="unitLeaderIds" id="icansee">
                <div class="deletePosition">
                    <i class="fa fa-close mr10" v-show="hasleader" @click="clearPosition()"></i>
                </div>
            </text-field>
            <text-increment property="unitTier" editor-width="400"></text-increment>
            <text-field property="unitScale" type="number" editor-width="400"></text-field>
            <template v-if="routeName !== 'change_organization'">
                <upload-field :upload-result="uploadResult" ref="uploadfield" :files-option="filesOption" :max-filesize="maxFileSize" :default-files="defaultFiles" :remove-ids="removeIds" property="uploadFiles" upload-class="up-class" editor-height="150"></upload-field>
            </template>
            <text-field type="textarea" maxlength="1024" :editor-height="100" editor-width="400" property="unitResponsibility"></text-field>
            <text-field property="remark" editor-width="400"></text-field>
        </v-form>
    </panel>

    <div class="btn-group">
        <ui-button color="primary mr10" @click="handleSubmit" :loading="submitLoading">{{$t('button.submit')}}</ui-button>
        <ui-button class="btn-default-bd" @click="handleCancel" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>

    <person-selector ref="orgHeader" @select-chief="getOrgChief" :show="show" :multi-selected="false"></person-selector>
</div>

</template>

<script type="text/ecmascript-6">
import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';
import {
    formatDate
}
from '../../util/assist';



export default {
    data() {

        let orgSchemaData = {
            unitShortName: {
                label: this.$t('organization.historyRecord.orgName'),
                required: true,
                rules: {
                    type: 'custom',
                    message: this.$t('organization.message.crudOrgNameExit'),
                    validate() {
                        return this.isNameNoExits;
                    }
                }
            },
            isNameNoExits: {
                default () {
                    return true;
                }
            },
            abbreviation: {
                label: this.$t('organization.orgDetails.abbreviation')
            },
            unitCode: {
                label: this.$t('organization.orgInfo.orgId'),
                default () {
                    return 'Automatically generated';
                }
            },
            city: {},
            state: {
                mapping: {},
                multiSelect: false
            },
            country: {},
            countryScope: {
                label: this.$t('organization.orgDetails.countryScope'),
                multiSelect: true
            },
            legalentity: {
                label: this.$t('organization.orgDetails.legalEntity'),
                rules: {
                    type: 'custom',
                    message: this.$t('organization.message.legalentity'),
                    validate() {
                        var len = 0;
                        this.legalentity = this.legalentity || "";
                        for (var i = 0; i < this.legalentity.length; i++) {
                            var length = this.legalentity.charCodeAt(i);
                            if (length >= 0 && length <= 128) {
                                len += 1;
                            } else {
                                len += 2;
                            }
                        }
                        if (len > 300) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            },
            corporation: {
                label: this.$t('organization.orgDetails.legalRepresentative')
            },
            beginDate: {
                label: this.$t('organization.orgInfo.effectDate'),
                required: true,
                type: 'date',
                default () {
                    return new Date();
                }
            },
            unitSize: {
                label: this.$t('organization.orgDetails.orgSize')
            },
            parentUnitName: {
                label: this.$t('organization.orgInfo.superiorOrg')
            },
            unitLeaderName: {
                label: this.$t('organization.orgInfo.headOfOrg')
            },
            unitTier: {
                label: this.$t('organization.orgDetails.orgTier')
            },
            uploadFiles: {
                label: this.$t('organization.orgDetails.companyLicense')
            },
            unitScale: {
                label: this.$t('organization.orgDetails.headCount')
            },
            unitResponsibility: {
                label: this.$t('organization.orgDetails.orgResponsibility'),
                required: true
            },
            remark: {
                label: this.$t('organization.orgDetails.additionalInfo')
            }
        };
        if (this.$route.name === 'edit_organization') {
            orgSchemaData.beginDate = {
                label: this.$t('organization.orgInfo.effectDate')
            };
        }
        return {
            maxFileSize: 2097152,
            orgSchema: new Schema(orgSchemaData),
            org: {},
            show: {
                modal: false
            },
            filesOption: {
                url: Vue.config.APIURL + '/org/orgs/org/units/' + this.$route.params.oid,
                accept: 'image/*,application/msexcel,application/msword,application/pdf',
                size: 1024 * 1024 * 2,
                multiple: true,
                extensions: 'gif,jpg,jpeg,png,pdf,doc,docx',
                // extensions: ['gif','jpg','png'],
                // extensions: /\.(gif|png|jpg)$/i,
                files: [],
                upload: {},
                drop: true,
                auto: false,
                name: 'orgFiles'
            },
            countryArea: {},
            effectiveDate: '',
            stateMapping: null,
            unitLeaderIds: [],
            // 当前组织的初始化名称
            currentUnitName: '',
            submitLoading: false,
            defaultFiles: [],
            removeIds: [],
            hasleader: false,
            parentUnitId: '' //上级组织ID
        };
    },
    watch: {
        'org.country': {
            handler: function(val, oldVal) {
                if (!val && val !== 0) {
                    return;
                }
                this.$http.get(`/org/area/${val}/child`).then((response) => {
                    if (response.data) {
                        let result = {},
                            datas = response.data;
                        for (var i = 0, l = datas.length; i < l; i++) {
                            result[datas[i].areaName] = datas[i].areaId;
                        }
                        this.stateMapping = result;
                    }
                });
            },
            deep: true
        },
        'org.unitShortName': {
            handler: function(val, oldVal) {
                if (!val ) {
                    return;
                }
               if(val === this.currentUnitName){
                 this.org.isNameNoExits = true;
                 this.$refs.unitshortname.validate();
                 return;
               }
                // 检测组织是否重复时的父级id
                var checkUnitNameId = '';
                if (this.routeName === 'add_organization') {
                    checkUnitNameId = this.$route.params.oid;
                } else {
                    checkUnitNameId = this.org.parentUnitId;
                }

                this.$http.post(`/org/orgs/checkUnitName`, {
                    unitId: checkUnitNameId,
                    name: val
                }, {
                    emulateJSON: true
                }).then((response) => {
                    this.org.isNameNoExits = response.body === 'false' ? true : false;
                    this.$refs.unitshortname.validate();
                });


            }
        }
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
        isEdit() {
            if (this.routeName === 'edit_organization') {
                return true;
            } else {
                return false;
            }
        },
        isAdd() {
            if (this.routeName === 'add_organization') {
                return true;
            } else {
                return false;
            }
        },
        panelTitle() {
            if (this.routeName === 'add_organization') {
                return this.$t('organization.modifyOrg.addOrgTitle');
            } else if (this.routeName === 'edit_organization') {
                return this.$t('organization.modifyOrg.editOrgTitle');
            } else if (this.routeName === 'change_organization') {
                return this.$t('organization.modifyOrg.changeOrgTitle');
            }
        },
        isDisabled() {
            if (this.routeName === 'change_tir') {
                return true;
            }
            return false;
        },
        computTier: function() {
            let tier = this.$route.params.fullUnitName,
                computTier = '';
            if (tier) {
                tier = tier.split('_');
                for (let key of tier.keys()) {
                    computTier += (tier[key] + '  >>  ');
                }
            }
            return computTier;
        }
    },
    created() {
        this.hasleader = false;
        this.org = this.orgSchema.newModel()
        this.org.unitTier = this.computTier;
        this.fetchData();
        if (this.isEdit) {
            this.$http.get('/employee/employees/attachment?businessId=' + this.$route.params.oid).then(function(res) {
                if (res.data) {
                    this.defaultFiles = res.data;
                }
            })
        }
        this.$http.get(`/org/area/0/child`).then((response) => {
            if (response.data) {
                let result = {},
                    datas = response.data;
                for (var i = 0, l = datas.length; i < l; i++) {
                    result[datas[i].areaName] = datas[i].areaId;
                }
                this.countryArea = result;
            }
        })
        if (this.routeName === "add_organization") {
          this.filesOption.url = Vue.config.APIURL + '/org/orgs/org/units';
        }
    },
    methods: {
        //receive data from person-selector;
        getOrgChief(chiefInfo,orgGroup) {
            this.hasleader = true;
            if (chiefInfo && chiefInfo instanceof Array) {
                let tempNames = [],
                    tempIds = [];
                chiefInfo.forEach((list) => {
                     tempNames.push(list.employeeName);
                    tempIds.push(list.employeeId);
                })
                this.org.unitLeaderName = tempNames.toString();
                this.unitLeaderIds = tempIds.toString();
            }
        },
        openSelector() {
            this.$refs['orgHeader'].open();
            this.show.modal = true;
        },
        clearPosition() {
            this.org.unitLeaderName = " ";
            this.hasleader = false;
        },
        fetchData() {
            let orgModel = this.org,
                data = null;
            this.$http.get(`/org/orgs/${this.$route.params.oid}/orgdetails`).then((response) => {
                data = response.data;
                if (data) {
                    if (this.routeName === 'add_organization') {
                        orgModel.parentUnitName = data.fullUnitName;
                        orgModel.unitTier = Number(data.unitTier) + 1;
                        return;
                    }

                    this.currentUnitName = data.unitShortName;
                    if (data.countryScope) data.countryScope = data.countryScope.split(',');
                    if (data.beginDate) {

                        data.beginDate = formatDate(new Date(data.beginDate));
                        if (this.routeName === 'change_organization') {
                            data.beginDate = formatDate(new Date(new Date(data.beginDate).getTime() + 24 * 60 * 60 * 1000));
                            this.effectiveDate = data.beginDate;
                            data.beginDate = '';
                        }
                    }
                    Object.assign(orgModel, data);
                }
            });
        },
        handleSubmit() {
            let orgModel = this.org,

                passed = this.$refs.orgform.isFormValidate();
            if (!passed) return;

            this.submitLoading = true;
            let params = this.handleParams(orgModel);
            for (var key in params) {
                if (params[key] === undefined || params[key] === null) {
                    params[key] = '';
                }
            }

            if (this.routeName === "add_organization") {
                this.$refs.uploadfield.uploadFile(params);
            } else if (this.routeName === 'edit_organization') {
                params.parentUnitId = orgModel.parentUnitId;
                params.delAttachmentIds = this.removeIds.join(',');
                this.$refs.uploadfield.uploadFile(params);
            } else if (this.routeName === 'change_organization') {
                let url = `/org/orgs/org/units/${this.$route.params.oid}/update`;
                params.fullUnitName = this.org.fullUnitName;
                params.parentUnitId = orgModel.parentUnitId;
                this.$http.post(url, params, {
                    emulateJSON: true
                }).then((response) => {
                    if (response.ok) {
                        this.setCacheTreeData('change', this.org);
                        Message({
                            type: 'success',
                            message: this.$t('organization.message.crudChangeSucceed')
                        });
                        this.$root.$data.orgSettingTreeCache = null;
                    }
                    this.$router.push({
                        name: 'organizationSetting',
                        query: {
                            orgId: this.$route.params.oid
                        }
                    });
                }, (response) => {
                    this.submitLoading = false;
                });
            }

        },

        /**
         *Parameter handling functions
         */
        handleParams(orgModel) {

            orgModel = Object.assign({}, orgModel);

            if (orgModel.countryScope instanceof Array) {
                orgModel.countryScope = orgModel.countryScope.join(',');
            }
            return {
                parentUnitId: this.$route.params.oid,
                unitShortName: orgModel.unitShortName,
                abbreviation: orgModel.abbreviation,
                city: orgModel.city,
                state: orgModel.state,
                country: orgModel.country,
                countryScope: orgModel.countryScope,
                legalentity: orgModel.legalentity,
                corporation: orgModel.corporation,
                beginDate: formatDate(new Date(orgModel.beginDate)),
                unitSize: orgModel.unitSize,
                unitLeaderId: this.unitLeaderIds,
                unitTier: orgModel.unitTier,
                unitScale: orgModel.unitScale,
                unitResponsibility: orgModel.unitResponsibility,
                remark: orgModel.remark
            };

        },

        handleCancel() {
            this.$router.push({
                name: 'organizationSetting',
                query: {
                    orgId: this.$route.params.oid
                }
            });
        },

        setCacheTreeData(type, org) {
            var orgId = this.$route.params.oid;
            var treeData = this.$root.$data.orgSettingTreeCache;
            var walk = function(data) {
                if (data && data.length > 0) {
                    data.forEach(function(child, key) {
                        if (orgId === String(child['orgId'])) {
                            switch (type) {
                                case 'add':
                                    child['isParent'] = 'true';
                                    var node = {
                                        isParent: 'false',
                                        parentUnitId: org.parentUnitId,
                                        orgId: org.unitId,
                                        orgShortName: org.unitShortName
                                    };
                                    if (child['children'] instanceof Array) {
                                        child['children'].push(node);
                                    } else {
                                        child['children'] = [node];
                                    }
                                    break;
                                case 'edit':
                                case 'change':
                                    child['orgShortName'] = org.unitShortName;
                                    break;
                            }
                        } else {
                            var children = child['children'];
                            walk(children);
                        }
                    });
                }
            };
            walk(treeData);
        },
        uploadResult(file) {
          this.submitLoading = false;
          if (!file.error) {
            var orgId = '';
            if(this.isAdd) {
              this.org.unitId = file.data;
              orgId = file.data;
              this.setCacheTreeData('add', this.org);
              Message({
                  type: 'success',
                  message: this.$t('organization.message.crudAddSucceed')
              });
            } else if (this.isEdit) {
              this.setCacheTreeData('edit', this.org);
              orgId = this.$route.params.oid;
              Message({
                  type: 'success',
                  message: this.$t('organization.message.crudEditSucceed')
              });
            }

            this.$router.push({
                name: 'organizationSetting',
                query: {
                    orgId: orgId
                }
            });
          } else {
            if (file.data.message) {
              Message({
                  type: 'error',
                  message: file.data.message
              });
            }else{
              Message({
                  type: 'error',
                  message: 'Effective date should be later than last change date of this organization'
              });
            }
          }
        }
    },
    components: {
        Panel: require('../../components/basic/panel.vue')
    }
};
</script>
