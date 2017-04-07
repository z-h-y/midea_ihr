<style lang="less" lang="less">

.ihr-org-changeTir {
    .inrement-text {
        width: 800px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.textarea .text-editor {
    height: auto;
    word-break: break-all;
}

</style>

<template lang="html">

<div class="content-wrap ihr-org-changeTir">
    <panel :title="panelTitle" class=" panel-b  mb-suitable" header="panel-header">
        <v-form ref="changetirform" :model="changeTir" :schema="changeTirSchema" label-width="200" label-suffix="" :cols="1" form-style="org-form">
            <text-increment :title="changeTir.fullUnitName" property='fullUnitName' editor-width="400"></text-increment>
            <text-increment property='abbreviation' editor-width="400"></text-increment>
            <text-increment property="unitCode" editor-width="400"></text-increment>
            <text-increment property="location" editor-width="400"></text-increment>
            <text-increment property="countryScope" editor-width="400"></text-increment>
            <text-increment property="legalentity" editor-width="400"></text-increment>
            <text-increment property="corporation" editor-width="400"></text-increment>
            <text-field property="beginDate" :min-date="beginDate" editor-width="400"></text-field>
            <text-increment property="unitSize" editor-width="400"></text-increment>
            <text-field property="parentUnitName" type="selector" :readonly="true" :show.sync="show" editor-width="400">
                <input type="hidden" v-model="changeTir.parentUnitId">
            </text-field>
            <text-field type="selector" property="unitLeaderName" :readonly="true" :show.sync="person" editor-width="400"></text-field>
            <text-increment property="unitTier" editor-width="400"></text-increment>
            <text-increment property="unitScale" editor-width="400"></text-increment>
            <text-increment class="textarea" type="textarea" editor-width="400" property="unitResponsibility"></text-increment>
            <text-increment property="remark" editor-width="400"></text-increment>
        </v-form>
    </panel>

    <div class="btn-group">
        <ui-button color="primary mr10" @click="handleSubmit" :loading="submitLoading">{{$t('button.submit')}}</ui-button>
        <ui-button class="btn-default-bd" @click="handleCancel" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>

    <organization-selector :disable-value="disableValue" :show.sync="show"></organization-selector>
    <person-selector :show.sync="person" :handle-comfirmed="selectPer" :multi-selected="false"></person-selector>
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
        let changeTirSchema = new Schema({
            fullUnitName: {
                label: this.$t('organization.historyRecord.orgName')
            },
            abbreviation: {
                label: this.$t('organization.orgDetails.abbreviation')
            },
            unitCode: {
                label: this.$t('organization.orgDetails.orgTypeCode')
            },
            city: {},
            state: {},
            country: {},
            location: {
                label: this.$t('organization.orgDetails.location')
            },
            countryScope: {
                label: this.$t('organization.orgDetails.countryScope')
            },
            legalentity: {
                label: this.$t('organization.orgDetails.legalEntity')
            },
            corporation: {
                label: this.$t('organization.orgDetails.legalRepresentative')
            },
            beginDate: {
                label: this.$t('organization.orgInfo.effectDate'),
                required: true,
                type: 'date'
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
            attachmentId: {
                label: this.$t('organization.orgDetails.companyLicense')
            },
            unitScale: {
                label: this.$t('organization.orgDetails.headCount')
            },
            unitResponsibility: {
                label: this.$t('organization.orgDetails.orgResponsibility')
            },
            remark: {
                label: this.$t('organization.orgDetails.additionalInfo')
            }
        });



            return {
                changeTirSchema: changeTirSchema,
                changeTir: changeTirSchema.newModel(),
                show: {
                    modal: false
                },
                person: {
                    modal: false
                },
                submitLoading: false,
                area: [],
                beginDate: ''
            };
        },
        computed: {
            disableValue() {
                    var id = this.$route.params.oid ? [this.$route.params.oid] : [];
                    return id;
                },
                routeName() {
                    return this.$route.name;
                },
                panelTitle() {
                    if (this.routeName === 'change_tir') return this.$t('organization.modifyOrg.changeTierTitle');
                }
        },
        created() {
            this.$http.get('/org/area/0/child').then(function(res) {
                this.area = res.data;
                this.fetchData();
            })
        },
        methods: {
            fetchData() {
                    let changeTirModel = this.changeTir,
                        data = null;
                    this.$http.get(`/org/orgs/${this.$route.params.oid}/orgdetails`).then((response) => {
                        data = response.data;
                        if (data) {
                            var area = this.area;
                            var len = area.length;
                            if (data.countryScope) {
                                data.countryScope = data.countryScope.split(',');
                                var countryScope = [];
                                data.countryScope.forEach(function(item) {
                                    for (var i = 0; i < len; i++) {
                                        if (area[i].areaId === item) {
                                            countryScope.push(area[i].areaName);
                                            break;
                                        }
                                    }
                                });
                                data.countryScope = countryScope.join(',');
                            }
                            var curCountry = data.country;
                            var state = data.state;
                            if (curCountry) {
                                for (var i = 0; i < len; i++) {
                                    if (area[i].areaId === curCountry) {
                                        curCountry = area[i].areaName;
                                        break;
                                    }
                                }
                                this.$http.get(`/org/area/${data.country}/child`).then((response) => {
                                    for (var i = 0; i < response.data.length; i++) {
                                        if (response.data[i].areaId === state) {
                                            state = response.data[i].areaName;
                                            break;
                                        }
                                    }
                                    changeTirModel.location = data.city + ',' + state + ',' + curCountry;
                                });
                            }

                            //  data.beginDate = formatDate(new Date(data.beginDate));
                            //  this.beginDate = data.beginDate;
                            data.beginDate = "";
                            this.parentUnitId = data.parentUnitId;
                            Object.assign(changeTirModel, data);

                        }
                    });

                },
                handleSubmit() {
                    let passed = this.changeTir.$schema.isFormValidate(this.$refs.changetirform);
                    if (!passed) return;

                    this.submitLoading = true;
                    let changeTirModel = this.changeTir;
                    this.$http.post(`/org/orgs/${changeTirModel.unitId}/changeTier`, {
                        unitId: changeTirModel.unitId,
                        toParentUnitId: changeTirModel.parentUnitId,
                        employeeId: changeTirModel.employeeId,
                        effectiveDate: formatDate(new Date(changeTirModel.beginDate))
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.data) {

                            Message({
                                type: 'success',
                                message: this.$t('organization.message.changeTirHandupSucceed')
                            });
                            var orgId = this.$route.params.oid;
                            var treeData = this.$root.$data.orgSettingTreeCache;
                            var delNode = {};
                            var walk = function(data, id, type) {
                              if (data && data.length > 0) {
                                data.forEach(function(child, key) {
                                  if (id === String(child['orgId'])) {
                                    if (type === 'del') {
                                      data.splice(key, 1);
                                      delNode = child;
                                    } else if (type === 'add') {
                                      child.children = child.children || [];
                                      child.isParent = "true";
                                      child.children.push(delNode);
                                    }
                                  } else {
                                    var children = child['children'];
                                    walk(children, id, type);
                                  }
                                });
                              }
                            };
                            walk(treeData, orgId, 'del');
                            walk(treeData, String(this.changeTir.parentUnitId), 'add');
                            this.$router.push({
                                name: 'organizationSetting',
                                query: {orgId: this.$route.params.oid}
                            });
                        }
                    }, (response) => {
                        this.submitLoading = false;
                    });
                },
                handleCancel() {
                    this.$router.push({
                        name: 'organizationSetting',
                        query: {orgId: this.$route.params.oid}
                    });
                },
                selectPer(value) {
                    if (value && value instanceof Array) {
                        let tempNames = [],
                            tempIds = [];
                        for (let index of value.keys()) {
                            tempNames.push(value[index].employeeName);
                            tempIds.push(value[index].employeeId);
                        }
                        this.changeTir.unitLeaderName = tempNames.join(',');
                        this.changeTir.employeeId = tempIds.join(',');
                    }
                }
        },
        events: {
            'organization-selector:selected': function(node) {
                if (!node) return;
                this.changeTir.parentUnitName = node.orgShortName;
                this.changeTir.parentUnitId = node.orgId;
                this.$http.get(`/org/orgs/${node.orgId}/orgdetails`).then((response) => {
                    this.changeTir.unitTier = Number(response.data.unitTier) + 1;
                });
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
};

</script>
