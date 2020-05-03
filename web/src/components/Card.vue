<template>
  <div class="crad bg-white py-4">
    <header class="d-flex jc-center">
      <i class="iconfont text-dark" :class="icon"></i>
      <div>{{title}}</div>
      <i class="iconfont icon-menu"></i>
    </header>
    <div class="card-body">
      我是body
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{type:String,required:true},
    icon:{type:String,required:true},
  }
}
</script>

<style>

</style>
