<template>
    <div>
        <el-dialog
            title=""
            :visible.sync="isShowMap"
            width="100%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="handleClose">
            <baidu-map
                class="map"
                :scroll-wheel-zoom="true"
                :center="center"
                :zoom="15"
                @ready="mapReady">
                <bm-marker :position="{lng: center.lng, lat: center.lat}" :icon="{url: 'http://img5.farmeasy.cn/acsm-yp/00000001/staff/20180904/153604010016577bb4.png', size:{width:20, height: 40}}">
				</bm-marker>
            </baidu-map>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['dCenter','isShowMap'],
        mounted: function(){
        },
        data() {
            return {
                center: {lng: this.dCenter[0].value, lat: this.dCenter[1].value}
            }
        },
        methods: {
            mapReady({BMap, map}) {
                //this.center.lng = this.dCenter[0].value;
                //this.center.lat = this.dCenter[1].value;
            },
            handleClose() {
                this.$emit('handleClose');
            }
        }
    }
</script>

<style scoped>
    .map {
        width: 100%;
        height: 300px;
    }
</style>