<style lang="less">

.ihr-position-userPermissionsView {
    * {
        box-sizing: border-box;
    }
    .right-panel-tit span {
        font-size: 20px;
        font-weight: bold;
        color: #2a3c59;
    }
    .right-panel-info {
        background: #fafafa;
        padding: 0 20px;
    }
    .right-panel-info li {
        float: left;
        width: 50%;
    }
    .right-panel-label {
        font-size: 14px;
        color: #a5acbe;
        display: table-cell;
        padding: 20px 0;
        width: 150px;
    }
    .right-panel-txt {
        font-size: 14px;
        display: table-cell;
        color: #6a707d;
    }
    .ul-table {
        padding: 0 20px;
    }
    .ul-table li {
        padding: 12px 0;
    }
    .ul-table-label {
        font-size: 14px;
        color: #a5acbe;
        width: 320px;
        display: table-cell;
    }
    .ul-table-txt {
        font-size: 14px;
        color: #6a707d;
        display: table-cell;
        line-height: 22px;
    }
    .bg-f5f5f5 {
        background: #f5f5f5;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-position-userPermissionsView">
    <div class="leftRight-panel bg-f5f5f5 mt20 fix">
        <div class="bg-w p20">
            <div class="right-panel-tit pt15">
                <span>Accounting</span>
            </div>
            <ul class="right-panel-info fix mt20 mb20">
                <li>
                    <span class="right-panel-label">View As Of</span>
                    <span class="right-panel-txt">basicinfo.createDate</span>
                </li>
                <li>
                    <span class="right-panel-label">Group ID</span>
                    <span class="right-panel-txt">basicinfo.jobfamilyCode</span>
                </li>
                <li>
                    <span class="right-panel-label">Type</span>
                    <span class="right-panel-txt">basicinfo.jobfamilyName</span>
                </li>
                <li>
                    <span class="right-panel-label">Superior Group</span>
                    <span class="right-panel-txt">basicinfo.jobfamilyName</span>
                </li>
            </ul>
            <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary">
                <ui-tab header="Position Details">
                    <ul class="ul-table">
                        <li>
                            <span class="ul-table-label">Business Module</span>
                            <span class="ul-table-txt">HR</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Job Title</span>
                            <span class="ul-table-txt">Manager</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Position Name</span>
                            <span class="ul-table-txt">HR-Manager</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Restrict to Organization</span>
                            <span class="ul-table-txt">Midea Group > HR</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Position ID</span>
                            <span class="ul-table-txt">H9012</span>
                        </li>
                        <li>
                            <span class="ul-table-label">MIB Grade</span>
                            <span class="ul-table-txt">M4A  -  M4D</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Position Category</span>
                            <span class="ul-table-txt">Team Leader</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Business Card Title</span>
                            <span class="ul-table-txt">Vice President</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Superior Position</span>
                            <span class="ul-table-txt">President</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Dotted  Report Line</span>
                            <span class="ul-table-txt"></span>
                        </li>
                        <li>
                            <span class="ul-table-label">Effective Date</span>
                            <span class="ul-table-txt">08/09/2016</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Business Understanding</span>
                            <span class="ul-table-txt">Business Strategy\Financial Acumen\Quality Focus\Regulations and Legislation</span>
                        </li>
                        <li>
                            <span class="ul-table-label">General Requirements</span>
                            <span class="ul-table-txt">Negotiation & Conflict Resolution\Communication\Financial Analysis\Attention to Detail</span>
                        </li>
                        <li>
                            <span class="ul-table-label">Expertise Requirements</span>
                            <span class="ul-table-txt">
                              Finance Essentials\Finance Management\Accounting\Financial Planning\Financial Control\Credit Management\Collections\Banking Practices\Cost Management\Accounts Payable\Tax Management
Financial Mathematics
                            </span>
                        </li>
                        <li>
                            <span class="ul-table-label">Academic Requirements</span>
                            <span class="ul-table-txt">
                              Master's Degree
                            </span>
                        </li>
                        <li>
                            <span class="ul-table-label">Working Experience Requirements</span>
                            <span class="ul-table-txt">
                              5 Years
                            </span>
                        </li>
                    </ul>
                </ui-tab>
                <ui-tab header="Members">
                    <vuetable :api-url="membersUrl" :selected-to="membersRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="membersColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                    </vuetable>
                </ui-tab>
                <ui-tab header="Subordinate Positions">
                    <vuetable :api-url="subordinateUrl" :selected-to="subordinateRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="subordinateColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                    </vuetable>
                </ui-tab>
            </ui-tabs>
        </div>
    </div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import Datashaping from '../../util/assist.js';
export default {
    data() {
        let _self = this;
        return { //初始化
            membersUrl: "", //titles表格地址
            subordinateUrl: "", //positions表格地址
            //titles表格字段
            membersColumns: [{
                name: '',
                title: 'Employee Name',
                sortField: ''
            }, {
                name: '',
                title: 'Employee ID',
                sortField: ''
            }, {
                name: '',
                title: 'Position Name',
                sortField: ''
            }, {
                name: 'standardJobName',
                title: 'MIB Grade',
                sortField: 'standardJobName'
            }, {
                name: '',
                title: 'Email',
                sortField: ''
            }, {
                name: '',
                title: 'Location',
                sortField: ''
            }],
            //positions表格字段
            subordinateColumns: [{
                name: '',
                title: 'Position Name',
                sortField: ''
            }, {
                name: '',
                title: 'Position ID',
                sortField: ''
            }, {
                name: '',
                title: 'Job Category',
                sortField: ''
            }, {
                name: '',
                title: 'MID Grade',
                sortField: ''
            }, {
                name: '',
                title: 'Effective Date',
                sortField: ''
            }],
        }
    }
};

</script>
