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
    <!-- end of swiper -->
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
    <m-list-card  class="mt-4" title="新闻资讯" icon="icon-menu" :catesData="newsData">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${item._id}`"
        class="py-3 d-flex" v-for="(item, i) in category.newsList" :key="i+10">
          <span class="text-dark-1 pl-4">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="text-ellipisis flex-1">{{item.title}}</span>
          <span class="text-grey px-4 fs-xs">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
<!-- end of newsList -->
    <m-list-card class="mt-4" title="英雄列表" icon="icon-helmet-battle-li" :catesData="heroesData" :class="'pb-4'">
      <template #items="{category}">
        <div class="d-flex flex-wrap pt-2" style="margin: 0 0.5rem">
          <div class="pb-2 text-center px-2" style="width:20%" v-for="(hero, i) in category.heroesList" :key="i+10">
            <img class="w-100" :src="hero.avatar"/>
            <h3 class="fs-xs my-0" style="font-weight: normal">{{hero.name}}</h3>
          </div>
        </div>
      </template>
    </m-list-card>
<!-- end of heroesList -->
    
    <m-card class="mt-3" title="精彩视频" icon="icon-icon1"></m-card>
    <m-card class="mt-3" title="图文攻略" icon="icon-strategy"></m-card>
  </div>
  
</template>

<script>
import dayjs from 'dayjs'
export default {
  data(){
    return{

      newsData:[],
      heroesData:[],
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
  },
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  methods:{
    async fetchNewsData(){
      const res = await this.axios.get('news/list')
      this.newsData = res.data
    },
    async fetchHeroesData(){
      const res = await this.axios.get('heroes/list')
      this.heroesData = res.data
    }
  },
  created(){
    this.fetchNewsData()
    this.fetchHeroesData()
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