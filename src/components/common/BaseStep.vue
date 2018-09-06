<template>
	<div>
		<!-- 基本模版 -> -->
		<el-collapse-item
			class="acc-li"
			:name="stepData.index"
			:class="stepData.data.moduleName | step2Class"
			>
			<template slot="title">
				<i class="acc-font"
					:class="stepData.data.moduleName2 | step2Class">
					{{stepData.data.moduleName}}
				</i>
			</template>
			<div v-if="stepData.data.generalInfoList && stepData.data.moduleName != '种植' && stepData.data.moduleName != '加工'">
				<el-row
					class="acc-row"
					v-if="stepData.data.imgUrlList && stepData.data.imgUrlList[0]"
					v-for="(item, index) in stepData.data.imgUrlList"
					:key="index">
					<el-col :span="24"><img :src="item.url" class="acc-img"></el-col>
				</el-row>
				<el-row
					class="acc-row factory-info"
					v-for="(item, index) in stepData.data.generalInfoList"
					v-if="item.label.indexOf('图片') == -1 && item.value"
					:key="(index + 1000)">
					<el-col :span="8"><div class="left">{{item.label}}</div></el-col>
					<el-col v-if="dateList.includes(item.dataType)" :span="16">
						<div class="right t">{{item.value && item.value | formatTime('Y-m-d')}}</div>
					</el-col>
					<el-col v-else-if="dateRangeList.includes(item.dataType)" :span="16">
						<div class="right t">{{item.value && item.value.split('-_-')[0] | formatTime('Y.m.d')}} {{item.value ? '~' : ''}} {{item.value && item.value.split('-_-')[1] | formatTime('Y.m.d')}}</div>
					</el-col>
					<el-col v-else-if="item.label.indexOf('企业') != -1" :span="16">
						<div class="right t">{{stepData.data.enterpriseSelectName}}</div>
					</el-col>
					<el-col v-else :span="16"><div class="right t">{{item.value}}</div></el-col>
				</el-row>
				<!-- 外部链接 -->
				<el-row class="acc-row factory-info"
					v-if="stepData.data.externalQuoteList && stepData.data.externalQuoteList[0] && stepData.data.externalQuoteList[0].externalURL"
				>
					<div class="LL-button-doc"
						v-for="(item, index) in stepData.data.externalQuoteList"
						v-if="item.externalURL"
						:key="(index + 100000)"
					>
						<a class="LL-href-doc" :href="item.externalURL">
							<span class="LL-link-font ellipsis">{{item.externalName}}</span>
							<span class="LL-link-icon"></span>
						</a>
					</div>
				</el-row>
				<!-- 文档引用 -->
				<el-row class="acc-row factory-info"
					v-if="stepData.data.documentUrlList && stepData.data.documentUrlList[0] && stepData.data.documentUrlList[0].url"
				>
					<div class="LL-button-doc"
						v-for="(item, index) in stepData.data.documentUrlList"
						v-if="item.url"
						:key="index + 2222"
					>
						<a class="LL-href-doc" :href="item.url">
							<span class="LL-doc-font ellipsis">{{item.name}}</span>
							<span class="LL-doc-icon"></span>
						</a>
					</div>
				</el-row>
			</div>
			<!-- 种植, 加工, 处理 -->
			<div v-else-if="stepData.data.subModelInfoList && (stepData.data.moduleName == '种植' || stepData.data.moduleName == '加工')">
				<el-tabs v-model="activeName2">
				<el-tab-pane
					:label="item.label || '无返回'"
					:name="index+'h'"
					v-for="(item, index) in stepData.data.subModelInfoList"
					:key="(index + 100000)">
					<span slot="label">
						<span class="pro-icon-1" v-if="item.label == '种植基本信息'"><svg-icon icon-class="zz"></svg-icon></span>
						<span class="pro-icon-2" v-else-if="item.label == '环境信息'"><svg-icon icon-class="hj"></svg-icon></span>
						<span class="pro-icon-2" v-else-if="item.label == '田间管理'"><svg-icon icon-class="tj"></svg-icon></span>
						<span class="pro-icon-1" v-if="item.label == '加工基本信息'"><svg-icon icon-class="jg"></svg-icon></span>
						<span class="pro-icon-2" v-if="item.label == '工序流程'"><svg-icon icon-class="gx"></svg-icon></span>
						{{item.label || '无返回'}}
					</span>
					<!-- 基本模型 -->
					<div class="item-container" v-if="item.label != '工序流程' && item.label != '田间管理'">
						<div class="env-info">
							<span class="env-info-pointer"></span><span class="env-info-line"></span>
							<span class="env-info-font">{{item.label}}</span>
							<span class="env-info-line"></span><span class="env-info-pointer"></span>
						</div>
						<el-row
							class="acc-row"
							v-if="item.imgUrlList && item.imgUrlList[0] && item.imgUrlList[0].url"
							v-for="(item2, index1) in item.imgUrlList"
							:key="(index1 + 100)">
							<el-col :span="24"><img :src="item2.url" class="acc-img"></el-col>
						</el-row>
						<el-row
							class="acc-row factory-info"
							v-for="(item1, index) in item.generalInfoList"
							v-if="item1.label.indexOf('图片') == -1 && item1.value"
							:key="(index + 111)">
							<el-col :span="8"><div class="left">{{item1.label}}</div></el-col>
							<el-col v-if="dateList.includes(item1.dataType)" :span="16">
								<div class="right t">{{item1.value && item1.value | formatTime('Y-m-d')}}</div>
							</el-col>
							<el-col v-else-if="dateRangeList.includes(item1.dataType)" :span="16">
								<div class="right t">{{item1.value && item1.value.split('-_-')[0] | formatTime('Y.m.d')}} {{item1.value ? '~' : ''}} {{item1.value && item1.value.split('-_-')[1] | formatTime('Y.m.d')}}</div>
							</el-col>
							<el-col v-else-if="item1.label.indexOf('企业') != -1" :span="16">
								<div class="right t">{{stepData.data.enterpriseSelectName}}</div>
							</el-col>
							<el-col v-else :span="16"><div class="right t">{{item1.value}}</div></el-col>
						</el-row>
						<!-- 外部链接 -->
						<el-row class="acc-row factory-info"
							v-if="stepData.data.externalQuoteList && stepData.data.externalQuoteList[0] && stepData.data.externalQuoteList[0].externalURL"
						>
							<div class="LL-button-doc"
								v-for="(item, index) in stepData.data.externalQuoteList"
								v-if="item.externalURL"
								:key="(index + 100000)"
							>
								<a class="LL-href-doc" :href="item.externalURL">
									<span class="LL-link-font ellipsis">{{item.externalName}}</span>
									<span class="LL-link-icon"></span>
								</a>
							</div>
						</el-row>
						<!-- 文档引用 -->
						<el-row class="acc-row factory-info"
							v-if="stepData.data.documentUrlList && stepData.data.documentUrlList[0] && stepData.data.documentUrlList[0].url"
						>
							<div class="LL-button-doc"
								v-for="(item, index) in stepData.data.documentUrlList"
								v-if="item.url"
								:key="index + 2222"
							>
								<a class="LL-href-doc" :href="item.url">
									<span class="LL-doc-font ellipsis">{{item.name}}</span>
									<span class="LL-doc-icon"></span>
								</a>
							</div>
						</el-row>
					</div>
					<!-- 特殊步骤 -->
					<div v-else-if="stepData.data.moduleName == '种植' && item.label == '田间管理'">
						<!-- 树苗 -->
						<base-tree :toData="{data: item.subModelInfoInfoList}" @viewMore="viewMore"></base-tree>
					</div>
						<!-- 加工流程 -->
					<div v-else-if="stepData.data.moduleName == '加工' && item.label == '工序流程'">
						<div class="left jg-container" style="display:none;">
							<el-steps direction="vertical">
								<el-step
									title=""
									v-for="(item, index) in item.subModelInfoInfoList"
									:key="(index + 222)"
								></el-step>
							</el-steps>
						</div>
						<div
							class="left jg-step"
							v-for="(item, index) in item.subModelInfoInfoList"
							@click="viewMore2(item)"
							:key="(index + 1000)">
							<div v-if="item.imgUrlList && item.imgUrlList[0] && item.imgUrlList[0].url"><img :src="item.imgUrlList[0].url" alt="图片"></div>
							<div v-if="item.generalInfoList[0].value">工序名称: {{item.generalInfoList[0].value}}</div>
							<div v-if="item.generalInfoList[1].value">
								 生产时间段:
								 {{item.generalInfoList[1].value && item.generalInfoList[1].value.split('-_-')[0] | formatTime('Y.m.d')}}
								 {{item.generalInfoList[1].value ? '~' : ''}}
								 {{item.generalInfoList[1].value && item.generalInfoList[1].value.split('-_-')[1] | formatTime('Y.m.d')}}
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
			</div>
		</el-collapse-item>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import BaseTree from '@/components/common/BaseTree'
	import { formatTime, step2Class } from '@/config/mUtils'
    export default {
		components: { BaseTree },
        props: ['stepData'],
        data() {
            return {
				activeName2: '0h',
				dateList: [3, 4],
				dateRangeList: [5, 6],
            }
		},
		filters: {
			formatTime, step2Class
		},
		methods: {
			...mapMutations([
				'TREE_MORE',
			]),
			editStep(index) {
				this.$emit("editStep", index);
			},
			handleEnterStep() {
				this.$emit("handleEnterStep");
			},
			handleLeaveStep() {
				this.$emit("handleLeaveStep");
			},
			viewMore() {
				this.$emit('viewMore');
			},
			viewMore2(item, index) {
				this.TREE_MORE( {data: item.generalInfoList, imgs: item.imgUrlList} );
				this.$emit('viewMore')
			}
		},
    }
