<template>
    <el-row class="acc-row factory-info"
        v-show="(toRusume.data.insideResumeQuoteDtoList && toRusume.data.insideResumeQuoteDtoList.length > 0) || (toRusume.data.externalResumeQuoteDtoList && toRusume.data.externalResumeQuoteDtoList.length > 0)"
    >
        <div class="LL-button"
            v-for="(item, index) in toRusume.data.insideResumeQuoteDtoList"
            :key="item.resumeURL + index"
        >
        <!-- <a class="LL-href" :href="item.resumeURL">{{item.resumeName}}</a> -->
            <router-link class="LL-href" :to="{name: 'home', query:{ resumeCode: item.resumeCode }}">{{item.resumeName}}</router-link>
        </div>
        <div class="LL-button"
            v-for="(item, index) in toRusume.data.externalResumeQuoteDtoList"
            :key="item.resumeURL + index"
        >
        <a class="LL-href" :href="item.resumeURL">{{item.resumeName}}</a>
        </div>
    </el-row>
</template>

<script>
    export default {
        props: ['toRusume'],
        data() {
            return {
            }
        },
    }
</script>

<style scoped>

</style>