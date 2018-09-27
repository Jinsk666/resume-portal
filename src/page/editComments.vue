<template>
    <div class="and">
        <div class="header">
            <div class="line"></div>
            <div class="title">星级评价</div>
            <div class="line"></div>
        </div>
        <div class="rate">
            <div class="details">
                <div>
                    <span class="big">{{rate}}</span>分
                </div>
                <div>{{font}}</div>
            </div>
            <el-rate
                v-model="star"
                @change="change"
                >
            </el-rate>
        </div>
        <div class="input">
            <el-input type="textarea" :rows="6" v-model="textarea" placeholder="请输入评价内容..."></el-input>
        </div>
        <div class="btn" @click="commit">
            提交评价
        </div>
    </div>
</template>

<script>
    import { publishComment } from '@/api';
    export default {
        data() {
            return {
                star: 5,
                rate: 5,
                font: '非常好',
                textarea:'',
                map:['','极差', '失望', '一般', '满意', '非常好'],
            }
        },

        methods: {
            change(a) {
                this.rate = a; this.font = this.map[a];
            },
            commit(){
                if( !this.textarea ) {
                    this.$toast('请输入评论内容');
                    return;
                }
                let enterpriseInfoId = sessionStorage.getItem('enterpriseInfoId');
                let enterpriseName = sessionStorage.getItem('enterpriseName');
                let uniqueCode = sessionStorage.getItem('uniqueCode');
                publishComment(this.textarea, String(this.star), Number(enterpriseInfoId), enterpriseName, uniqueCode).then(data => {
                    if( data.code == '0000') {
                        this.$toast('评论成功 ! ');
                        this.$router.push({name:'comments'})
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .and {
        height: 100%;
        background: #fff;
    }
    .header {
        color: #88A2B8;
        font-size: 24px;
        text-align: center;
        padding-top: 0.3rem;
        .title {
            display: inline-block;
            padding: 0 0.1rem;
        }
        .line {
            width: 0.5rem;
            height: 2px;
            display: inline-block;
            background: #88A2B8;
            margin-bottom: 7px;
        }
    }
    .rate {
        text-align: center;
    }
    .details {
        color: rgb(247, 186, 42);
        font-size: 35px;
        margin-top: 0.4rem;
        .big {
            font-size: 60px;
        }
    }
    .input {
        margin: 1rem auto 0.5rem;
        width: 3.4rem;
    }
    .btn {
        color: #fff;
        text-align: center;
        height: 0.4rem;
        line-height: 0.4rem;
        width: 3.4rem;
        background: #51bd9c;
        margin: 0 auto;
        font-size: 20px;
        border-radius: 0.3rem;
    }
</style>