<template>
    <div id="home" :style="type=='pc'?'maxWidth:375px':''">
		<!-- 顶部图片  -->
        <div class="head-img" v-show="!moreIsShow">
			<img :src="logo" alt="" v-show="template.JB.generalEntityList.length > 0 && template.JB.generalEntityList[0].key == 'IMG'">
            <el-row :class="item.key == 'IMG' ? '' : 'factory-info'"
				v-if="item.key == 'IMG'"
				:span="24"
				v-for="(item, index) in template.JB.generalEntityList"
				:key="index">
				<el-col v-if="item.key == 'IMG'" :span="24" :style="{height:'2rem', overflow:'hidden'}">
					<img :src="item.value" class="acc-img">
				</el-col>
			</el-row>
        </div>
        <div class="code" v-show="!moreIsShow">
            <div class="code-font">溯源码 &nbsp;&nbsp;&nbsp;  {{resumeCode}}</div>
        </div>
		<!-- 内容区域 -->
        <div class="container clearfix" v-show="!moreIsShow">
            <div class="intro">
                <div class="intro-name ellipsis">{{name}}</div>
            </div>
			<!-- 开始基本信息  -->
            <div class="intro-content clear">
                <div class="bg-connect">
                    <div class="bg-connect-left left"></div>
                    <div class="bg-connect-right right"></div>
                </div>
				<!-- 基本信息 -->
				<el-row :class="item.key == 'IMG' ? '' : 'factory-info'"
					v-show="template.JB.generalEntityList.length > 0 "
					:span="24"
					v-for="(item, index) in template.JB.generalEntityList"
					:key="index">
					<!-- <el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col> -->
                    <el-col v-if="item.key != 'IMG'" :span="8"><div class="left">{{item.key}}</div></el-col>
                    <el-col v-if="item.key != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
                </el-row>
            </div>
			<!-- 折叠开始 -->
			<el-collapse id="offsetBegin" @change="handleChange" v-model="activeNames" class="accordion-list">
				<div v-for="(item, index) in floatInfo" :key="index">
					<to-gutter v-if="item.key =='ZZ'" :toData="{name:'种植基本信息', class: 'ZZ', id: item.id, activeNames: activeNames,title:{one:'种子基原信息', two:'药材批次信息'}, data: {one:item.data.one, two:item.data.two, all:item.data}}"></to-gutter>
					<to-gutter v-else-if="item.key == 'QY'" :toData="{name:'基地信息', class: 'QY',id:item.id, activeNames: activeNames, title:{one:'', two:'环境信息'}, data: {one:item.data.generalEntityList, two:item.data.environmentList, all:item.data}}">  </to-gutter>
					<to-farm v-else-if="item.key == 'TJ'" :toData="{calss:'TJ', id:item.id,data:item.data.fieldManageFarmingList, data2:item.data.tjArr, activeNames: activeNames, delete: moduleDelete['TJ']}" @viewMore="viewMore"></to-farm>
					<to-base v-else-if="item.key == 'CS'" :toData="{name:'采收信息', activeNames: activeNames, class: 'CS',id:item.id, data: item.data}"></to-base>
					<to-base v-else-if="item.key == 'CJG'" :toData="{name:'初加工信息', activeNames: activeNames, class: 'CJG',id:item.id, data: item.data}"></to-base>
					<to-base v-else-if="item.key == 'SJG'" :toData="{name:'饮片加工信息', activeNames: activeNames, class: 'SJG',id:item.id, data: item.data}"></to-base>
					<to-base v-else-if="item.key == 'BZ'" :toData="{name:'包装信息', activeNames: activeNames, class: 'BZ',id:item.id, data: item.data}"></to-base>
					<to-base v-else-if="item.key == 'YCC'" :toData="{name:'原料仓储', activeNames: activeNames, class: 'YCC',id:item.id, data: item.data}"></to-base>
					<to-base v-else-if="item.key == 'CCC'" :toData="{name:'成品仓储', activeNames: activeNames, class: 'CCC',id:item.id, data: item.data}"></to-base>
				</div>
				<el-collapse-item
					class="acc-li"
					name="ZJ"
					id="ZJ"
					v-show="template.ZJ[0].generalEntityList.length > 0">
					<template slot="title">
						<i class="acc-font ZJ" :class="activeNames.includes('ZJ')? 'animation': ''"> 质检信息 </i>
					</template>
					<el-row :gutter="20" style="margin-bottom: 20px;">
						<el-col :span="8"
							v-for="(item, index) in template.ZJ"
							:key="index"
						>
							<div
								class="zj-button"
								:class="{ZJactive: index == ZJactive}"
								@click="ZJactive = index">{{item.activeName}}
							</div>
						</el-col>
					</el-row>
					<to-zj :toData="{data: template.ZJ[ZJactive]}"></to-zj>
				</el-collapse-item>
			</el-collapse>
        </div>
		<!-- 树更多弹出 -->
		<to-more
			:toData="{data: moreData, show: moreIsShow, logo: farmLogo}"
			@closeMore="closeMore">
		</to-more>
    </div>
