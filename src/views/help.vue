<style lang="less">

.ihr-error {
    background: #67ACE4 url("../assets/images/error/error_bg.jpg") center center;
    .container {
        margin: 0 auto;
        padding-top: 50px;
        text-align: center;
        width: 560px;
        img {
            border: medium none;
            margin-bottom: 30px;
        }
        .error {
            height: 200px;
            position: relative;
        }
        .error img {
            bottom: -50px;
            position: absolute;
            right: -50px;
        }
        .msg {
            margin-bottom: 65px;
        }
        .back-home {
            cursor: pointer;
        }
        .num {
            margin: 0 0 30px 0;
            font-size: 20px;
            color: #fff;
        }
    }
    .cloud {
        background: url("../assets/images/error/error_cloud.png") repeat-x scroll 0 0 transparent;
        bottom: 0;
        height: 170px;
        position: absolute;
        width: 100%;
    }
}

</style>

<template lang="html">

<div class="ihr-error" v-bind:style="{height:height}">
    <div class="container">
        <img class="png" src="assets/images/error/404.png" />
        <!-- <div class="num">
            倒数n秒,跳转首页
        </div> -->
        <p>
            <img class="back-home" @click="backHome" src="assets/images/error/404_to_index.png" />
        </p>
    </div>
    <div class="cloud"></div>
</div>

</template>

<script>

export default {
    data() {
            return {
                height: ''
            }
        },
        computed: {

        },
        ready() {
            this.wheight();
        },
        attached() {},
        methods: {
            wheight: function(event) {
                let winHeight = window.innerHeight;
                this.height = winHeight + 'px';
            },
            backHome: function() {
                this.$router.go({
                    name: 'home'
                });
            }
        },
        components: {}
}

</script>
