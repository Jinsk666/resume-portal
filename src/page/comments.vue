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
                        <div class="img-container">
                            <img src="@/assets/images/comments/tourist.png" alt="">
                        </div>
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
        <router-link :to="{name:'editComments'}">
            <div class="bottom">
                <i class="el-icon-edit"></i>
                写评论..
            </div>
        </router-link>
    </div>
</template>

<script>
    import { getCommentsList } from '@/api'
    export default {
        data() {
            return {
                data:{resumeCommentTwoOneResponseList:[]},
            }
        },
        mounted() {
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
        height: 0.6rem;
    }
    .header {
        background: #fff;
        width: 100%;
        z-index:99;
        position: fixed;
        top: 0;
        text-align: center;
        font-size: .18rem;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.3rem;
        font-weight: 600;
        border-bottom: 1px solid #e7e7e7;
        i {
            float: left;
            margin-top: 0.2rem;
        }
    }
    .container {
        margin-bottom: 0.6rem;
        position: relative;
        z-index:1;
        background: #fff;
    }
    .comments-list {
        .one {
            padding: 0.2rem 0;
            min-height: 1rem;
            position: relative;
            width: 100%;
            font-size: 14px;
            border-bottom: 1px solid #e7e7e7;
            .img-container {
                width: 70%;
                display: inline-block;
            }
            .one-left {
                float: left;
                width: 0.8rem;
                text-align: center;
            }
            .one-right {
                margin-left: 0.8rem;
                >p {
                    margin-bottom: 0.1rem;
                }
            }
            .date {
                position: absolute;
                top: 0.2rem;
                right: 0.2rem;
            }
            .font {
                font-size: 14px;
                margin-top: 0.1rem;
            }
        }
    }
    .fraction {
        height: 0.8rem;
        overflow: hidden;
        border-bottom: 1px solid #e7e7e7;
        .point {
            float: left;
            width: 0.8rem;
            height: 0.8rem;
            line-height: 0.8rem;
            color: #F7BA2A;
            font-size: 0.6rem;
            text-align: center;
        }
        .star {
            margin-left: 0.8rem;
            height: 0.8rem;
            position:relative;
            padding-top: 0.22rem;
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
        height: 0.6rem;
        line-height: 0.6rem;
        // color: #ddd;
        font-size: 20px;
        padding-left: 0.3rem;
        border-top: 1px solid #e7e7e7;
    }
</style>