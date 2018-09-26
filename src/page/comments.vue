<template>
    <div class="and">
        <header class="header">
            <i class="el-icon-arrow-left" @click="back"></i>
            全部评论
        </header>
        <div class="header-1"></div>
        <div class="container">
            <div class="fraction">
                <div class="point">
                    {{data.averageStars}}
                </div>
                <div class="star">
                    <el-rate v-model="data.averageStars" disabled></el-rate>
                    <div >共 {{data.resumeCommentTwoOneResponseList.length}} 人进行评价</div>
                </div>
            </div>
            <div class="comments-list">
                <div class="one"
                    v-for="(item, index) in data.resumeCommentTwoOneResponseList"
                    :key="index"
                    >
                    <div class="date">
                        {{item.insertTime | formatTime('m-d H:i')}}
                    </div>
                    <div class="one-left">
                        <img src="" alt="">
                    </div>
                    <div class="one-right">
                        <p>游客</p>
                        <el-rate v-model="item.commentStars" disabled></el-rate>
                        <div class="font">
                            {{item.commentContent}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <router-link :to="{name:'editComments'}">
                <i class="el-icon-edit"></i>
                写评论..
            </router-link>
        </div>
    </div>
</template>

<script>
    import { getCommentsList } from '@/api'
    export default {
        data() {
            return {
                data:{},
            }
        },
        created() {
            let resumeCode = sessionStorage.getItem('uniqueCode');
            getCommentsList(resumeCode, 1).then(data => {
                if( !data.data ) {
                    this.$toast('获取列表失败');
                    return;
                }
                data.data.averageStars = parseFloat(data.data.averageStars);
                data.data.resumeCommentTwoOneResponseList.forEach(val => {
                    val.commentStars = Number(val.commentStars)
                })
                this.data = data.data;
            })
        },
        methods: {
            back(){
                this.$router.push({name:'defaults', query:{resumeCode:sessionStorage.getItem('uniqueCode')}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .and {
        background: #fff;
        height: 100%;
    }
    .header-1 {
        height: 60px;
    }
    .header {
        background: #fff;
        width: 100%;
        z-index:99;
        position: fixed;
        top: 0;
        text-align: center;
        font-size: .18rem;
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        font-weight: 600;
        border-bottom: 1px solid #e7e7e7;
        i {
            float: left;
            margin-top: 20px;
        }
    }
    .container {
        margin-bottom: 60px;
        position: relative;
        z-index:1;
        background: #fff;
    }
    .comments-list {
        .one {
            padding: 20px 0;
            min-height: 100px;
            position: relative;
            width: 100%;
            font-size: 14px;
            border-bottom: 1px solid #e7e7e7;
            .one-left {
                float: left;
                width: 60px;
            }
            .one-right {
                margin-left: 60px;
                >p {
                    margin-bottom: 10px;
                }
            }
            .date {
                position: absolute;
                top: 20px;
                right: 20px;
            }
            .font {
                font-size: 14px;
                margin-top: 10px;
            }
        }
    }
    .fraction {
        height: 80px;
        overflow: hidden;
        border-bottom: 1px solid #e7e7e7;
        .point {
            float: left;
            width: 80px;
            height: 80px;
            line-height: 80px;
            color: #F7BA2A;
            font-size: 40px;
            padding-left: 30px;
        }
        .star {
            margin-left: 100px;
            height: 80px;
            position:relative;
            padding-top: 22px;
            //top: -30px;
            >div {
                font-size: 14px;
            }
        }
    }
    .bottom {
        background: #fff;
        width: 100%;
        position:fixed;
        z-index:99;
        bottom: 0;
        height: 60px;
        line-height: 60px;
        color: #ddd;
        font-size: 20px;
        padding-left: 30px;
        border-top: 1px solid #e7e7e7;
    }
</style>