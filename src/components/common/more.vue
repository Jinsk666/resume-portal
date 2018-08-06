<template>
    <!-- 点击树的更多  基本模版 -->
    <div class="more-model" v-show="toData.show">
        <div class="more-content">
            <el-row class="more-header" @click="closeMore">
                <span @click="closeMore">x</span>
                <span @click="closeMore">关闭</span>
            </el-row>
            <img :src="toData.logo" alt="" v-show="toData.data.generalEntityList && toData.data.generalEntityList[0].key == 'IMG'">
            <el-row
                class="acc-row"
                :class="item.key == 'IMG' ? '' : 'factory-info'"
                v-show="toData.data.generalEntityList.length > 0"
                v-for="(item, index) in toData.data.generalEntityList"
                :key="index">
                <el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col>
                <el-col v-if="item.key != 'IMG'" :span="8"><div class="left">{{item.key}}</div></el-col>
                <el-col v-if="item.key != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['toData'],
        data() {
            return {
                clientHeight: '',
            }
        },
        mounted: function(){
            this.clientHeight = document.documentElement.clientHeight;
            var a = document.querySelector('.more-content');
            a.style.minHeight =  (this.clientHeight - 60) + 'px';
        },
        methods: {
            closeMore() {
                this.$emit('closeMore');
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/style/mixin';
    .more-model {
        position: absolute;
        top: 0;
        background: $color;
        width: 3.75rem;
        .more-content {
            background: #FFF;
            width:3.46rem;
            margin: 30px auto;
            padding: .2rem;
            border-radius: 8px;
            position: relative;
            >img {
			position: absolute;
			top: .6rem;
			left: .3rem;
			width: .5rem;
			z-index:999;
		}
        }
        .more-header{
            width:.7rem;
            height:.3rem;
            line-height: .3rem;
            font-size:.16rem;
            color:#666;
            text-align: left;
        }
    }
</style>