</template>

<script>
	import fetch from '@/config/fetch'
	import { isImg, getParams, getType, throttle, getModuleType, getScrollTop, setScrollTop } from '@/config/mUtils'
	import toBase from '@/components/common/base'
	import toGutter from '@/components/common/baseGutter'
	import toFarm from '@/components/common/farm'
	import toZj from '@/components/common/zj'
	import toMore from '@/components/common/more'

    export default {
		components: {
			toBase, toFarm, toZj, toMore, toGutter
		},
        data() {
            return {
				type:'', // PC or Mobile
				loading: '',    // 加载中......
				logo: '',
				code: '*********', // 溯源码
                name: 'XXXX',       // 名称
				moreIsShow: false, // 树点击判断页面是否显示
				moreData: [],      //跳转到更多传参
				resumeCode: 'LL-20180703-000002', // 默认码
				templateCode:'RM-20180629-000001',
				activeNames: [],   // 手风琴 展开项
				floatInfo:[],// 根据接口动态删除
				floatInfoDelete:{
					'ZZ':'种植信息',
					'QY': '基地信息',
					'TJ': '田间管理',
					'CS': '采收信息',
					'CJG':'加工信息',
					'SJG':'加工信息',
					'BZ':'包装信息',
					'YCC':'仓储信息',
					'CCC':'仓储信息',
					'ZJ':'质检信息'
				},
            }
		},
		created() {
			this.type = getType();
		},
		mounted() {
			this.loading = this.$loading({text:'拼命加载中...'});
			var that = this;
			//获取 url 参数
			const params = getParams(window.location.hash.split('?')[1]);

			that.resumeCode = params.resumeCode;
			fetch('/getDetail/' + params.resumeCode).then( data =>{

			})
			.catch( (res) => {
				//	关闭加载中
				console.log(res);
				setTimeout( () => {
					that.loading.close();
				},10);
				that.$router.push('/404');
			})
		},
        computed: {

        },
        methods: {
			// 树苗更多点击
			viewMore(index){
				this.moreScrollTop = getScrollTop();
				setScrollTop(0);
				this.moreIsShow = true;
				this.moreData = this.template.TJ.fieldManageFarmingList[index];
			},
			// 关闭更多
			closeMore() {
				this.moreIsShow = false;
			},
			// 中间模块下拉点击
			handleChange(val) {
				this.activeNames = val;
			},
		},
    }
</script>

