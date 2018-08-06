<template>
    <!-- 适用 企业 种植 -->
    <el-collapse-item
        class="acc-li"
        :name="toData.id"
        :id="toData.id"
        v-show="toData.data.one.length > 0 || toData.data.two.length > 0"
        >
        <template slot="title">
            <i class="acc-font"
                :class="[toData.class, toData.activeNames.includes(toData.calss)? 'animation': '']"> {{toData.name}} </i>
        </template>
        <!-- 先遍历图片   种植无图片-->
        <!-- <el-row
            class="acc-row"
            :class="item.key == 'IMG' ? '' : 'factory-info'"
            v-show="toData.data.all.generalEntityList.length > 0 && toData.class=='ZZ' && item.key == 'IMG'"
            v-for="(item, index) in toData.data.all.generalEntityList"
            :key="item.value+index">
            <el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col>
            <el-col v-else></el-col>
        </el-row> -->
        <!-- one -->
        <div class="env-info" v-if="toData.title.one.length > 0 && toData.data.one.length > 0">
            <span class="env-info-pointer"></span><span class="env-info-line"></span>
            <span class="env-info-font">{{toData.title.one}}</span>
            <span class="env-info-line"></span><span class="env-info-pointer"></span>
        </div>
        <el-row
            class="acc-row"
            :class="item.key == 'IMG' ? '' : 'factory-info'"
            v-show="toData.data.one.length > 0"
            v-for="(item, index) in toData.data.one"
            :key="index">
            <el-col v-if="item.key == 'IMG'" :span="24"><img :src="item.value" class="acc-img"></el-col>
            <el-col v-if="item.key != 'IMG'" :span="8"><div class="left">{{item.key}}</div></el-col>
            <el-col v-if="item.key != 'IMG'" :span="16"><div class="right t">{{item.value}}</div></el-col>
        </el-row>
        <!-- one end -->
        <!-- two -->
        <div class="env-info" v-if="toData.title.two.length > 0 && toData.data.two.length > 0">
            <span class="env-info-pointer"></span><span class="env-info-line"></span>
            <span class="env-info-font">{{toData.title.two}}</span>
            <span class="env-info-line"></span><span class="env-info-pointer"></span>
        </div>
        <el-row
            class="acc-row factory-info"
            v-show="toData.data.two.length > 0"
            v-for="(item, index) in toData.data.two"
            :key="item.key + index">
            <el-col :span="12"><div class="left">{{item.key}}</div></el-col>
            <el-col :span="12"><div class="right t">{{item.value}}</div></el-col>
        </el-row>
    <to-links :toRusume="{data: toData.data.all}"></to-links>
    </el-collapse-item>
</template>

<script>
    import toLinks from '@/components/common/rusumeLink'

    export default {
        props: ['toData'],
        data() {
            return {
            }
        },
        components:{
            toLinks
        },
        methods: {
        }
    }
</script>

<style>

</style>