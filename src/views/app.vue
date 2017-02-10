<style lang="less">

#aside {
    box-sizing: border-box;
    width: 230px;
    height: 100%;
    overflow: hidden;
    z-index: 12;
    padding-top: 64px;
    * {
        box-sizing: border-box;
    }
}

.aside-wrap {
    transition: all 0.2s ease-out 0s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    // box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.30), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.aside-wrap .v-link-active {
    color: #fff;
}

.expanded-transition {
    margin-left: -230px;
    width: 100%;
    transition: all 0.2s ease-out 0s;
}



</style>

<template lang="html">

<div class="">
  <ui-progress-linear style="z-index:1000;position:fixed" :show="loading" color="white">
  </ui-progress-linear>
  <div v-show="loading" style="position: fixed;width:100%;height:100%;top:0px;z-index:999;background:#000;opacity:0.7;">

  </div>
  <div id="aside" class="aside-wrap" :class="[expanded?showtransition.classA:showtransition.classB]">

      <nav-menu>
          <nav-menu-item v-on:menuUrls="setMenuUrls" v-for="menu in menus" :text="menu.menuName" :path="menu.menuAddress" :data="menu" :icon="menu.icon">
          </nav-menu-item>
      </nav-menu>
  </div>
  <main-view :urls="urls"></main-view>
</div>

</template>

<script>

import MainView from './main.vue';
import {
    Datashaping
}
from '../util/assist.js';
export default {
    data() {
            return {
                oriMenus: [],
                menus: [],
                urls: [],
                expanded: false,
                showtransition:{
                  classA:'expanded-transition',
                  classB:'hide-menu'
                },
                loading: false
            }
        },
        created: function() {
          this.$on('add-todo', this.addTodo)
        },
        mounted: function () {
          this.$nextTick(function () {
            this.init();
          })
        },
        components: {
            MainView: MainView
        },
        methods: {
            setMenuUrls(item) {
              this.urls = [];
              while (item.$isNavMenu !== true) {
                  let curUrl = {
                      url: item.data.menuAddress,
                      name: item.data.menuName,
                      mId: item.data.menuId,
                      parentId: item.data.parentMenuId
                  };
                  this.urls.unshift(curUrl);
                  item = item.$parent;
              }
              // 保存信息使得页面刷新时能展开到对应的菜单
              if (item.data.menuAddress) {
                  localStorage.setItem('navMenuRoutePath', item.data.menuAddress);
              }
              this.urls.unshift({
                  url: item.data.menuAddress,
                  name: item.data.menuName,
                  mId: item.data.menuId,
                  parentId: item.data.parentMenuId
              });
            },
            init() {
                    let isAdminFlag = false;
                    this.$http.get(`/public-access/isAdmin`).then((response) => {
                        if (!response.data) {
                            isAdminFlag = false;
                        } else {
                            isAdminFlag = true;
                        }
                        this.initMenu(isAdminFlag);
                    });
                    this.setUrls();
                    this.menus = Datashaping(this.oriMenus);
                },
                initMenu(isAdmin) {
                    let flag = localStorage.getItem('isAdmin');
                    if (flag != '0' && flag != '1') {
                        localStorage.setItem('isAdmin', '0');
                    }
                    this.flag = flag;
                    let menuUrl = '/public-access/defaultmenus';
                    if (flag === '1' && isAdmin) {
                        menuUrl = '/public-access/menus';
                    }
                    this.$http.get(menuUrl).then((response) => {
                        this.oriMenus = response.json();
                        this.setUrls();
                        this.menus = Datashaping(this.oriMenus);
                    }, (response) => {
                        console.log('错误信息 ：' + response.statusText);
                    });
                },
                setUrls() {
                    this.urls = [];
                    let path = this.$route.extra || this.$route.path;
                    this.setMenu(path);
                    if (this.urls.length < 1) {
                        var navMenuRoutePath = localStorage.getItem('navMenuRoutePath');
                        this.setMenu(navMenuRoutePath);
                    }
                },
                setMenu(path) {
                    for (let k of Object.keys(this.oriMenus)) {
                        if (this.oriMenus[k].menuAddress === path) {
                            this.urls.push({
                                url: this.oriMenus[k].menuAddress,
                                name: this.oriMenus[k].menuName,
                                mId: this.oriMenus[k].menuId,
                                parentId: this.oriMenus[k].parentMenuId
                            });
                            this.getParentNode(this.oriMenus[k].parentMenuId);
                            break;
                        }
                    }
                },
                getParentNode(parentMenuId) {
                    if (!parentMenuId) {
                        return;
                    }

                    for (let k of Object.keys(this.oriMenus)) {
                        if (this.oriMenus[k].menuId === parentMenuId) {
                            this.urls.unshift({
                                url: this.oriMenus[k].menuAddress,
                                name: this.oriMenus[k].menuName,
                                mId: this.oriMenus[k].menuId,
                                parentId: this.oriMenus[k].parentMenuId
                            });

                            this.oriMenus[k].expanded = true;
                            this.getParentNode(this.oriMenus[k].parentMenuId);
                            break;
                        }
                    }
                }
        },
        events: {
            'main:expandedMenu': function(expanded) {
                this.expanded = expanded;
            },
            'main:initMenu': function(expanded) {
                this.loading = true;
                this.initMenu(expanded);
                var timer;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.loading = false;
                }, 300);
            }

        }
};

</script>