<style lang="scss">
    @import '../assets/style/mixin';
	// 1rem = 100px  设计稿为 375px

	// @function px2Rem($px){
    //     @return $px/100px * 1rem
	// }
	#home {
		margin: 0 auto;
	}
	.head-img {
		width:3.75rem;
		position: relative;
		>img {
			position: absolute;
			top: .2rem;
			left: .2rem;
			width: .5rem;
			z-index:999;
		}
	}
	#float_window {
		background: #FFF;
		position: fixed;
		top: 0;
		height: .5rem;
		width: 100%;
		z-index:99999;
		overflow-x: scroll;
		white-space: nowrap;
		.window-content {
			//width: 400%;
			height: .5rem;
			white-space: nowrap;
			li {
				float: left;
				margin: .16rem 0;
				width: .94rem;
				line-height: .2rem;
				font-size: .14rem;
				text-align: center;
			}
			.active {
				color: $color;
				border-bottom: 2px solid $color;
			}
		}
	}
	.animation {
		transform: translate(1.06rem, 0);
	}
    .code {
        @include wh(100%, .69rem);
        position: relative;
        @include bis('~@/assets/images/bg-code.png');
        .code-font{
            @include center();
            @include wh(100%, .69rem);
            line-height: .69rem;
            font-size: .17rem;
            text-align: center;
        }
    }
    .container {
		/* element-ui 样式修改 begin */
		.el-button {
			padding-top: .12rem;
			padding-bottom: .12rem;
		}
		.el-collapse {
			border: 0;
		}
		.el-collapse-item__header {
			height: .48rem;
			line-height: .48rem;
			font-size: .16rem;
		}
		.el-collapse-item__arrow {
			line-height: .48rem;
		}
		.el-popover {
			height: .2rem;
			line-height: .2rem;
			font-size: .14rem;
			background: #ededed;
			@include bR(4px);
		}
		/* elkement-ui 样式修改 end */
        padding: 20px 0;
        background: $color;
        .intro {
            margin: 0 auto;
            @include wh(3.46rem, .7rem);
            @include bR(9px);
			@include bis('~@/assets/images/bg-name.png');
			background-color: #fff;
			background-size: 80%;
			background-position: center center;
            position: relative;
            .intro-name {
                font-size: .24rem;
                @include center();
                color: $color;
                font-weight: bold;
				width: 2rem;
				text-align: center;
            }
        }
        .bg-connect {
			div{
				position: absolute;
				top: -0.28rem;
				@include wh(.06rem, .4rem);
				@include bis('~@/assets/images/connect.png');
				background-size: .06rem .4rem;
			}
            .bg-connect-left{
				left: 20px;
			}
			.bg-connect-right{
				right: 20px;
            }
        }
        .intro-content {
			margin: 20px auto;
			width: 3.46rem;
            background-color: #fff;
            padding: .2rem;
            @include bR(9px);
            position: relative;

		}
		.icon-info {
			font-size: .14rem;
			button.factory0 span{
				@include bis('~@/assets/images/factory-1.png');
			}
			button.factory1 span{
				@include bis('~@/assets/images/factory-2.png');
			}
			button.factory2 span{
				@include bis('~@/assets/images/factory-3.png');
			}
			button.ellipsis {
				width: 100%;
			}
			button.ellipsis span {
				padding-left: .20rem;
				background-size: .16rem .18rem;
				height: .2rem;
				line-height: .19rem;
				font-size: .14rem;
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
				padding: .05rem 10px;
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
		.LL-button {
			display: inline-block;
			cursor: pointer;
			height: .3rem;
			line-height: .3rem;
			font-size: .14rem;
			padding: 0 .1rem 0 .22rem !important;
			// @include bis('~@/assets/images/tag.png');
			// background-size: .14rem .14rem;
			// background-position: .06rem center;
			margin: 0 20px 20px 0!important;
			border:1px solid rgba(86, 190, 158, .54);
			background-color: rgba(88, 191, 159,.05);
			@include bis('~@/assets/images/tag.png');
			@include bR(4px);
			background-size: .14rem .14rem;
			background-position: .06rem center;
			color:$color;
		}
		.LL-href {
			width: 100%;
			height: .3rem;
			display: inline-block;
			color:$color;
		}
		.zj-button {
			text-align: center;
			height: .34rem;
			line-height: .34rem;
			color: #54be9d;
			background-color: rgba(86,190,159,0.12);
			font-size: .16rem;
			margin-bottom:16px;
		}
		div.ZJactive {
			color:#FFF;
			background-color: #56be9f;
		}
	}
	.factory-info {
		font-size: .16rem;
		padding: .2rem 0;
		//height: .6rem;
		line-height: .2rem;
		border-bottom: 1px dashed $color2;
	}
	.accordion-list {
		font-size: .18rem;
		width: 3.46rem;
		margin: 0 auto;
		.acc-li{
			margin: .08rem 0;
			padding: 0 .2rem;
			background-color: #fff;
			@include bR(9px);
			.QY {
				@include bis('~@/assets/images/factory.png');
			}
			.CJG {
				@include bis('~@/assets/images/process.png');
			}
			.SJG {
				@include bis('~@/assets/images/process.png');
			}
			.TJ {
				@include bis('~@/assets/images/farm.png');
			}
			.ZJ {
				@include bis('~@/assets/images/quality.png');
			}
			.ZZ {
				@include bis('~@/assets/images/plant.png');
			}
			.CCC {
				@include bis('~@/assets/images/ware.png');
			}
			.YCC {
				@include bis('~@/assets/images/ware.png');
			}
			.CS {
				@include bis('~@/assets/images/reward.png');
			}
			.BZ {
				@include bis('~@/assets/images/package.png');
			}

		}
		.acc-font{
			display: inline-block;
			position: relative;
			padding-left:.3rem;
			background-size: .2rem .2rem!important;
			background-position: left center;
			transition: transform .4s;
		}
		.acc-row .t {
			width: 100%;
			text-align: right;
		}
		.env-info {
			text-align: center;
			height: .3rem;
			line-height: .3rem;
			margin: .3rem 0;
			.env-info-pointer {
				border: .036rem solid $color;
				display: inline-block;
			}
			.env-info-line {
				width: .3rem;
				height: .02rem;
				position: relative;
				bottom:.028rem;
				background: $color;
				display:inline-block;
			}
			.env-info-font {
				font-size: .18rem;
				display: inline-block;
				margin: 0 .2rem;
			}
		}
	}
	.acc-img {
		width:100%;
		margin-bottom: 10px;
	}
</style>