<template>
    <div class="tree-info-block">
        <div class="tree-head headTreeBg"></div>
        <div class="tree-body" v-if="toData.data.length == 1 && toData.data[0].generalInfoList.length > 0">
          <!--第一个为右侧-->
          <div class="tree-w174 headTopTreeBg" >
            <div class="tree-right">
              <div class="tree-line-right treeLineRight"></div>
              <div class="farm-img" @click="viewMore(0)">
                <img v-if="toData.data[0].imgUrlList"
                    :src="toData.data[0].imgUrlList[0].url"/>
                <img v-else
                    src="~@/assets/images/no-img.png"/>
              </div>
              <div class="txt-flow">
                {{ toData.data[0].generalInfoList[0].value || ''}}
                <span class="more" @click="viewMore(0)">更多》</span>
                <br/>
                <p class="txt-date">{{ toData.data[0].generalInfoList[1].value | formatTime('Y-m-d') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tree-body" v-if="toData.data.length > 1 && toData.data[0].generalInfoList.length > 0">
          <!--第一个为右侧-->
          <div class="tree-w174 headTopTreeBg" >
            <div class="tree-right">
              <div class="tree-line-right treeLineRight"></div>
              <div class="farm-img" @click="viewMore(0)">
                <img v-if="toData.data[0].imgUrlList"
                    :src="toData.data[0].imgUrlList[0].url"/>
                <img v-else
                    src="~@/assets/images/no-img.png"/>
              </div>
              <div class="txt-flow">
                {{ toData.data[0].generalInfoList[0].value || ''}}
                <span class="more" @click="viewMore(0)">更多》</span>
                <br/>
                <p class="txt-date">{{ toData.data[0].generalInfoList[1].value | formatTime('Y-m-d') }}</p>
              </div>
            </div>
          </div>
          <!--循环tree-w348,里面有一个left,一个right-->
          <div v-for="(item, index) in toData.data.slice(1)" :key="index">
            <div v-if="index%2==0" class="tree-h174-left rightTreeBg">
              <div class="tree-left">
                <div class="tree-line-left treeLineleft"></div>
                <div class="farm-img" @click="viewMore(index + 1)">
                  <img v-if="item.imgUrlList"
                      :src="item.imgUrlList[0].url"/>
                  <img v-else
                      src="~@/assets/images/no-img.png"/>
                </div>
                <div class="txt-flow">
                  {{ toData.data.slice(1)[index].generalInfoList[0].value || '' }}
                  <span class="more" @click="viewMore(index + 1)">更多》</span>
                  <br/>
                  <p class="txt-date">{{ toData.data.slice(1)[index].generalInfoList[1].value | formatTime('Y-m-d') }}</p>
                </div>
              </div>
            </div>
            <div v-if="index%2==1" class="tree-h174-right rightTreeBg">
              <div class="tree-right">
                <div class="tree-line-right treeLineRight"></div>
                <div class="farm-img" @click="viewMore(index + 1)">
                  <img v-if="item.imgUrlList"
                      :src="item.imgUrlList[0].url"/>
                  <img v-else
                      src="~@/assets/images/no-img.png"/>
                </div>
                <div class="txt-flow">
                  {{ toData.data.slice(1)[index].generalInfoList[0].value || ''}}
                  <span class="more" @click="viewMore(index + 1)">更多》</span>
                  <br/>
                  <p class="txt-date">{{ toData.data.slice(1)[index].generalInfoList[1].value | formatTime('Y-m-d') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tree-foot footTreeBg"></div>
      </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import { formatTime } from '@/config/mUtils'
    export default {
        props: ['toData'],
        data() {
            return {

            }
        },
        methods: {
          ...mapMutations([
              'TREE_MORE',
          ]),
          viewMore(index) {
            this.TREE_MORE( {data: this.toData.data[index].generalInfoList, imgs: this.toData.data[index].imgUrlList} );
            this.$emit('viewMore', index);
          }
        },
        filters: {
          formatTime
        },
    }
</script>

<style lang='scss'>
    @import '../../assets/style/mixin';


@function pxToRem($px) {
  @return $px/100px*1rem;
}
.more {
  cursor: pointer;
}

// 树
.headTreeBg {
    background: url('~@/assets/images/tree-head.png') no-repeat;
    background-size: 100% 100%;
};
.headTopTreeBg {
    background: url('~@/assets/images/tree-body-one.png') no-repeat center bottom;
    background-size: 100% 100%;
}
.footTreeBg {
    background: url('~@/assets/images/tree-foot.png') no-repeat;
    background-size: 100% 100%;
};
.treeLineRight {
    background: url('~@/assets/images/tree-right.png') no-repeat;
    background-size: 100%;
};
.treeLineleft {
    background: url('~@/assets/images/tree-left.png') no-repeat;
     background-size: 100%;
};
.rightTreeBg {
    background: url('~@/assets/images/tree-body.png') no-repeat center bottom;
    background-size: 100% 100%;
};
.tree-right .txt-flow{
    padding-left: .4rem!important;
}
.tree-left .txt-flow{
    padding-left: .05rem!important;
}
.tree-info-block{
  position: relative;
  padding: pxToRem(20px) 0 pxToRem(153px);
}
.tree-info-block .tree-head{
  height: pxToRem(76px);
  //background: url(../../images/resume/YinpianResume_tree_head.png) no-repeat center top;
}
.tree-info-block .tree-body{
  //min-height: pxToRem(180px);
}
.tree-info-block .tree-foot{
  position: absolute;
  left: 0;
  bottom: pxToRem(2px);
  right: 0;
  z-index: 1;
  height: pxToRem(153px);
  //background: url(../../images/resume/YinpianResume_tree_foot.png) no-repeat center top;
}
.tree-body .tree-w174{
  position: relative;
  height: pxToRem(100px);
  //margin-left:pxToRem(6px);

  //background: url(../../images/resume/YinpianResume_tree_body_head.png) repeat-y;
}
.tree-body .tree-h174-left{
  position: relative;
  height: pxToRem(100px);
  //margin-left:-2px;
  //background: url(../../images/resume/YinpianResume_tree_body.png) repeat-y center top;
}
.tree-body .tree-h174-left .tree-left{
  position: absolute;
  top: 0;
  left: pxToRem(5px);
  width: pxToRem(154px);
  height:pxToRem(100px);
  //padding-left: pxToRem(32px);
  //box-sizing: border-box;
}
.tree-body .tree-left .tree-line-left{
  position: absolute;
  right: pxToRem(16px);
  top: pxToRem(25px);
  width: pxToRem(71px);
  height: pxToRem(11px);
  //background: url('/static/image/tree/YinpianResume_tree_linel.png') no-repeat;
  //background-size: 100%;
  //content: '';
}
.tree-body .tree-w174 .tree-right{
  position: absolute;
  bottom: 0;
  right: pxToRem(-2px);
  width: pxToRem(190px);
  height: pxToRem(100px);
  padding-left: pxToRem(30px);
  box-sizing: border-box;
}
.tree-body .tree-h174-right{
  position: relative;
  height: pxToRem(100px);
  //background: url(../../images/resume/YinpianResume_tree_body.png) repeat-y center bottom;
}
.tree-body .tree-h174-right .tree-right{
  position: absolute;
  top: 0;
  right: pxToRem(-2px);
  width: pxToRem(190px);
  padding-left: pxToRem(30px);
  box-sizing: border-box;
}
.tree-body .tree-right .tree-line-right{
  position: absolute;
  left: pxToRem(20px);
  top: pxToRem(25px);
  width: pxToRem(71px);
  height: pxToRem(11px);
  //background: url('/static/image/tree/YinpianResume_tree_liner.png') no-repeat;
  //background-size: 100%;
  //content: '';
}
.tree-body .farm-img{
  float: left;
  width: pxToRem(47px);
  height: pxToRem(47px);
  margin-left: pxToRem(18px);
  border: pxToRem(3px) solid #99c19b;
  border-radius: 50%;
  overflow: hidden;
}
.tree-body .tree-right .farm-img{
  margin-left: pxToRem(62px);
}
.tree-body .farm-img img{
  width: 100%;
  height: 100%;
}
.tree-body .txt-flow{
  display: inline-block;
  min-width: pxToRem(134px);
  line-height: pxToRem(20px);
  margin-top: pxToRem(6px);
  font-size: pxToRem(14px);
  color: #2b2b2b;
  text-align: left;
  padding-left: pxToRem(30px);
  box-sizing: border-box;
}
.tree-body .txt-flow span{
  font-size: pxToRem(12px);
  color: #49b39b;
}
.tree-body .company-name{
  display: inline-block;
  max-width: pxToRem(130px);
  vertical-align: top;
  text-indent: pxToRem(14px);
  color: #92bd00;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.tree-body .txt-date{
  display: inline;
  font-size: pxToRem(12px);
  color: #666;
}
.tree-body .director-name{
  display: inline-block;
  max-width: pxToRem(130px);
  vertical-align: top;
  text-indent: pxToRem(14px);
  color: #666;
  font-size: pxToRem(15px);
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.tree-body .txt-result{
  display: inline-block;
  max-width: pxToRem(130px);
  vertical-align: top;
  text-indent: pxToRem(14px);
  color: #dd2516;
  font-size: pxToRem(15px);
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.tree-body .view-more{
  display: inline-block;
  max-width: pxToRem(140px);
  vertical-align: top;
  text-indent: pxToRem(14px);
  color: #379d62;
  font-size: pxToRem(15px);
  overflow: hidden;
  cursor: pointer;
}
.pick-pictures{
  float: left;
  max-width: pxToRem(96px);
  padding: pxToRem(32px) 0 0;
  overflow: hidden;
}
.pick-pictures img{
  float: left;
  width: pxToRem(42px);
  height: pxToRem(42px);
  margin-left: pxToRem(6px);
  border-radius: 50%;
}
</style>