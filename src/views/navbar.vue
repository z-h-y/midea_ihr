<style lang="less" scoped>

* {
    box-sizing: border-box;
}

.search-query {
    position: relative;
    width: 248px;
    height: 63px;
    float: left;
    margin-top: 1px;
}

.search-query input {
    width: 228px;
    height: 30px;
    line-height: 30px;
    padding: 0 45px 0 18px;
    border: 1px solid #e3e3e3;
    outline: none;
    border-radius: 15px;
    transition: border-color 0.2s ease;
}

.fa-search {
    font-size: 16px;
    color: #fff;
    position: absolute;
    top: 24px;
    right: 35px;
}

.c-2a3c59 {
    color: #2a3c59;
}

.navbar {
    transition: all 0.2s ease-out 0s;
    width: 100%;
    min-width: 800px;
    height: 64px;
    line-height: 64px;
    background: #3aa2eb;
    position: fixed;
    top: 0;
    left: 230px;
    z-index: 10;
}

.navbar .menu-expanded {
    display: inline-block;
    position: relative;
    padding: 22px 20px;
    cursor: pointer;
    border-right: 1px solid #3DA6F0;
    vertical-align: middle;
}

.navbar .menu-expanded i.line {
    margin: 5px 0;
}

.navbar .menu-expanded i.arrow {
    width: 0;
    height: 0;
    position: absolute;
    top: 25px;
    left: 12px;
    border-top: 5px solid transparent;
    border-right: 5px solid #eee;
    border-bottom: 5px solid transparent;
}

.navbar .menu-expanded i.arrow.arrow-right {
    transform: rotate(180deg);
}

.navbar .menu-expanded i.line,
.navbar .menu-expanded:before,
.navbar .menu-expanded:after {
    content: '';
    display: block;
    width: 18px;
    height: 2px;
    background-color: #eee;
}

.navbar-icon {
    vertical-align: middle;
    display: inline-block;
    width: 17px;
    height: 17px;
    background-size: contain;
    background: url("/static/images/public/help.png") center center no-repeat;
}

#navbar-user img {
    vertical-align: middle;
    border-radius: 50%;
}

#navbar-user {
    border-left: 1px solid #3fa9f3;
    display: inline-block;
    cursor: pointer;
    padding: 0 14px;
    margin: 0 0 0 20px;
}

.navbar-msg {
    position: fixed;
    right: 0;
}

.navbar-pulldown {
    width: 358px;
    height: 140px;
    position: absolute;
    right: 10px;
    z-index: 5;
    background: #fff;
    box-shadow: 0px 0px 10px #cecece;
}

.navbar-userheader {
    float: left;
    padding: 16px 15px;
    width: 58px;
    height: 58px;
    >img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
    }
}

.navbar-usemsg {
    padding: 15px 0 0 0;
    height: 58px;
}

.navbar-username {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #2a3c59;
    margin-left: 86px;
}

.navbar-usermore {
    line-height: 26px;
    width: 90px;
    height: 26px;
    display: block;
    text-align: center;
    border-radius: 50px;
    background: #e9eef2;
    margin: 0 0 0 84px;
    color: #607b8e;
    cursor: pointer;
    &:hover {
        color: #7e909c;
    }
}

.navbar-exit {
    width: 75px;
    height: 30px;
    font-size: 12px;
    padding: 0;
    position: absolute;
    bottom: 16px;
    right: 16px;
}

.navbar-switch {
    font-size: 14px;
    padding: 0;
    text-align: center;
    cursor: pointer;
    color: #3aa2eb;
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 86px;
    top: 46px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}

.ihr-logo-warp {
    width: 230px;
    position: absolute;
    overflow: hidden;
    background: #2688cc;
    left: -230px;
}

.aside-logo-link {
    width: 100%;
    height: 64px;
    display: block;
    text-align: center;
    padding: 4px 0px 0 0;
}

.ihr-logo-warp img {
    width: 55px;
}

</style>

<template lang="html">

<div class="navbar" style="height:64px;">
    <div class="ihr-logo-warp">
        <a class="aside-logo-link">
            <img src="../static/images/public/left-logo.png" alt="" />
        </a>
    </div>
    <div class="l rel">
        <span class="menu-expanded" id="menuExpanded" @click="expandedMenu">
         <i :class="{arrow: true, 'arrow-right': expanded}"></i>
         <i class="line"></i>
       </span>
    </div>
    <div class="r navbar-msg">
        <!-- <select @change="changeLang" v-model="lang">
          <option v-for="item in langArr" :value="item">{{item.text}}</option>
        </select> -->
        <div class="search-query" @click="stopPropagation">
            <input v-show="searchQuery" type="text" placeholder="Search Employee Name Or ID" @keydown="onkeydown($event)" v-model="searchText">
            <i class="fa fa-search poi" v-bind:class="{'c-2a3c59':searchQuery}" @click="search" aria-hidden="true"></i>
        </div>
        <a href="./static/doc/help.pdf" target="_blank" class="navbar-icon"></a>
        <a id="navbar-user" v-on:click.stop="toggle">
            <img width="32px" height="32px" :src='photoUrl(profile.photoId)' alt="" />
        </a>

        <div id="navbarpulldown" class="navbar-pulldown trans fix" v-show="show" @click="stopPropagation">
            <div class="navbar-userheader">
                <img class="navbar-userheader-img" :src='NAVPhotoUrl(profile.photoId)' alt="" />
            </div>
            <div class="navbar-usemsg">
                <div class="navbar-username">{{profile.fullName}}</div>
                <!-- <a class="navbar-usermore">View Profile</a> -->
            </div>
            <ui-button @click="exit" class="btn-default-bd navbar-exit" type="flat">Sign Out</ui-button>
            <span v-if="flag ==='0' && isAdminFlag" @click="administratorMode('1')" class="navbar-switch"><i class="fa fa-user mr5" aria-hidden="true"></i>Admin<i class="fa fa-angle-right ml5" aria-hidden="true"></i></span>
            <span v-if="flag ==='1' && isAdminFlag" @click="administratorMode('0')" class="navbar-switch"><i class="fa fa-user mr5" aria-hidden="true"></i>Staff<i class="fa fa-angle-right ml5" aria-hidden="true"></i></span>
        </div>
    </div>
