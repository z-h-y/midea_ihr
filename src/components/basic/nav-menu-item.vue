<style lang="less">

    .d-navmenu-item {
        box-sizing: border-box;
        transition:width 1s;
    }

    .toplevel > .d-navmenu-item-label {
        border-left: 2px solid transparent;
    }

    .toplevel > .d-navmenu-item-label:hover {
        background-color: #354661;
        border-left-color: #3aa2eb;
    }

    .d-navmenu-item.expanded > .d-navmenu-item-content {
        display: block;
    }

    .d-navmenu-item-label {
        position: relative;
        cursor: pointer;
    }

    .d-navmenu-item-label > a {
        display: inline-block;
        text-decoration: none;
        padding: 8px 15px 8px 15px;
        line-height: 24px;
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        box-sizing: border-box;
        color: #a5acbe;
        white-space: nowrap;
    }

    .d-navmenu-item-label .d-icon {
        position: absolute;
        right: 20px;
        top: 11px;
        font-size: 14px;
        margin-top: 3px;
        color: #a5acbe;
    }

    .d-navmenu-item-label:hover {
        a {
            color: #fff;
        }
    }

    .d-navmenu-item-label:hover .d-icon {
        font-weight: normal;
    }

    .d-navmenu-item-content {
        padding-left: 20px;
        display: none;

        overflow: hidden;
    }
    .nav-fade{
      transition: all 0.2s ease-in-out;
      overflow: hidden;
      max-height: 500px;
      padding-left: 20px;
    }
    .nav-fade-enter,
    .nav-fade-leave-active{
        max-height:0;
    }

</style>

<template>

<div class="d-navmenu-item" :class="{ expanded: hasChild && curExpanded, active: !hasChild && active, toplevel: topLevel }">
    <div class="d-navmenu-item-label" @click="handleHeaderClick">
        <!-- <a v-link="{ path: path, exact: exact }">
            <span v-if="icon" :class="['fa', icon]"></span>{{text}}
        </a> -->
        <router-link :to="{ path: path }">
          <span v-if="icon" :class="['fa', icon]"></span>{{text}}
        </router-link>
        <span :class="['d-icon', 'fa',hasChild && curExpanded ? 'fa-angle-down' : 'fa-angle-right']" v-if="hasChild"></span>
    </div>
    <transition name="nav-fade">
        <div class="nav-fade" @click.stop v-show="curExpanded">
            <nav-menu-item v-on:menu-urls="setMenuUrls" v-for="childs of data.children" :key="childs.id" :text="childs.language" :path="childs.menuAddress" :data="childs"></nav-menu-item>
        </div>
    </transition>
</div>

</template>

<script type="text/ecmascript-6">

export default {
    props: {
        data: {},
        path: {},
        text: {},
        icon: {},
        exact: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean
        },
        exclusive: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.$isNavMenu = true;
    },
    mounted: function () {
      this.$nextTick(function () {
        var data = this.data;
        this.curExpanded = data.expanded || false;
        this.hasChild = data.children && data.children.length > 0;
        if (this.$parent.$isNavMenu === true || this.$parent.$isNavMenu === false) {
            this.$isNavMenu = false;
        }
        this.topLevel = !this.$parent.$isNavMenu;
      })
    },

    methods: {
       setMenuUrls(item) {
         this.$emit('menu-urls', item)
       },
        handleHeaderClick() {

                if (this.hasChild) {
                    this.curExpanded = !this.curExpanded;
                } else {
                    this.$emit('menu-urls', this)
                }
            },

            handleExclusive(item) {
                if (this.exclusive) {
                    var children = this.$children;
                    children.forEach(function(child) {
                        if (child !== item) {
                            child.expanded = false;
                        }
                    });
                }
            }
    },

    watch: {
        expanded(newVal) {
            if (newVal) {
                this.$parent.handleExclusive(this);
            }
        }
    },

    data() {
        return {
            hasChild: false,
            topLevel: false,
            active: false,
            curExpanded: false
        };
    },

    transitions: {
        collapse: require('../../util/collapse-transition.js').default
    }
};

</script>
