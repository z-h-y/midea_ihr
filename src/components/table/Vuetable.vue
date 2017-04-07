<style lang="less">

.mw80 {
  min-width: 80px;
}
.disabled.vuetable-wrapper {
    opacity: .45;
    color: rgba(40, 40, 40, .3)
}

.loading.vuetable-wrapper {
    position: relative;
    cursor: default;
    point-events: none;
    text-shadow: none!important;
    color: transparent!important;
    -webkit-transition: all 0s linear;
    transition: all 0s linear
}

.loading.vuetable-wrapper:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, .8);
    width: 100%;
    height: 100%;
    border-radius: .28571429rem;
}

.loading.vuetable-wrapper:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: -1.5em 0 0 -1.5em;
    width: 3em;
    height: 3em;
    -webkit-animation: segment-spin .6s linear;
    animation: segment-spin .6s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: #767676 rgba(0, 0, 0, .1) rgba(0, 0, 0, .1);
    border-style: solid;
    border-width: .2em;
    box-shadow: 0 0 0 1px transparent;
    visibility: visible;
    z-index: 101
}

@-webkit-keyframes segment-spin {
    from {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}

@keyframes segment-spin {
    from {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}

.vuetable {
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    thead {
        background: rgba(0, 0, 0, .05);
    }
    th {
        padding: 12px 10px;
        color: #545454;
        font-weight: normal;
        text-align: left;
        border: 1px solid #e4e4e4;
        white-space: nowrap;
    }
    .table-checkbox {
        width: 16px;
    }
    .table-raido {
        width: 16px;
    }
    tbody {
        tr {
            transition: 0.2s;
            &:hover {
                background: #f9f9f9;
            }
        }
        td {
            padding: 10px 10px;
            color: #545454;
            border: 1px solid #e4e4e4;
        }
    }
    .ui-checkbox {
        margin: 0;
    }
}

.vuetable th.sortable:hover {
    color: #2185d0;
    cursor: pointer;
}

.vuetable-actions {
    width: 15%;
    padding: 12px 0;
    text-align: left;
}

.vuetable-pagination {
    background: #fff;
    text-align: center;
    float: right;
}

.vuetable-pagination-pages {
    float: left;
    margin-left: 10px;
}

.vuetable-pagination-pages-num {
    border: 1px solid #ddd;
    height: 32px;
    border-radius: 2px;
}

.vuetable-pagination-info {
    padding: 8px 0;
    float: left;
    color: #545454;
    margin-top: auto;
    margin-bottom: auto;
}

.vuetable-pagination-component {
    float: left;
    margin-left: 10px;
}

.pagination {
    border: 1px solid #dddddd;
    border-radius: 2px;
}

.pagination .item {
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border-right: 1px solid #dddddd;
    transition: 0.2s;
    &:last-child {
        border-right: none;
    }
    &:hover {
        background: rgba(0, 0, 0, .05);
    }
}

.pagination .item.active {
    background: #3aa2eb;
    color: #fff;
}

.ui-checkbox {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 0 12px;
    cursor: default;
    position: relative;
}

.ui-checkbox:not(.disabled):not(.checked).active .ui-checkbox-checkmark:before,
.ui-checkbox:not(.disabled):not(.checked):hover .ui-checkbox-checkmark:before {
    border-color: rgba(0, 0, 0, 0.54);
}

.ui-checkbox:not(.disabled).checked.active .ui-checkbox-checkmark:before,
.ui-checkbox:not(.disabled).checked:hover .ui-checkbox-checkmark:before {
    background-color: #0c81df;
    border-color: #0c81df;
}

.ui-checkbox.checked .ui-checkbox-checkmark:before {
    background: #2196f3;
    // background:red;
    border-color: #2196f3;

}

.ui-checkbox.checked .ui-checkbox-focus-ring {
    background-color: rgba(33, 150, 243, 0.12);
}
.ui-checkbox .ui-checkbox-focus-ring:after {
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    opacity: 1;
}
.ui-checkbox.label-left .ui-checkbox-label-text {
    margin-left: 0;
    margin-right: auto;
    -webkit-box-ordinal-group: 0;
    -ms-flex-order: -1;
    order: -1;
}

.ui-checkbox.disabled .ui-checkbox-label-text {
    color: rgba(0, 0, 0, 0.38);
}

.ui-checkbox.disabled .ui-checkbox-checkmark:before {
    border-color: rgba(0, 0, 0, 0.26);
}

.ui-checkbox.disabled.checked .ui-checkbox-checkmark:before {
    border: none;
    background: rgba(0, 0, 0, 0.26);
}

.ui-checkbox:not(.disabled) .ui-checkbox-label-text {
    cursor: pointer;
}

.ui-checkbox-label-text {
    margin-left: 8px;
    font-size: 15px;
}

.vuetable .ui-checkbox-checkmark {
    position: relative;
    height: 16px;
    width: 16px;
    background: #fff;
}

.ui-checkbox-checkmark:before {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    content: "";
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.38);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.vuetable .ui-checkbox-checkmark:after {
    box-sizing: border-box;
    position: absolute;
    left: 5px;
    bottom: 5px;
    display: block;
    content: "";
    width: 6px;
    height: 10px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -ms-transform:rotate(45deg);
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
    box-sizing: border-box;
}

.ui-checkbox-input {
    position: absolute;
    opacity: 0;
}

body[modality="keyboard"] .ui-checkbox-input:focus+ .ui-checkbox-checkmark .ui-checkbox-focus-ring {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

.vuetable .ui-checkbox-focus-ring {
    position: absolute;
    width: 48px;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: -14px;
    margin-top: -14px;
    border-radius: 50%;
    -webkit-transition-property: opacity, -webkit-transform;
    transition-property: opacity, -webkit-transform;
    transition-property: opacity, transform;
    transition-property: opacity, transform, -webkit-transform;
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    -webkit-transition-timing-function: ease;
    transition-timing-function: ease;
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
}

.vuetable-radio {
    width: 16px;
}

.vuetable-radio .radio-input-wrapper {
    .radio-input,
    .radio-border,
    .radio-inner-dot {
        top: 0;
    }
}

.table-th-radio {
    width: 36px;
}

.vuetable-area.oxc {
    overflow-x: auto;
    margin-bottom: 16px;
    min-height: 0%\9\0;/* IE9 fix */
}

.vuetable-area.scrollbar {
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: #e8e8e8;
        border-radius: 5px;
    }
}

</style>

<template>

<div :class="['fix', wrapperClass]">
    <div class="vuetable-area oxc scrollbar pb16">
        <table :class="['vuetable', tableClass]">
            <thead>
                <tr>
                    <template v-for="field in fields">
                        <template v-if="field.visible">
                            <template v-if="isSpecialField(field.name)">
                                <th v-if="extractName(field.name) == '__checkbox'" :class="['table-checkbox', field.titleClass || '']">
                                    <label class="ui-checkbox" :class="{'ui-checkbox': true, 'checked': checkAll}">
                                        <input class="ui-checkbox-input" type="checkbox" :checked="checkAll" @change="toggleAllCheckboxes($event.target.checked, field.name)">

                                        <div class="ui-checkbox-checkmark">
                                            <div class="ui-checkbox-focus-ring"></div>
                                        </div>
                                    </label>
                                </th>
                                <th v-else :id="field.name" :class="['table-th-radio', field.titleClass || '']">
                                    {{field.title || ''}}
                                </th>
                            </template>
                            <template v-else>
                                <th @click="orderBy(field, $event)" :id="'_'+field.name" :class="[field.titleClass || '', isSortable(field) ? 'sortable' : '']">
                                    {{getTitle(field)}}&nbsp;
                                    <i v-if="isCurrentSortField(field)" :class="sortIcon(field)" v-bind:style="{opacity: sortIconOpacity(field)}"></i>
                                </th>
                            </template>
                        </template>
                    </template>
                </tr>
            </thead>
            <tbody v-cloak>
                <template v-for="(item, itemNumber) in tableData">
                    <tr @click="onRowClicked(item, $event)" :render="onRowChanged(item)" :class="onRowClass(item, itemNumber)">
                        <template v-for="field in fields">
                            <template v-if="field.visible">
                                <template v-if="isSpecialField(field.name)">
                                    <td v-if="extractName(field.name) == '__sequence'" :class="['vuetable-sequence', field.dataClass]" v-html="tablePagination.from + itemNumber">
                                    </td>
                                    <td v-if="extractName(field.name) == '__checkbox'" :class="['vuetable-checkboxes', field.dataClass]">
                                        <label class="ui-checkbox" :class="{'ui-checkbox': true, 'checked': isSelectedRow(item, field.name, itemNumber)}">
                                            <input class="ui-checkbox-input" type="checkbox" @change="toggleCheckbox($event.target.checked, item, field.name, itemNumber)" :checked="isSelectedRow(item, field.name, itemNumber)">

                                            <div class="ui-checkbox-checkmark">
                                                <div class="ui-checkbox-focus-ring"></div>
                                            </div>
                                        </label>
                                    </td>
                                    <td v-if="extractName(field.name) == '__radio'" :class="['vuetable-radio', field.dataClass]">
                                        <div class="radio-input-wrapper">
                                            <input class="radio-input" type="radio" :checked="isSelectedRow(item, field.name, itemNumber)" @change="selectRadio(item, field.name, itemNumber)" :name="$radioName">
                                            <span class="radio-border"></span>
                                            <span class="radio-inner-dot"></span>
                                        </div>
                                    </td>
                                    <td v-if="field.name == '__actions'" :class="['vuetable-actions', field.dataClass]">
                                        <template v-for="action in itemActions">
                                            <button :class="action.class" @click="callAction(action.name, item)" v-attr="action.extra">
                                                <i :class="action.icon"></i> {{ action.label }}
                                            </button>
                                        </template>
                                    </td>
                                    <td v-if="extractName(field.name) == '__component'" :class="field.dataClass">
                                        <component :is="extractArgs(field.name)" :row-data="item"></component>
                                    </td>
                                </template>
                                <template v-else>
                                    <td v-if="hasCallback(field)" :class="field.dataClass" @click="onCellClicked(item, field, $event)" @dblclick="onCellDoubleClicked(item, field, $event)">
                                        <div v-html="callCallback(field, item)"></div>
                                    </td>
                                    <td v-else :class="field.dataClass" @click="onCellClicked(item, field, $event)" @dblclick="onCellDoubleClicked(item, field, $event)">
                                        <div v-html="getObjectValue(item, field.name, '')"></div>
                                    </td>
                                </template>
                            </template>
                        </template>
                    </tr>
                    <template v-if="useDetailRow">
                        <tr v-if="isVisibleDetailRow(item[detailRowId])" v-html="callDetailRowCallback(item)" @click="onDetailRowClick(item, $event)" :transition="detailRowTransition" :class="detailRowClass">
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
    <div v-if="showPagination" :class="['vuetable-pagination', 'fix', 'mb16', paginationClass]">
        <div :class="['vuetable-pagination-info', paginationInfoClass]" v-html="paginationInfo">
        </div>
        <div class="vuetable-pagination-pages">
            <!-- <span>pages</span> -->
            <select class="vuetable-pagination-pages-num" @change="reloadData()" v-model="curPerPage">
                <option v-for="num in tableLineNum" v-bind:value="num">{{num}}</option>
            </select>

        </div>
        <div v-show="tablePagination && tablePagination.last_page > 1" :class="['vuetable-pagination-component', paginationComponentClass]">
            <component ref="pagination" :is="paginationComponent"></component>
        </div>
    </div>
</div>

</template>

<script>

var idSeed = 1;
const prefix = 'vuetable-radio-group-';
export default {
    props: {

        loadSuccessCallback: {
            type: Function,
            default: function() {
                return function() {};
            }
        },

        wrapperClass: {
            type: String,
            default: function() {
                return null
            }
        },
        tableWrapper: {
            type: String,
            default: function() {
                return '.vuetable-wrapper'
            }
        },
        tableClass: {
            type: String,
            default: function() {
                return 'ui blue striped selectable celled stackable attached table'
            }
        },
        loadingClass: {
            type: String,
            default: function() {
                return 'loading'
            }
        },
        dataPath: {
            type: String,
            default: function() {
                return 'data'
            }
        },
        paginationPath: {
            type: String,
            default: function() {
                return 'links.pagination'
            }
        },
        fields: {
            type: Array,
            required: true
        },
        apiUrl: {
            type: String,
            required: true
        },
        sortOrder: {
            type: Array,
            default: function() {
                return [];
            }
        },
        multiSort: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        /*
         * physical key that will trigger multi-sort option
         * possible values: 'alt', 'ctrl', 'meta', 'shift'
         * 'ctrl' might not work as expected on Mac
         */
        multiSortKey: {
            type: String,
            default: 'alt'
        },
        perPage: {
            coerce: function(val) {
                return parseInt(val)
            },
            default: function() {
                return 10
            }
        },
        ascendingIcon: {
            type: String,
            default: function() {
                return 'blue chevron up icon'
            }
        },
        descendingIcon: {
            type: String,
            default: function() {
                return 'blue chevron down icon'
            }
        },
        appendParams: {
            type: Array,
            default: function() {
                return []
            }
        },
        showPagination: {
            type: Boolean,
            default: function() {
                return true
            }
        },
        paginationComponent: {
            type: String,
            default: function() {
                return 'vuetable-pagination'
            }
        },
        paginationInfoTemplate: {
            type: String,
            default: function() {
                return this.$t('vuetable.paginationInfoTemplate', { from: '{from}',  to: '{to}', total: '{total}'});
            }
        },
        paginationInfoNoDataTemplate: {
            type: String,
            default: function() {
                return this.$t('vuetable.paginationInfoNoDataTemplate');
            }
        },
        paginationClass: {
            type: String,
            default: function() {
                return 'ui bottom attached segment grid'
            }
        },
        paginationInfoClass: {
            type: String,
            default: function() {
                return 'left floated left aligned six wide column'
            }
        },
        paginationComponentClass: {
            type: String,
            default: function() {
                return 'right floated right aligned six wide column'
            }
        },
        paginationConfig: {
            type: String,
            default: function() {
                return 'paginationConfig'
            }
        },
        paginationConfigCallback: {
            type: String,
            default: function() {
                return 'paginationConfig'
            }
        },
        itemActions: {
            type: Array,
            default: function() {
                return []
            }
        },
        queryParams: {
            type: Object,
            default: function() {
                return {
                    sort: 'sort',
                    page: 'pageIndex',
                    perPage: 'pageSize'
                }
            }
        },
        loadOnStart: {
            type: Boolean,
            default: function() {
                return true
            }
        },
        selectedTo: {
            type: Array,
            default: function() {
                return []
            }
        },
        httpData: {
            type: Object,
            default: function() {
                return {}
            }
        },
        httpOptions: {
            type: Object,
            default: function() {
                return {}
            }
        },
        detailRow: {
            type: String,
            default: ''
        },
        detailRowCallback: {
            type: String,
            default: ''
        },
        detailRowId: {
            type: String,
            default: 'id'
        },
        detailRowTransition: {
            type: String,
            default: ''
        },
        detailRowClass: {
            type: String,
            default: 'vuetable-detail-row'
        },
        rowClassCallback: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            eventPrefix: 'vuetable:',
            tableData: [],
            tablePagination: null,
            currentPage: 1,
            visibleDetailRows: [],
            checkAll: false,
            curPerPage: this.perPage,
            tableLineNum: ['5', '10', '50', '100', '200', '500', '1000']
        }
    },
    // unknow 暂时不知道作用先注释掉
    // directives: {
    //     'attr': {
    //         update: function(value) {
    //             for (var i in value) {
    //                 this.el.setAttribute(i, value[i])
    //             }
    //         }
    //     },
    // },
    computed: {
        paginationInfo: function() {
            if (this.tablePagination == null || this.tablePagination.total == 0) {
                return this.paginationInfoNoDataTemplate
            }

            return this.paginationInfoTemplate
                .replace('{from}', this.tablePagination.from || 0)
                .replace('{to}', this.tablePagination.to || 0)
                .replace('{total}', this.tablePagination.total || 0)
        },
        useDetailRow: function() {
            if (typeof this.tableData[0][this.detailRowId] === 'undefined') {
                console.warn('You need to define "detail-row-id" in order for detail-row feature to work!')
                return false
            }

            return this.detailRowCallback.trim() !== ''
        }
    },
    methods: {
        normalizeFields: function() {
            var self = this
            var obj
            this.fields.forEach(function(field, i) {
                if (typeof(field) === 'string') {
                    obj = {
                        name: field,
                        title: self.setTitle(field),
                        titleClass: '',
                        dataClass: '',
                        callback: null,
                        visible: true
                    }
                } else {
                    obj = {
                        name: field.name,
                        title: (field.title === undefined) ? self.setTitle(field.name) : field.title,
                        sortField: field.sortField,
                        titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
                        dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
                        callback: (field.callback === undefined) ? '' : field.callback,
                        visible: (field.visible === undefined) ? true : field.visible
                    }
                }
                Vue.set(self.fields,i, obj)
            })
        },
        setTitle: function(str) {
            if (this.isSpecialField(str)) {
                return ''
            }

            return this.titleCase(str)
        },
        titleCase: function(str) {
            return str.replace(/\w+/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        },
        reloadData: function() {
            this.currentPage = 1
            this.loadData()
        },
        loadData: function() {
            var wrapper = document.querySelector(this.tableWrapper)
            this.showLoadingAnimation(wrapper)


            var params = [
                this.queryParams.page + '=' + this.currentPage,
                this.queryParams.perPage + '=' + this.curPerPage
            ]
            if (this.getSortParam()) {
                params.push(this.queryParams.sort + '=' + this.getSortParam());
            }
            if (!this.apiUrl) {
                return
            }

            var url = this.apiUrl
            if (this.apiUrl.indexOf('?') > 0) {
                url = url + '&' + params.join('&')
            } else {
                url = url + '?' + params.join('&')
            }
            if (this.appendParams.length > 0) {
                url += '&' + this.appendParams.join('&')
            }

            var self = this
            this.$http.get(url, this.httpData, this.httpOptions)
                .then(function(response) {
                    self.tableData = self.getObjectValue(response.data, self.dataPath, null)
                    self.tablePagination = self.getObjectValue(response.data, self.paginationPath, null)
                    this.getTablePagination(response.data);
                    if (self.tablePagination === null) {
                        console.warn('vuetable: pagination-path "' + self.paginationPath + '" not found. ' +
                            'It looks like the data returned from the sever does not have pagination information ' +
                            'or you may have set it incorrectly.'
                        )
                    }
                    self.selectedTo.splice(0, self.selectedTo.length)

                    self.dispatchEvent('load-success', response)
                    self.broadcastEvent('load-success', self.tablePagination)
                    self.loadSuccessCallback(response.data);
                    if (this.showPagination) {
                      this.$refs.pagination.loadSuccess(self.tablePagination);
                    }
                    if (self.selectedTo.length === self.tableData.length && self.tableData.length > 0) {
                        self.checkAll = true
                    } else {
                        self.checkAll = false
                    }
                    self.hideLoadingAnimation(wrapper)


                }, function(response) {
                    self.dispatchEvent('load-error', response)
                    self.broadcastEvent('load-error', response)

                    self.hideLoadingAnimation(wrapper)
                })
        },
        getTablePagination: function(data) {
            var total = data.total;
            var last_to;
            if (data.info) {
                this.tablePagination.per_page = data.info.pageSize;
                this.tablePagination.current_page = data.info.pageIndex;
                this.tablePagination.last_page = data.info.totalPage;
                this.tablePagination.from = (data.info.pageIndex - 1) * data.info.pageSize + 1;
                last_to = data.info.pageIndex * data.info.pageSize;
                this.tablePagination.to = last_to < total ? last_to : total;
            }
        },
        showLoadingAnimation: function(wrapper) {
            if (wrapper !== null) {
                this.addClass(wrapper, this.loadingClass)
            }
            this.dispatchEvent('loading')
        },
        hideLoadingAnimation: function(wrapper) {
            if (wrapper !== null) {
                this.removeClass(wrapper, this.loadingClass)
            }
            this.dispatchEvent('loaded')
        },
        getTitle: function(field) {
            if (typeof field.title === 'undefined') {
                return field.name.replace('.', ' ')
            }
            var text = field.title
            return text[0].toUpperCase() + text.slice(1)
        },
        getSortParam: function() {
            if (!this.sortOrder || this.sortOrder.field == '') {
                return ''
            }

            if (typeof this.$parent['getSortParam'] == 'function') {
                return this.$parent['getSortParam'].call(this.$parent, this.sortOrder)
            }

            return this.getDefaultSortParam()
        },
        getDefaultSortParam: function() {
            var result = '';

            for (var i = 0; i < this.sortOrder.length; i++) {
                var fieldName = (typeof this.sortOrder[i].sortField === 'undefined') ?
                    this.sortOrder[i].field :
                    this.sortOrder[i].sortField;

                result += fieldName + '|' + this.sortOrder[i].direction + ((i + 1) < this.sortOrder.length ? ',' : '');
            }

            return result;
        },
        addClass: function(el, className) {
            if (el.classList)
                el.classList.add(className)
            else
                el.className += ' ' + className
        },
        removeClass: function(el, className) {
            if (el.classList)
                el.classList.remove(className)
            else
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
        },
        dispatchEvent: function(eventName, args) {
            // this.$dispatch(this.eventPrefix + eventName, args)
        },
        broadcastEvent: function(eventName, args) {
            if (!this.$children) {
                return;
            }
            // this.$broadcast(this.eventPrefix + eventName, args)
        },
        orderBy: function(field, event) {
            if (!this.isSortable(field)) {
                return
            }

            var key = this.multiSortKey.toLowerCase() + 'Key'

            if (this.multiSort && event[key]) { //adding column to multisort
                var i = this.currentSortOrder(field);

                if (i === false) { //this field is not in the sort array yet
                    this.sortOrder.push({
                        field: field.name,
                        direction: 'asc'
                    });
                } else { //this field is in the sort array, now we change its state
                    if (this.sortOrder[i].direction == 'asc') {
                        // switch direction
                        this.sortOrder[i].direction = 'desc'
                    } else {
                        //remove sort condition
                        this.sortOrder.splice(i, 1);
                    }
                }
            } else { //no multisort, or resetting sort
                if (this.sortOrder.length == 0) {
                    this.sortOrder.push({
                        field: '',
                        direction: 'asc'
                    });
                }

                this.sortOrder.splice(1); //removes additional columns

                if (this.sortOrder[0].field == field.name) {
                    // change sort direction
                    this.sortOrder[0].direction = this.sortOrder[0].direction == 'asc' ? 'desc' : 'asc'
                } else {
                    // reset sort direction
                    this.sortOrder[0].direction = 'asc'
                }
                this.sortOrder[0].field = field.name
                this.sortOrder[0].sortField = field.sortField
            }


            this.currentPage = 1 // reset page index
            this.loadData()
        },
        isSortable: function(field) {
            return !(typeof field.sortField == 'undefined')
        },
        isCurrentSortField: function(field) {
            return this.currentSortOrder(field) !== false;
        },
        currentSortOrder: function(field) {
            if (!this.isSortable(field)) {
                return false
            }

            for (var i = 0; i < this.sortOrder.length; i++) {
                if (this.sortOrder[i].field == field.name) {
                    return i;
                }
            }

            return false;
        },
        sortIcon: function(field) {
            var i = this.currentSortOrder(field);
            if (i !== false) {
                return this.sortOrder[i].direction == 'asc' ?
                    this.ascendingIcon :
                    this.descendingIcon;
            } else {
                return '';
            }
        },
        sortIconOpacity: function(field) {
            //fields with stronger precedence have darker color

            //if there are few fields, we go down by 0.3
            //ex. 2 fields are selected: 1.0, 0.7

            //if there are more we go down evenly on the given spectrum
            //ex. 6 fields are selected: 1.0, 0.86, 0.72, 0.58, 0.44, 0.3

            var max = 1.0;
            var min = 0.3;
            var step = 0.3;

            var count = this.sortOrder.length;
            var current = this.currentSortOrder(field);


            if (max - count * step < min) {
                step = (max - min) / (count - 1);
            }

            var opacity = max - current * step;

            return opacity;
        },
        gotoPreviousPage: function() {
            if (this.currentPage > 1) {
                this.currentPage--
                    this.loadData()
            }
        },
        gotoNextPage: function() {
            if (this.currentPage < this.tablePagination.last_page) {
                this.currentPage++
                    this.loadData()
            }
        },
        gotoPage: function(page) {
            if (page != this.currentPage && (page > 0 && page <= this.tablePagination.last_page)) {
                this.currentPage = page
                this.loadData()
            }
        },
        isSpecialField: function(fieldName) {
            // return fieldName.startsWith('__')
            return fieldName.slice(0, 2) === '__'
        },
        hasCallback: function(item) {
            return item.callback ? true : false
        },
        callCallback: function(field, item) {
            if (!this.hasCallback(field))
                return
            if (typeof field.callback === 'function') {
                return field.callback(this.getObjectValue(item, field.name), item);
            } else {
                var args = field.callback.split('|')
                var func = args.shift()
                if (typeof this.$parent[func] == 'function') {
                    return (args.length > 0) ?
                        this.$parent[func].apply(this.$parent, [this.getObjectValue(item, field.name)].concat(args)) :
                        this.$parent[func].call(this.$parent, this.getObjectValue(item, field.name), item)
                }

            }

            return null
        },
        getObjectValue: function(object, path, defaultValue) {
            defaultValue = (typeof defaultValue == 'undefined') ? null : defaultValue

            var obj = object
            if (path.trim() != '') {
                var keys = path.split('.')
                keys.forEach(function(key) {
                    if (obj !== null && typeof obj[key] != 'undefined' && obj[key] !== null) {
                        obj = obj[key]
                    } else {
                        obj = defaultValue
                        return
                    }
                })
            }
            return obj
        },
        callAction: function(action, data) {
          this.$emit('action', action, data)
            // this.$dispatch(this.eventPrefix + 'action', action, data)
        },
        addParam: function(param) {
            this.appendParams.push(param)
        },
        selectRadio(dataItem, fieldName, index) {
            var idColumn = this.extractArgs(fieldName)
            var selected = idColumn ? dataItem[idColumn] : index;
            this.selectedTo.pop()
            this.selectedTo.push(selected)
        },
        toggleCheckbox: function(isChecked, dataItem, fieldName, index) {
            var idColumn = this.extractArgs(fieldName)
            var selected = idColumn ? dataItem[idColumn] : index;

            if (isChecked) {
                this.selectedTo.push(selected)
            } else {
                this.selectedTo.splice(this.selectedTo.indexOf(selected), 1)
            }
            if (this.selectedTo.length === this.tableData.length) {
                this.checkAll = true
            } else {
                this.checkAll = false
            }
        },
        toggleAllCheckboxes: function(isChecked, fieldName) {
            var self = this
            var idColumn = this.extractArgs(fieldName)
            if (isChecked) {
                this.checkAll = true
                this.tableData.forEach(function(dataItem, index) {
                    if (!self.isSelectedRow(dataItem, fieldName, index)) {
                        if (idColumn) {
                            self.selectedTo.push(dataItem[idColumn])
                        } else {
                            self.selectedTo.push(index)
                        }
                    }
                })
            } else {
                this.checkAll = false
                this.tableData.forEach(function(dataItem, index) {
                    if (idColumn) {
                        self.selectedTo.splice(self.selectedTo.indexOf(dataItem[idColumn]), 1)
                    } else {
                        self.selectedTo.splice(self.selectedTo.indexOf(index), 1)
                    }
                })
            }
        },
        isSelectedRow: function(dataItem, fieldName, index) {
            var extractArgs = this.extractArgs(fieldName);
            if (extractArgs) {
                return this.selectedTo.indexOf(dataItem[extractArgs]) >= 0
            } else {
                return this.selectedTo.indexOf(index) >= 0
            }
        },
        extractName: function(string) {
            return string.split(':')[0].trim()
        },
        extractArgs: function(string) {
            return string.split(':')[1]
        },
        callDetailRowCallback: function(item) {
            var func = this.detailRowCallback.trim()
            if (func === '') {
                return ''
            }

            if (typeof this.$parent[func] == 'function') {
                return this.$parent[func].call(this.$parent, item)
            } else {
                console.error('Function "' + func + '()" does not exist!')
            }
        },
        isVisibleDetailRow: function(rowId) {
            return this.visibleDetailRows.indexOf(rowId) >= 0
        },
        showDetailRow: function(rowId) {
            if (!this.isVisibleDetailRow(rowId)) {
                this.visibleDetailRows.push(rowId)
            }
        },
        hideDetailRow: function(rowId) {
            if (this.isVisibleDetailRow(rowId)) {
                this.visibleDetailRows.$remove(rowId)
            }
        },
        toggleDetailRow: function(rowId) {
            if (this.isVisibleDetailRow(rowId)) {
                this.hideDetailRow(rowId)
            } else {
                this.showDetailRow(rowId)
            }
        },
        onRowClass: function(dataItem, index) {
            var func = this.rowClassCallback.trim()

            if (func !== '' && typeof this.$parent[func] === 'function') {
                return this.$parent[func].call(this.$parent, dataItem, index)
            }
            return ''
        },
        onRowChanged: function(dataItem) {
            this.dispatchEvent('row-changed', dataItem)
            return true
        },
        onRowClicked: function(dataItem, event) {
            // this.$dispatch(this.eventPrefix + 'row-clicked', dataItem, event)
            return true
        },
        onCellClicked: function(dataItem, field, event) {
            // this.$dispatch(this.eventPrefix + 'cell-clicked', dataItem, field, event)
        },
        onCellDoubleClicked: function(dataItem, field, event) {
            // this.$dispatch(this.eventPrefix + 'cell-dblclicked', dataItem, field, event)
        },
        onDetailRowClick: function(dataItem, event) {
            // this.$dispatch(this.eventPrefix + 'detail-row-clicked', dataItem, event)
        },
        callPaginationConfig: function() {
            if (typeof this.$parent[this.paginationConfigCallback] === 'function') {
                this.$parent[this.paginationConfigCallback].call(this.$parent, this.$refs.pagination.$options.name)
            }
        },
        logDeprecatedMessage: function(name, replacer) {
            var msg = '"{name}" prop is being deprecated and will be removed in the future. Please use "{replacer}" instead.'
            console.warn(msg.replace('{name}', name).replace('{replacer}', replacer))
        },
        checkForDeprecatedProps: function() {
            if (this.paginationConfig !== 'paginationConfig') {
                this.logDeprecatedMessage('paginationConfig', 'paginationConfigCallback')
            }
            if (this.detailRow !== '') {
                this.logDeprecatedMessage('detail-row', 'detail-row-callback')
            }
        },
        changePage: function(page) {
            if (page == 'prev') {
                this.gotoPreviousPage()
            } else if (page == 'next') {
                this.gotoNextPage()
            } else {
                this.gotoPage(page)
            }
        }
    },
    watch: {
        'apiUrl': function(newVal, oldVal) {
            if (newVal && typeof newVal === 'string') {
                this.currentPage = 1
                this.loadData()
            }
        },
        // 'appendParams': function(newVal, oldVal) {
        // 	if (newVal) {
        // 		this.currentPage = 1
        // 		this.loadData()
        // 	}
        // },
        'multiSort': function(newVal, oldVal) {
            if (newVal === false && this.sortOrder.length > 1) {
                this.sortOrder.splice(1);
                this.loadData();
            }
        }
    },
    events: {
        'vuetable-pagination:change-page': function(page) {
            if (page == 'prev') {
                this.gotoPreviousPage()
            } else if (page == 'next') {
                this.gotoNextPage()
            } else {
                this.gotoPage(page)
            }
        },
        'vuetable:reload': function() {
            this.loadData()
        },
        'vuetable:refresh': function() {
            this.currentPage = 1
            this.loadData()
        },
        'vuetable:goto-page': function(page) {
            this.$emit('vuetable-pagination:change-page', page)
        },
        'vuetable:set-options': function(options) {
            for (var n in options) {
                this.$set(n, options[n])
            }
        },
        'vuetable:toggle-detail': function(dataItem) {
            this.toggleDetailRow(dataItem)
        },
        'vuetable:show-detail': function(dataItem) {
            this.showDetailRow(dataItem)
        },
        'vuetable:hide-detail': function(dataItem) {
            this.hideDetailRow(dataItem)
        }
    },
    created: function() {
        this.$radioName = prefix + idSeed++;
        this.checkForDeprecatedProps()
        this.normalizeFields()
        if (this.loadOnStart) {
            this.loadData()
        }
        this.$nextTick(function() {
            this.callPaginationConfig()
        })
    }
}

</script>
