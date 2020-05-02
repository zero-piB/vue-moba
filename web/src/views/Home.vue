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
    
  </div>
  <!-- end of nav-icons -->
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

.sprite{
  background: url('../assets/images/index.png') no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  &.sprite-news{
    background-position: 63.546% 15.517%;
    width: 1.7692rem;
    height: 1.5385rem;
  }
  &.sprite-stories{
    background-position: 90.483% 15.614%;
    width: 1.7692rem;
    height: 1.5385rem;
  }
  &.sprite-malls{
    background-position: 36.746% 0.924%;
    width: 1.4615rem;
    height: 1.6923rem;
  }
  &.sprite-ava{
    background-position: 10.408% 15.517%;
    width: 1.5385rem;
    height: 1.5385rem;
  }
  &.sprite-fishes{
    background-position: 89.733% 1.266%;
    width: 1.5385rem;
    height: 1.5385rem;
  }
  &.sprite-honor{
    background-position: 36.467% 15.287%;
    width: 1.8462rem;
    height: 1.6rem;
  }
  &.sprite-materials{
    background-position: 9.302% 0.813%;
    width: 2.3846rem;
    height: 1.9231rem;
  }
  &.sprite-camps{
    background-position: 63.3% 0.927%;;
    width: 1.8462rem;
    height: 1.8462rem;
  }
  &.sprite-fficial-accounts{
    background-position: 0 96.207%;
    width: 1.8462rem;
    height: 1.5385rem;
  }
  &.sprite-releases{
    background: url('../assets/images/releases.png') no-repeat 0 0;
    width: 2.3846rem;
    height: 1.9231rem;
    background-size: contain;
  }
  &.sprite-battle-env{
    background: url('../assets/images/battle-env.png') no-repeat 0 0;
    background-size: contain;
    width: 3rem;
    height: 2rem;
  }
  &.sprite-teams{
    background: url('../assets/images/teams.png') no-repeat 0 0;
    background-size: contain;
    width: 3.7em;
    height: 2rem;
  }
  &.sprite-interactions{
    background: url('../assets/images/interactions.png') no-repeat 0 0;
    background-size: contain;
    width: 2.5rem;
    height: 2.5rem;
  }
  &.sprite-arrow{
    background-position: 38.577% 52.076%;
    width: 1.7692rem;
    height: 1.7692rem
  }
}
</style>