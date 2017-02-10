<style lang="less">

.ihr-system-processConfig {}

</style>

<template lang="html">

<div class="content-wrap ihr-system-processConfig">
    <div class="group mb20">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click=""></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click=""></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click=""></ui-button>
        <ui-button class="dis-tc-t btn-default-bd" type="flat" show-menu-icons has-dropdown-menu :menu-options="shareMenuOptions" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" text="More"></ui-button>
    </div>
    <div class="bg-w mt20 p20 bd-e8e8e8">
        <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
let dropdownOptions = [{
    id: 'copy',
    text: 'copy',
    icon: 'edit',
}, {
    id: 'activate',
    text: 'Activate',
    icon: 'activate',
}];
export default {
    data() {
            return {
                tableUrl: '',
                selectedRow: [],
                tableColumns: [{
                    name: '__checkbox:templateId',
                    title: ''
                }, {
                    name: 'templateName',
                    title: 'Template Name',
                    sortField: 'templateName',
                }, {
                    name: 'planApproveStages',
                    title: 'Plan Approve Stages',
                    sortField: 'planApproveStages',
                }, {
                    name: 'evaluationApproveStages',
                    title: 'Evaluation Approve Stages',
                    sortField: 'evaluationApproveStages',
                }, {
                    name: 'resultConfirmation',
                    title: 'Result Confirmation',
                    sortField: 'resultConfirmation',
                }, {
                    name: 'status',
                    title: 'Status',
                    sortField: 'status',
                }],
                shareMenuOptions: dropdownOptions,
            };
        },
        computed: {},
        ready() {},
        attached() {},
        methods: {},
        components: {}
};

</script>
