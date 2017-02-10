<style lang="less">

.ihr-search {
    * {
        box-sizing: border-box;
    }
    .d-panel-content {
        padding-top: 0px;
    }
    .header {
        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
    }
    .name {
        color: #6a707d;
    }
    .bg {
        width: 250px;
        min-height: 38px;
        line-height: 38px;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: #fafafa;
        margin: 16px 50px;
        color: #a5acbe;
    }
    .ico-baseSty() {
        width: 36px;
        height: 36px;
        padding-left: 50px;
    }
    .level {
        .ico-baseSty();
        background: url(../../static/images/public/department.png) no-repeat;
    }
    .phone {
        .ico-baseSty();
        background: url(../../static/images/public/staff-interns-phone.png) no-repeat;
    }
    .user {
        .ico-baseSty();
        background: url(../../static/images/public/staff-interns-person.png) no-repeat;
    }
    .email {
        .ico-baseSty();
        background: url(../../static/images/public/staff-interns-mail.png) no-repeat;
    }
    table {
        tr:last-child td {
            border-bottom: none;
        }
        td {
            vertical-align: top;
            border-bottom: 1px solid #ecedee;
        }
    }
    .mt14 {
        margin-top: 14px;
    }
    .transparent-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        z-index: 8;
        background: #fff;
        opacity: 0.7;
    }
    .loading {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -27px 0 0 -27px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-search">
    <panel :title="searchTit" class=" panel-b performance fix" header="panel-header" id="org-perfor">
        <div class="transparent-bg" v-show="loading">
            <ui-progress-circular class="loading" :show="loading" :size="54" :auto-stroke="false"></ui-progress-circular>
        </div>
        <table class="w-per100" border="0" cellspacing="0">
            <tr v-for="e in employees">
                <td>
                    <div class="header tc pt16">
                        <a><img :src='photoUrl(e.photoId)' alt="" /></a>
                    </div>
                    <div class="name mt14 mb16 tc">
                        {{e.employeeName}} </div>
                </td>
                <td>
                    <div class="bg">
                        <div class="level">{{e.orgShortName}}</div>
                    </div>
                    <div class="bg">
                        <div class="phone">{{e.officePhone}}</div>
                    </div>
                </td>
                <td>
                    <div class="bg">
                        <div class="user">{{e.positionName}}</div>
                    </div>
                    <div class="bg">
                        <div class="email">{{e.email}}</div>
                    </div>
                </td>
            </tr>
        </table>
        <div class="vuetable-pagination fix ui bottom attached segment grid mt16">
            <div class="vuetable-pagination-info left floated left aligned six wide column">Displaying {{pageIndex}} to {{pageSize}} of {{total}} items</div>
            <div class="vuetable-pagination-pages">
                <!-- <span>pages</span> -->
                <select class="vuetable-pagination-pages-num" v-model="pageSize">
                    <!--v-for-start-->
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <!--v-for-end-->
                </select>
            </div>
            <div class="vuetable-pagination-component right floated right aligned six wide column mb20">
                <div class="ui right floated pagination menu fix">
                    <a class="btn-nav icon item" @click="firstp">
                        <span>«</span>
                    </a>
                    <a class="btn-nav icon item" @click="prev">
                        <span>‹</span>
                    </a>
                    <a v-for="p in pnext" v-bind:class="{'item active large': p===pageIndex , 'item': p!=pageIndex }" @click="gopage(p)">
                        <span>{{p}}</span>
                    </a>
                    <a class="btn-nav icon item" @click="next">
                        <span>›</span>
                    </a>
                    <a class="btn-nav icon item " @click="lastp">
                        <span>»</span>
                    </a>
                </div>
            </div>
        </div>

    </panel>
</div>

</template>

<script>

export default {
    data() {
            return {
                searchTit:'',
                employees: [],
                total: 0,
                searchFlag: false,
                pageIndex: 1,
                pageSize: 5,
                nextpage: 0,
                totalPage: 0,
                pnext: [],
                loading: false,
                first: 0,
                last: 0
            }
        },
        computed: {},
        ready() {
            let data = {
                condition: this.$route.params.condition,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.postData(data);
        },
        mounted() {},
        watch: {
            'pageSize': {
                handler: function(val, oldVal) {
                    let data = {
                        condition: this.$route.params.condition,
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    }
                    this.postData(data);
                }
            }
        },
        methods: {
            firstp() {
                    let data = {
                        condition: this.$route.params.condition,
                        pageIndex: this.first,
                        pageSize: this.pageSize
                    }
                    this.postData(data);
                },
                lastp() {
                    let data = {
                        condition: this.$route.params.condition,
                        pageIndex: this.last,
                        pageSize: this.pageSize
                    }
                    this.postData(data);
                },
                photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `../../static/images/public/xwz.png`;
                },
                postData(data) {
                    this.loading = true;
                    if (this.$route.params.type === 'search' || this.searchFlag ) {
                        this.searchTit = 'Search Results';
                        this.$http.post('/employee/employees/quickQuery', data, {
                            emulateJSON: true
                        }).then((response) => {
                            this.employees = response.data.data;
                            this.total = response.data.total;
                            this.pageIndex = response.data.info.pageIndex;
                            this.nextpage = response.data.info.next;
                            this.totalPage = response.data.info.totalPage;
                            this.first = response.data.info.first;
                            this.last = response.data.info.last;
                            this.loading = false;
                            this.initpnext();
                        });
                    } else {
                        this.searchTit = 'My Team';
                        this.$http.post('/pos/positions/teammateProfileByPage', data, {
                            emulateJSON: true
                        }).then((response) => {
                            let myTeamData = response.data.data;
                            let temps = [];
                            myTeamData.forEach((item, i) => {
                                let obj = {
                                    employeeId: item.employeeId, //id
                                    employeeName: item.fullName,
                                    orgShortName: item.orgShortName, //简称
                                    officePhone: item.officePhone,
                                    positionName: item.positionName, //职位
                                    email: item.email,
                                    photoId: item.photoId
                                }
                                temps.push(obj);
                            })
                            this.employees = temps;
                            this.total = response.data.total;
                            this.pageIndex = response.data.info.pageIndex;
                            this.nextpage = response.data.info.next;
                            this.totalPage = response.data.info.totalPage;
                            this.first = response.data.info.first;
                            this.last = response.data.info.last;
                            this.loading = false;
                            this.initpnext();
                        });
                    }
                },
                prev() {
                    if (this.totalPage === 1) {
                        return;
                    }
                    let data = {
                        condition: this.$route.params.condition,
                        pageIndex: this.pageIndex - 1,
                        pageSize: this.pageSize
                    }
                    this.postData(data);
                },
                next() {
                    if (this.totalPage === 1  || this.totalPage < this.pageIndex) {
                        return;
                    }

                    let data = {
                        condition: this.$route.params.condition,
                        pageIndex: this.pageIndex + 1,
                        pageSize: this.pageSize
                    }
                    this.postData(data);
                },
                initpnext() {
                    let pnext = [];
                    if (this.nextpage < 5) {
                        let tempTotal = 5;
                        if (this.totalPage > 5) {
                            tempTotal = 5;
                        } else {
                            tempTotal = this.totalPage;
                        }
                        for (var i = 0; i < tempTotal; i++) {
                            pnext.push(i + 1);
                        }
                    } else if ((this.totalPage - this.pageIndex) > 2) {
                        pnext.push(this.pageIndex - 2);
                        pnext.push(this.pageIndex - 1);
                        pnext.push(this.pageIndex);
                        pnext.push(this.pageIndex + 1);
                        pnext.push(this.pageIndex + 2);
                    } else if ((this.totalPage - this.pageIndex) == 0 || (this.totalPage - this.pageIndex) < 3) {
                        pnext.push(this.pageIndex - 4);
                        pnext.push(this.pageIndex - 3);
                        pnext.push(this.pageIndex - 2);
                        pnext.push(this.pageIndex - 1);
                        pnext.push(this.pageIndex);
                    }
                    this.pnext = pnext;
                },
                gopage(page) {
                    let data = {
                        condition: this.$route.params.condition,
                        pageIndex: page,
                        pageSize: this.pageSize
                    }
                    this.postData(data);
                },

        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        },
        events: {
            'main:searchEmployeeView': function(searchText) {
                this.searchFlag = true;
                this.pageIndex = 1;
                let data = {
                    condition: searchText,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                this.postData(data);
            }

        }
}

</script>
