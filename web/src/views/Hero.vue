<template>
    <div>
        <div class="topbar bg-black pt-2 pb-1 px-5 w-100 text-white d-flex ai-center">
            <img src="../assets/logo.png" height="31rem" class="pr-1"/>
            <div class="px-2 flex-1">
                <span class="fs-md py-1">王者荣耀</span>
                <span class="fs-md py-1 pl-4">攻略战</span>
            </div>
            <router-link tag="div" to="/" class="fs-sm">更多英雄 &gt;</router-link>
        </div>
        <div>{{model.name}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{

            }
        }
    },
    props:{
        id:{require:true}
    },
    methods:{
        async fetch(){
            const res = await this.axios.get(`heroes/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang="scss">

</style>