</script>

<style lang="scss" scoped>
	@import '../../assets/style/mixin';
	.LL-button {
		display: inline-block;
		cursor: pointer;
		height: .3rem;
		line-height: .3rem;
		font-size: .14rem;
		padding: 0 .1rem 0 .22rem !important;
		margin: 0 20px 20px 0!important;
		border:1px solid rgba(86, 190, 158, .54);
		background-color: rgba(88, 191, 159,.05);
		@include bis('~@/assets/images/tag.png');
		@include bR(4px);
		background-size: .14rem .14rem;
		background-position: .06rem center;
		color: $color;
		max-width: 3rem;
	}
	.LL-button-doc {
		max-width: 3rem;
		color: #51bd9c;
		display: inline-block;
		height: .3rem;
		width:45%;
		a {
			max-width: 3rem;
			color: #51bd9c;
			text-align: left;
			font-size: .14rem;
			display: inline-block;
			cursor: pointer;
			height: .3rem;
			line-height: .3rem;
			width:100%;
			border: 1px solid #e7e7e7;
			border-radius: 4px;
		}
		.LL-doc-font {
			float:left;
			width: calc(100% - 0.3rem);
			height: 100%;
			color: #51bd9c;
			padding: 0 4px;
			line-height: .28rem;
		}
		.LL-link-font {
			color: #409EFF !important;
		}
		.LL-doc-icon {
			width: .3rem;
			height: 100%;
			float: right;
			background: #51bd9c url('~@/assets/images/icon-doc.png') no-repeat center center;
			background-size: 14px;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
		}
		.LL-link-icon {
			background: #409EFF url('~@/assets/images/icon-doc.png') no-repeat center center !important;
		}
	}
	.LL-href-doc {
		width: 100%;
	}
	.LL-href {
		width: 100%;
		height: .3rem;
		display: inline-block;
		color:$color;
	}
	.pro-icon-1, .pro-icon-2 {
		position: absolute;
		top: -69px;
		font-size: 24px;
	}
	.pro-icon-1 {
		left: 30px;
	}
	.pro-icon-2 {
		left: 17px;
	}
	.jg-step {
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 6px;
		margin-bottom: .1rem;
		padding: 4px 10px;
		img {
			height: 1.1rem;
			border-radius: 6px;
		}
	}
	.env-info {
		text-align: center;
		height: .3rem;
		line-height: .3rem;
		margin: .1rem 0;
		.env-info-pointer {
			border: 3.6px solid $color;
			display: inline-block;
		}
		.env-info-line {
			width: .3rem;
			height: 2px;
			position: relative;
			bottom:2.8px;
			background: $color;
			display:inline-block;
		}
		.env-info-font {
			font-size: 18px;
			display: inline-block;
			margin: 0 .2rem;
			color: #30544E;
		}
	}
	.over {
		position: relative;
		z-index: 99;
	}
	.step-edit {
		margin-right: .1rem;
		height: .3rem;
		width: .3rem;
		margin-top: .1rem;
		background: $color;
		border-radius: 4px;
		i {
			color: #fff;
			position: relative;
			bottom: .08rem;
			left: .06rem;
		}
	}
	.acc-li{
		margin: .08rem 0;
		padding: 0 .2rem;
		background-color: #fff;
		border-radius: 6px;
		.QY {
			@include bis('~@/assets/images/factory.png');
		}
		.JG {
			@include bis('~@/assets/images/process.png');
		}
		.TJ {
			@include bis('~@/assets/images/farm.png');
		}
		.JC {
			@include bis('~@/assets/images/quality.png');
		}
		.ZZ {
			@include bis('~@/assets/images/plant.png');
		}
		.CC {
			@include bis('~@/assets/images/ware.png');
		}
		.CC {
			@include bis('~@/assets/images/ware.png');
		}
		.BZ {
			@include bis('~@/assets/images/package.png');
		}
		.CG {
			@include bis('~@/assets/images/buy.png');
		}
		.CS {
			@include bis('~@/assets/images/get.png');
		}

	}
	.acc-font{
		display: inline-block;
		position: relative;
		padding-left: .3rem;
		background-size: .2rem .2rem!important;
		background-position: left center;
		transition: transform .4s;
		font-style: normal;
	}
	.acc-row .t {
		width: 100%;
		text-align: right;
	}
	.acc-img {
		width:100%;
		margin-bottom: .1rem;
	}
	.factory-info {
		font-size: 16px;
		padding: .2rem 0;
		line-height: .2rem;
		border-bottom: 1px dashed $color2;
	}
</style>