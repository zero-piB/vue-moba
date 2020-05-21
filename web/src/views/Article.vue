<template>
  <div class="page-article" v-if="article">
    <div class="d-flex pt-3 px-2 pb-3 border-bottom  fs-xs">
      <span class="iconfont icon-back text-blue"></span>
      <strong class="text-ellipisis flex-1 px-1 text-blue">{{article.title}}</strong>
      <div class="text-grey">{{article.createdAt|date}}</div>
    </div>
    <div class="article-body text-center" v-html="article.body"></div>
    <div class="px-2">
      <div class="ai-center py-3">
        <span class="iconfont icon-related pr-1"></span>
        <strong class="text-blue">相关资讯</strong>
      </div>
      <div class="pt-1 fs-xs">
        <router-link tag="div" :to="`/articles/${item._id}`"
        v-for="(item,i) in article.related" :key="i" class="d-flex py-1">
          <span class="text-ellipisis pr-2 flex-1 text-black">{{item.title}}</span>
          <span class="text-grey">{{item.updateAt|date}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data(){
    return{
      article:null
    }
  },
  props:{
    id:{required:true}
  },
  watch:{
    id:'fetch'
  },
  methods:{
    async fetch(){
      const res = await this.axios.get(`/articles/${this.id}`)
      this.article = res.data
    },
  },
  filters:{
    date(val){
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  created(){
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article{
  .article-body{
    img{
      max-width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
    }
  }
}
</style>
