<style lang="less">

.expand-transition {
    transition: all .9s ease;
    background-color: #eee;
    // overflow: hidden;
}

.expand-enter,
.expand-leave {
    height: 0;
    padding: 0 10px;
    // opacity: 0;
}

</style>

<template lang="html">
<div class="">
  <div v-if="viewflag == '1'">
      <admin-home>
      </admin-home>
  </div>

  <div v-if="viewflag =='0'">
      <staff-home>
      </staff-home>
  </div>
</div>


</template>

<script>

import {
    default as Message
}
from '../components/basic/message';
export default {
    data() {
            return {
                viewflag: '-1'
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                    let isAdminFlag = false;
                    this.$http.get(`/public-access/isAdmin`).then((response) => {
                        if (!response.data) {
                            isAdminFlag = false;
                        } else {
                            isAdminFlag = true;
                        }
                        this.initView(isAdminFlag);
                    });
                },
                initView(isAdmin) {
                    let flag = localStorage.getItem('isAdmin');
                    if (flag != '0' && flag != '1') {
                        localStorage.setItem('isAdmin', '0');
                    }
                    this.flag = flag;
                    if (isAdmin) {
                        if (flag === '0') {
                            this.viewflag = '0';
                        } else {
                            this.viewflag = '1';
                        }
                    } else {
                        this.viewflag = '0';
                    }
                }
        },
        components: {
            adminHome: require('./home/adminHome.vue'),
            staffHome: require('./home/staffHome.vue')
        },
        events: {
            'main:initHomeView': function(expanded) {
                this.initView(expanded);
            }
        }
};

</script>
