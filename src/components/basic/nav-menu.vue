<style lang="less">

.d-navmenu {
    * {
        box-sizing: border-box;
    }
    padding:20px 0;
    overflow: auto;
    background: #2a3c59;
    margin-left: 0;
}

.d-navmenu.hide-menu {
    margin-left: 0px;
    width: 100%;
    transition: all 0.2s ease-out 0s;
}

</style>

<template>

<div class="d-navmenu scrollbar" id="dNavmenu">
    <slot></slot>
</div>

</template>

<script type="text/ecmascript-6">

export default {
    props: {
        exclusive: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        handleExclusive(item) {
                if (this.exclusive) {
                    let children = this.$children;
                    children.forEach(function(child) {
                        if (child !== item) {
                            child.expanded = false;
                        }
                    });
                }
            },
            navMenuHeight() {
                let navMenu = document.getElementById('dNavmenu');
                let menuHight = document.body.clientHeight - 64;
                navMenu.style.height = `${menuHight}px`;
            }
    },
    mounted: function () {
      this.$nextTick(function () {
        // 左侧菜单动态获取高度
        this.navMenuHeight();
        window.addEventListener('resize', function() {
            let navMenu = document.getElementById('dNavmenu');
            let menuHight = document.body.clientHeight - 64;
            navMenu.style.height = `${menuHight}px`;
        })
      })
    }
};

</script>
