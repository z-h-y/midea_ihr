<style lang="less">

.ihr-staff-interns-view {
    font-size: 14px;
    border: 1px solid #ecedee;
    .interns-tabs {
        position: relative;
    }
    .pt16 {
      padding-top: 16px;
    }
    .pb16 {
      padding-bottom: 16px;
    }
    .interns-tabs-hd {
        padding: 10px 20px 0;
        background-color: #eff0f1;
    }
    .interns-tabs-hd li {
        float: left;
        padding: 10px 20px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        color: #545454;
    }
    .interns-tabs-hd li.active {
        background-color: #fafafa;
        border-radius: 5px;
        color: #222;
    }
    .ui-tabs-header-items {
        padding: 0 15px;
    }
    .interns-tabs-ul li {
        padding: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #545454;
    }
    .interns-tabs-ul li span {
        color: #a5acbe;
        display: inline-block;
        width: 200px;
    }
    .interns-tabs-ul-pos li {
        padding: 10px;
        color: #545454;
    }
    .interns-tabs-ul-pos .text-bold {
        color: #2a3c59;
        font-weight: bold;
    }
    .interns-tabs-ul-pos .w200 {
        display: inline-block;
        width: 200px;
    }
    .interns-tabs-ul-member {
        display: -moz-box;
        display: -webkit-box;
        display: box;
        margin: 0 16px;
    }
    .interns-tabs-ul-member li {
        width: 32%;
        background-color: #fbfbfd;
        padding: 16px;
        box-sizing: border-box;
    }
    .interns-tabs-ul-member li.member-center {
      margin: 0 2%;
    }
    .interns-tabs-ul-member li:last-child {
        margin-right: 0;
    }
    .interns-tabs-ul-member h3 {
        padding: 20px 0;
        font-weight: normal;
    }
    .interns-tabs-ul-member h3,
    .member-contract {
        border-bottom: 1px solid #dde3e9;
        padding: 10px 10px 10px 0;
    }
    .interns-tabs-ul-member p {
        padding: 10px 0;
        color: #545454;
    }
    .member-contract p span {
        word-wrap: break-word;
    }
    .member-contract p, .interns-tabs-ul-member p i,
    .member-home-address p.member-ha-title {
        color: #a5acbe;
    }
    .member-home-address p.member-ha-title {
        padding-top: 20px;
    }
    .contact li {
        position: relative;
        color: #a5acbe;
    }
    .contact-ico(@w, @h) {
        width: @w;
        height: @h;
        position: absolute;
        left: 0;
        top: 0;
    }
    .contact-ico-num {
        .contact-ico(36px, 36px);
        background: url("../../static/images/public/staff-interns-phone.png") no-repeat center center;
    }
    .contact-ico-mail {
        .contact-ico(36px,
        36px);
        background: url("../../static/images/public/staff-interns-mail.png") no-repeat center center;
    }
    .contact-ico-location {
        .contact-ico(36px,
        36px);
        background: url("../../static/images/public/staff-interns-location.png") no-repeat center center;
    }
    .contact-ico-person {
        .contact-ico(36px,
        36px);
        background: url("../../static/images/public/staff-interns-person.png") no-repeat center center;
    }
    .ui-tabs-header.background-color-default {
        background-color: #fafafa;
    }
    .ui-progress-linear {
        height: 10px;
        border-radius: 10px;
        width: 50%;
        display: inline-block;
    }
    .ui-progress-linear-determinate {
        border-radius: 10px;
    }
    .interns-tabs-ul-hr li {
        margin: 20px 100px;
    }
    .interns-tabs-ul-hr li span {
        padding-left: 30px;
        width: 25%;
        text-align: left;
        word-wrap: break-word;
    }
    .interns-tabs-ul-hr li span:first-child {
        padding-right: 30px;
        padding-left: 0;
        text-align: right;
    }
    .edit-btn {
        width: 60px;
        min-width: 60px;
        padding: 0;
        height: 60px;
        border-radius: 50%;
        position: fixed;
        right: 30px;
        top: 50%;
        z-index: 999;
    }
    .c-2a3c59 {
        color: #2a3c59;
    }
    .c-a5acbe {
        color: #a5acbe;
    }
    .c-c4ccd4{
      color:#c4ccd4;
    }
    .contract-file-download {
      cursor: pointer;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-interns-view">
    <employee-common-info v-ref:commoninfo :employee-id="employeeId" :employee-info.sync="employeeInfo"></employee-common-info>
    <ui-button class="edit-btn" @click="editInfo" text="Edit" icon="fa-pencil" color="primary" v-show="showEdit"></ui-button>
    <div class="interns-tabs">
        <ul class="interns-tabs-hd fix">
            <li v-for="(index, li) in internsTabsList" :class="{active: li.active}" @click="changeTabs(index)">
                {{ li.text }}
            </li>
        </ul>
        <div class="interns-tabs-bd" v-show="tabIndex === 0">
            <ui-tabs type="text">
                <ui-tab header="Personal Information" v-if="true">
                    <ul class="interns-tabs-ul fix">
                        <li><span>Given Name</span>{{ employeeInfo.givenName }}</li>
                        <li><span>Middle Name</span>{{ employeeInfo.middleName }}</li>
                        <li><span>Family Name</span>{{ employeeInfo.familyName }}</li>
                        <li><span>Gender</span>{{ fixDist(employeeInfo.gender, 'gender') }}</li>
                        <li><span>Citizenship</span>{{ fixDist(employeeInfo.areaCitizenship, 'area') }}</li>
                        <li><span>Date of Birth</span>{{ employeeInfo.birthDate | formatDate }}</li>
                        <li><span>Place of Birth</span>{{ employeeInfo.placeBirthName }}</li>
                        <!-- <li><span>Nation</span>{{ employeeInfo.nationalityName }}</li> -->
                        <li><span>Marital Status</span>{{ fixDist(employeeInfo.maritalStatus, 'maritalStatus')}}</li>
                        <!-- <li><span>Religion</span>{{ fixDist(employeeInfo.religion, 'religion') }}</li> -->
                        <li><span>English Level</span>{{ fixDist(employeeInfo.englishLevel, 'englishLevel') }}</li>
                        <li><span>ID Tpye</span>{{ fixDist(employeeInfo.idType, 'idType') }}</li>
                        <li><span>ID Number</span>{{ employeeInfo.idNumber }}</li>
                        <li><span>Issue Date Of ID</span>{{ getIdDate(employeeInfo.dictPassportList, 'IssueDate') }}</li>
                        <li><span>Expiry Date Of ID</span>{{ getIdDate(employeeInfo.dictPassportList, 'ExpiryDate') }}</li>
                        <li><span>Emergency Contact Name</span>{{ employeeInfo.emergencyContact }}</li>
                        <li><span>Emergency Contact Phone</span>{{ employeeInfo.emergencyContactPhone}}</li>
                    </ul>
                </ui-tab>

                <ui-tab header="Personal Contact" v-if="true">
                    <ul class="interns-tabs-ul-member fix">
                        <li>
                            <h3 class="member-hd">
                      Contact Information-Personal
                    </h3>
                            <div class="member-contract">
                                <p class="fix">
                                    <i class="fa fa-phone pr5" aria-hidden="true"></i>
                                    <span class="c-2a3c59">{{perContact.personalPhone}}</span>
                                </p>
                                <p class="fix">
                                    <i class="fa fa-mobile-phone pr5" aria-hidden="true"></i>
                                    <span class="c-2a3c59">{{perContact.personalMobile}}</span>
                                </p>
                                <p class="fix">
                                    <i class="fa fa-envelope-o pr5" aria-hidden="true"></i>
                                    <span class="c-2a3c59">{{perContact.personalEmail}}</span>
                                </p>
                            </div>
                            <div class="member-home-address">
                                <p class="member-ha-title">Home Address</p>
                                <p><span class="c-a5acbe mr10">Address</span>{{perContact.homeAddress}}</p>
                                <p><span class="c-a5acbe mr10">City Town</span>{{perContact.homeCityTown}}</p>
                                <p><span class="c-a5acbe mr10">State</span>{{perContact.homeState}}</p>
                                <p><span class="c-a5acbe mr10">Country</span>{{fixDist(perContact.homeCountry, 'area')}}</p>
                                <p><span class="c-a5acbe mr10">Zip</span>{{perContact.homeZipcode}}</p>
                            </div>
                        </li>
                        <li class="member-center">
                            <h3 class="member-hd">
                      Contact Information-Work
                    </h3>
                            <div class="member-contract">
                                <p class="fix">
                                    <i class="fa fa-phone pr5" aria-hidden="true"></i>
                                    <span class="c-2a3c59">{{perContact.workPhone}}</span>
                                </p>
                                <p class="fix">
                                    <i class="fa fa-mobile-phone pr5" aria-hidden="true"></i>
                                    <span class="c-2a3c59">{{perContact.workMobile}}</span>
                                </p>
                                <p class="fix">
                                    <i class="fa fa-envelope-o pr5" aria-hidden="true"></i>
                                    <span class="c-2a3c59">{{perContact.workEmail}}</span>
                                </p>
                            </div>
                            <div class="member-home-address">
                                <p class="member-ha-title">Work Address</p>
                                <p><span class="c-a5acbe mr10">Address</span>{{perContact.workAddress}}</p>
                                <p><span class="c-a5acbe mr10">City Town</span>{{perContact.workCityTown}}</p>
                                <p><span class="c-a5acbe mr10">State</span>{{perContact.workState}}</p>
                                <p><span class="c-a5acbe mr10">Country</span>{{fixDist(perContact.workCountry, 'area')}}</p>
                                <p><span class="c-a5acbe mr10">Zip</span>{{perContact.workZipcode}}</p>
                            </div>
                        </li>
                        <li>
                            <h3 class="member-hd">
                      Social Network Accounts
                    </h3>
                            <div class="">
                                <p>
                                    <i class="fa fa-skype" aria-hidden="true"></i><span class="pl10">{{perContact.skype}}</span>
                                </p>
                                <p>
                                    <i class="fa fa-facebook" aria-hidden="true"></i><span class="pl10">{{perContact.facebook}}</span>
                                </p>
                                <p>
                                    <i class="fa fa-google-plus" aria-hidden="true"></i><span class="pl10">{{perContact.google}}</span>
                                </p>
                                <p>
                                    <i class="fa fa-linkedin" aria-hidden="true"></i><span class="pl10">{{perContact.linkedin}}</span>
                                </p>
                                <p>
                                    <i class="fa fa-twitter" aria-hidden="true"></i><span class="pl10">{{perContact.twitter}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </ui-tab>
                <ui-tab header="Family Information" v-if="isEmployee">
                  <div class="vuetable-wrapper">
                    <vuetable :api-url="familyUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="familyColumns" per-page="10">
                    </vuetable>
                  </div>
                </ui-tab>
                <ui-tab header="Bank & Tax">
                  <ul class="interns-tabs-ul fix">
                      <li><span>Branch Name of Bank</span>{{ bankInfo.brakName }}</li>
                      <li><span>Bank Holder</span>{{ bankInfo.bankHolder }}</li>
                      <li><span>Bank Account Number</span>{{ bankInfo.bankNumber }}</li>
                      <li><span>Medical Insurance Number</span>{{ bankInfo.medicareNumber }}</li>
                      <li><span>Taxable Number</span>{{ bankInfo.taxableNumber }}</li>
                  </ul>
                </ui-tab>
            </ui-tabs>
        </div>
        <div class="interns-tabs-bd" v-show="tabIndex === 1">
          <ui-tabs type="text" v-if="isEmployee">
              <ui-tab header="Job Information">
                <ul class="interns-tabs-ul ul-intern-info fix">
                    <li><span>Employee ID</span>{{ employeeInfo.employeeCode }}</li>
                    <li><span>Local Employee ID</span>{{ employeeInfo.localEmployeeCode }}</li>
                    <li><span>Preferred Name</span>{{ employeeInfo.preferredName }}</li>
                    <li><span>Position</span>{{ employeeInfo.positionName }}</li>
                    <li><span>Business Card Title</span>{{ employeeInfo.businessCardTitle }}</li>
                    <li><span>Organization</span>{{ employeeInfo.unitShortName }}</li>
                    <li><span>Report Line</span>{{ employeeInfo.parentEmployeeName }}</li>
                    <li><span>Employement Category</span>{{ fixDist(employeeInfo.employementCategory, 'employementCategory') }}</li>
                    <li><span>MIB Grade</span>{{ employeeInfo.mibGrade }}</li>
                    <li><span>Local Job Grade</span>{{ employeeInfo.localJobGrade }}</li>
                    <li><span>Key Talent</span>{{ employeeInfo.isKeyTalent === '1' ? 'Yes' : 'No' }}</li>
                    <li><span>Office Address</span>{{ employeeInfo.officeAddress }}</li>
                    <li><span>Hire Date</span>{{ employeeInfo.hireDate | formatDate }}</li>
                    <li><span>Probation</span>{{ employeeInfo.isProbation === '1' ? 'Yes' : 'No' }}</li>
                    <li><span>Start Date Of Probation</span>{{ employeeInfo.probationBeginDate | formatDate }}</li>
                    <li><span>End Date Of Probation</span>{{ employeeInfo.probationEndDate | formatDate }}</li>
                    <li><span>Status Of Employee</span>{{ fixDist(employeeInfo.employeeStatus, 'employeeStatus') }}</li>
                </ul>
              </ui-tab>
              <ui-tab header="Part-Time Information">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="partTimeUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="partTimeColumns" per-page="10">
                  </vuetable>
                </div>

              </ui-tab>
              <ui-tab header="My Team">
              </ui-tab>
          </ui-tabs>
          <ul class="interns-tabs-ul ul-intern-info fix" v-if="!isEmployee">
              <li><span>{{ isInterns ? 'Intern ID' : 'Outsource ID'}}</span>{{ employeeInfo.employeeCode }}</li>
              <li v-if="!isInterns"><span>Local Employee ID</span>{{ employeeInfo.localEmployeeCode }}</li>
              <li><span>Position</span>{{ employeeInfo.positionName }}</li>
              <li><span>Organization</span>{{ employeeInfo.unitShortName }}</li>
              <li v-if="isInterns"><span>Mentor</span>{{ employeeInfo.mentor }}</li>
              <li><span>Start Date Of {{dateText}}</span>{{ employeeInfo.registerDate | formatDate }}</li>
              <li><span>End Date Of {{dateText}}</span>{{ employeeInfo.endDate | formatDate }}</li>
          </ul>
        </div>
        <div class="interns-tabs-bd" v-show="tabIndex === 2">
          <ui-tabs type="text" v-if="isEmployee">
              <ui-tab header="Training Course">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="courseUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="courseColumns" per-page="10">
                  </vuetable>
                </div>
              </ui-tab>
              <ui-tab header="Academic Background">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="academicUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="academicColumns" per-page="10">
                  </vuetable>
                </div>
              </ui-tab>
              <ui-tab header="Skills & Language">
                <skill :edit-able="false" :dist.sync="dist"></skill>
              </ui-tab>
          </ui-tabs>
          <div class="pt16 pb16 vuetable-wrapper" v-if="!isEmployee">
            <vuetable :api-url="academicUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="academicColumns" per-page="10">
            </vuetable>
          </div>
        </div>
        <div class="interns-tabs-bd" v-show="tabIndex === 3">
          <ui-tabs type="text" v-if="isEmployee">
              <ui-tab header="Professional Experience">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="proExpUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="proExpColumns" per-page="10">
                  </vuetable>
                </div>
              </ui-tab>
              <ui-tab header="Dispatch Experience">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="disExpUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="disExpColumns" per-page="10">
                  </vuetable>
                </div>
              </ui-tab>
              <ui-tab header="Promotion Records">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="proRecUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="proRecColumns" per-page="10">
                  </vuetable>
                </div>
              </ui-tab>
              <ui-tab header="Transfer Records">
                <div class="vuetable-wrapper">
                  <vuetable :api-url="traRecUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="traRecColumns" per-page="10">
                  </vuetable>
                </div>
              </ui-tab>
              <ui-tab header="Contract">
                <ul class="interns-tabs-ul fix">
                    <li><span>Contract Number</span>{{contract.contractNo}}</li>
                    <li><span>Contract Type</span>{{fixDist(contract.contractType, 'contractType')}}</li>
                    <li><span>Contract Length</span>{{fixDist(contract.contractLength, 'contractLength')}}</li>
                    <li><span>Contract Date</span>{{contract.startDate | formatDate}} {{contract.startDate ? '-' : ''}} {{contract.endDate | formatDate}}</li>
                    <!-- <li><span class="w200"><i class="fa fa-map-marker c-c4ccd4 pr5" aria-hidden="true"></i>Subject Of Contract</span><span class="text-bold">{{contract.contractSubject}}</span></li> -->
                    <li><span>Subject Of Contract</span>{{contract.contractSubject}}</li>
                    <li><span>Confidentiality Agreement</span><i v-if="contract.confidentiaAgreement" class="fa fa-cloud-download contract-file-download" aria-hidden="true" @click="downFile('confidentiaAgreement')"></i></li>
                    <li><span>Non Competition-Agreement</span><i v-if="contract.nonCompetitionAgreement" class="fa fa-cloud-download contract-file-download" aria-hidden="true" @click="downFile('nonCompetitionAgreement')"></i></li>
                </ul>
              </ui-tab>
          </ui-tabs>
          <div class="pt16 pb16 vuetable-wrapper" v-if="!isEmployee">
            <vuetable :api-url="proExpUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="proExpColumns" per-page="10">
            </vuetable>
          </div>
        </div>
        <div class="interns-tabs-bd" v-show="tabIndex === 4">
          <ul class="interns-tabs-ul fix">
              <li v-for="item in additionalList">
                <span>{{item.name}}</span>
                {{item.value}}
              </li>
          </ul>
        </div>
    </div>

</div>

</template>

<script>
import {
    getDictMapping,
    formatDate,
    downloadFile
} from '../../util/assist';

export default {
    data() {
            var _self = this;
            var isEmployee = true;
            var isInterns = false;
            var isOutsource = false;
            var internsTabsList = [{
                text: 'Basic Information',
                active: true
            }, {
                text: 'Position Information',
                active: false
            }, {
                text: 'Professional Information',
                active: false
            }, {
                text: 'Work Experience',
                active: false
            }, {
                text: 'Additional Information',
                active: false
            }];
            if (this.$route.name === 'internsView') {
              isEmployee = false;
              isInterns = true;
              internsTabsList[1].text = 'Interns Information';
              internsTabsList[2].text = 'Academic Background';
              internsTabsList[3].text = 'Professional Experience';
            } else if (this.$route.name === 'outsourceView') {
              isEmployee = false;
              isOutsource = true;
              internsTabsList[1].text = 'Outsource Information';
              internsTabsList[2].text = 'Academic Background';
              internsTabsList[3].text = 'Professional Experience';
            }
            var employeeId = this.$route.params.employeeId;
            return {
                isEmployee: isEmployee,
                isInterns: isInterns,
                isOutsource: isOutsource,
                employeeId: employeeId,
                employeeInfo: {
                  orgUnit: {}
                },
                edit: false,
                // 是否显示编辑按钮
                showEdit: true,
                tabIndex: 0,
                // 性别字典
                dist: {
                  idType: {},
                  religion: {},
                  gender: {},
                  learnType: {},
                  nation: {},
                  grade: {},
                  area: {},
                  maritalStatus: {},
                  englishLevel: {},
                  repatriateReason: {},
                  expatriationCategory: {},
                  changeReason: {},
                  contractType: {},
                  contractLength: {},
                  relationship: {},
                  trainingType: {},
                  employementCategory: {},
                  employeeStatus: {},
                  degree: {}
                },
                // 合同信息
                contract: {},
                // 联系方式
                perContact: {},
                bankInfo: {},
                eduUrl: '',
                proExpUrl: '',
                disExpUrl: '',
                proRecUrl: '',
                traRecUrl: '',
                familyUrl: '',
                courseUrl: '',
                academicUrl: '',
                partTimeUrl: '',
                internsTabsList: internsTabsList,
                additionalList: [],
                proExpColumns: [
                    {
                      name: 'positionName',
                      title: 'Position'
                    },
                    {
                      name: 'company',
                      title: 'Company'
                    },
                    {
                      name: 'startDate',
                      title: 'Start Date',
                      callback(value) {
                        return _self.format(value);
                      }
                    },
                    {
                      name: 'endDate',
                      title: 'End Date',
                      callback(value) {
                        return _self.format(value);
                      }
                    },
                    {
                      name: 'witness',
                      title: 'References'
                    },
                    {
                      name: 'witnessContact',
                      title: 'Contact Info of References'
                    }
                ],
                familyColumns: [
                  {
                    name: 'name',
                    title: 'Name'
                  },
                  {
                    name: 'relationship',
                    title: 'Relationship',
                    callback(value) {
                      return _self.fixRelationship(value);
                    }
                  },
                  {
                    name: 'isInternalRelatives',
                    title: 'Internal Relatives',
                    callback(value) {
                      return _self.isYes(value);
                    }
                  },
                  {
                    name: 'familyCompany',
                    title: 'Company'
                  },
                  {
                    name: 'primaryPhone',
                    title: 'Primary Phone'
                  }
                ],
                courseColumns: [
                  {
                    name: 'trainingName',
                    title: 'Trainig Name'
                  },
                  {
                    name: 'courses',
                    title: 'Course'
                  },
                  {
                    name: 'startDate',
                    title: 'Start Date',
                    callback(value) {
                      return _self.format(value);
                    }
                  },
                  {
                    name: 'endDate',
                    title: 'End Date',
                    callback(value) {
                      return _self.format(value);
                    }
                  },
                  {
                    name: 'certificate',
                    title: 'Certificate'
                  },
                  {
                    name: 'trainingType',
                    title: 'Type of Training',
                    callback(value) {
                      return _self.fixTrainingType(value);
                    }
                  }
                ],
                academicColumns: [
                    {
                      name: 'institution',
                      title: 'Alma Mater'
                    },
                    {
                      name: 'major',
                      title: 'Major'
                    },
                    {
                      name: 'admissionDate',
                      title: 'Admission Date',
                      callback(value) {
                        return _self.format(value);
                      }
                    },
                    {
                      name: 'graduationDate',
                      title: 'Graduation Date',
                      callback(value) {
                        return _self.format(value);
                      }
                    },
                    {
                      name: 'educationLevel',
                      title: 'Academic Degree',
                      callback(value) {
                        return _self.fixDegree(value);
                      }
                    },
                    {
                      name: 'certificateNumber',
                      title: 'Certificate Number'
                    },
                    {
                      name: 'learnType',
                      title: 'Study Mode',
                      callback: function(value) {
                          return _self.fixLearnType(value);
                      }
                    },
                    {
                      name: 'isTopGrade',
                      title: 'Highest-Level Certificate',
                      callback: function(value) {
                          return _self.isYes(value);
                      }
                    },
                    {
                      name: 'grade',
                      title: 'Graduation Grade',
                      callback: function(value) {
                          return _self.fixgrade(value);
                      }
                    }
                ],
                disExpColumns: [
                  {
                    name: 'disptachUnitName',
                    title: 'Host Company'
                  },
                  {
                    name: 'dispatchAddress',
                    title: 'Host Address'
                  },
                  {
                    name: 'dispatchPositionName',
                    title: 'Local Position'
                  },
                  {
                    name: 'expatriationCategory',
                    title: 'Expatriation',
                    callback: function(value) {
                        return _self.fixExpatriationCategory(value);
                    }
                  },
                  {
                    name: 'localSupervisor',
                    title: 'Local Supervisor'
                  },
                  {
                    name: 'roles',
                    title: 'Roles & Responsibilities'
                  },
                  {
                    name: 'startDate',
                    title: 'Start Date'
                  },
                  {
                    name: 'endDate',
                    title: 'End Date'
                  },
                  {
                    name: 'repatriateReason',
                    title: 'Reason for Repatriation',
                    callback: function(value) {
                        return _self.fixRepatriateReason(value);
                    }
                  },
                  {
                    name: 'visa',
                    title: 'Visa Attachment'
                  },
                  {
                    name: 'isFirstDispatch',
                    title: 'First expatriation assignment',
                    callback: function(value) {
                        return _self.isYes(value);
                    }
                  }
                ],
                proRecColumns: [
                  {
                    name: 'effectiveDate',
                    title: 'Effective Date'
                  },
                  {
                    name: 'transferUnitName',
                    title: 'Organization after Promotion'
                  },
                  {
                    name: 'transferPositionName',
                    title: 'Position after Promotion'
                  },
                  {
                    name: 'jobGrade',
                    title: 'Job Grade after Promotion'
                  },
                  {
                    name: 'localGrade',
                    title: 'Local Grade after Promotion'
                  },
                  {
                    name: 'workCity',
                    title: 'Work City of Promotion'
                  }
                ],
                traRecColumns: [
                  {
                    name: 'reason',
                    title: 'Reason for Transfer',
                    callback: function(value) {
                        return _self.fixChangeReason(value);
                    }
                  },
                  {
                    name: 'effectiveDate',
                    title: 'Effective Date'
                  },
                  {
                    name: 'transferUnitName',
                    title: 'Organization after Transfer'
                  },
                  {
                    name: 'transferPositionName',
                    title: 'Position after Transfer'
                  },
                  {
                    name: 'jobGrade',
                    title: 'Job Grade after Transfer'
                  },
                  {
                    name: 'workCity',
                    title: 'Work City of Promotion'
                  }
                ],
                partTimeColumns: [
                  {
                    name: 'unitName',
                    title: 'Current Department'
                  },
                  {
                    name: 'positionName',
                    title: 'Part-Time Role'
                  },
                  {
                    name: 'beginDate',
                    title: 'Start Date',
                    callback(value) {
                      return _self.format(value);
                    }
                  },
                  {
                    name: 'endDate',
                    title: 'End Date',
                    callback(value) {
                      return _self.format(value);
                    }
                  }
                ]
            };
        },
        computed: {
          // 根据员工类型的文本
          dateText() {
            if (this.isEmployee) {
              return 'Probation';
            } else if (this.isInterns) {
              return 'Internship';
            } else if (this.isOutsource) {
              return 'Outsourcing';
            }
          }
        },
        created() {
          var self = this;
          this.$http.get('/org/area/0/child').then((response) => {
              if (response.data) {
                  let result = {},
                      datas = response.data;
                  for (var i = 0, l = datas.length; i < l; i++) {
                      result[datas[i].areaName] = datas[i].areaId;
                  }
                  self.dist.area = result;
              }
          });
          this.$http.get('/org/nationalitys').then((response) => {
              if (response.data) {
                  let result = {},
                      datas = response.data;
                  for (var i = 0, l = datas.length; i < l; i++) {
                      result[datas[i].nationalityName] = datas[i].nationalityId;
                  }
                  self.dist.nation = result;
              }
          });

          getDictMapping('EMPLOYEE_STATUS').then(function(res){
            self.dist.employeeStatus = res;
          });
          getDictMapping('EMPLOYEE_CATEGORY').then(function(res){
            self.dist.employementCategory = res;
          });
          getDictMapping('RELATIONSHIP').then(function(res){
            self.dist.relationship = res;
          });
          getDictMapping('TRAINING_TYPE').then(function(res){
            self.dist.trainingType = res;
          });
          getDictMapping('ID_TYPE').then(function(res){
            self.dist.idType = res;
          });
          getDictMapping('RELIGION').then(function(res){
            self.dist.religion = res;
          });
          getDictMapping('GENDER').then(function(res){
            self.dist.gender = res;
          });
          getDictMapping('LEARN_TYPE').then(function(res){
            self.dist.learnType = res;
          });
          getDictMapping('LEARN_GRADE').then(function(res){
            self.dist.grade = res;
          });
          getDictMapping('MARITAL_STATUS').then(function(res){
            self.dist.maritalStatus = res;
          });
          getDictMapping('ENGLISH_LEVEL').then(function(res){
            self.dist.englishLevel = res;
          });
          getDictMapping('EXPATRIATION_CATEGORY').then(function(res){
            self.dist.expatriationCategory = res;
          });
          getDictMapping('REPATRIATION_REASON').then(function(res){
            self.dist.repatriateReason = res;
          });
          getDictMapping('CHANGE_REASON').then(function(res){
            self.dist.changeReason = res;
          });
          getDictMapping('CONTRACT_TYPE').then(function(res){
            self.dist.contractType = res;
          });
          getDictMapping('CONTRACT_LENGTH').then(function(res){
            self.dist.contractLength = res;
          });
          getDictMapping('DEGREE').then(function(res) {
            self.dist.degree = res;
          })
          // 员工自助查看时
          if (this.$route.name === 'myProfile') {
            this.$http.get('/employee/employees/getEmployeeId').then((response) => {
              this.employeeId = response.data.employeeId;
              var employementCategory = response.data.employementCategory;
              this.$refs.commoninfo.getData(this.employeeId);
              this.setEmployementCategory(employementCategory);
            })
          } else {
            this.setTableUrl();
            this.getData();
          }
        },
        ready() {
          if (this.$route.name === 'resignedEmployeesView') {
            this.showEdit = false;
          }
        },
        attached() {},
        methods: {
          setEmployementCategory(employementCategory) {
            var internsTabsList = this.internsTabsList;
            if (employementCategory === '7') {
              this.isEmployee = false;
              this.isOutsource = false;
              this.isInterns = true;
              internsTabsList[1].text = 'Interns Information';
              internsTabsList[2].text = 'Academic Background';
              internsTabsList[3].text = 'Professional Experience';
            } else if (employementCategory === '6') {
              this.isEmployee = false;
              this.isInterns = false;
              this.isOutsource = true;
              internsTabsList[1].text = 'Outsource Information';
              internsTabsList[2].text = 'Academic Background';
              internsTabsList[3].text = 'Professional Experience';
            }
            this.setTableUrl();
            this.getData();
          },
          setTableUrl() {
            var employeeId = this.employeeId;
            this.eduUrl = '/employee/employees/'+ employeeId + '/Education';
            this.proExpUrl = '/employee/employees/'+ employeeId + '/WorkExperience';
            this.disExpUrl = '/employee/employees/'+ employeeId + '/expatriation';
            this.proRecUrl = '/employee/employees/'+ employeeId + '/transfer/1';
            this.traRecUrl = '/employee/employees/'+ employeeId + '/transfer/2';
            this.familyUrl = '/employee/employees/'+ employeeId + '/FamilyMember';
            this.courseUrl = '/employee/employees/'+ employeeId + '/Training';
            this.academicUrl = '/employee/employees/'+ employeeId + '/Education';
            this.partTimeUrl = '/employee/employees/' + employeeId +'/partTime';
          },
          getData() {
            if (this.isEmployee) {
              this.$http.get('/employee/employees/'+ this.employeeId + '/Contract').then(function(res){
                this.contract = res.data;
              })
            }
            this.$http.get('/employee/employeeBankTax/bankTax/' + this.employeeId).then(function(res) {
              this.bankInfo = res.data;
            });
            this.$http.get('/employee/employees/' + this.employeeId + '/Contacts').then(function(res) {
              this.perContact = res.data;
              if (res.data.homeCountry) {
                this.$http.get(`/org/area/${res.data.homeCountry}/child`).then((response) => {
                    if (response.data) {
                        let datas = response.data;
                        for (var i = 0, l = datas.length; i < l; i++) {
                          if (datas[i].areaId === this.perContact.homeState) {
                            this.perContact.homeState = datas[i].areaName;
                            break;
                          }
                        }
                    }
                });
              }
              if (res.data.workCountry) {
                this.$http.get(`/org/area/${res.data.workCountry}/child`).then((response) => {
                    if (response.data) {
                        let datas = response.data;
                        for (var i = 0, l = datas.length; i < l; i++) {
                          if (datas[i].areaId === this.perContact.workState) {
                            this.perContact.workState = datas[i].areaName;
                            break;
                          }
                        }
                    }
                });
              }
            });
          },
            downFile(file) {
              var attachmentId = '';
              if (!file) {
                return;
              } else if (file === 'confidentiaAgreement') {
                attachmentId = this.contract.confidentiaAgreement;
              } else if (file === 'nonCompetitionAgreement') {
                attachmentId = this.contract.nonCompetitionAgreement;
              }
              downloadFile('/system/attachment/downloadFile', {attachmentId: attachmentId});
            },
            changeTabs(index) {
                this.internsTabsList.forEach(function(val) {
                    val.active = false;
                });
                this.tabIndex = index;
                this.internsTabsList[index].active = true;
                switch (index) {
                  case 4:
                    this.$http.get('/employee/employees/empAreaTemplates/' + this.employeeId).then(function(res) {
                      var data = res.data;
                      this.$http.post('/area/template/getAreaTemplateById?areaTemplateId=' + data.areaTemplateId).then(function(response) {
                        var detailsData = response.data.areaTemplateDetails;
                        var additionalList = this.additionalList;
                        additionalList.splice(0, additionalList.length);
                        if (detailsData) {
                          detailsData.forEach(function(item) {
                            var obj = {};
                            obj.name = item.fieldBusinessName;
                            var value = data[item.fieldName];
                            if (item.dataDictionary && item.fieldType === '1') {
                              getDictMapping(item.dataDictionary).then(function(dist) {
                                for (let key of Object.keys(dist)) {
                                  if (dist[key] === data[item.fieldName]) {
                                    value = key;
                                    break;
                                  }
                                }
                                obj.value = value;
                                additionalList.push(obj);
                              })
                            } else {
                              obj.value = value;
                              additionalList.push(obj);
                            }
                          })
                        }
                      })
                    });
                    break;
                  default:

                }
            },

            // 匹配字典
            fixDist(value, option) {
              var result = '';
              var dist = {};
              switch(option) {
                case 'idType': dist = this.dist.idType; break;
                case 'religion': dist = this.dist.religion; break;
                case 'gender': dist = this.dist.gender; break;
                case 'learnType': dist = this.dist.learnType; break;
                case 'grade': dist = this.dist.grade; break;
                case 'area': dist = this.dist.area; break;
                case 'maritalStatus': dist = this.dist.maritalStatus; break;
                case 'englishLevel': dist = this.dist.englishLevel; break;
                case 'nation': dist = this.dist.nation; break;
                case 'repatriateReason': dist = this.dist.repatriateReason; break;
                case 'expatriationCategory': dist = this.dist.expatriationCategory; break;
                case 'changeReason': dist = this.dist.changeReason; break;
                case 'contractType': dist = this.dist.contractType; break;
                case 'relationship': dist = this.dist.relationship; break;
                case 'trainingType': dist = this.dist.trainingType; break;
                case 'employementCategory': dist = this.dist.employementCategory; break;
                case 'employeeStatus': dist = this.dist.employeeStatus; break;
                case 'contractLength': dist = this.dist.contractLength; break;
                case 'degree': dist = this.dist.degree; break;
              }
              for (let key of Object.keys(dist)) {
                if (dist[key] === value) {
                  result = key;
                  break;
                }
              }
              return result;
            },
            getIdDate(list, type) {
              if (!list) {
                return;
              }
              var result = '';
              for(var i = 0, len = list.length; i < len; i++) {
                if (list[i].mainDocuments === '1') {
                  if (type === 'IssueDate') {
                    result = list[i].idIssueDate;
                    break;
                  } else if (type === 'ExpiryDate') {
                    result = list[i].idExpiredDate;
                    break;
                  }
                }
              }
              return result;
            },
            // 格式化时间
            format(value) {
              if (!value) {
                return;
              }
              return formatDate(new Date(value));
            },
            fixDegree(value) {
              return this.fixDist(value, 'degree');
            },
            fixTrainingType(value) {
              return this.fixDist(value, 'trainingType');
            },
            fixRelationship(value) {
              return this.fixDist(value, 'relationship');
            },
            fixLearnType(value) {
              return this.fixDist(value, 'learnType');
            },
            fixgrade(value) {
              return this.fixDist(value, 'grade');
            },
            fixRepatriateReason(value) {
              return this.fixDist(value, 'repatriateReason');
            },
            fixExpatriationCategory(value) {
              return this.fixDist(value, 'expatriationCategory');
            },
            fixChangeReason(value) {
              return this.fixDist(value, 'changeReason');
            },
            isYes(value) {
              return value === '1' ? 'Yes' : 'No';
            },
            editInfo() {
              var name = '';
              if (this.isInterns) {
                name='internsEdit';
              } else if (this.isOutsource) {
                name='outsourceEdit';
              } else {
                name='employeeEdit'
              }
              this.$route.router.go({name: name, params: {employeeId: this.employeeId}})
            }
        },
        components: {
          EmployeeCommonInfo: require('./employeeCommonInfo.vue'),
          Skill: require('./updateInfoPart/skill.vue')
        }
};

</script>
