<style lang="less">
  #organization-chart-body{
    font-family:Arial;

    .orgChart-header{
        // width:1070px;
        height:70px;
        margin:auto;
        border-bottom:1px solid #e4e7ec;
    }
    .orgChart-selector {
      position:absolute;
      left:0;
      top:10px;
      height:60px;
      overflow:hidden;
      // border:1px solid yellow;
    }
    .orgChart-selector-box{
      float:left;
      position:relative;
      width:600px;
      height:45px;
      // border:1px solid blue;
    }
    .orgChart-history-box{
        float:left;
        height:40px;
        left:-15px;
        top:10px;
        position:absolute;
        // border:1px solid black;
    }
    .orgChart-history{
      position:absolute;
      padding:5px;
      width:250px;
      font-size:16px;
      line-height: 30px;
      color:blue;
      text-decoration:underline;
      height:30px;
      // border:1px solid black;
      left:10px;
      top:0px;
    }
    .orgChart-history-date{
      position:absolute;
      width:250px;
      height:40px;
      // border:1px solid black;
      left:-40px;
      top:0;
    }
    .orgChart-search-btn{
      // border:1px solid red;
      margin-top:3px;
      float:left;
    }
    .orgChart-download{
      float:right;
      margin-right:10px;
      margin-top:3px;
    }

    // 图表样式
        .info-container{
          font-family:"微软雅黑";
          background:#fbfbfd;
          margin:50px;
          width:240px;
          height:120px;
          border:1px solid #e4e7ec;
          position:relative;
        }
    .info-nav-text{
      color:#435066;
      font-size:16px;
      font-weight: 800;
      height:40px;
      border-bottom: 1px solid #e4e7ec;


    }
    .info-nav-text>p{
      padding-left:15px;
      height:40px;
      line-height:40px;
      width:180px;
      white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

    }
    .info-personal{
      position:relative;
      height:77px;
      font-size:14px;

      /*border:1px solid black;*/
    }
    .info-personName{
      color:#3aa2eb;
      /*border:1px solid red;*/
      float:left;
      width:130px;
      margin:15px 0 5px 15px;
      /*left:15px;*/

    }
    .info-personName>p{
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-position{
      color:#bec3d0;
      float:left;
      width:130px;
      margin:0 0 5px 15px;
      /*border:1px solid red;*/
    }
    .info-position>p{
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-person-pic{
      position: absolute;
      right:12px;
      top:10px;
      width:45px;
      height:45px;
      /*border:1px solid blue;*/
      background:#c1ddf2;
      border-radius: 30px;
      overflow:hidden;
      /*float:right;*/
      /*margin:0px 12px 0 0 ;*/
    }
    .info-person-pic>img{
      width:100%;
      height:100%;
    }

    .info-person-head{
      width:30px;
      height:30px;
      border-radius: 50%;
      background:white;
      position:absolute;
      margin:auto;
      top:6px;
      left:0;
      right:0;
      /*bottom:0;*/
    }
    .info-person-body{
      width:28px;
      height:28px;
      border-radius: 40%;
      background:white;
      position:absolute;
      margin:auto;
      bottom:-16px;
      left:0;
      right:0;
    }



    .info-more{
      width:25px;
      height:25px;
      border-radius: 50%;
      /*border:1px solid red;*/
      background:#3aa2eb;
      position:absolute;
      margin:auto;
      z-index: 5;
      top:0;
      bottom:0;
      right:-13px;
    }
    .info-more-point{
        width:10px;
        height:10px;
        position:absolute;
        margin:auto;
        /*top:0;*/
        top:0;
        bottom:0;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
      }
      .info-showMore-point{
        right:8px;
        transform:rotate(-45deg);

      }
      .info-hideMore-point{
        right:4px;
        transform:rotate(-225deg);
      }
    .info-more-count{
      width:16px;
      height:16px;
      border-radius:50%;
      background:red;
      position:absolute;
      right:-6px;
      top:-6px;
      color:white;
      font-size:12px;
      text-align: center;
      line-height:16px;
      font-weight: 500;
    }
    #organization-chart-diagram{
      min-height: 300px;
      overflow: auto;

      // 图表样式
      @import url('../../assets/lib/css/jquery.orgchart.less');





    }

    .orgChart-root-box{
        position:relative;
        margin-top:-20px;
        width:300px;
        // border:1px solid red;
    }

    .first-level-tree{
      position:absolute;
      right:-350px;
      top:0;
      // border:1px solid blue;
    }
    .orgChart-tree-list{
      position:relative;

    }
    .second-level-tree{
      position:absolute;
      right:-350px;
      top:-50px;
      // border:1px solid blue;
    }
    .direct-line{
      position:absolute;
      left:-57px;
      top:60px;
      width:107px;
      border-bottom:2px solid  #bfcbd9;
    }
    .bend-line{
      position:absolute;
      left:20px;
      bottom:60px;
      width:30px;
      height:170px;
      border-left:2px solid #bfcbd9;
      border-bottom: 2px solid #bfcbd9;
    }
    .orgChart-root-ele{
      // border:1px solid red;
      position:absolute;
      left:-42px;
    }
    .field-hint {
      width:200px;
    }




  }
