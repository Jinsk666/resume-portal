<template>
  <div class="box">
    <img src="@/assets/images/404.png" alt="">
    <div class="landscape">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    document.title = '履历溯源'
  }
}
</script>

<style lang="scss">
  @import '../assets/style/mixin';

  .box {
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right: 0;
    img {
      width:3.46rem;
      display: block;
      @include center();
    }
  }
</style>
