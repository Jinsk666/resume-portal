<template>
    <!-- 基本模版 -> ( 图 + 文字 + 履历外链 ) -->
    <el-collapse-item
        class="acc-li"
        :name="toData.id"
        :id="toData.id"
        v-show="toData.data.generalEntityList.length > 0">
        <template slot="title">
            <i class="acc-font"
                :class="[toData.class, toData.activeNames.includes(toData.class)? 'animation': '']"> {{toData.name}}
            </i>
        </template>
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
        <!-- 链接履历跳转  -->
        <el-row class="acc-row factory-info"
            v-show="(toData.data.insideResumeQuoteDtoList && toData.data.insideResumeQuoteDtoList.length > 0) || (toData.data.externalResumeQuoteDtoList && toData.data.externalResumeQuoteDtoList.length > 0)"
        >
            <div class="LL-button"
                v-for="(item, index) in toData.data.insideResumeQuoteDtoList"
                :key="item.resumeURL + index"
            >
            <!-- <a class="LL-href" :href="item.resumeURL">{{item.resumeName}}</a> -->
            <router-link class="LL-href" :to="{name: 'home', query:{ resumeCode: item.resumeCode }}">{{item.resumeName}}</router-link>
            </div>
            <div class="LL-button"
                v-for="(item, index) in toData.data.externalResumeQuoteDtoList"
                :key="item.resumeURL + index"
            >
            <a class="LL-href" :href="item.resumeURL">{{item.resumeName}}</a>
            </div>
        </el-row>
    </el-collapse-item>
</template>

<script>
    export default {
        props: ['toData'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>

</style>