</div>

</template>

<script>

import {
    default as Dropdown
}
from '../util/dropdown';
// import {
//     default as locales
// }
// from '../locales/index';
export default {
    data() {
            return {
                expanded: false,
                show: false,
                isAdminFlag: false,
                profile: {},
                flag: '0',
                searchQuery: false,
                searchText: "",
                lang: {
                    name: 'en',
                    value: 0,
                    text: 'English'
                },
                langArr: [{
                    name: 'en',
                    value: 0,
                    text: 'English'
                }, {
                    name: 'zh',
                    value: 1,
                    text: 'Chinese'
                }]
            };
        },
        computed: {},
        ready() {
            this.clickBody();
        },
        created() {
            this.employeeProfile();
            this.isAdmin();
            var lang = localStorage.getItem('lang');
            var arr = this.langArr;
            var isExist = false;
            if (lang) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i].name === lang) {
                        this.lang = arr[i];
                        isExist = true;
                        break;
                    }
                }
            }
            lang = isExist ? lang : 'en';
            // this.setLang('en');
        },
        attached() {},
        methods: {
            changeLang() {
                    localStorage.setItem('lang', this.lang.name);
                    location.reload();
                },
                setLang(curLang) {
                    Vue.config.lang = curLang;
                    Object.keys(locales).forEach(function(lang) {
                        Vue.locale(lang, locales[lang])
                    })
                },
                administratorMode(flag) {
                    this.toggle();
                    localStorage.setItem('isAdmin', flag);
                    this.$dispatch('main:initMenu', this.isAdminFlag);
                    this.$dispatch('main:initHomeView', this.isAdminFlag);
                    this.flag = flag;
                    this.$root.$data.orgSettingTreeCache = null;
                    this.$root.$data.orgGroupTreeCache = null;
                    this.$root.$data.orgTitleTreeCache = null;
                    this.$root.$data.orgPosTreeCache = null;
                    this.$router.go({
                        name: 'defaultHome'
                    });
                },
                isAdmin() {
                    let flag = localStorage.getItem('isAdmin');
                    if (flag != '0' && flag != '1') {
                        localStorage.setItem('isAdmin', '0');
                        flag = '0';
                    }
                    this.flag = flag;
                    this.$http.get(`/public-access/isAdmin`).then((response) => {
                        if (!response.data) {
                            this.flag = '0';
                            localStorage.setItem('isAdmin', '0');
                            this.isAdminFlag = false;
                        } else {
                            this.isAdminFlag = true;
                        }
                    });
                },
                employeeProfile() {
                    this.$http.get(`/employee/employees/profile`).then((response) => {
                        if (response.data)
                            this.profile = response.data;
                    });
                },
                photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `/static/images/public/user-header.png`;
                },
                NAVPhotoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `/static/images/public/xwz.png`;
                },
                expandedMenu() {
                    this.expanded = !this.expanded;
                    this.$dispatch('navbar:expandedMenu', this.expanded);
                },
                exit() {
                    this.show = !this.show;
                    this.$http.post(`/security/logout`).then((response) => {
                        location.href = location.origin + '/login.html#!/';
                    });
                },
                toggle() {
                    this.show = !this.show;
                },
                search() {
                    this.searchQuery = true;
                    if (this.searchText) {
                        if (this.$route.name === 'search') {
                            this.$dispatch('main:searchEmployeeView', this.searchText);
                        } else {
                            this.$router.go({
                                name: 'search',
                                params: {
                                    condition: this.searchText,
                                    type: 'search'
                                }
                            });
                        }
                    }
                },
                onkeydown: function(event) {
                    if (event.keyCode == 13) {
                        this.search();
                    }
                },
                stopPropagation(e) {
                    var evt = e ? e : window.event;
                    if (evt.stopPropagation) {
                        //W3C
                        evt.stopPropagation();
                    } else {
                        //IE
                        evt.cancelBubble = true;
                    }
                },
                clickBody() {
                    let _self = this;
                    document.getElementById('app').addEventListener('click', function() {
                        _self.show = false;
                        _self.searchQuery = false;
                    })
                }
        },
        components: {}
};

</script>
