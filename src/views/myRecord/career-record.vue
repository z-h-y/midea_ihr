<style lang="less">

.ihr-myRecord {
    box-sizing: border-box;
    @-webkit-keyframes showIn {
        0%,
        70% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes showIn {
        0%,
        70% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .record-head {
        width: 100%;
        text-align: center;
        .text {
            color: #2a3c59;
            font-weight: bold;
            font-size: 24px;
            line-height: 32px;
        }
    }
    .timezone {
        width: 1px;
        background: #d3eafb;
        margin: 0 auto;
        border-radius: 3px;
        position: relative;
        top: 30px;
        transition: height 0.65s linear;
    }

    .timezonelog() {
        position: absolute;
        left: -11px;
        top: -10px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 4px solid #d5ebfc;
        background: #fff;
        -webkit-transition: all 0.65s;
        -webkit-animation: showIn ease;
    }
    .time:nth-child(odd),
    .time:nth-child(even),
    {
        .timezonelog;
    }
    .time:nth-child(even) {
        top: 100px;
    }
    .time h2 {
        position: absolute;
        margin-left: -120px;
        color: #8d94a1;
        font-size: 14px;
        cursor: pointer;
        -webkit-animation: showIn 0.3s ease;
    }
    .time:nth-child(even) h2 {
        margin-left: 60px;
        width: 100px;
    }
    .time:hover,
    .time:nth-child(even):hover {
        border: 4px solid #aadaff;
        box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.4);
    }
    .time div,
    .time:nth-child(even) div {
        position: absolute;
        display: table;
        top: 50%;
        margin-top: -30px;
        left: 50px;
        width: 300px;
        min-height: 56px;
        background: #f5fbff;
        border: 3px solid #f5fbff;
        border-radius: 10px;
        z-index: 2;
        overflow: hidden;
        cursor: pointer;
        animation: showIn 1s ease;
        transition: all 1s;
    }
    .time:nth-child(even) div {
        left: -337px;
    }
    .time div p,
    .time:nth-child(even) div p {
        display: table-cell;
        vertical-align: middle;
        color: #92aac0;
        font-size: 16px;
        padding: 2px 2px 2px 20px;
        font-weight: bold;
        text-align: left;
    }
    .time:before,
    .time:nth-child(even):before {
        content: '';
        position: absolute;
        top: -2px;
        left: 32px;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-right: 10px solid #f5fbff;
        z-index: 1;
        animation: showIn 1s ease;
    }
    .time:nth-child(even):before {
        left: -33px;
        border: 10px solid transparent;
        border-left: 10px solid #f5fbff;
    }
    .hide-before {
        border: 7px solid #d5ebfc !important;
        left: -14px !important;
        &:hover{
          border: 7px solid #aadaff !important;
        }
    }
    .hide-before:before {
        display: none;
    }
    .record-head-content {
        margin: 0 auto;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-myRecord">
    <panel :title="$t('home.myRecord')" class="panel-b" header="panel-header" v-bind:style="{ height: panelHeight + 'px' }">
        <div class="record-head">
            <h3 class="text">{{$t('myRecord.bigEvents')}}</h3>
        </div>
        <div class="timezone" v-bind:style="{ height: timeHeight + 'px' }">
            <div class="time hide-before" style="top: 0px;"></div>
            <div class="time" v-for="(index,item) in records" v-bind:style="{  'animation-duration': index/100 + 0.52 + 's', top: (index + 1) * 100 + 'px' }">
                <h2>{{item.recordTime}}</h2>
                <div>
                    <p>{{item.memo}}</p>
                </div>
            </div>
        </div>
    </panel>
</div>

</template>

<script>

import {
    filterDict
}
from '../../util/assist';
export default {

    data() {
            return {
                records: [],
                dicts: []
            };
        },
        computed: {
            timeHeight() {
                    return this.records.length * 100;
                },
                panelHeight() {
                    return 200 + this.records.length * 100;
                }
        },
        created() {
            this.fetchData();
        },
        methods: {

            fetchData() {
                this.$http.get('/employee/employees/EmployeeStaffRecord/myRecord').then((response) => {
                    if (response.data) {
                        this.records = response.data;
                    }
                })
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
};

</script>
