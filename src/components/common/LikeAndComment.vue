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
                <div @click="handleLike" v-show="!isLike" class="img-container good-img-1">
                </div>
                <div v-show="isLike" class="img-container good-img-2">
                </div>
            </div>
            <div class="font">
                <span class="theme-color">{{setThumbsUpNum}}</span>&nbsp;赞
            </div>
        </div>
        <div class="right">
            <router-link :to="{name: 'comments'}">
                <div class="img">
                    <div class="img-container comment-img">
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
        props:['thumbsUpNum'],
        data() {
            return {
                isLike: false,
                commentsTotal: 0,
                isLikeCount: 0,
                setThumbsUpNum: this.thumbsUpNum || 0
            }
        },
        computed: {
            
        },
        mounted() {
            this.isLike = sessionStorage.getItem('isLike') == 'true' ? true : false;
            let resumeCode = this.$route.query.resumeCode;
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
                this.isLike = true;
                // if( this.isLike ) {
                    sessionStorage.setItem('isLike', 'true');
                    this.setThumbsUpNum++;
                    let uniqueCode = sessionStorage.getItem('uniqueCode');
                    likeArticle(uniqueCode).then(data => {
                        if( data.code == '0000' ) this.isLike = true;
                        else this.isLike = false;
                    });
                // }
                // else {
                //     this.setThumbsUpNum > 0 && this.setThumbsUpNum--;
                //     sessionStorage.setItem('isLike', 'false');
                // }
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
            width: 0.3rem;
            height: 0.32rem;
            margin-top: 0.04rem;
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
        .comment-img {
            background: url('~@/assets/images/comments/1.2.png') no-repeat center center;
            background-size: 0.22rem;
        }
        .good-img-1 {
            background: url('~@/assets/images/comments/1.1.png') no-repeat center center;
            background-size: 0.22rem;
        }
        .good-img-2 {
            margin-top: 0;
            background: url('~@/assets/images/comments/1.3.png') no-repeat top center;
            background-size: 0.3rem;
        }
    }
</style>