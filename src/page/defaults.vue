<template>
    <div id="phone">
		<div v-show="!isShowTreeMore">
			<div class="logo-img" v-if="stepData.imgUrlList && stepData.imgUrlList[0]" :style="{height:'2rem', overflow:'hidden'}">
				<img :src="stepData.imgUrlList[0].url" alt="">
			</div>
			<div class="code">
				<div class="code-font">溯源码 {{stepData.uniqueCode}}</div>
			</div>
			<div class="container clearfix">
				<div class="intro">
					<div class="intro-name ellipsis">
						{{stepData.resumeTemplateName}}
					</div>
				</div>
				<div ref="baseDom" class="intro-content clear"
					v-if="stepData.generalInfoList"
					>
					<div class="bg-connect">
						<div class="bg-connect-left left"></div>
						<div class="bg-connect-right right"></div>
					</div>
          <!-- 第三方企业认证 -->
            <el-row :gutter="20" class="icon-info icon-info-top" v-if="stepData.authenticationList && stepData.authenticationList.length > 0">
              <el-col
                :span="24 / stepData.authenticationList.length"
                v-for="(item, index) in stepData.authenticationList"
                            v-if="item.label"
                :key="index">
                <div
                type="text"
                class="ellipsis"
                :class="'factory' + index"
                @click="thirdActive = index">{{item.label}}</div>
              </el-col>
            </el-row>
            <el-row class="icon-info" v-if="stepData.authenticationList && stepData.authenticationList.length > 0">
              <el-col
                class="factory-intro"
                v-show="thirdActive == index && item.value"
                :span="24"
                v-for="(item, index) in stepData.authenticationList"
                :key="index">
                {{item.value}}
                <div class="factory-intro-top"
                :style="stepData.authenticationList.length == 2 ? (index==1 ?'left:60%;':''): (stepData.authenticationList.length == 3 ? (index==1 ?'left:44%;':(index==2 ?'left:80%;':'')): '')"></div>
              </el-col>
				    </el-row>
					<!-- 基本信息 -->
					<el-row
						class="factory-info"
						v-if=" item.value "
						:span="24"
						v-for="(item, index) in stepData.generalInfoList"
						:key="index">
						<el-col :span="8"><div class="left">{{item.label}}</div></el-col>
            <el-col v-if="item.label.indexOf('企业') != -1" :span="16">
              <div class="right t">{{stepData.enterpriseSelectName}}</div>
            </el-col>
						<el-col v-else :span="16"><div class="right t">{{item.value}}</div></el-col>
					</el-row>
				</div>
				<!-- 折叠开始 -->
				<el-collapse accordion @change="handleAccordionChange" v-model="activeName" class="accordion-list">
					<el-collapse-item
						class="acc-li"
						name="-1"
						v-if="isMaterial == false && (stepData.resumeDataTwoOnes && stepData.resumeDataTwoOnes.length > 0 || stepData.productImportList && stepData.productImportList.length > 0)">
						<template slot="title">
							<i class="acc-font YL"> 原料 </i>
						</template>
						<div
							class="acc-row acc-phone-material"
							v-if="stepData.resumeDataTwoOnes"
						>
							<span
								v-for="(item, index) in stepData.resumeDataTwoOnes"
								:key="index"
								class="ellipsis phone-material">
								<router-link :to="{ name: 'defaults', query: {resumeCode: resumeCode,index: index, isMaterial: 'true'}}">
									{{item.resumeTemplateName}}
								</router-link>
							</span>
						</div>
						<div
							class="acc-row acc-phone-material"
							v-if="stepData.productImportList"
						>
							<span
								v-for="(item, index) in stepData.productImportList"
								:key="index"
								class="ellipsis LL-button">
								<a :href="item.value">{{item.label}}</a>
							</span>
						</div>
					</el-collapse-item>
					<div v-for="(item, index) in stepData.moduleInfos" :key="index">
						<base-step
							:stepData="{data: item, index: index}"
							@viewMore="viewMore"
						>
						</base-step>
					</div>
				</el-collapse>
			</div>
		</div>
        <tree-more :isShowTreeMore="isShowTreeMore" @closeMore="closeMore"></tree-more>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BaseStep from "@/components/common/BaseStep";
