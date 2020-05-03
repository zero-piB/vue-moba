<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper1.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img  class="w-100" src="../assets/images/swiper2.jpeg"/>
      </swiper-slide>
      <swiper-slide>
        <img  class="w-100" src="../assets/images/swiper3.jpeg"/>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper> 
    <!-- swiper  end-->
    <div class="nav_icons bg-white mt-4 pt-3">
      <div class="d-flex flex-wrap text-center">
        <div class="nav_item mb-4" v-for="(nav_item,i) in home_nav" :key="i">
          <div class="d-flex flex-column ai-center">
            <i class="sprite mt-4" :class="nav_item.class"></i>
            <div class="fs-sm mt-1">{{nav_item.title}}</div>
          </div>
        </div>
      </div>
      <div class="bg-light pb-2 d-flex jc-center">
        <span class="sprite sprite-arrow"></span>
        <span class="fs-sm mt-2">收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->
    <i class="iconfont icon-menu text-grey"></i>
  </div>
  
</template>

<script>
export default {
  data(){
    return{
      home_nav:[{'title':'爆料站','class':'sprite-news'},{'title':'故事站','class':'sprite-stories'},
      {'title':'周边商城','class':'sprite-malls'},{'title':'体验服','class':'sprite-ava'},
      {'title':'新人专区','class':'sprite-fishes'},{'title':'荣耀·继承','class':'sprite-honor'},
      {'title':'模拟站资料','class':'sprite-materials'},{'title':'王者营地','class':'sprite-camps'},
      {'title':'公众号','class':'sprite-fficial-accounts'},{'title':'版本介绍','class':'sprite-releases'},
      {'title':'对局环境','class':'sprite-battle-env'},{'title':'无限王者团','class':'sprite-teams'},
      {'title':'创意互动营','class':'sprite-interactions'}],
      swiperOptions: {
        loop:true,
        autoplay:true,
        pagination: {
          el: '.pagination-home'
        },
        // Some Swiper option/callback...
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home{
  touch-action: none;
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($colors, 'white');
    &.swiper-pagination-bullet-active{
      background-color: map-get($colors, 'info');
    }
  }
}

</style>