<template>
    <div id="phone">
        <div class="logo-img" v-if="stepData.imgUrl">
            <img :src="stepData.imgUrl" alt="">
        </div>
        <div class="code">
            <div class="code-font">溯源码 {{stepData.uniqueCode}}</div>
        </div>
        <div class="container clearfix">
            <div class="intro">
                <div class="intro-name ellipsis">
                    {{stepData.productName}}
                </div>
            </div>
            <div ref="baseDom" class="intro-content clear"
                >
                <div class="bg-connect">
                    <div class="bg-connect-left left"></div>
                    <div class="bg-connect-right right"></div>
                </div>
                <!-- 基本信息 -->
				<el-row :class="item.label == 'IMG' ? '' : 'factory-info'"
					v-if=" item.value "
					:span="24"
					v-for="(item, index) in stepData.generalInfoList"
					:key="index">
                    <el-col v-if="item.label != 'IMG'" :span="8"><div class="left">{{item.label}}</div></el-col>
                    <el-col v-if="item.label != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
                </el-row>
            </div>
            <!-- 折叠开始 -->
            <el-collapse accordion @change="handleAccordionChange" v-model="activeName" class="accordion-list">
                <el-collapse-item class="acc-li" name="-1" v-if="isMaterial == false && stepData.productInfos && stepData.productInfos.length > 0">
                    <template slot="title">
                        <i class="acc-font YL"> 原料 </i>
                    </template>
                    <div
                        class="acc-row acc-phone-material"
                    >
                    <span
                        v-for="(item, index) in stepData.productInfos"
                        :key="index"
                        class="ellipsis phone-material">
                        <router-link :to="{ name: 'defaults', query: {index: index, isMaterial: 'true'}}">
                            {{item.productName}}
                        </router-link>
                    </span>
                    </div>
                </el-collapse-item>
                <div v-for="(item, index) in stepData.moduleInfos" :key="index">
                    <base-step
                        :stepData="{data: item, index: index}"
                    >
                    </base-step>
                </div>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import BaseStep from "@/components/common/BaseStep";
import { isImg } from "@/config/mUtils";
import { getResumeDetails } from "@/api";
export default {
  components: { BaseStep },
  data() {
    return {
      activeName: "",
      isMaterial: false,
      stepData: {
        productName: "", //产品名称
        imgUrl: "", // 产品图片
        skinInfoCode: "", //皮肤
        templateCode: "", //模板
        uniqueCode: "", // 唯一编码
        generalInfoList: [], //产品字段
        // 产品流程
        moduleInfos: [],
        // 原料列表
        productInfos: [],
        productImportList: [] // 原料外链接
      }
    };
  },
  mounted: function() {
    let index = this.$route.query.index;
    this.isMaterial = this.$route.query.isMaterial || false;
    let resumeCode = this.$route.query.resumeCode || "LL-20180806-000022";
        getResumeDetails(resumeCode).then(data => {
        if (index == undefined) {
            this.stepData = data.data;
        } else {
            this.stepData = data.data.productInfos[index];
        }
    });
  },
  methods: {
    handleAccordionChange(val) {
      this.activeName = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/mixin";
.acc-font {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  background-size: 20px 20px !important;
  background-position: left center;
  transition: transform 0.4s;
  font-style: normal;
}
.logo-img {
  width: 375px;
}
.acc-li {
  margin: 8px 0;
  padding: 0 20px;
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
  margin-right: 10px;
  height: 30px;
  width: 30px;
  margin-top: -10px;
  background: $color;
  border-radius: 4px;
  text-align: center;
  position: relative;
  z-index: 9;
  cursor: pointer;
  i {
    color: #fff;
    position: relative;
    top: 6px;
  }
}
.acc-phone-material {
  overflow: hidden;
}
.phone-material {
  border: 1px solid #e2e2e2;
  //padding: 4px 14px;
  width: 40px;
  height: 30px;
  line-height: 28px;
  margin: 6px;
  float: left;
  min-width: 80px;
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
  width: 346px;
  height: 46px;
  line-height: 46px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
#mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 375px;
  height: 100%;
  margin: 20px auto;
  top: 0;
  z-index: 2;
}
.more-border {
  border: 1px solid $color !important;
}
.container {
  padding: 20px 0;
  background: $color;
}
#phone {
  width: 375px;
  margin-top: 20px;
  margin: 20px auto;
}
.code {
  @include wh(100%, 69px);
  position: relative;
  @include bis("~@/assets/images/bg-code.png");
  .code-font {
    @include center();
    @include wh(100%, 69px);
    line-height: 69px;
    font-size: 17px;
    text-align: center;
  }
}
.intro {
  margin: 0 auto;
  @include wh(346px, 70px);
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
    width: 200px;
    text-align: center;
  }
}
.intro-content {
  margin: 20px auto;
  width: 346px;
  background-color: #fff;
  padding: 20px;
  @include bR(9px);
  position: relative;
}
.bg-connect {
  div {
    position: absolute;
    top: -28px;
    @include wh(6px, 40px);
    @include bis("~@/assets/images/connect.png");
    background-size: 6px 40px;
  }
  .bg-connect-left {
    left: 20px;
  }
  .bg-connect-right {
    right: 20px;
  }
}
.accordion-list {
  font-size: 18px;
  width: 346px;
  margin: 0 auto;
}
.factory-info {
  font-size: 16px;
  padding: 20px 0;
  line-height: 20px;
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
</style>