</style>

<template lang="html">
<div>
<panel class="panel-b content-wrap" header="panel-header" id="organization-chart-body">
    <div class="orgChart-header">
        <div class="orgChart-selector-box">
          <v-form ref="orgchartform" :model="orgChart" :schema="orgChartSchema" label-width="120" label-suffix="" :cols="1" form-style="org-form">
              <div class="orgChart-selector">
                   <text-field property="selecteOrg" type="selector" 
                   :readonly="true" 
                   @open-selector="openSelector" 
                   :show="show" editor-width="200">
                   </text-field>
              </div>
          </v-form>
        </div>
        <div class="orgChart-search-btn">
          <div class="query-btn">

          </div>
        </div>

    </div>
    <div id="organization-chart-diagram">

    </div>

</panel>

<organization-selector ref="organization" @select-organization="receiveOrganization" :show="show" :disable-value="disableValue"></organization-selector>

</div>
</template>

<script >

import {default as Message } from '../../components/basic/message';
import {default as Schema } from '../../schema/index';
// import {formatDate} from '../../util/assist';
import $ from 'jquery';
require('../../assets/lib/js/organizationChart');




export default {
    data() {
            let orgChartSchema = new Schema({
              selecteOrg: {
                label: this.$t('organization.mergeOrg.org'),
                required:true
              },

              stratDate: {
                label: 'Date',
                type: 'date',
                default () {
                  return new Date();
                },
                required: true
              },
            });
            return {
                orgChartSchema: orgChartSchema,
                orgChart: orgChartSchema.newModel(),
                show: {  //控制组织选择器的显示
                    modal: false
                },
                initUrl: '/org/orgs/getUserCurrentOrg'
            };
        },

        created() {
          this.initUrl = '/org/orgs/getUserCurrentOrg';  //初始获取用户当前数据
        },
        mounted(){
            this.$nextTick(() => {
                let container = document.getElementById("organization-chart-diagram");
                let height = window.screen.height;
                container.style.minHeight = (height - 360) + 'px';
                this.createChart();
            });
            
        },
        methods:{
          openSelector() {
            this.$refs['organization'].open();
            this.show.modal = true;
          },
          receiveOrganization(orgInfo) {
               let name = orgInfo.orgShortName !== undefined ? orgInfo.orgShortName : orgInfo.fullUnitName;
                let orgId = orgInfo.orgId;
                this.orgChart.selecteOrg = name;
                this.initUrl = '/org/orgs/getCurrentOrgInfo';
                // this.searchId = node.orgId;
                this.createChart(orgId); //获取组织后查询
           },    
          createChart(orgId = '') {
            let currntUrl = this.initUrl;
            let chartContainer = $('#organization-chart-diagram');
                chartContainer.html("");
            var ajaxURLs = {
                  'children':function(nodeData) {
                    return '/org/orgs/getCurrentOrgInfo';
                  }
                };

                $(chartContainer).organizationChart({
                  'data' : currntUrl,
                  'ajaxURL': ajaxURLs,
                  'orgShortName': 'orgShortName',
                  'unitId': 'unitId',
                  'searchId': orgId,
                  'employeeName': 'employeeName',
                  'imgUrl': 'imgUrl',
                  'jobName': 'jobName',
                  'exportButton': true
                });
          }


        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }


};

</script>
