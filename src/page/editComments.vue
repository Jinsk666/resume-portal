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
        color: red;
        font-size: 24px;
        text-align: center;
        padding-top: 30px;
        .title {
            display: inline-block;
            padding: 0 10px;
        }
        .line {
            width: 50px;
            height: 2px;
            display: inline-block;
            background: red;
            margin-bottom: 7px;
        }
    }
    .rate {
        text-align: center;
    }
    .details {
        color: rgb(247, 186, 42);
        font-size: 35px;
        margin-top: 40px;
        .big {
            font-size: 60px;
        }
    }
    .input {
        margin: 100px auto 50px;
        width: 3.4rem;
    }
    .btn {
        color: #fff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        width: 3.4rem;
        background: red;
        margin: 0 auto;
        font-size: 20px;
        border-radius: 30px;
    }
</style>