import TreeMore from "@/components/common/TreeMore";
import { isImg, formatData, getScrollTop, setScrollTop, template2Data, material2Data } from "@/config/mUtils";
import { getResumeDetails } from "@/api";
export default {
  components: { BaseStep, TreeMore },
  data() {
    return {
      thirdActive: 0,
      scrollTop: 0,
      isShowTreeMore:false,
      activeName: "",
      isMaterial: false,
      stepData: {
        enterpriseName:'', // 本机企业
        enterpriseInfoId:'',
        resumeTemplateName: "", //产品名称
        imgUrlList: "", // 产品图片
        uniqueCode: "", // 唯一编码
        generalInfoList: [], //产品字段
        // 产品流程
        moduleInfos: [],
        // 原料列表
        resumeDataTwoOnes: [],
        productImportList: [] // 原料外链接
      }
    };
  },
  computed: {
      resumeCode:function() {
        return this.$route.query.resumeCode
      }
  },
  mounted: function() {
    let index = this.$route.query.index;
    this.isMaterial = this.$route.query.isMaterial || false;
    let resumeCode = this.$route.query.resumeCode || "";
        getResumeDetails(resumeCode).then(data => {
          // 处理数据的地方
        if (index == undefined) {
            template2Data(data.data).then( () => {
              this.stepData = data.data;
              console.log(this.stepData)
            });
        } else {
            Promise.all([material2Data(data.data.resumeDataTwoOnes[index]), template2Data(data.data.resumeDataTwoOnes[index])]).then( () => {
              this.stepData = data.data.resumeDataTwoOnes[index];
              console.log(this.stepData)
            })
        }
    });
  },
  methods: {
    handleAccordionChange(val) {
      this.activeName = val;
	},
	viewMore() {
		this.scrollTop = getScrollTop();
		this.isShowTreeMore = true;
		setScrollTop(0);
	},
	closeMore() {
		this.isShowTreeMore = false;
		this.$nextTick( () => {
				setScrollTop(this.scrollTop);
		})
	}
 },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/mixin";
.LL-button {
    display: inline-block;
    cursor: pointer;
    height: .3rem;
    line-height: .3rem;
    font-size: 14px;
    padding: 0 .1rem 0 .22rem !important;
    margin: .06rem;
    border:1px solid rgba(86, 190, 158, .54);
    background-color: rgba(88, 191, 159,.05);
    @include bis('~@/assets/images/tag.png');
    @include bR(4px);
    background-size: .14rem .14rem;
    background-position: 6px center;
    color:$color;
    a {
        color: rgb(86, 190, 158);
    }
}
.acc-font {
  display: inline-block;
  position: relative;
  padding-left: .3rem;
  background-size: .2rem .2rem !important;
  background-position: left center;
  transition: transform 0.4s;
  font-style: normal;
}
.logo-img {
  width: 3.75rem;
}
.acc-li {
  margin: .08rem 0;
  padding: 0 .2rem;
  background-color: #fff;
  border-radius: 6px;
  .YL {
    @include bis("~@/assets/images/material.png");
  }
}
.over {
  z-index: 99;
}
.step-edit {
  margin-right: .1rem;
  height: .3rem;
  width: .3rem;
  margin-top: -0.1rem;
  background: $color;
  border-radius: 4px;
  text-align: center;
  position: relative;
  z-index: 9;
  cursor: pointer;
  i {
    color: #fff;
    position: relative;
    top: .06rem;
  }
}
.acc-phone-material {
  overflow: hidden;
}
.phone-material {
  border: 1px solid #e2e2e2;
  width: .4rem;
  height: .3rem;
  line-height: .28rem;
  margin: .06rem;
  float: left;
  min-width: .8rem;
  text-align: center;
  border-radius: 4px;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  i {
    cursor: pointer;
  }
  &:hover {
    a {
      color: $color;
    }
    border-color: $color;
  }
}
.add-step {
  width: 3.46rem;
  height: .46rem;
  line-height: .46rem;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
#mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 3.75rem;
  height: 100%;
  margin: .20rem auto;
  top: 0;
  z-index: 2;
}
.more-border {
  border: 1px solid $color !important;
}
.container {
  padding: .2rem 0;
  background: $color;
}
.code {
  @include wh(100%, .69rem);
  position: relative;
  @include bis("~@/assets/images/bg-code.png");
  .code-font {
    @include center();
    @include wh(100%, .69rem);
    line-height: .69rem;
    font-size: .17rem;
    text-align: center;
  }
}
.intro {
  margin: 0 auto;
  @include wh(3.46rem, .7rem);
  @include bR(9px);
  @include bis("~@/assets/images/bg-name.png");
  background-color: #fff;
  background-size: 80%;
  background-position: center center;
  position: relative;
  .intro-name {
    font-size: 24px;
    @include center();
    color: $color;
    font-weight: bold;
    width: 2rem;
    text-align: center;
  }
}
.intro-content {
  margin: .2rem auto;
  width: 3.46rem;
  background-color: #fff;
  padding: .2rem;
  @include bR(9px);
  position: relative;
}
.bg-connect {
  div {
    position: absolute;
    top: -28px;
    @include wh(6px, .4rem);
    @include bis("~@/assets/images/connect.png");
    background-size: .06rem .4rem;
  }
  .bg-connect-left {
    left: .2rem;
  }
  .bg-connect-right {
    right: .2rem;
  }
}
.accordion-list {
  font-size: 18px;
  width: 3.46rem;
  margin: 0 auto;
}
.factory-info {
  font-size: 16px;
  padding: .2rem 0;
  line-height: .2rem;
  border-bottom: 1px dashed $color2;
}
.logo-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
.icon-info {
      font-size: 14px;
      .factory0 {
          @include bis('~@/assets/images/factory-1.png');
      }
      .factory1 {
          @include bis('~@/assets/images/factory-2.png');
      }
      .factory2 {
          @include bis('~@/assets/images/factory-3.png');
      }
      .ellipsis  {
          margin: 10px 0;
          padding-left: 20px;
          background-size: 16px 18px;
          height: 20px;
          line-height: 19px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width:100%;
          display: inline-block;
          text-align: left;
      }
      .factory-intro {
          width: 100%;
          background-color: #ededed;
          color:#666;
          text-align: left;
          @include bR(4px);
          padding: 5px 10px;
          position: relative;
          .factory-intro-top {
              position: absolute;
              width:15px;
              height:7px;
              top: -7px;
              left: 8%;
              @include bis('~@/assets/images/cart.png');
          }
          .factory-intro-top2{
              left: 20px;
          }
      }
  }
</style>