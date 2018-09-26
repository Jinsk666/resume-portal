<template>
    <div class="container-bottom">
        <span class="line"></span>
        <span class="like">
            <span class="img-container">
                <img @click="handleLike" class="noLike" v-show="!isLike" src="@/assets/images/comments/1.1.png" alt="">
                <img @click="isLike = !isLike" class="isLike" v-show="isLike" src="@/assets/images/comments/1.3.png" alt="">
            </span>
            <span class="p">
                <span class="theme-color">100</span>
                赞
            </span>
        </span>
        <span class="comment">
            <router-link :to="{name: 'comments', query:{code: 1}}">
                <span class="img-container">
                    <img class="comment-img" src="@/assets/images/comments/1.2.png" alt="">
                </span>
                <span class="p">
                    <span class="theme-color">200</span>
                    评论
                </span>
            </router-link>
        </span>
    </div>
</template>

<script>
    import { likeArticle } from '@/api';
    export default {
        data() {
            return {
                isLike: false
            }
        },
        created() {
        },
        methods:{
            handleLike() {
                this.isLike = !this.isLike;
                let uniqueCode = sessionStorage.getItem('uniqueCode');
                likeArticle(uniqueCode).then(data => {
                    if( data.code == '0000' ) this.isLike = true;
                });
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
        font-size: 14px;
        padding: 10px 0;
        >span {
            display: inline-block;
            width: 49%;
            text-align: center;
            height: 42px;
            line-height: 42px;
            overflow: hidden;
            position: relative;
        }
        .like {
            .isLike {
                width: 33px;
                height: 33px
            }
            .noLike {
                width: 22px;
            }
        }
        .comment-img {
            width: 22px;
        }
        .img-container {
            display: inline-block;
            width: 40px;
            height: 40px;
            position: absolute;
            left: 40%;
            top: 50%;
            transform: translate(-40%, -50%);


        }
        .p {
            position: absolute;
            left: 70%;
            top: 50%;
            transform: translate(-70%, -50%);
        }
        .line {
            width: 1px;
            height: 32px;
            background: #e7e7e7;
            position: absolute;
            left: 50%;
        }
    }
</style>