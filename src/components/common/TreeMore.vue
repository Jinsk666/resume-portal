<template>
    <!-- 点击树的更多  基本模版 -->
    <div class="more-model" v-show="isShowTreeMore">
        <div class="more-content">
            <el-row class="more-header">
                <!-- <span @click="closeMore">x</span> -->
                <span @click="closeMore">关闭</span>
            </el-row>
            <img
                v-if="treeMore.imgs && treeMore.imgs.length > 0"
                v-for="(item, index) in treeMore.imgs"
                :key="index"
                :src="item.url" alt="">
            <el-row
                class="acc-row factory-info"
                v-if="item.label.indexOf('图片') == -1 && item.value"
                v-for="(item, index) in treeMore.data"
                :key="(index+222)">
                <el-col :span="8"><div class="left">{{item.label}}</div></el-col>
                <el-col v-if="dateList.includes(item.dataType)" :span="16">
                    <div class="right t">{{item.value | formatTime('Y-m-d')}}</div>
                </el-col>
                <el-col v-else-if="dateRangeList.includes(item.dataType)" :span="16">
                    <div class="right t">
                        {{item.value && item.value.split('-_-')[0] | formatTime('Y.m.d')}}
                        {{item.value ? '~' : ''}}
                        {{item.value && item.value.split('-_-')[1] | formatTime('Y.m.d')}}
                    </div>
                </el-col>
                <el-col v-else :span="16"><div class="right t">{{item.value}}</div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import { formatTime, step2Class } from '@/config/mUtils'
    export default {
        props: ['isShowTreeMore'],
        data() {
            return {
                clientHeight: '',
                dateList: [3, 4],
                dateRangeList: [5, 6],
            }
        },
        filters: {
			formatTime, step2Class
		},
        computed: {
            ...mapState(['treeMore']),
        },
        mounted: function(){
            this.clientHeight = document.documentElement.clientHeight;
            var a = document.querySelector('.more-content');
            a.style.minHeight =  (this.clientHeight - 60) + 'px';
        },
        methods: {
            closeMore() {
                this.$emit('closeMore')
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
            width: 3.46rem;
            margin: .3rem auto;
            padding: .2rem;
            border-radius: 8px;
            position: relative;
            >img {
                width: 3.06rem;
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
    .factory-info {
    font-size: 16px;
    padding: .2rem 0;
    line-height: .2rem;
    border-bottom: 1px dashed $color2;
    }
</style>