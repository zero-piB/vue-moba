<template>
  <div>
    <div class="topbar bg-black pt-2 pb-1 px-5 w-100 text-white d-flex ai-center">
      <img src="../assets/logo.png" height="31rem" class="pr-1"/>
      <div class="px-2 flex-1">
        <div class="fs-md py-1">王者荣耀</div>
        <div class="fs-xs text-grey-1">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary">
      <div class="nav d-flex pt-4 pb-3 jc-around text-white">
        <div class="nav-item active">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

</script>
