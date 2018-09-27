<template>
    <div class="container-bottom">
        <!-- <span class="like">
            <span class="img-container">
                <img @click="handleLike" class="noLike" v-show="!isLike" src="@/assets/images/comments/1.1.png" alt="">
                <img @click="isLike = !isLike" class="isLike" v-show="isLike" src="@/assets/images/comments/1.3.png" alt="">
            </span>
            <span class="p">
                <span class="theme-color">{{deleted}}</span>
                赞
            </span>
        </span>
        <span class="comment">
            <router-link :to="{name: 'comments'}">
                <span class="img-container">
                    <img class="comment-img" src="@/assets/images/comments/1.2.png" alt="">
                </span>
                <span class="p">
                    <span class="theme-color">200</span>
                    评论
                </span>
            </router-link>
        </span> -->
        <div class="left">
            <div class="img">
                <div class="img-container">
                    <img @click="handleLike" class="noLike" v-show="!isLike" src="@/assets/images/comments/1.1.png" alt="">
                    <img @click="handleLike" class="isLike" v-show="isLike" src="@/assets/images/comments/1.3.png" alt="">
                </div>
            </div>
            <div class="font">
                <span class="theme-color">{{setDeleted}}</span>&nbsp;赞
            </div>
        </div>
        <div class="right">
            <router-link :to="{name: 'comments'}">
                <div class="img">
                    <div class="img-container">
                        <img class="comment-img" src="@/assets/images/comments/1.2.png" alt="">
                    </div>
                </div>
                <div class="font">
                    <span class="theme-color">{{commentsTotal}}</span>&nbsp;评论
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { likeArticle, getCommentsList } from '@/api';
    export default {
        props:['deleted'],
        data() {
            return {
                isLike: false,
                commentsTotal: 0,
                isLikeCount: 0,
                setDeleted: this.deleted || 0
            }
        },
        computed: {
            
        },
        mounted() {
            this.isLike = sessionStorage.getItem('isLike') == 'true' ? true : false;
            let resumeCode = sessionStorage.getItem('uniqueCode');
            getCommentsList(resumeCode, 1).then(data => {
                if( !data.data ) {
                    this.$toast('获取评论失败');
                    return;
                }
                this.commentsTotal = data.data.totalNum || 0;
            })
        },
        methods:{
            handleLike() {
                this.isLike = !this.isLike;
                if( this.isLike ) {
                    sessionStorage.setItem('isLike', 'true');
                    this.setDeleted++;
                    this.isLikeCount++;
                    let uniqueCode = sessionStorage.getItem('uniqueCode');
                    likeArticle(uniqueCode).then(data => {
                        if( data.code == '0000' ) this.isLike = true;
                    });
                }
                else {
                    this.setDeleted > 0 && this.setDeleted--;
                    sessionStorage.setItem('isLike', 'false');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        font-size: .14rem;
        padding: 0.1rem 0;
        height: .6rem;
        z-index:999999999;
        >div {
            display: inline-block;
            width: 49%;
            text-align: center;
            height: 0.42rem;
            line-height: 0.42rem;
        }
        .left {
            float: left;
            width: 49%;
            border-right: 1px solid #e7e7e7;
        }
        .img-container {
            display: inline-block;
            padding-top: 4px;
            width: 0.22rem;
        }
        .img {
            float: left;
            width: 40%;
            text-align: right;
        }
        .font {
            float: right;
            width: 55%;
            text-align: left;
        }
        .right {
            float: right;
            width: 49%;
        }
    }
</style>