<template>
<li class="breadcrumb-item">
    <router-link :to="{ path: link }" :class="['breadcrumb-anchor', { 'breadcrumb-link': isLink }]">
      <slot></slot>
    </router-link>
    <span class="breadcrumb-slash">/</span>
</li>
</template>

<style lang="less">
.breadcrumb-item {
    display: inline-block;
    padding: 8px 0;
    &:last-child {
        a {
            color: #2a3c59;
        }
    }
}

.breadcrumb-anchor {
    text-decoration: none;
    color: #a5acbe;
}

.breadcrumb-anchor.v-link-active {
    font-weight: 700;
    color: #666;
    cursor: default;
}
.breadcrumb-anchor.v-link-active:hover {
    color: #666;
}

.breadcrumb-link {
    color: #a5acbe;
    transition: color 0.3s;
}
.breadcrumb-link:hover {
    color: #606677;
}

.breadcrumb-slash {
    margin: 0 5px;
}
.breadcrumb-item:last-child .breadcrumb-slash {
    display: none;
}
</style>

<script type="text/ecmascript-6">
export default {
    props: {
        link: {
            type: String,
            default: null
        }
    },

    data() {
        return {
            isLink: false
        };
    },

    ready() {
        if (this.link) {
            this.isLink = true;
        }
    }
};
</script>
