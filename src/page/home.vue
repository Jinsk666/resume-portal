<template>
    <div>

    </div>
</template>

<script>
    import fetch from '@/config/fetch'
    import { getParams } from '@/config/mUtils'

    export default {
        data() {
            return {
                loading: null,
            }
        },
        created() {
            this.loading = this.$loading({text:'拼命加载中...'});
            const params = getParams( window.location.hash.split('?')[1] );
            console.log(params);
            this.$router.push({name: 'defaults', query:{'resumeCode': params.resumeCode, 'templateCode': params.templateCode}});
            // fetch('/getTemplateUrl/' + params.resumeCode,{}).then( (data) => {
            //     if( data.code != '0000' ) {
            //         this.loading.close();
            //         this.$router.push('/404');
            //     }
            //     let route = data.data;
            //     this.$router.push({name: 'defaults', query:{'resumeCode': params.resumeCode, 'templateCode': params.templateCode}});

            // }).catch( (error) => {
            //     console.log(error);
            //     this.loading.close();
            //     this.$router.push('/404');
            // })
        }
    }
</script>

<style scoped>

</style>