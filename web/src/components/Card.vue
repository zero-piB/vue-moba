<template>
  <div class="card bg-white pt-1 pb-2">
    <header class="card-head d-flex px-3 py-4">
      <i class="iconfont" :class="icon"></i>
      <div class="fs-xlg pl-2 flex-1">{{title}}</div>
      <i class="iconfont icon-menu1 pr-1"></i>
    </header>
    <div class="card-body pt-3">
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

<style lang="scss">
@import "../assets/scss/variables";
.card{
  .card-head{
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
